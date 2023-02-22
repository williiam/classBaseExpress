## /api/image/update

- Method: `POST`
- Header: `Cookie : the jwt token sent by server after success authenticate`
- Body:

```json
{
  "isPrivate": true,
  "imageId": "123"
}
```

- Param: `None`
- Success Response:

```json
{
  "error": false,
  "message": "Image updated"
}
```

- Error Response:

```json
{
  "success": true,
  "message": "Some error occurs."
}
```