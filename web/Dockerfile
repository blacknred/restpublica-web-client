FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV REACT_APP_PORT=3000
ENV REACT_APP_TITLE=Publica
ENV REACT_APP_API_HOST=http://127.0.0.1:3003
ENV REACT_APP_STORAGE_HOST=http://127.0.0.1:3007

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install
# ADD package-lock.json /usr/src/package-lock.json
# COPY . /usr/src/app
RUN npm install react-scripts@1.1.4 -g

# start app
CMD ["npm", "start"]
