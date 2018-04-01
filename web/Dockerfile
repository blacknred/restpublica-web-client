FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV API_HOST=http://localhost:3003

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install
# ADD package-lock.json /usr/src/package-lock.json
# COPY . /usr/src/app
RUN npm install react-scripts@1.0.17 -g

# start app
CMD ["npm", "start"]
