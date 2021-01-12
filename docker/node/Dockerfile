FROM node:15.3-slim
LABEL maintainer="Fara <game_Fara@outlook.com>"

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y sudo

ENV NODE_USER node
RUN gpasswd -a ${NODE_USER} sudo && \
    echo "${NODE_USER}  ALL=(ALL)   NOPASSWD:   ALL" >> /etc/sudoers

USER ${NODE_USER}
WORKDIR /var/www
