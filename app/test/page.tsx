"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}

function HomeContent() {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("keycloak")}>Sign in with Keycloak</button>;
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <button onClick={() => signOut({ callbackUrl: "/test" })}>Sign out</button>
    </div>
  );
}
