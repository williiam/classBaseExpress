API Documentation: /api/image/get:imageId
get the privacy status of an existing image.

Request
Endpoint: /api/image/get
Method: POST
Auth Required: Yes
Request Body:
imageId: The ID of the image to be get.
Response
Success:
Status Code: 200
Response Body:
{
    _body: the actual image file
}
Failure:
Status Code: 400
Response Body:
error: true
message: Error message describing the cause of the failure.

