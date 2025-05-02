import axios from "axios";
import "server-only";
import { query } from "../lib/db";

export async function getEventPaymentRefunds(eventId: number, userId: number) {
  let event_payment_refunds_query = `
        SELECT 
            epr.id AS refund_id,
            epr.event_id,
            epr.user_id,
            epr.event_enrollment_id,
            epr.event_payment_id,
            epr.date,
            epr.amount,
            epr.trx_id,
            epr.media,
            epr.status
        FROM event_payment_refunds epr
        WHERE epr.event_id = ? 
        AND epr.user_id = ?
        ORDER BY epr.id DESC;
    `;

  const eventPaymentRefunds = (await query(event_payment_refunds_query, [
    eventId,
    userId,
  ])) as any;
  return eventPaymentRefunds;
}
