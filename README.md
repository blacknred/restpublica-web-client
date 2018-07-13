# Restpublica Web Client - React, Redux, React-Router on Docker

## Endpoints

| Endpoint     | Result                            |
|--------------|-----------------------------------|
| /            | render feed or landing page       |
| /login       | login form on landing page        |
| /register    | register form on landing page     |
| /logout      | log a user out to landing pag     |
| /trending    | render popular content            |
| /search      | render searched content           |
| /communities | render user communities           |
| /activity    | render user related activity      |
| /p/:id       | render post                       |
| /settings    | render settings                   |
| /post        | render new post or edit post page |
| /:username   | render user data and posts        |


## Run the project

### Setup

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

1. Make sure you are using a Docker version >= 17:

    ```sh
    $ docker -v
    Docker version 17.03.0-ce, build 60ccb22
    ```

### Build and Run the App

1. Fork/Clone this repo

1. Build the image:
  
    ```sh
    $ cd restpublica-web-client
    $ docker build -t restpublica_web-client .
    ```
1. Set the Environment variables

    ```sh
    $ export NODE_ENV=development
    ```
1. Run the container:

    ```sh
    $ docker run -it restpublica_web-client
    ```
1. Go to http://localhost:3000


