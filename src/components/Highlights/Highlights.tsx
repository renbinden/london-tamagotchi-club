import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

const features = [
  {
    image: "/tama/Chodracotchi_paradise.png",
    backgroundColor: "#ef9ec0",
    title: "Share",
    description: "Show off your Tamagotchi collection",
  },
  {
    image: "/tama/Mermarintchi_paradise.png",
    backgroundColor: "#a0d9e6",
    title: "Connect",
    description: "Trade virtual items or breed Tamas",
  },
  {
    image: "/tama/Yayacorntchi_paradise.png",
    backgroundColor: "#c6aed1",
    title: "Craft",
    description: "Get creative and make something new",
  },
];

export const Highlights: React.FC = () => {
  return (
    <Box
      sx={{
        padding: { xs: "0px 0px 10px 0px", md: "130px 0px 0px 0px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={{ xs: "center", sm: "center" }}
          alignItems="center"
          spacing={4}
        >
          {features.map((feature, i) => (
            <Grid
              key={i}
              size={{
                sm: 6,
                md: 4,
              }}
            >
              <Box
                sx={{
                  background: "transparent",
                  boxShadow: "none",
                  height: "100%",
                  paddingTop: { xs: "70px", md: "100px" },
                }}
              >
                <Image
                  src={feature.image}
                  alt="icon"
                  height={95}
                  width={93}
                  style={{
                    display: "block",
                    margin: "0px auto",
                    backgroundColor: "transparent",
                    filter: `drop-shadow(0px 0px 40px ${feature.backgroundColor})`,
                  }}
                />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#fff",
                    margin: "31px auto 12px auto",
                    maxWidth: "262px",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "25px",
                    color: "#fff",
                    opacity: 0.6,
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "400",
                    maxWidth: "292px",
                    margin: "auto",
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
