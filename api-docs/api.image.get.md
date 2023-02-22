## /api/image/get

- Method: `GET`
- Header: `Authorization: Bearer {jwt}`
- Body:

```json
{
    "_body": ... // the actual image file
}
```

- Param: `None`
- Success Response:

```json
{
  "success": false,
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