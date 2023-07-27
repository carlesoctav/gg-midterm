## Schema

### User

Below are the schema of User.
For further information, take a looks on [models/user.js](./models/user.js)

```
{
    username: string,
    name: string,
    passwordHash: string,
    comments: [<comment_id>, ...]
}
```

### Comment

Below are the schema for Comment.
For further information, take a looks on [models/comment.js](/models/comment.js)

```
{
    user: <user_id>,
    video: <video_id>,
    comment: string,
    date: datetime
}
```

### Product

Below are the schema for product.
For further information, take a looks on [models/product.js](./models/product.js)

```
{
    productName: string,
    productPrice: string,
    productImage : string,
    productLink: string,
    productVideo: string,
}
```

### Video

Below are the schema for Video.
For further information, take a looks on [models/video.js](./models/video.js)

```
{
    title: string,
    thumbnail: string,
    youtubeLink: string,
    productList: [<product_id>, ...]
    commentList: [<comment_id>, ...]
}
```

## API

### users

<!-- V  -->

#### GET api/users

Return all users in the system.

- URL params: none
- Data params: none
- Headers: none
- Success response:
  - Code: 200
  - Content:

```
[
    {
        username: string,
        name: string,
        comments: [
            <comment_object>,
            ...
        ],
        id: <user_id>
    },
    ...
]
```

<!-- V -->

#### POST api/users

Create a new user in the system.

- URL params: none
- Data params:
  ```
  {
      username: string,
      name: string,
      password: string,
  }
  ```
- Headers:
  - Content-Type: application/json
- Success response:
  - Code: 201
  - Content:
  ```
  {
      username: string,
      name: string,
      comments: [],
      id: string
  }
  ```

### login

<!-- V -->

#### POST api/login/

Create a request to login, expect a JWT token in return.

- URL params: none
- Data params:
  ```
  {
      username: string,
      password: string,
  }
  ```
- Headers:
  - Content-Type: application/json
- Success response:

  - Code: 200
  - Content:

  ```
  {
      token: string,
      username: string,
      name: string,
  }
  ```

### videos

<!-- V -->

#### GET api/videos

Return all videos in the system.

- URL params: none
- Data params: none
- Headers: none
- Success response:

  - Code: 200
  - Content:

  ```
  [
      {
          id:string,
          title: string,
          thumbnail: string,
          youtubeLink: string,

      },
      ...
  ]
  ```

#### GET api/videos/:id/products

<!-- V -->

Return a product list of a video.

- URL params: id, (id of the video)
- Data params: none
- Headers: none
- Success response:

  - Code: 200
  - Content:

  ```
  [
        {
            productName: string,
            productPrice: string,
            productImage : string,
            productLink: string,
            productVideo: string,
            id: <product_id>
        },
        ...
  ]
  ```

  <!-- V -->

#### GET api/videos/:id/comments

Return a comment list of a video.

- URL params: id, (id of the video)
- Data params: none
- Headers: none
- Success response:

  - Code: 200
  - Content:

  ```
  [
        {
            user:{
                username: string,
                id: <user_id>
            },
            video: Video objectId,
            comment: string,
            date: datetime
            id: <comment_id>
        },
        ...
  ]
  ```

### Comments

<!-- V -->

#### GET api/comments

Return all comments in the system, not only the comments of a video.

- URL params: none
- Data params: none
- Headers: none
- Success response:
  - Code: 200
  - Content:
  ```
  [
      {
          user:{
              username: string,
              id: <user_id>
          },
          video:{
              title: string,
              id: <video_id>
          },
          comment: string,
          date: datetime
          id: <comment_id>
      },
      ...
  ]
  ```

#### POST api/comments

<!-- V -->

Create a new comment in the system.

- URL params: none
- data params:
  ```
  {
      videoId: string
      comment: string,
  }
  ```
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer <token>
- Success response:
  - Code: 201
  - Content:
  ```
  {
      user:{
          username: string,
          id: <user_id>
      },
      video: <video_id>
      comment: string,
      date: datetime
      id: <video_id>
  }
  ```

### Populate

<!-- V -->

#### POST api/populate

Populate a database with an video and product

- URL params: none
- data params: `{"videoId": string}`
- headers: none
- success response:

  - Code: 201
  - Content:

  ```
  {
    "message": string
    "productList":[
        {
            "productName": string,
            "productPrice": string,
            "productImage" : string,
            "productLink": string,
            "productVideo": string,
        },
        ...
    ]
    "videoDetails":{
        "title": string,
        "thumbnail": string,
        "tokopediaLinks": [
            string,
            ...
        ],
        "youtubeLink": string,
        "productList": [
            <product_object_id>,
            ...
        ],
    }

  }
  ```

### Testing (For development only)

#### GET /api/testing/

rm-rf your database :D

- URL params: none
- data params: none
- headers: none
- success response:
  - Code: 204

## Error Handling

We will classify errors into four custom categories:

1. `PopulateError`: error that occurs when populating the database.
2. `NotFoundError`: error that occurs when the requested object is not found.
3. `MissingError`: error that occurs when the request is missing some data.
4. `UnauthorizedError`: error that occurs when the request is unauthorized.

In addition, there are some errors given by Mongo and JWT:

1. `CastError`: error that occurs when the given ID is not a valid ObjectId.
2. `ValidationError`: error that occurs when the given data is not valid.
3. `JsonWebTokenError`: error that occurs when the given token is not valid.
4. `TypeError`: error that occurs when the given data is not valid type.

While it's exhaustive to list all possible errors, please refer to the flow stated in the [README.md](./README.md) file to understand the error handling. 😄
