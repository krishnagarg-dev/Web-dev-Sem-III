import React from "react";
import { NavLink } from "react-router-dom";

const Courses = () => {
  return (
    <section className="w-[75%] max-w-[720px] mx-auto py-[8px]">
      <h2 className="m-0 mb-[7px] text-[16px] leading-6 font-normal text-[#222]">
        Select your course:
      </h2>

      <nav className="flex items-center gap-[22px]">
        <NavLink
          to="/offline"
          className="text-[13px] text-blue-700 no-underline hover:underline"
        >
          Offline
        </NavLink>

        <NavLink
          to="/online"
          className="text-[13px] text-blue-700 no-underline hover:underline"
        >
          Online
        </NavLink>
      </nav>
    </section>
  );
};

export default Courses;
