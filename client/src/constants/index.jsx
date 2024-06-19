import { ShoppingBag } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { ClipboardPlus } from 'lucide-react';
import { GlobeLock } from "lucide-react";

// Image of the person in testimonials

import SunnyPhoto from "../assets/Sunny.jpg"
import DarshanPhoto from "../assets/Darshan.jpg"
import NitinPhoto from "../assets/Nitin.jpg"


import item1 from "../assets/OurStoreSectionItem1.jpg";

import item2 from "../assets/OurStoreSectionItem2.jpg";

import item3 from "../assets/OurStoreSectionItem3.jpg";

export const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Learn", href: "#" },
];

export const testimonials = [
  {
    user: "Sunny",
    About: "Busy",
    image: SunnyPhoto,
    text: "Bird Guardian's dedication to bird conservation is impressive. Their resources deepen my understanding, and their swift response to injured birds reassures me. Grateful for their invaluable work!",
  },
  {
    user: "Nitin",
    About: "Happy",
    image: NitinPhoto,
    text: "Bird Guardian's eCommerce section offers quality products that support bird welfare. Combining commerce with compassion is inspiring. Proud to support their mission!",
  },
  {
    user: "Darshan",
    About: "Innovations",
    image: DarshanPhoto,
    text: "Bird Guardian provides a platform to make a difference in bird welfare. Engaging in community discussions, I feel part of a larger movement. Grateful for the opportunity to be involved!",
  },
  
];

export const features = [
  {
    icon: <ShoppingBag />,
    text: "Shop for a Cause",
    description:
      "Buy bird products that support their well-being, not captivity. Our curated selection includes cozy nest boxes, premium bird feed, and more. Plus, 50% of our earnings go directly towards bird conservation efforts.",
  },
  {
    icon: <GraduationCap  />,
    text: "Advocate for Birds in Need",
    description:
      " Post about birds that require medical attention or shelter. Our team and partners will respond swiftly to provide necessary assistance, ensuring these avian friends get the care they deserve.",
  },
  {
    icon: <ShieldHalf />,
    text: "Dive into the World of Birds",
    description:
      "Explore our extensive resources on bird behavior, habitats, and conservation. Whether you're a beginner or a seasoned bird enthusiast, discover valuable insights to deepen your appreciation and understanding of our feathered companions.",
  },
  {
    icon: < ClipboardPlus />,
    text: "Report Sightings",
    description:
      " Report sightings of endangered, unhealthy, or injured birds through our platform. Your observations help us track bird populations and take immediate action to protect vulnerable species.",
  },
  {
    icon: <Fingerprint  />,
    text: " Why Trust Bird Guardian?",
    description:
      "We provide comprehensive support for birds by taking direct action ourselves and working closely with government authorities to ensure accountability and effective intervention. ",
  },
  {
    icon: <GlobeLock />,
    text: " Join Our Bird-Loving Community",
    description:
      "Connect with like-minded individuals who share your passion for birds. Participate in discussions, share your bird-watching experiences, and collaborate on conservation initiatives to make a meaningful impact.",
  },
];

export const checklistItems = [
  {
    title: "Sightings Reporting Made Easy",
    description:
      "Track and report sightings of endangered, unhealthy, or injured birds with ease.",
  },
  {
    title: "Review Conservation Data without Worry",
    description:
      "Access comprehensive insights and reports on bird behavior, habitats, and conservation efforts.",
  },
  {
    title: "Share Your Contributions in Minutes",
    description:
      "Easily share your reports and contributions with our community and partner organizations.",
  },
  {
    title: "Shop for Birds, Save Habitats",
    description:
      "Your purchases directly contribute to bird conservation efforts, funding crucial habitat preservation and protection initiatives.",
  },
];

export const StoreItems = [
  {
   img1 : item1
  },
  {
    img2 : item2
  },
  {
    img3 : item3
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" }
];

export const platformLinks = [
  { href: "#", text: "OurStore" },
  { href: "#", text: "Bird-Gurdain" },
  { href: "#", text: "About Us" },
  { href: "#", text: "Contact US" },
];

export const SocialMediaLink = [
  { href: "#", text: "WhatsApp" },
  { href: "#", text: "Instagram" },
  { href: "#", text: "LinkedIn" }
];
