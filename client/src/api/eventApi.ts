import "server-only";
import { query } from "../lib/db";

// Common SQL query parts
const eventBaseQuery = `
    SELECT 
        e.id AS event_id,
        e.title,
        e.reg_start_date,
        e.reg_end_date,
        e.session_start_date_time,
        e.session_end_date_time,
        e.place,
        e.short_description,
        e.full_description,
        e.pre_requisities,
        e.terms_and_conditions,
        e.event_type,
        e.poster,
        e.price,
        e.discount_price,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', category.id, 'title', category.title)
            )
            FROM (
                SELECT DISTINCT c.id, c.title 
                FROM event_category_event ec
                JOIN event_categories c ON ec.event_category_id = c.id
                WHERE ec.event_id = e.id
            ) AS category
        ) AS categories,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', tag.id, 'title', tag.title)
            )
            FROM (
                SELECT DISTINCT t.id, t.title 
                FROM event_tag_event et
                JOIN event_tags t ON et.event_tag_id = t.id
                WHERE et.event_id = e.id
            ) AS tag
        ) AS tags
    FROM events e
`;

const orderByClause = `ORDER BY e.reg_start_date DESC`;

export async function getEvents() {
    const event_query = `${eventBaseQuery} ${orderByClause}`;
    const events = (await query(event_query)) as any;
    return events;
}

export async function getEventById(event_id: number) {
    const event_query = `${eventBaseQuery} WHERE e.id = ?`;
    const events = (await query(event_query, [event_id])) as any;
    return events.length > 0 ? events[0] : null;
}

export async function getMyEvents(user_id: number) {
    const myEventsQuery = `
        ${eventBaseQuery}
        JOIN event_enrollments ee ON e.id = ee.event_id
        WHERE ee.user_id = ? AND ee.status = 'accepted'
        AND NOT EXISTS (
            SELECT 1 FROM event_payment_refunds epr
            WHERE epr.event_id = e.id
            AND epr.user_id = ee.user_id
            AND epr.status = 'success'
        )
        ${orderByClause}
    `;

    const myEvents = (await query(myEventsQuery, [user_id])) as any;
    return myEvents;
}