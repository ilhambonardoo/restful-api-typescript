# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:idContacts/Addresses

Request header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "Postal_code": "23124"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "Postal_code": "23124"
  }
}
```

Response Body Error :

```json
{
  "errors": "Postal_code is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:idContacts/:idAddresses

Request header :

- X-API-TOKEN : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "Postal_code": "23124"
  }
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:idContacts/:idAddresses

Request header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "Postal_code": "23124"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "Postal_code": "23124"
  }
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```

## Delete Address API

Endpoint : DELETE /api/contacts/:idContacts/:idAddresses

Request header :

- X-API-TOKEN : token

Response Body Success :

```json
{
  "data": "ok"
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:idContacts/Addresses

Request header :

- X-API-TOKEN : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "Postal_code": "23124"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "Postal_code": "23124"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
