import axios from 'axios'
import 'server-only'
import { query } from '../lib/db';

export async function getUsers() {
    let user_query = `
        SELECT 
            u.id,
            u.uid,
            u.role_serial,
            u.first_name,
            u.last_name,
            u.email,
            u.phone_number,
            u.photo,
            u.slug,
        FROM users u
        WHERE u.is_blocked = '0'
    `;

    const users = (await query(user_query)) as any;
    return users;
}
