import {
  AiOutlinePieChart,
  AiOutlinePlusCircle,
  AiOutlineGift,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { RiCoinsLine, RiNotification3Line } from "react-icons/ri";
import { MdWeb } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";

export const navItems = [
  {
    title: "Assets",
    icon: <AiOutlinePieChart className="w-8 h-8" />,
  },
  {
    title: "Trade",
    icon: <BiTrendingUp className="w-8 h-8" />,
  },
  {
    title: "Pay",
    icon: <RiCoinsLine className="w-8 h-8" />,
  },
  {
    title: "For You",
    icon: <MdWeb className="w-8 h-8" />,
  },
  {
    title: "Learn and earn",
    icon: <AiOutlinePlusCircle className="w-8 h-8" />,
  },
  {
    title: "Notifications",
    icon: <RiNotification3Line className="w-8 h-8" />,
  },
  {
    title: "Invite Friends",
    icon: <BsPersonPlus className="w-8 h-8" />,
  },
  {
    title: "Send a gift",
    icon: <AiOutlineGift className="w-8 h-8" />,
  },
];
