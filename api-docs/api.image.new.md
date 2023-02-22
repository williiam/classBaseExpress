## /api/image/new

- Method: `POST`
- Header: `Cookie : the jwt token sent by server after success authenticate`
- Body:

```json
{
  "isPrivate": true,
  "file": "Image created"
}
```

- Param: `None`
- Success Response:

```json
{
  "error": false,
  "message": ""
}
```

- Error Response:

```json
{
  "success": true,
  "message": "Some error occurs."
}
```