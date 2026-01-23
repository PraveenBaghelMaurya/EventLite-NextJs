"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import type { TokenUser } from "../interface/user";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const user = jwt.decode(token) as TokenUser | null;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
      return;
    }

    setIsAllowed(true);
  }, [allowedRoles, router]);

  if (!isAllowed) return null; // ya loader

  return <>{children}</>;
}
