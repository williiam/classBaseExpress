# Coding Challenge

Complete the challenege and send us the repoistory for review.

## Tasks

- Create an API to upload and share images by user.
- Implement email and password authentication and authorization on the api.
- A user can have multiple images.
- Users can add or delete images.
- Images can be set to public or private.
- Use good development practices like documentation.

## Technical Details

- Can be made using any language, but prefer Typescript if possible.
- Try to use Docker
- Any database of choice

## SOLUTION

use cookie to store user jwt sent from server after login or register success

store image file on server as local file and store permission(include private permission) in database(postgres), use cookie to auth request getting the image file

the server can be build and run in docker with one command
and you can run test(npm run test) in the container

the server log will be store in ./logs
the image file will be store in ./uploads

### THE API DOCS IS IN /api-docs

## HOW TO SET UP

### local

```bash
npm install
npm run dev
```

### docker

```bash
docker compose up
```

## TEST

```bash
npm run test
```
