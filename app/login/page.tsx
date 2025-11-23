// app/login/page.tsx
"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  useEffect(() => {
    // This triggers NextAuth’s internal PKCE flow for Keycloak
    signIn("keycloak", { callbackUrl: "/dashboard" });
  }, []);

  return <p>Redirecting to login...</p>;
}
