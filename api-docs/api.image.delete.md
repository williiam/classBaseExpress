## /api/image/delete

- Method: `POST`
- Header: `Cookie : the jwt token sent by server after success authenticate`
- Body:

```json
{
  "imageId": "123"
}
```

- Param: `None`
- Success Response:

```json
{
  "error": false,
  "message": "Image deleted"
}
```

- Error Response:

```json
{
  "success": true,
  "message": "Some error occurs."
}
```