import axios from "axios";
import "server-only";
import { query } from "../lib/db";

export async function getEventPayments(eventId: number, userId: number) {
  let event_payments_query = `
        SELECT 
            ep.id AS payment_id,
            ep.event_id,
            ep.user_id,
            ep.event_enrollment_id,
            ep.date,
            ep.amount,
            ep.trx_id,
            ep.media,
            ep.is_refunded,
            ep.status
        FROM event_payments ep
        WHERE ep.event_id = ? 
        AND ep.user_id = ?
        ORDER BY payment_id DESC;
    `;

  const eventPayments = (await query(event_payments_query, [
    eventId,
    userId,
  ])) as any;
  return eventPayments;
}
