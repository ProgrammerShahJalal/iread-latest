import axios from 'axios'
import 'server-only'
import { query } from '../lib/db';
 
export async function getBlogs() {
//   const res = await axios.get('http://127.0.0.1:5001/api/v1/blogs?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10')
 
//   return res.data;
let blog_query = `
   SELECT 
        b.id AS blog_id,
        b.title,
        b.short_description,
        b.publish_date,
        b.cover_image,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', c.id,
                'title', c.title
            )
        ) AS categories
    FROM blogs b
    LEFT JOIN blog_category_blog bc ON b.id = bc.blog_id
    LEFT JOIN blog_categories c ON bc.blog_category_id = c.id
    WHERE b.is_published = 'publish'
    GROUP BY b.id
    ORDER BY b.publish_date DESC;

`;

const blogs = (await query(blog_query)) as any;
return blogs;

}