"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/customUI/Navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const userNavbar = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between mx-2 my-1 border-2 sticky top-0 z-50 bg-white">
        
        {/* section-1 logo */}
        <div className="flex-1 flex items-center gap-2 ">
          <img
            src="/eventLite_logo.svg"
            alt="eventlite_logo"
            className="h-10 w-auto rounded-xl"
          />
          <span className="font-bold text-xl racking-tight text-sky-400">
            ventLite
          </span>
        </div>

        {/* section-2 navbar */}
        <div className="flex-1">
          <Navbar />
        </div>

        {/* section-3 profile */}
        <div className="flex-1 flex justify-end mx-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center h-11 w-11 rounded-lg bg-sky-300 hover:bg-sky-400 outline-none border-2 border-sky-300 px-10">
              Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Booked Shows</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </>
  );
};

export default userNavbar;
