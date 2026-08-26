"use server";

import { sql } from "@/lib/db";

const MAX_DESCRIPTION_LENGTH = 500;
const ALLOWED_URL_DOMAINS = [
  "eventbrite.com",
  "eventbrite.co.uk",
  "maps.app.goo.gl",
  "goo.gl",
  "google.com",
  "google.co.uk",
];

function isValidUrl(url: string | null): boolean {
  if (!url) return true;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;

    return ALLOWED_URL_DOMAINS.some(
      (domain) =>
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function addEvent(formData: FormData) {
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const eventbrite = (formData.get("eventbrite") as string) || null;
  const map = (formData.get("map") as string) || null;

  if (!description || !date) {
    return { error: "Description and date are required." };
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`,
    };
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return { error: "Invalid date format." };
  }

  if (parsedDate < new Date()) {
    return { error: "Event date must be in the future." };
  }

  if (!isValidUrl(eventbrite)) {
    return { error: "Invalid Eventbrite URL. Must be a valid HTTPS URL." };
  }

  if (!isValidUrl(map)) {
    return { error: "Invalid map URL. Must be a valid HTTPS URL." };
  }

  const sanitizedDescription = sanitizeInput(description);
  const sanitizedEventbrite = eventbrite ? sanitizeInput(eventbrite) : null;
  const sanitizedMap = map ? sanitizeInput(map) : null;

  await sql`
    INSERT INTO events (description, date, eventbrite, map)
    VALUES (${sanitizedDescription}, ${parsedDate}, ${sanitizedEventbrite}, ${sanitizedMap})
  `;

  return { success: true };
}
