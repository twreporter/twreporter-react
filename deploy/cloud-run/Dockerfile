FROM node:24.22.1-trixie-slim AS node
FROM nginx:1.30.6-trixie

# Both stages use Debian trixie. Copy only the Node runtime, not npm or build tools.
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN apt-get update \
    && apt-get install -y --no-install-recommends libstdc++6 libatomic1 tini \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R nginx:nginx /var/cache/nginx

ARG NODE_ENV=production
ARG RELEASE_BRANCH
ENV NODE_ENV=${NODE_ENV} RELEASE_BRANCH=${RELEASE_BRANCH}

WORKDIR /app
COPY dist/ ./dist/
COPY static/ ./static/
COPY node_modules/ ./node_modules/
COPY config.js sw.js webpack-assets.json loadable-stats.json ./
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx/react-proxy.conf /etc/nginx/react-proxy.conf
COPY deploy/cloud-run/start.sh /usr/local/bin/start-website

USER nginx
EXPOSE 8080
STOPSIGNAL SIGTERM
ENTRYPOINT ["/usr/bin/tini", "--", "/bin/bash", "/usr/local/bin/start-website"]
