import React from "react";
import Link from "next/link";
import { getOrganizerResponse } from "@/services/interface/event";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "lucide-react";

const Footer = ({ organizers }: { organizers: getOrganizerResponse[] }) => {
  return (
    <div className="mt-10 w-full border-t border-gray-200 bg-sky-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-900 md:border-none md:pb-0">
              Top Organizers
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{organizers[0]?.name ?? "—"}</li>
              <li>{organizers[1]?.name ?? "—"}</li>
              <li>{organizers[2]?.name ?? "—"}</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-900 md:border-none md:pb-0">
              EventLite
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Delhi, India</li>
              <li>email@example.com</li>
              <li className="">
                Follow us on{" "}
                <span className="mt-2 flex items-center">
                  <span className="size-10 text-blue-600">
                    <a href="https://www.linkedin.com/in/praveen-kumar-847808208/" target="_blank"><LinkedinIcon /></a>
                  </span>{" "}
                  <span className="size-10 text-gray-600">
                    <a href="https://github.com/PraveenBaghelMaurya" target="_blank"><GithubIcon /></a>
                  </span>
                  <span className="size-10 text-pink-600">
                    <a href="https://www.instagram.com/praveen__baghel/" target="_blank"><InstagramIcon /></a>
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-900 md:border-none md:pb-0">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} EventLite. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
