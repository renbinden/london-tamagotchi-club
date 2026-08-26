"use server";

import { sql } from "@/lib/db";

export async function addEvent(formData: FormData) {
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const eventbrite = (formData.get("eventbrite") as string) || null;
  const map = (formData.get("map") as string) || null;

  if (!description || !date) {
    return { error: "Description and date are required." };
  }

  await sql`
    INSERT INTO events (description, date, eventbrite, map)
    VALUES (${description}, ${new Date(date)}, ${eventbrite}, ${map})
  `;

  return { success: true };
}
