"use client";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

// This is sample data.
// const data = {
//   user: {
//     name: "Praveen",
//     email: "praveenbaghelmaurya@gmail.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }
// Organizer Dummy Data

const sidebarData = {
  teams: [
    {
      name: "EventLite Org",
      logo: GalleryVerticalEnd,
      plan: "Organizer Pro",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/organizer/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Events",
      url: "/organizer/events",
      icon: BookOpen,
      items: [
        {
          title: "All Events",
          url: "/organizer/events",
        },
        {
          title: "Draft Events",
          url: "/organizer/events/drafts",
        },
        {
          title: "Published Events",
          url: "/organizer/events/published",
        },
      ],
    },
    {
      title: "Create Event",
      url: "/organizer/events/create",
      icon: Bot,
    },
    {
      title: "Ticket Management",
      url: "/organizer/tickets",
      icon: Command,
      items: [
        {
          title: "Ticket Availability",
          url: "/organizer/tickets/availability",
        },
        {
          title: "Validate Ticket",
          url: "/organizer/tickets/validate",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/organizer/analytics",
      icon: PieChart,
    },
    {
      title: "Audience",
      url: "/organizer/audience",
      icon: Map,
    },
    {
      title: "Payments",
      url: "/organizer/payments",
      icon: Frame,
    },
    {
      title: "Notifications",
      url: "/organizer/notifications",
      icon: AudioWaveform,
    },
    {
      title: "Settings",
      url: "/organizer/settings",
      icon: Settings2,
    },
  ],

  projects: [
    {
      name: "Music Festival 2026",
      url: "/organizer/events/1",
      icon: Frame,
    },
    {
      name: "Tech Conference Delhi",
      url: "/organizer/events/2",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwt.decode(token));
    }
  }, []);

  const data = {
    ...sidebarData,
    user: {
      name: user?.name || "Eventlite",
      email: user?.email || "organizer@eventlite.app",
      avatar: user?.avatar || "/avatars/shadcn.jpg",
    },
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
