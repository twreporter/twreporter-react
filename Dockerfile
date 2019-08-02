FROM node:10.15-slim

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

WORKDIR /usr/src/react

# Install PM2
RUN npm install -g pm2
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:retain 7
RUN pm2 set pm2-logrotate:compress true
RUN pm2 set pm2-logrotate:rotateInterval '0 3 * * *'

# Add built source files
COPY . ./

EXPOSE 3000
CMD pm2 start --no-daemon processes.json
