import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { socials } from "@/lib/socials";

export const TopBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        height: "40px",
        border: "0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        display: {
          xs: "none",
          md: "flex",
        },
        mb: 8,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "32px",
          display: "flex",
          padding: "12px 0",
          justifyContent: "right",
          alignItems: "right",
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
      </Toolbar>
    </AppBar>
  );
};
