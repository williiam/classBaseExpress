## /api/auth/register

- Method: `POST`
- Header: `None`
- Body:

```json
{
  "email": "fake@gmail.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```

- Param: `None`
- Success Response:

```json
{
  "error": false,
  "message": "Registration successful"
}
```

- Error Response:

```json
{
  "error": true,
  "message": "register failed"
}
```