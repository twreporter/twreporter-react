FROM node:10.15-slim

ARG app_group=main_site_user
ARG app_user=main_site_user

RUN groupadd ${app_group} && useradd --create-home --home-dir /home/${app_user} -g ${app_group} ${app_user}

USER ${app_user}

RUN mkdir /home/${app_user}/src
RUN chown ${app_user}:${app_group} /home/${app_user}/src

WORKDIR /home/${app_user}/src

# Add built source files
COPY . ./

EXPOSE 3000
CMD node dist/server.js
