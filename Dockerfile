FROM ubuntu:20.04

RUN apt-get update && apt-get install -y curl gnupg2 && \
	curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs && \
	npm install --global yarn

RUN yarn global add nodemon

WORKDIR /workspace
