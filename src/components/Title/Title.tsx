import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const Title: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
      <Typography variant="h1">London Tamagotchi Club</Typography>
    </Box>
  );
};
