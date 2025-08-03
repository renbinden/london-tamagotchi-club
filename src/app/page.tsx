import React from "react";
import { Carousel } from "@/components/Carousel";
import { Blurb } from "@/components/Blurb";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <>
      <Blurb
        header="Meet other Tamagotchi fans"
        text="Discuss, connect and create with like-minded people from across the UK"
      />
      <Carousel
        images={[
          {
            src: "/carousel/connect.jpg",
            alt: "Outstretched hands holding many Tamagotchis connecting",
          },
          {
            src: "/carousel/discuss.jpg",
            alt: "Many Tamagotchi fans sitting on a picnic mat",
          },
          {
            src: "/carousel/link.jpg",
            alt: "Two tamagotchi fans linking Tamagotchis",
          },
        ]}
      />
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
          mb: 4,
        }}
      >
        Events
      </Typography>
      <UpcomingEvents />
    </>
  );
};

export default Home;
