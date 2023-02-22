Endpoint: /api/image/delete

Method: DELETE

Description: This endpoint is used to delete an image of a user.

Request Headers:

cookie: The cookie containing the user session information.
Request Body:
{
  imageId: string // The id of the image to delete
}

Response Body:
{
  message: string // The status message of the request
}
Example:

go
Copy code
// Request
DELETE /api/image/delete HTTP/1.1
Host: example.com
cookie: <user session cookie>

{
  "imageId": "1234"
}

// Response
HTTP/1.1 200 OK
{
  "message": "Image deleted"
}