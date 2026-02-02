"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Science and Technology",
    href: "/user/science-and-technology",
    description:
      "The latest in science and technology, including AI, robotics, and biotechnology.",
  },
  {
    title: "Entertainment",
    href: "/user/entertainment",
    description:
      "The latest in entertainment, including movies, music, and sports.",
  },
  {
    title: "Business",
    href: "/user/business",
    description:
      " The latest in business, including finance, marketing, and management.",
  },
  {
    title: "Health and Wellness",
    href: "/user/health-and-wellness",
    description:
      "The latest in health and wellness, including fitness, nutrition, and mental health.",
  },
  {
    title: "Travel",
    href: "/user/travel",
    description:
      "The latest in travel, including destinations, transportation, and activities.",
  },
  {
    title: "Education",
    href: "/user/education",
    description:
      "The latest in education, including online courses, learning resources, and career development.",
  },
];

export default function NavigationMenuDemo() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/user" className="bg-white">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-white">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/user/contact" className="bg-white">
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-white">
            Policies
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/user/terms-and-conditions">
                    <div className="font-medium">Terms and Conditions</div>
                    <div className="text-muted-foreground">Booking policy</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/user/RefundPolicy">
                    <div className="font-medium">Refund Policy</div>
                    <div className="text-muted-foreground">Refund policy</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/user/privacy-policy">
                    <div className="font-medium">Privacy Policy</div>
                    <div className="text-muted-foreground">Privacy policy</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          {/* <NavigationMenuTrigger>With Icon</NavigationMenuTrigger> */}
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
