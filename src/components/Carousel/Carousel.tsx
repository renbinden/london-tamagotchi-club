"use client";
import { Box, IconButton } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import { grey } from "@mui/material/colors";

type EnvironmentsCarouselProps = {
  images: { src: string; alt: string }[];
};

export const Carousel: React.FC<EnvironmentsCarouselProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const handlers = useSwipeable({
    onSwipedLeft: (event) => {
      event.event.preventDefault();
      nextImage();
    },
    onSwipedRight: (event) => {
      event.event.preventDefault();
      prevImage();
    },
    trackMouse: true,
  });

  const prevImage = () => {
    setImageIndex((prevIndex) => prevIndex - 1);
  };

  const nextImage = () => {
    setImageIndex((prevIndex) => prevIndex + 1);
  };

  const getImage = useCallback(
    (index: number) => {
      if (index < 0) {
        return getImage(index + images.length);
      }
      return images[index % images.length];
    },
    [images],
  );

  const activeImages = useMemo(() => {
    return Array.from(Array(7).keys()).map((x) => {
      return { ...getImage(imageIndex + x - 3), index: imageIndex + x - 3 };
    });
  }, [imageIndex, getImage]);

  return (
    <Box
      sx={{
        mt: {
          xs: "20px",
          md: "40px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          position: "relative",
          height: {
            xs: "400px",
            md: "600px",
          },
          userSelect: "none",
        }}
        {...handlers}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            width: "calc(50vw - 200px)",
            height: "100%",
            background:
              "linear-gradient(90deg, #2b2a6f 0%, rgba(43, 42, 111, 0.00) 100%)",
            zIndex: 1,
          }}
        >
          <IconButton
            size="large"
            sx={{
              position: "absolute",
              top: "calc(50% - 24px)",
              backgroundColor: "white",
              color: "#2b2a6f",
              "&:hover": {
                backgroundColor: grey[400],
              },
              left: "calc(50vw - 250px)",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            onClick={prevImage}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: `${100 * images.length}%`,
            height: {
              xs: "400px",
              md: "600px",
            },
            transition: "transform 0.5s",
            transform: {
              xs: `translateX(calc(50vw - ${imageIndex * 320}px - 160px))`,
              md: `translateX(calc(50vw - ${imageIndex * 470}px - 235px))`,
            },
          }}
        >
          {activeImages.map((img) => (
            <Box
              key={img.index}
              sx={{
                width: {
                  xs: "300px",
                  md: "450px",
                },
                height: {
                  xs: "400px",
                  md: "600px",
                },
                position: "fixed",
                mx: {
                  xs: "10px",
                  md: "10px",
                },
                transform: {
                  xs: `translateX(${img.index * 320}px)`,
                  md: `translateX(${img.index * 470}px)`,
                },
                border: "8px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill={true}
                sizes="(max-width: 900px) 300px, 450px"
                draggable={false}
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            width: "calc(50vw - 200px)",
            height: "100%",
            background:
              "linear-gradient(270deg, #2b2a6f 0%, rgba(43, 42, 111, 0.00) 100%)",
            zIndex: 1,
          }}
        >
          <IconButton
            size="large"
            sx={{
              position: "absolute",
              top: "calc(50% - 24px)",
              backgroundColor: "white",
              color: "#0E211E",
              "&:hover": {
                backgroundColor: grey[400],
              },
              right: "calc(50vw - 250px)",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            onClick={nextImage}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
