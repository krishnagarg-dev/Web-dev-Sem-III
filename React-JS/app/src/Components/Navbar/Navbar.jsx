
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["Home", "/home"],
  ["Courses", "/courses"],
  ["Product", "/product"],
  ["Counter", "/counter"],
  ["Contact", "/contact"],
  ["About", "/about"],
];

const Navbar = ({ search = "", setSearch = () => {} }) => {
  return (
    <nav className="w-[95%] max-w-[1200px] mx-auto min-h-[60px] flex items-center justify-between gap-6 bg-white px-4">

      {/* Logo */}
      <NavLink
        to="/home"
        className="flex items-center gap-3 no-underline shrink-0"
      >
        <svg
          width="32"
          height="28"
          viewBox="0 0 32 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12.5L16 5L27 12.5L16 20L5 12.5Z"
            stroke="#222"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M8 14.5V18L16 23L24 18V14.5"
            stroke="#222"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-[14px] font-normal text-[#333] whitespace-nowrap">
          React JS
        </span>
      </NavLink>

      {/* Search Bar */}
      <div className="flex-1 max-w-[260px]">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-blue-500"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-[18px] whitespace-nowrap">
        {links.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-[12px] font-normal no-underline transition-colors ${
                isActive ? "text-blue-600" : "text-[#333]"
              } hover:text-blue-600`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

    </nav>
  );
};

export default Navbar;