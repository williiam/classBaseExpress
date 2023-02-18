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



## TODO
登入or註冊成功發jwt
DB
    postgres開哪裡？
        1. docker 
        2. 本地
        3. 遠端

    schema:
        user
            id
            email
            password
            name
            created_at
            updated_at
        image
            id
            user_id
            name
            path
            is_private
            created_at
            updated_at

pm2
圖片要可設成private


generate the postgres table by the below schema , including some usful feature maybe like compare password db function or trigger that makes things easy

      image
            id
            user_id
            name
            path
            is_private
            created_at
            updated_at


TODO: merge Login and Register into one controller


s3 可以打cnw的

seperate test enviroment db