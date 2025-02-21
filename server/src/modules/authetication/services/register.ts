import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import bcrypt from 'bcrypt';
import moment from 'moment/moment';
import Models from '../../../database/models';

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
        let roleTitle = body.role || 'student';
        let roleRecord = await models.UserRolesModel.findOne({
            where: { title: roleTitle },
        });

        if (!roleRecord) {
            // Assign the next available role serial
            let nextSerial =
                ((await models.UserRolesModel.max('serial')) as number) || 0;
            nextSerial++;

            roleRecord = await models.UserRolesModel.create({
                title: roleTitle,
                serial: nextSerial,
            });
        }

        let roleSerial = roleRecord.serial;

        // Handle profile image upload
        let image_path = 'avatar.png';
        if (body['photo']?.ext) {
            image_path =
                'uploads/users/' +
                moment().format('YYYYMMDDHHmmss') +
                body['photo'].name;
            await (fastify_instance as any).upload(body['photo'], image_path);
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
