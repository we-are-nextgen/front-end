import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode"; 

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      username?: string;
      roles?: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        provider: string;
        id_token: string;
        roles?: string[];
    }
}

export const authOptions = {
  debug: true, // 👈 add this
}

const keycloak = KeycloakProvider({
    clientId: process.env.KEYCLOAK_CLIENT_ID!,
    clientSecret: "", // No secret for public clients
    issuer: process.env.KEYCLOAK_ISSUER!,
    checks: ["pkce"], // Enable PKCE flow
});

// this performs the final handshake for the keycloak
async function doFinalSignoutHandshake(jwt: JWT) {
    const { provider, id_token } = jwt;
    if (provider == keycloak.id) {
        try {
            // Add the id_token_hint to the query string
            const params = new URLSearchParams();
            params.append('id_token_hint', id_token);
            const { status, statusText } = await axios.get(`${keycloak.options.issuer}/protocol/openid-connect/logout?${params.toString()}`);
            // The response body should contain a confirmation that the user has been logged out
            console.log("Completed post-logout handshake", status, statusText);
        }
        catch (e: any) {
            console.error("Unable to perform post-logout handshake", (e as AxiosError)?.code || e)
        }
    }
}

const handler = NextAuth({
  providers: [
    keycloak
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
        //jwt: async ({ token, user, account, profile, isNewUser }) => {
        jwt: async ({ token, account}) => {
            if (account) {
                token.exp = account.expires_at;
                token.id_token = account.id_token;
                token.provider = account.provider;
                const decoded: any = account.id_token ? jwtDecode(account.id_token) : {};
                token.id = decoded.sub ?? token.id;
                token.name = decoded.name ?? token.name;
                token.email = decoded.email ?? token.email;
                token.username = decoded.preferred_username ?? token.username;

                if (decoded.realm_access?.roles) {
                    token.roles = decoded.realm_access.roles;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.roles = token.roles || [];
            return session;
        },
    },
    events: {
        signOut: ({ session, token }) => doFinalSignoutHandshake(token)
    }
 
});
export { handler as GET, handler as POST };
