import {
  send,
  shield,
  star,
} from "../assets";

import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  }
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Get the best",
    content:
      "Our agent curates the data related to stock and gives you best possible insights.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Fully unbiased",
    content:
      "We ensure that all the analysis our agent gives you is totally unbiased and unopinionated.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Export it",
    content:
      "Export your analysis in the form of a document so that you can share and review it anytime.",
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Comapnies",
    value: "4500+",
  },
  {
    id: "stats-2",
    title: "Users",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Analysis",
    value: "100+",
  },
];

export const socialMedia = [
  {
    id: "social-media-3",
    icon: faXTwitter,
    link: "https://x.com/MiyaniDishant",
  },
  {
    id: "social-media-4",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/dishantmiyani/",
  },
  {
    id: "social-media-5",
    icon : faGithub,
    link : "https://github.com/Dishant1804",
  }
];