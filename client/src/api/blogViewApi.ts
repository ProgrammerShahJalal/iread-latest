import "server-only";
import { query } from "../lib/db";
import { BlogView } from "@/types/blog";

export async function getLatestBlogViewById(blogId: number) {
    const blogViewQuery = `
        SELECT 
            bv.id,
            bv.user_id,
            bv.blog_id,
            DATE_FORMAT(bv.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
            bv.ip,
            bv.total_count
        FROM blog_views bv
        WHERE bv.blog_id = ?
        ORDER BY bv.date DESC
        LIMIT 1
    `;
    
    const blogViews: BlogView[] = await query(blogViewQuery, [blogId]);
    return blogViews.length > 0 ? blogViews[0] : null;
}