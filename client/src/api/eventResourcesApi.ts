import axios from "axios";
import "server-only";
import { query } from "../lib/db";

export async function getEventResources(eventId: number) {
  let event_resources_query = `
        SELECT 
            er.id AS resource_id,
            er.title,
            er.url
        FROM event_resources er
        WHERE er.event_id = ?
        ORDER BY er.id DESC;
    `;

  const eventResources = (await query(event_resources_query, [eventId])) as any;
  return eventResources;
}
