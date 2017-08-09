FROM node:7.9-slim

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

ENV REACT_SOURCE /usr/src/react

WORKDIR $REACT_SOURCE

RUN set -x \
    && apt-get update \
    && apt-get install -y git \
    && apt-get install -y build-essential \
    && apt-get install -y apt-transport-https \
    && rm -rf /var/lib/apt/lists/*
RUN buildDeps=' \
    gcc \
    make \
    python \
    ' \
    && set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*  

# Install PM2
RUN npm install -g pm2
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:retain 7
RUN pm2 set pm2-logrotate:compress true
RUN pm2 set pm2-logrotate:rotateInterval '0 3 * * *'

# Add built source files
ADD . $REACT_SOURCE

EXPOSE 3000
CMD pm2 start --no-daemon processes.json
