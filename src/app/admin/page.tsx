"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterJsJoda } from "@/lib/AdapterJsJoda";
import "@js-joda/locale_en-gb";
import { Locale } from "@js-joda/locale";
import {
  LocalDate,
  LocalDateTime,
  LocalTime,
  ZoneId,
  ZonedDateTime,
} from "@js-joda/core";
import type { PickerValidDate } from "@mui/x-date-pickers/models";
import { addEvent } from "@/lib/actions";

const AdminPage: React.FC = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<PickerValidDate | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    if (date) {
      let localDateTime;
      if (date instanceof ZonedDateTime) {
        localDateTime = date;
      } else if (date instanceof LocalDate) {
        localDateTime = ZonedDateTime.of(
          LocalDateTime.of(date, LocalTime.MIDNIGHT),
          ZoneId.SYSTEM,
        );
      } else {
        localDateTime = ZonedDateTime.of(date, ZoneId.SYSTEM);
      }
      formData.set(
        "date",
        localDateTime.withZoneSameInstant(ZoneId.UTC).toInstant().toString(),
      );
    }
    const result = await addEvent(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Event created successfully." });
      form.reset();
      setDate(null);
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Create Event
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="Event Description"
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <LocalizationProvider
            dateAdapter={AdapterJsJoda}
            adapterLocale={Locale.UK}
          >
            <DateTimePicker
              label="Date & Time"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              sx={{ mb: 3, width: "100%" }}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </LocalizationProvider>
          <TextField
            name="eventbrite"
            label="Eventbrite URL (optional)"
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            name="map"
            label="Map URL (optional)"
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminPage;
