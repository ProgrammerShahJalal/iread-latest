import "server-only";
import { query } from "../lib/db";

export async function getEventCertificate(eventId: number, userId: number) {
  const event_certificate_query = `
    SELECT 
      event_id,
      user_id,
      scores,
      grade,
      date,
      image
    FROM event_certified_users
    WHERE event_id = ? 
    AND user_id = ?
    AND is_submitted = '1'
    LIMIT 1;
  `;

  const eventCertificate = (await query(event_certificate_query, [
    eventId,
    userId,
  ])) as any;

  return eventCertificate?.[0] || null;
}

