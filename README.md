# gg-midterm-backend

gg-midterm-backend repository, This repository contains a server that handles requests from the frontend (yet to be implemented).

## How to Run the Server

To get the server up and running, follow these steps:

1. Clone this repository: `git clone https://github.com/carlesoctav/gg-midterm`

2. Install the necessary dependencies: Navigate to the project's root directory and run `npm install`.

3. Ensure that MongoDB is installed and the MongoDB service is running.

4. Create a `.env` file in the root directory of the project and add the following variables:

```env
YOUTUBE_API_KEY = your_youtube_api_key
PORT = your_preferred_port
MONGODB_URI = your_mongodb_uri
SECRET = your_jwt_secret
```

- `YOUTUBE_API_KEY`: Obtain your YouTube API key by following this guide: https://developers.google.com/youtube/v3/getting-started
- `PORT`: Specify the port on which you want the server to run.
- `MONGODB_URI`: Set the MongoDB URI.
- `SECRET`: Provide a secret key for JWT token generation. You can use any string as the secret.

For ease of testing, I have included my own `.env` file in the submission folder, containing a personal YouTube API key and a cloud MongoDB URI. please use it for testing purposes only.

5. Start the server:
   - For development mode, run: `npm run dev`.
   - For production mode, run: `npm start`.

To understand the API endpoints, refer to the [apiContract](./apiContract.md) file.
To understand the various endpoints and how to use them, refer to the [request](./request/) folder.

## Note for Windows Users

Some Windows users have encountered issues with the `bcrypt` library. If you encounter problems, remove the library with the command:

```
npm uninstall bcrypt
```

Then, install `bcryptjs` instead:

```
npm install bcryptjs
```

Additionally, ensure cross-platform compatibility by installing the `cross-env` package as a development dependency:

```
npm install --save-dev cross-env
```

Adjust the npm scripts in `package.json` as follows:

```json
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    // ...
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand"
  }
  // ...
}
```

## some workflow to follow the feature

- If you're starting with a new database, you need to populate it first. Make sure you have the `.env` file with `YOUTUBE_API_KEY` and `MONGODB_URI` set. Check out the [request/populates_api.rest](request/populates_api.rest).

- Let's create a user first. Check out the [request/user_api.rest](request/user_api.rest).

- Let's get a token that is needed for user authentication. Check out the [request/login_api.rest](request/login_api.rest).

- What about adding new comments? Check out the [request/comments_api.rest](request/comments_api.rest). You need to get the token first and place it in the Authorization header, `Bearer <token>`.

- Let's talk about the main part of this project, the video and the product. Check out the [request/videos_api.rest](request/videos_api.rest). You need to change the ID of the video since it will be different from mine. Also, try an invalid ID and see what happens.

- If you want to delete your database, check out the [request/testing_api.rest](request/testing_api.rest). You need to be in development mode, which uses `npm run dev` to run the server.

- some example of the request can be found in the [request_output](request_output) folder.
