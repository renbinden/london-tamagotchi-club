import { ZonedDateTime, ZoneId } from "@js-joda/core";

type Event = {
  description: string;
  date: ZonedDateTime;
  eventbrite?: string;
  map?: string;
};

export const events: Event[] = [
  {
    description: "August Pride Meetup",
    date: ZonedDateTime.of(2025, 8, 2, 14, 0, 0, 0, ZoneId.UTC),
    eventbrite:
      "https://www.eventbrite.co.uk/e/tamagotchi-club-august-pride-meetup-in-london-tickets-1465745035859",
    map: "https://maps.app.goo.gl/ugDUWUp9M9GVPjJSA",
  },
  {
    description: "1 Year Anniversary",
    date: ZonedDateTime.of(2025, 6, 14, 12, 0, 0, 0, ZoneId.UTC),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-meetup-for-our-1-year-anniversary-tickets-1391396988849",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
  {
    description: "Easter Meetup",
    date: ZonedDateTime.of(2025, 4, 19, 12, 0, 0, 0, ZoneId.UTC),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-easter-meetup-registration-1313157632829",
    map: "https://maps.app.goo.gl/HnsEi3vfVERpUhpw7",
  },
  {
    description: "February Meetup",
    date: ZonedDateTime.of(2025, 2, 8, 12, 0, 0, 0, ZoneId.UTC),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-february-meet-up-tickets-1143038883069",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
  {
    description: "Tamagotchi's 28th Birthday",
    date: ZonedDateTime.of(2024, 11, 24, 12, 30, 0, 0, ZoneId.UTC),
    eventbrite:
      "https://www.eventbrite.co.uk/e/london-tamagotchi-club-meet-up-for-tamagotchis-28th-birthday-tickets-1078072216019",
    map: "https://maps.app.goo.gl/KgfnuJvf8r5og6wj6",
  },
];
