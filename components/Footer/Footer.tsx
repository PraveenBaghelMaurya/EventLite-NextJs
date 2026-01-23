import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full overflow-x-auto mt-10">
      <table className="w-full border-2 border-gray-200 bg-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="text-left px-4 md:px-12 py-5">Top Organizers</th>
            <th className="text-left px-4 md:px-12 py-5">EventLite</th>
            <th className="text-left px-4 md:px-12 py-5">Services</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="px-4 md:px-12">Praveen</td>
            <td className="px-4 md:px-12">Delhi, India</td>
            <td className="px-4 md:px-12">
              <Link href="/about">About</Link>
            </td>
          </tr>

          <tr>
            <td className="px-4 md:px-12">Baghel</td>
            <td className="px-4 md:px-12">email@example.com</td>
            <td className="px-4 md:px-12">
              <Link href="/contact">Contact Us</Link>
            </td>
          </tr>

          <tr>
            <td className="px-4 md:px-12 pb-5">Maurya</td>
            <td className="px-4 md:px-12 pb-5">Follow us</td>
            <td className="px-4 md:px-12 pb-5">
              <Link href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Footer;
