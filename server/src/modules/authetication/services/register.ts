import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import bcrypt from 'bcrypt';
import moment from 'moment/moment';
import Models from '../../../database/models';
import { body, validationResult } from 'express-validator';
import {Request} from '../../../common_types/object';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}

async function generateUniqueSlug(
    models: any,
    firstName: string,
    lastName: string,
): Promise<string> {
    let baseSlug = `${firstName}-${lastName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens

    let uniqueSlug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await models.UserModel.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}

async function register(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {

    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }


    let models = Models.get();
    let body = req.body as { [key: string]: any };

    // Check if user already exists
    let existingUser = await models.UserModel.findOne({
        where: { email: body.email },
    });

    if (existingUser) {
        return response(409, 'User already exists', {});
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Generate unique slug
        const slug = await generateUniqueSlug(
            models,
            body.first_name,
            body.last_name,
        );

        // Assign role serial dynamically
        let roleSerial = body.role;

        // Check if a role with this serial exists
        let roleRecord = await models.UserRolesModel.findOne({
            where: { serial: roleSerial },
        });

        if (!roleRecord) {
            // If not found, create a new role with the given serial
            roleRecord = await models.UserRolesModel.create({
                title: 'student', // Default title
                serial: roleSerial || 1,
            });
        }



        // Handle profile image upload
        let image_path = 'avatar.png';
        if (body['photo'] && typeof body['photo'] === 'object' && body['photo'].name) {
            image_path = `uploads/users/${moment().format('YYYYMMDDHHmmss')}_${body['photo'].name}`;
            await (fastify_instance as any).upload(body['photo'], image_path);
        }

        // Store only the string path in the database
        body.photo = image_path;

        if (typeof body.photo !== 'string') {
            return response(400, 'Invalid photo format', {});
        }

        // Generate unique UID
        let uidPrefix = moment().format('YYYYMMDD');
        let uidCounter = 1001;
        let uid = uidPrefix + uidCounter;

        while (await models.UserModel.findOne({ where: { uid: uid } })) {
            uidCounter++;
            uid = uidPrefix + uidCounter;
        }

        // Create user
        let newUser = await models.UserModel.create({
            uid: uid,
            role_serial: roleSerial,
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone_number: body.phone_number,
            photo: body.photo || image_path,
            password: hashedPassword,
            slug: slug,
            token: body.token,
        });

        return response(200, 'User registered successfully', newUser);
    } catch (error) {
        return response(500, 'Error registering user', { error });
    }
}

export default register;
