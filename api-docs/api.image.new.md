Endpoint: /api/image/new

Method: POST

Description: This endpoint is used to create an image for a user.

Request 
    Headers:
    {
        Cookie : The user authentication cookie. // (required)
    }
    Body:
    {
        isPrivate: bool // (required, boolean): A boolean value that determines whether the image is private or not.
        file: the attach file 
    }

Response:
    Body:
    {
        error (boolean): A boolean value indicating whether an error occurred or not.
        message (string): A message describing the response.
        data (object): An object containing the created image details.
    }

