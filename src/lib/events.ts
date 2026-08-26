import { ZonedDateTime, ZoneId } from "@js-joda/core";
import { sql } from "@/lib/db";

export type Event = {
  description: string;
  date: ZonedDateTime;
  eventbrite?: string;
  map?: string;
};

export async function getEvents(): Promise<Event[]> {
  const rows = await sql`
    SELECT description, date, eventbrite, map
    FROM events
    ORDER BY date DESC
  `;

  return rows.map((row) => ({
    description: row.description,
    date: ZonedDateTime.parse(
      (row.date as Date).toISOString(),
    ).withZoneSameInstant(ZoneId.UTC),
    ...(row.eventbrite && { eventbrite: row.eventbrite }),
    ...(row.map && { map: row.map }),
  }));
}
