# next-gen-front-end

+-------------+          +------------------+          +--------------------+
|  Next.js    |  <---->  |   Keycloak IdP   |  <---->  |   Quarkus Backend  |
| (Frontend)  |  OAuth2  | (login, tokens)  |  JWT ->  | (protected APIs)   |
+-------------+          +------------------+          +--------------------+

# 1 - install next-auth
npm install next-auth 

# 2 - update .ev.local 
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
KEYCLOAK_ISSUER=http://localhost:8080/realms/myrealm
KEYCLOAK_CLIENT_ID=nextjs-frontend

# your_random_secret, is not the client secret in Keycloak
# You can generate random secret with following node code
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"


# 3 - Configure NextAuth in pages/api/auth/[...nextauth].ts
make sure users keycloak session is deleted once they log out, as default behaviour is just deleting the cookie and not deleting the session in keycloak

# 4 - protect url
create /app/middleware.ts

