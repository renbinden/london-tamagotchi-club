"use client";

import { Box, Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import { socials } from "@/lib/socials";

export const Footer: React.FC = ({}) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#2b2a6f",
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "right",
            alignSelf: "stretch",
            mr: 2,
          }}
        >
          {socials.map((social) => (
            <Box key={social.link}>
              <Button
                component={Link}
                href={social.link}
                sx={{
                  minWidth: "32px",
                  height: "100%",
                  borderRadius: "0px",
                  textDecoration: "none",
                  color: "white",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontSize: "14px",
                }}
              >
                <social.icon sx={{ width: "32px" }} />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
