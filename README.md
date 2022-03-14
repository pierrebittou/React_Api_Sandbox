## How to use.

In the project directory, you can run:

### `docker-compose build`

You will have to make a docker-compose.yml file at the root of your project, which will describe the different
docker services used.
This file must include at least the Docker service server used to launch the application on port 8080 .

### `docker-compose up`

The validation of the integrity of your application will be done when launching the docker-compose up request.
The server service will run by exposing the port 8080

### `about.json`

The server service will respond to the request http://localhost:8080/about.json .
The json will explain the services, the widgets linked to them and even their parameters and parameters types.

**Note: this project is still on dev.**