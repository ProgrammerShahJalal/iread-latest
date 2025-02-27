import 'server-only';
import { query } from '../lib/db';

interface BlogComment {
    comment_id: number;
    user_id: number;
    blog_id: number;
    comment: string;
    first_name: string;
    last_name: string;
    user_photo: string;
}

export async function getBlogComments(blog_id: number): Promise<BlogComment[]> {
    const comment_query = `
        SELECT 
            bc.id AS comment_id,
            bc.user_id,
            bc.blog_id,
            bc.comment,
            u.first_name,
            u.last_name,
            u.photo AS user_photo
        FROM blog_comments bc
        JOIN users u ON bc.user_id = u.id
        WHERE bc.blog_id = ?
        ORDER BY bc.id DESC;
    `;

    return await query<BlogComment>(comment_query, [blog_id]); 
}
