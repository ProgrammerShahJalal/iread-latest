import axios from 'axios'
import 'server-only'
import { query } from '../lib/db';

export async function getBlogs() {
    let blog_query = `
        SELECT 
            b.id AS blog_id,
            b.title,
            b.author_id,
            b.short_description,
            b.full_description,
            b.publish_date,
            b.cover_image,
            b.slug,
            b.seo_title,
            b.seo_keyword,
            b.seo_description,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT('id', category.id, 'title', category.title)
                )
                FROM (
                    SELECT DISTINCT c.id, c.title 
                    FROM blog_category_blog bc
                    JOIN blog_categories c ON bc.blog_category_id = c.id
                    WHERE bc.blog_id = b.id
                ) AS category
            ) AS categories,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT('id', tag.id, 'title', tag.title)
                )
                FROM (
                    SELECT DISTINCT t.id, t.title 
                    FROM blog_tag_blog bt
                    JOIN blog_tags t ON bt.blog_tag_id = t.id
                    WHERE bt.blog_id = b.id
                ) AS tag
            ) AS tags
        FROM blogs b
        WHERE b.is_published = 'publish'
        ORDER BY b.publish_date DESC;
    `;

    const blogs = (await query(blog_query)) as any;
    return blogs;
}
