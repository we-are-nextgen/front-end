// components/AuthWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  fallback?: ReactNode; // content for non-authenticated users
}

export default function AuthWrapper({ children, fallback = null }: AuthWrapperProps) {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>; // optional spinner
  if (!session) return <>{fallback}</>; // show fallback if not logged in
  return <>{children}</>; // user is logged in
}
