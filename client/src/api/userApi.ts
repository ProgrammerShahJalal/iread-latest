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

export async function getUserById(id: string | number) {
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
            u.slug
        FROM users u
        WHERE u.is_blocked = '0'
        AND u.id = ?
    `;

    const user = (await query(user_query, [id])) as any;
    return user.length > 0 ? user[0] : null;
}
export async function getUserByUid(uid: string | number) {
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
            u.slug
        FROM users u
        WHERE u.is_blocked = '0'
        AND u.uid = ?
    `;

    const user = (await query(user_query, [uid])) as any;
    return user.length > 0 ? user[0] : null;
}
