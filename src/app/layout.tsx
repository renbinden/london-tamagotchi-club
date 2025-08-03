import type { Metadata } from "next";
import React from "react";
import { ThemeRegistry } from "@/lib/themeRegistry";
import { Box, Container } from "@mui/material";
import { Title } from "@/components/Title";

export const metadata: Metadata = {
  title: "London Tamagotchi Meet",
  description: "Meet up with other Tamagotchi enthusiasts in London!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url("/bg.jpg")`,
              backgroundRepeat: "repeat-y",
              backgroundSize: "cover",
              overflow: "auto",
            }}
          >
            <Title />
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
