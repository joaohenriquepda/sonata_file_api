ARG NODE_VERSION=12.18-stretch
FROM ubuntu:bionic

# Set the locale
ENV LANG C.UTF-8


RUN apt-get update && apt-get install -y wget curl git build-essential libsndfile1
# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

RUN node --version


RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm i -g @adonisjs/cli

EXPOSE 3333

# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]