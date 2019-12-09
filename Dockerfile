#use a lighter version of node as parent image
FROM node:10.15.1

#set working directory to /api
WORKDIR /server

#copy package.json into container at /api
COPY package*.json /server/

#install dependencies
RUN npm install

#copy stuff
COPY . .

#make port 80 avail
EXPOSE 80

#run
CMD ["node", "index.js"]