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
COPY . /usr/src/app
RUN npm install react-scripts@1.1.4 -g

# Volume configuration
VOLUME ["/usr/src/app", "/usr/src/package.json"]

# start app
EXPOSE 3000
CMD ["npm", "start"]


# web-client:
#   container_name: web-client
#   build: ./clients/web/
#   volumes:
#     - './clients/web:/usr/src/app'
#     - './clients/web/package.json:/usr/src/package.json'
#   ports:
#     - '3000:3000'
#   environment:
#     - NODE_ENV=${NODE_ENV}
#   depends_on:
#     api-gateway:
#       condition: service_started
