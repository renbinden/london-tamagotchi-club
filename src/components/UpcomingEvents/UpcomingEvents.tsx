import {
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { DateTimeFormatter, ZoneId } from "@js-joda/core";
import "@js-joda/timezone";
import "@js-joda/locale_en";
import { Locale } from "@js-joda/locale";
import { getEvents } from "@/lib/events";
import MapIcon from "@mui/icons-material/Explore";
import EventIcon from "@mui/icons-material/Event";
import { PastChip } from "@/components/PastChip";

const ALLOWED_URL_DOMAINS = [
  "eventbrite.com",
  "eventbrite.co.uk",
  "maps.app.goo.gl",
  "goo.gl",
  "google.com",
  "google.co.uk",
];

function isValidExternalUrl(url: string | undefined): boolean {
  if (!url) return false;

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

const dateFormat = DateTimeFormatter.ofPattern(
  "EEE dd MMM yyyy HH:mm",
).withLocale(Locale.UK);

export const UpcomingEvents: React.FC = async () => {
  const events = await getEvents();

  return (
    <Container
      maxWidth="md"
      sx={{
        mb: 8,
      }}
    >
      <Paper>
        <List disablePadding>
          {events.map((event, i) => {
            const mapUrl = event.map;
            const eventbriteUrl = event.eventbrite;
            const validMapUrl = isValidExternalUrl(mapUrl) ? mapUrl : null;
            const validEventbriteUrl = isValidExternalUrl(eventbriteUrl)
              ? eventbriteUrl
              : null;

            return (
              <div key={event.description}>
                <ListItem
                  secondaryAction={
                    <>
                      {validMapUrl && (
                        <IconButton
                          aria-label="map"
                          href={validMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapIcon />
                        </IconButton>
                      )}
                      {validEventbriteUrl && (
                        <IconButton
                          aria-label="event"
                          href={validEventbriteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <EventIcon />
                        </IconButton>
                      )}
                      <PastChip date={event.date.toString()} />
                    </>
                  }
                >
                  <ListItemText
                    primary={event.description}
                    secondary={dateFormat.format(
                      event.date.withZoneSameInstant(ZoneId.systemDefault()),
                    )}
                  />
                </ListItem>
                {i !== events.length - 1 && <Divider />}
              </div>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
};
