#  

# **Bookings**

Bookings related to Holidaze

These are authenticated endpoints. You can visit[authentication](https://docs.noroff.dev/docs/v1/holidaze/authentication)to get an access token.

This endpoint allows you to create, read, update and delete bookings.

These endpoints support pagination and sorting. Read more about these features[here](https://docs.noroff.dev/docs/v1/pagination-sorting).

## **[The Booking model](https://docs.noroff.dev/docs/v1/holidaze/bookings#the-booking-model)**

| Prop     | Type    | Default |
|----------|---------|---------|
| id       | string  | -       |
| dateFrom | string  | -       |
| dateTo   | string  | -       |
| guests   | integer | -       |
| created  | string  | -       |
| updated  | string  | -       |

---

## **[Query parameters](https://docs.noroff.dev/docs/v1/holidaze/bookings#query-parameters)**

Not all of the properties of a booking are returned by default. You can use the following optional query parameters to include additional properties in the response.

| Prop      | Type    | Default |
|-----------|---------|---------|
| _customer | boolean | false   |
| _venue    | boolean | false   |

Example with all optional query parameters

```json
{
  "id": "string",
  "dateFrom": "string",
  "dateTo": "string",
  "guests": 0,
  "created": "string",
  "updated": "string",
  "venue": {
    "id": "string",
    "name": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "price": 0,
    "maxGuests": 0,
    "created": "string",
    "updated": "string",
    "meta": {
      "wifi": true,
      "parking": true,
      "breakfast": true,
      "pets": true
    },
    "location": {
      "address": "string",
      "city": "string",
      "zip": "string",
      "country": "string",
      "continent": "string",
      "lat": 0,
      "lng": 0
    }
  },
  "customer": {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg"
  }
}
```

---

## **[All bookings](https://docs.noroff.dev/docs/v1/holidaze/bookings#all-bookings)**

**GET/holidaze/bookings**

Retrieve all bookings.

If you want to get all bookings by a specific profile, you can use the[bookings by profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#all-bookings-by-profile)endpoint.

Response

```json
[
  {
    "id": "string",
    "dateFrom": "string",
    "dateTo": "string",
    "guests": 0,
    "created": "string",
    "updated": "string"
  },
  {
    "id": "string",
    "dateFrom": "string",
    "dateTo": "string",
    "guests": 0,
    "created": "string",
    "updated": "string"
  }
  // ...
]
```

---

## **[Single booking](https://docs.noroff.dev/docs/v1/holidaze/bookings#single-booking)**

**GET/holidaze/bookings/<id>**

Retrieve a single booking based on its id.

Response

```json
{
  "id": "string",
  "dateFrom": "string",
  "dateTo": "string",
  "guests": 0,
  "created": "string",
  "updated": "string"
}
```

---

## **[Create booking](https://docs.noroff.dev/docs/v1/holidaze/bookings#create-booking)**

**POST/holidaze/bookings**

Create a new booking.

Request

```json
{
  "dateFrom": "string",
  // Required - Instance of new Date()
  "dateTo": "string",
  // Required - Instance of new Date()
  "guests": 0,
  // Required
  "venueId": "string"
  // Required - The id of the venue to book
}
```

Response

```json
{
  "id": "string",
  "dateFrom": "string",
  "dateTo": "string",
  "guests": 0,
  "created": "string",
  "updated": "string"
}
```

---

## **[Update booking](https://docs.noroff.dev/docs/v1/holidaze/bookings#update-booking)**

**PUT/holidaze/bookings/<id>**

Updating a booking.

Request

```json
{
  "dateFrom": "string",
  // Optional - Instance of new Date()
  "dateTo": "string",
  // Optional - Instance of new Date()
  "guests": 0
  // Optional
}
```

Response

```json
{
  "id": "string",
  "dateFrom": "string",
  "dateTo": "string",
  "guests": 0,
  "created": "string",
  "updated": "string"
}
```

---

## **[Delete booking](https://docs.noroff.dev/docs/v1/holidaze/bookings#delete-booking)**

**DELETE/holidaze/bookings/<id>**

Delete a booking based on its id.

Returns an empty 204 response on success.