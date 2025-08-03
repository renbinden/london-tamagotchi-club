import { Container, Typography } from "@mui/material";
import React from "react";

type BlurbProps = {
  header: string;
  text: string;
};

export const Blurb: React.FC<BlurbProps> = ({ header, text }) => (
  <Container maxWidth="md">
    <Typography
      variant="h2"
      sx={{
        textAlign: "center",
        fontSize: {
          xs: "30px",
          md: "48px",
        },
        pt: {
          xs: "82px",
          md: "74px",
        },
      }}
    >
      {header}
    </Typography>
    <Typography
      sx={{
        maxWidth: "465px",
        textAlign: "center",
        fontSize: "16px",
        color: "#FFFFFF",
        opacity: "0.6",
        pt: "12px",
        mx: "auto",
      }}
    >
      {text}
    </Typography>
  </Container>
);
