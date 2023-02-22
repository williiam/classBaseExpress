Endpoint: /api/image/delete

Method: DELETE

Description: This endpoint is used to delete an image of a user.

Request 
  Headers:
  {
    cookie: The cookie containing the user session information.
  }
  Body:
  {
    imageId: string // The id of the image to delete
  }

Response 
  Body:
  {
    message: string // The status message of the request
  }