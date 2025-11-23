import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnOnboarding = nextUrl.pathname.startsWith("/onboarding")

      if (isOnDashboard || isOnOnboarding) {
        if (isLoggedIn) return true
        return false
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          user,
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  providers: [
    {
    id: "keycloak",
    name: "Keycloak",
    type: "oauth",
    wellKnown: `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/.well-known/openid-configuration`,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
  }],
} as NextAuthConfig
