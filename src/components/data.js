import { MdSpaceDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";

export const saidbarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "/",
  },
  {
    id: 2,
    title: "Tasks",
    icon: <FaTasks />,
    link: "/homework",
  },
  {
    id: 3,
    title: "VAB history",
    icon: <MdWorkHistory />,
    link: "/history",
  },
  {
    id: 4,
    title: "Auktsion",
    icon: <RiAuctionFill />,
    link: "/auktsion",
  },
  {
    id: 5,
    title: "Requirements",
    icon: <MdOndemandVideo />,
    link: "/requirements",
  },
  {
    id: 6,
    title: "Checklist",
    icon: <FaCalendarCheck />,
    link: "/checklist",
  },
  {
    id: 7,
    title: "News",
    icon: <FaNewspaper />,
    link: "/news",
  },
];
