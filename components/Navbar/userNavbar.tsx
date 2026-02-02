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
    const tokenValue = localStorage.getItem("token");
    setToken(tokenValue);
    if (!tokenValue) {
      router.push("/");
    }
  }, []);

  const handleSignOut = () => {
    const response = logout();
    response.then((res) => {
      console.log("response", res);
      if (res.success === true) {
        toast.success(res.message);
        router.push("/");
      }
    });
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* section-1 logo */}
          <Link href="/user" className="mr-8 flex items-center gap-2 lg:mr-6">
            <img
              src="/eventLite_logo.svg"
              alt="eventlite_logo"
              className="h-8 w-auto rounded-lg sm:h-10"
            />
            <span className="hidden text-xl font-bold tracking-tight text-sky-400 sm:inline-block">
              EventLite
            </span>
            <span className="text-xl font-bold tracking-tight text-sky-400 sm:hidden">
              EL
            </span>
          </Link>

          {/* section-2 navbar */}
          <div className="flex flex-1 items-center justify-center">
            <Navbar />
          </div>

          {/* section-3 profile */}
          <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-sky-300 bg-sky-300 hover:bg-sky-400 hover:text-white"
                >
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Booked Shows</DropdownMenuItem>
                {token ? (
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default userNavbar;
