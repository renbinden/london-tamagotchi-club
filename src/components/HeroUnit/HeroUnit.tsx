import React from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export const HeroUnit: React.FC = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: {
            xs: "769px",
            md: "900px",
          },
          background:
            'linear-gradient(180deg, rgba(45, 45, 117, 0.40) 0%, #2d2d75 100%), url("/hero/noise.png"), url("/hero/hero.png") no-repeat 50% 0/cover, lightgray no-repeat 0 0/cover',
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: {
            xs: "769px",
            md: "900px",
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              pt: {
                xs: 0,
                md: "36px",
              },
            }}
          >
            <Image src="/logo.png" alt="Logo" width={200} height={200} />
          </Box>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "40px",
                md: "64px",
              },
            }}
          >
            London Tamagotchi Club
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography
            sx={{
              textAlign: "center",
              pt: "42px",
            }}
          >
            The London Tamagotchi Club was started in June 2024 as a place where
            Tamagotchi fans & collectors can gather and connect their beloved
            tamas & virtual pets!
            <br />
            <br />
            Many other tamagotchi clubs have been created around the world and
            host regular meet-ups, including us! Collectors come from all over
            the UK to make new friends & share in their love for this beloved
            90s toy!
            <br />
            <br />
            To hear about when our meet-ups are, Instagram and Discord are
            regularly updated with meetup news!
            <br />
            <br />
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              mt: {
                xs: "38px",
                md: "50px",
              },
              display: "flex",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <IconButton
              aria-label="discord"
              href="https://discord.gg/ggfHNYU9Vn"
              size="large"
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "#5865f2",
                color: "white",
              }}
            >
              <Image
                src="/logos/discord.svg"
                alt="Discord icon"
                width={32}
                height={32}
              />
            </IconButton>
            <IconButton
              aria-label="instagram"
              href="https://www.instagram.com/londontamagotchiclub/"
              size="large"
              sx={{
                width: 64,
                height: 64,
                background:
                  "linear-gradient(315deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  backgroundBlendMode: "overlay",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="facebook"
              href="https://www.facebook.com/groups/1149463169432051/"
              size="large"
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "#1877f2",
                color: "white",
              }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
