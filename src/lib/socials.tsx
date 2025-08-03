import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export const socials = [
  {
    link: "https://www.instagram.com/londontamagotchiclub/",
    icon: InstagramIcon,
  },
  {
    link: "https://www.facebook.com/groups/1149463169432051/",
    icon: FacebookIcon,
  },
  {
    link: "https://discord.gg/ggfHNYU9Vn",
    icon: () => (
      <Image
        src="/logos/discord.svg"
        alt="Discord icon"
        width={32}
        height={32}
      />
    ),
  },
];
