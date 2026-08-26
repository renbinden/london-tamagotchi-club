"use client";

import { Box, Chip } from "@mui/material";
import { ZonedDateTime } from "@js-joda/core";
import "@js-joda/timezone";
import React from "react";

export const PastChip: React.FC<{ date: string }> = ({ date }) => {
  const eventDate = ZonedDateTime.parse(date);
  if (!eventDate.isBefore(ZonedDateTime.now())) {
    return null;
  }
  return (
    <Box sx={{ ml: 2, display: "inline-block" }}>
      <Chip label="Past" color="primary" size="small" />
    </Box>
  );
};
