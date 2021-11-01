# #define the latest nodejs image  to build from
# FROM node:latest
# #create a working directory
# WORKDIR /usr/src/app/graphqlApp
# #copy package.json file under the working directory
# COPY package.json /usr/src/app/graphqlApp/
# # install all the dependencies
# RUN npm install
# #copy all your files under the working directory
# COPY . /usr/src/graphqlApp
# #expose the port 4000
# EXPOSE 4000
# #start nodejs server
# CMD npm start

# Use Node version 14
FROM node:14

# Create app directory within container
WORKDIR /usr/src/app

# Install app dependencies
# A wild card is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json ./

# Copy across source folder
COPY ./dist ./

# Prevents unnecessary packages from being installed
# ENV NODE_ENV production

RUN npm install

CMD ["node","index.js"]