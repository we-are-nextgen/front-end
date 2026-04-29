podman run -p 3000:3000 \
  -e NEXTAUTH_SECRET=d4657e9a36fcac34fdc9f8152f07e5d1f142d6879a4fa4bdca61233212f0ca3c \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e KEYCLOAK_ISSUER=http://host.containers.internal:9090/realms/myrealm \
  -e KEYCLOAK_CLIENT_ID=nextjs-frontend \
  -e NEXT_PUBLIC_API_URL=http://host.containers.internal:8080 \
  localhost/nextgen-front-end:latest