"use client";
import React from "react";
import { Linkedin, Github } from "lucide-react";
const ContactPage = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center gap-2">
        <div className="max-w-4xl rounded-lg bg-white p-14 shadow-lg">
          <h1 className="mb-3 text-center text-2xl font-bold">Contact Us</h1>
          <div className="flex flex-col gap-2">
            <p className="text-lg">Address : New Delhi, India</p>
            <p className="text-lg">Phone : +91 9958545704</p>
            <p className="text-lg">Email : praveenbaghelmaurya@gmail.com</p>
            <p className="flex gap-2 text-lg">
              Follow us on :
              <a
                href="https://www.linkedin.com/in/praveen-kumar-847808208/"
                target="_blank"
              >
                <Linkedin />
              </a>
              <a href="https://github.com/PraveenBaghelMaurya" target="_blank">
                <Github />
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
