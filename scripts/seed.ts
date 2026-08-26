import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

const events = [
  {
    description: "Trinket & Tamagotchi Trade Christmas Meetup",
    date: new Date("2025-12-14T12:00:00Z"),
    eventbrite:
      "https://www.eventbrite.com/e/trinket-tamagotchi-trade-christmas-meetup-tickets-1967606841028",
    map: "https://maps.app.goo.gl/qJumD2Z1XZmsRJd86",
  },
  {
    description: "Halloween Meetup & Fancy Dress",
    date: new Date("2025-10-25T11:00:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/tamagotchi-halloween-meetup-fancy-dress-tickets-1723611872509",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
  {
    description: "August Pride Meetup",
    date: new Date("2025-08-02T14:00:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/tamagotchi-club-august-pride-meetup-in-london-tickets-1465745035859",
    map: "https://maps.app.goo.gl/ugDUWUp9M9GVPjJSA",
  },
  {
    description: "1 Year Anniversary",
    date: new Date("2025-06-14T12:00:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-meetup-for-our-1-year-anniversary-tickets-1391396988849",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
  {
    description: "Easter Meetup",
    date: new Date("2025-04-19T12:00:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-easter-meetup-registration-1313157632829",
    map: "https://maps.app.goo.gl/HnsEi3vfVERpUhpw7",
  },
  {
    description: "February Meetup",
    date: new Date("2025-02-08T12:00:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-february-meet-up-tickets-1143038883069",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
  {
    description: "Tamagotchi's 28th Birthday",
    date: new Date("2024-11-24T12:30:00Z"),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-meet-up-for-tamagotchis-28th-birthday-tickets-1078072216019",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
];

async function main() {
  await sql`CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    eventbrite TEXT,
    map TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;

  await sql`DELETE FROM events`;

  for (const event of events) {
    await sql`
      INSERT INTO events (description, date, eventbrite, map)
      VALUES (${event.description}, ${event.date}, ${event.eventbrite}, ${event.map})
    `;
  }

  console.log(`Seeded ${events.length} events.`);
  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
