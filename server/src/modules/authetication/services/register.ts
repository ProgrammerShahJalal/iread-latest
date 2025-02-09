import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import bcrypt from 'bcrypt';

async function generateUniqueSlug(models: any, firstName: string, lastName: string): Promise<string> {
    let baseSlug = `${firstName}-${lastName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens

    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for existing slugs and make unique if necessary
    while (await models.User.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}

async function register(fastify_instance: FastifyInstance, req: FastifyRequest): Promise<responseObject> {
    let models = await db();
    let body = req.body as { [key: string]: any };

    // Check if user already exists
    let existingUser = await models.User.findOne({ where: { email: body.email } });

    if (existingUser) {
        return response(409, 'User already exists', {});
    }

    try {
        // Hash the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Generate a unique slug
        const slug = await generateUniqueSlug(models, body.first_name, body.last_name);

        // Create a new user record
        let newUser = await models.User.create({
            uid: body.uid,
            role_serial: body.role_serial,
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone_number: body.phone_number,
            photo: body.photo,
            password: hashedPassword, 
            slug: slug, // Assign the generated slug
            token: body.token,
        });

        return response(200, 'User registered successfully', newUser);
    } catch (error) {
        return response(500, 'Error registering user', { error });
    }
}

export default register;
