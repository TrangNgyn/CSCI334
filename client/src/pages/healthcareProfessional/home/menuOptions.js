import { BiCheckShield } from "react-icons/bi";
import { RiVirusLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiStats } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi"

export const menuOptions = [
  {
    icon: BiCheckShield,
    title: "My Certificates",
    route: "/hea/certs",
  },
  {
    icon: RiVirusLine,
    title: "Hotspot Map",
    route: "/hea/hotspot",
  },
  {
    icon: FiMapPin,
    title: "Rollout Map",
    route: "/hea/rollout",
  },
  {
    icon: BiStats,
    title: "Statistics",
    route: "/hea/stats",
  },
  {
    icon: GiHealthNormal,
    title: "Health Tools",
    route: "/hea/finduser",
  },
];
