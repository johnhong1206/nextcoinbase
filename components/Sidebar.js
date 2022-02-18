import React, { useState } from "react";
import { navItems } from "../static/navItems";

function Sidebar() {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title);
  return (
    <div className="h-screen  hidden lg:flex flex-col flex-[0.2] border-r border-gray-500">
      <div className="px-4 py-8">
        <h1 className="text-2xl text-blue-600 uppercase">CoinBase</h1>
      </div>
      <div>
        {navItems.map((navitem, index) => (
          <div
            key={index}
            onClick={() => setActiveIcon(navitem.title)}
            className={`flex items-center space-x-2 px-1 py-2 cursor-pointer hover:text-blue-400 ${
              navitem.title === activeIcon && "text-blue-400"
            }`}
          >
            <div className="">{navitem.icon}</div>
            <div>{navitem.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
