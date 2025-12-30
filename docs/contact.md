# Contact API

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Ilham",
  "last_name": "Bonardo",
  "email": "ilham@example.com",
  "phone": "92123123421"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Ilham",
    "last_name": "Bonardo",
    "email": "ilham@example.com",
    "phone": "92123123421"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Ilham",
  "last_name": "Bonardo",
  "email": "ilham@example.com",
  "phone": "92123123421"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Ilham",
    "last_name": "Bonardo",
    "email": "ilham@example.com",
    "phone": "92123123421"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Ilham",
    "last_name": "Bonardo",
    "email": "ilham@example.com",
    "phone": "92123123421"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Contact is not found"
}
```

## Search Conctact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Ilham",
      "last_name": "Bonardo",
      "email": "ilham@example.com",
      "phone": "92123123421"
    },
    {
      "id": 2,
      "first_name": "Ilham",
      "last_name": "Bonardo",
      "email": "ilham@example.com",
      "phone": "92123123421"
    }
  ],
  "pagging": {
    "page": 1,
    "total_page": 3,
    "total_item": 10
  }
}
```

Response Body Errors:

```json
{
  "errors": "Contact is not found"
}
```

## Delete Contact API

Endpoint : DELETE /api/contacts

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Errors:

```json
{
  "errors": "Contact is not found"
}
```
