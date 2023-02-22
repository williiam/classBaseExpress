Endpoint: /api/image/update

Method: POST

Updates the privacy status of an existing image.

Auth Required: Yes

Request 
    Headers:
    {
        Cookie : The user authentication cookie. // (required)
    }
    Body:
    {
        imageId: The ID of the image to be updated.
        isPrivate: Boolean indicating whether the image should be private (true) or public (false).
    }

Response:
    Body:
    {
        error (boolean): A boolean value indicating whether an error occurred or not.
        message (string): A message describing the response.
        message: "Image updated"
    }

Success:
Status Code: 200
Response Body:
message: "Image updated"
Failure:
Status Code: 400
Response Body:
error: true
message: Error message describing the cause of the failure.
