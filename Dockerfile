FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install
# ADD package-lock.json /usr/src/package-lock.json
RUN npm install react-scripts@1.1.5 -g

# Volume configuration
VOLUME ["/usr/src/app", "/usr/src/package.json"]

# start app
CMD ["npm", "start"]
