import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  //   RxAccessibility,
} from "react-icons/rx";

import sliderimg1 from "../assets/sliderimg1.jpg";
import sliderimg2 from "../assets/sliderimg2.jpg";
import sliderimg3 from "../assets/sliderimg3.jpg";
import sliderimg4 from "../assets/sliderimg4.jpg";
import sliderimg5 from "../assets/sliderimg5.jpg";

export const ServicesData = [
  {
    icon: RxCrop,
    title: "Road Repair",
    desc: "Quickly report damaged roads, potholes, and broken streets to ensure safer and smoother transportation in your city.",
    backgroundImage: sliderimg1,
  },
  {
    icon: RxDesktop,
    title: "Street Light Repair",
    desc: "Report broken or non-working street lights to help keep roads bright, secure, and safe during nighttime.",
    backgroundImage: sliderimg2,
  },
  {
    icon: RxPencil2,
    title: "Water Leakage",
    desc: "Easily notify city authorities about leaking pipelines and water issues to prevent water waste and road damage.",
    backgroundImage: sliderimg3,
  },
  {
    icon: RxReader,
    title: "Garbage Cleaning",
    desc: "Help maintain a clean environment by reporting unmanaged waste, garbage overflow, and dirty public areas.",
    backgroundImage: sliderimg4,
  },
  {
    icon: RxRocket,
    title: "Emergency Support",
    desc: "Get fast municipal assistance for urgent city problems and public safety issues through the CityFix platform.",
    backgroundImage: sliderimg5,
  },
];
