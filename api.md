# api document

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
