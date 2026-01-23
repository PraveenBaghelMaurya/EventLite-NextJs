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
import { logout } from "@/services/api/authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const userNavbar = () => {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);

useEffect(() => {
  const tokenValue=localStorage.getItem("token");
  setToken(tokenValue);
  if (!tokenValue) {
    router.push("/");
  }
}, []);

  const handleSignOut = () => {
    const response = logout();
    response.then((res) => {
      console.log("response",res);
      if(res.success === true){
        toast.success(res.message);
        router.push("/");
      }
    });
    
  };
  return (
    <>
      <div className="sticky top-0 z-50 mx-2 my-1 flex flex-row items-center justify-between border-2 bg-white">
        {/* section-1 logo */}
        <div className="flex flex-1 items-center gap-2">
          <img
            src="/eventLite_logo.svg"
            alt="eventlite_logo"
            className="h-10 w-auto rounded-xl"
          />
          <span className="racking-tight text-xl font-bold text-sky-400">
            ventLite
          </span>
        </div>

        {/* section-2 navbar */}
        <div className="flex-1">
          <Navbar />
        </div>

        {/* section-3 profile */}
        <div className="mx-2 flex flex-1 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-sky-300 bg-sky-300 px-10 outline-none hover:bg-sky-400">
              Profile
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Booked Shows</DropdownMenuItem>
              {token ? (
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push("/")}>Sign In</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default userNavbar;
