import axios from 'axios'
import 'server-only'
import { query } from '../lib/db';

export async function getFaqs() {
    let faq_query = `
        SELECT 
            f.id AS faq_id,
            f.event_id,
            f.title,
            f.description
        FROM event_faqs f
        ORDER BY f.event_id DESC;
    `;

    const faqs= (await query(faq_query)) as any;
    return faqs;
}
