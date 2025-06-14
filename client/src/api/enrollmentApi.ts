import "server-only";
import { query } from "../lib/db";

export async function checkEventEnrollment(event_id: number, user_id: number): Promise<boolean> {
    const enrollmentQuery = `
        SELECT 1
        FROM event_enrollments
        WHERE event_id = ?
        AND user_id = ?
        AND is_paid = 1
        AND status = 'accepted'
        LIMIT 1
    `;
    
    const result = await query(enrollmentQuery, [event_id, user_id]);
    return result.length > 0;
}