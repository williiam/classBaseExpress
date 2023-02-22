## /api/auth/login

- Method: `POST`
- Header: `None`
- Body:

```json
{
  "email": "fake@gmail.com",
  "password": "12345678"
}
```

- Param: `None`
- Success Response:

```json
{
  "error": false,
  "message": "Login successful"
}
```

- Error Response:

```json
{
  "error": true,
  "message": "password not match" // the error message
}
```