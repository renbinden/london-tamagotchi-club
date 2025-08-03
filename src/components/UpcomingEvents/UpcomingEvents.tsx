import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { DateTimeFormatter, ZonedDateTime, ZoneId } from "@js-joda/core";
import "@js-joda/timezone";
import { Locale } from "@js-joda/locale_en";
import { events } from "@/lib/events";
import MapIcon from "@mui/icons-material/Explore";
import EventIcon from "@mui/icons-material/Event";

const dateFormat = DateTimeFormatter.ofPattern(
  "EEE dd MMM yyyy HH:mm",
).withLocale(Locale.UK);

export const UpcomingEvents: React.FC = () => {
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
            return (
              <div key={event.description}>
                <ListItem
                  secondaryAction={
                    <>
                      {event.map && (
                        <IconButton
                          aria-label="map"
                          href={event.map}
                          target="_blank"
                        >
                          <MapIcon />
                        </IconButton>
                      )}
                      {event.eventbrite && (
                        <IconButton
                          aria-label="event"
                          href={event.eventbrite}
                          target="_blank"
                        >
                          <EventIcon />
                        </IconButton>
                      )}
                      {event.date.isBefore(ZonedDateTime.now()) && (
                        <Box sx={{ ml: 2, display: "inline-block" }}>
                          <Chip label="Past" color="primary" size="small" />
                        </Box>
                      )}
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
