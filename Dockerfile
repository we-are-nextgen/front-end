# ---------- 1️⃣ Build stage ----------
FROM registry.access.redhat.com/ubi9/nodejs-20 AS builder

USER root

WORKDIR /opt/app-root/src

# Copy and fix permissions
COPY package*.json ./
RUN chown -R 1001:0 /opt/app-root/src

USER 1001

RUN npm ci

COPY --chown=1001:0 . .

RUN npm run build


# ---------- 2️⃣ Runtime stage ----------
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal

USER root
WORKDIR /opt/app-root/src

COPY --from=builder --chown=1001:0 /opt/app-root/src ./

RUN chown -R 1001:0 /opt/app-root/src

USER 1001

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]