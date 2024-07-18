FROM node:18.17.1

ARG app_group=main_site_user
ARG app_user=main_site_user
ARG NODE_ENV
ARG RELEASE_BRANCH

RUN groupadd ${app_group} && useradd --create-home --home-dir /home/${app_user} -g ${app_group} ${app_user}

ENV NODE_ENV ${NODE_ENV}
ENV RELEASE_BRANCH ${RELEASE_BRANCH}

USER ${app_user}

RUN mkdir /home/${app_user}/src
RUN chown ${app_user}:${app_group} /home/${app_user}/src

WORKDIR /home/${app_user}/src

# Add built source files
COPY . ./

EXPOSE 3000
CMD node dist/server.js
