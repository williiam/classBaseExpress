API Documentation: /api/image/update
Updates the privacy status of an existing image.

Request
Endpoint: /api/image/update
Method: POST
Auth Required: Yes
Request Body:
imageId: The ID of the image to be updated.
isPrivate: Boolean indicating whether the image should be private (true) or public (false).
Response
Success:
Status Code: 200
Response Body:
message: "Image updated"
Failure:
Status Code: 400
Response Body:
error: true
message: Error message describing the cause of the failure.



Regenerate response


