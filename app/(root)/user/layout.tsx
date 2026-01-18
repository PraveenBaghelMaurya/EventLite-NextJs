import React from "react";
import UserNavbar from "@/components/Navbar/userNavbar";

const userLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserNavbar />
      {children}
      {/* children ko pass krna zarururi hai kyu ki  
        
        "children ke bina layout ko pata hi nahi chalega ki page ka content kaha dikhana hai" */}
    </>
  );
};

export default userLayout;
