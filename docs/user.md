# User API spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "ilham",
  "password": "rahasia",
  "name": "Ilham Bonardo Marapung"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "ilham",
    "name": "Ilham Bonardo Marpaung"
  }
}
```

Response Body Error :

```json
{
  "errors": "username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "ilham",
  "password": "rahasia"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authroization : token

Request Body :

```json
{
  "name ": "Ilham Bonardo Marpaung lagi", //optional
  "password": "new password" //optional
}
```

Request Body Success :

```json
{
  "data": {
    "username": "ilham",
    "name": "Ilham Bonardo Marpaung lagi"
  }
}
```

Request Body Error:

```json
{
  "error": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authroization : token

Response Body Success:

```json
{
  "data": {
    "username": "ilham",
    "name": "Ilham Bonardo Marpaung"
  }
}
```

Response body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endopoint : DELETE /api/users/logout

Headers :

- Authroization : token

Response Body Success :

```json
{
  "data": "ok"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
