Endpoint: /api/image/new

Method: POST

Description: This endpoint is used to create an image for a user.

Request Body:

isPrivate (required, boolean): A boolean value that determines whether the image is private or not.
file (required, file): An image file to upload.
Headers:

cookie (required): The user authentication cookie.
Response:

status (integer): The HTTP response code.
body (object): The response object.
error (boolean): A boolean value indicating whether an error occurred or not.
message (string): A message describing the response.
data (object): An object containing the created image details.
id (string): The ID of the created image.

