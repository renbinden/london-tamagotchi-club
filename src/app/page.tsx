import React from "react";
import { Carousel } from "@/components/Carousel";
import { Blurb } from "@/components/Blurb";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Typography } from "@mui/material";
import { Highlights } from "@/components/Highlights";
import { HeroUnit } from "@/components/HeroUnit";

const Home: React.FC = () => {
  return (
    <>
      <HeroUnit />
      <Blurb
        header="Meet other Tamagotchi fans"
        text="Discuss, connect and create with like-minded people from across the UK"
      />
      <Carousel
        images={[
          {
            src: "/carousel/1.jpg",
            alt: "A group of people in a circle holding Tamagotchis",
          },
          {
            src: "/carousel/2.jpeg",
            alt: "A London Tamagotchi Club membership card",
          },
          {
            src: "/carousel/3.jpg",
            alt: "Several people connecting Tamagotchi Paradise devices",
          },
          {
            src: "/carousel/4.jpg",
            alt: "A table with many different Tamagotchis",
          },
          {
            src: "/carousel/5.jpg",
            alt: "People showing off many different Tamagotchis",
          },
          {
            src: "/carousel/6.jpg",
            alt: "Someone wearing a Tamagotchi Club London T-shirt with a Tamagotchi around their neck",
          },
          {
            src: "/carousel/7.jpg",
            alt: "Two Tamagotchi keyrings",
          },
          {
            src: "/carousel/8.jpg",
            alt: "Two people smiling while wearing various pieces of Tamagotchi merchandise",
          },
          {
            src: "/carousel/9.jpg",
            alt: "A Tamagotchi Club London stamp card",
          },
          {
            src: "/carousel/10.png",
            alt: "Many people in a circle holding Tamagotchis",
          },
          {
            src: "/carousel/11.jpg",
            alt: "Various different Tamagotchi devices",
          },
        ]}
      />
      <Highlights />
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
