#use a lighter version of node as parent image
FROM node:10.15.1

WORKDIR /server

COPY package*.json /server/

RUN npm install

#copy stuff
COPY . .