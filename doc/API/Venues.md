#  

# **Venues**

Venues related to Holidaze

Some of these are authenticated endpoints. You can visit[authentication](https://docs.noroff.dev/docs/v1/holidaze/authentication)to get an access token.

These endpoints allow you to retrieve venues.

These endpoints support pagination and sorting. Read more about these features[here](https://docs.noroff.dev/docs/v1/pagination-sorting).

## **[The Venue model](https://docs.noroff.dev/docs/v1/holidaze/venues#the-venue-model)**

| Prop        | Type          | Default |
|-------------|---------------|---------|
| id          | string        | -       |
| name        | string        | -       |
| description | string        | -       |
| media       | Array<string> | -       |
| price       | float         | -       |
| maxGuests   | integer       | -       |
| rating      | float         | -       |
| created     | string        | -       |
| updated     | string        | -       |
| meta        | Object        | -       |
| location    | Object        | -       |

---

## **[Query parameters](https://docs.noroff.dev/docs/v1/holidaze/venues#query-parameters)**

Not all of the properties of a venue are returned by default. You can use the following optional query parameters to include additional properties in the response.

| Prop      | Type    | Default |
|-----------|---------|---------|
| _owner    | boolean | false   |
| _bookings | boolean | false   |

Example with all optional query parameters

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "media": [
    "string"
  ],
  "price": 0,
  "maxGuests": 0,
  "rating": 0,
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
  },
  "owner": {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg"
  },
  "bookings": [
    {
      "id": "string",
      "dateFrom": "string",
      "dateTo": "string",
      "guests": 0,
      "created": "string",
      "updated": "string"
    }
  ]
}
```

---

## **[All venues](https://docs.noroff.dev/docs/v1/holidaze/venues#all-venues)**

This endpoint does not require authentication.

**GET/holidaze/venues**

Retrieve all venues.

If you want to get all venues by a specific profile, you can use the[venues by profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#all-venues-by-profile)endpoint.

Response

```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "price": 0,
    "maxGuests": 0,
    "rating": 0,
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
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "price": 0,
    "maxGuests": 0,
    "rating": 0,
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
  }
  // ...
]
```

---

## **[Single venue](https://docs.noroff.dev/docs/v1/holidaze/venues#single-venue)**

This endpoint does not require authentication.

**GET/holidaze/venues/<id>**

Retrieve a single venue based on its id.

Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "media": [
    "string"
  ],
  "price": 0,
  "maxGuests": 0,
  "rating": 0,
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
}
```

---

## **[Create venue](https://docs.noroff.dev/docs/v1/holidaze/venues#create-venue)**

**POST/holidaze/venues**

Creation a new venue.

Request

```json
{
  "name": "string",
  // Required
  "description": "string",
  // Required
  "media": [
    "string"
  ],
  // Optional
  "price": 0,
  // Required
  "maxGuests": 0,
  // Required
  "rating": 0,
  // Optional (default: 0)
  "meta": {
    "wifi": true,
    // Optional (default: false)
    "parking": true,
    // Optional (default: false)
    "breakfast": true,
    // Optional (default: false)
    "pets": true
    // Optional (default: false)
  },
  "location": {
    "address": "string",
    // Optional (default: "Unknown")
    "city": "string",
    // Optional (default: "Unknown")
    "zip": "string",
    // Optional (default: "Unknown")
    "country": "string",
    // Optional (default: "Unknown")
    "continent": "string",
    // Optional (default: "Unknown"),
    "lat": 0,
    // Optional (default: 0)
    "lng": 0
    // Optional (default: 0)
  }
}
```

Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "media": [
    "string"
  ],
  "price": 0,
  "maxGuests": 0,
  "rating": 0,
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
}
```

---

## **[Update venue](https://docs.noroff.dev/docs/v1/holidaze/venues#update-venue)**

**PUT/holidaze/venues/<id>**

Updating a venue.

Request

```json
{
  "name": "string",
  // Optional
  "description": "string",
  // Optional
  "media": [
    "string"
  ],
  // Optional
  "price": 0,
  // Optional
  "maxGuests": 0,
  // Optional
  "rating": 0,
  // Optional
  "meta": {
    "wifi": true,
    // Optional
    "parking": true,
    // Optional
    "breakfast": true,
    // Optional
    "pets": true
    // Optional
  },
  "location": {
    "address": "string",
    // Optional
    "city": "string",
    // Optional
    "zip": "string",
    // Optional
    "country": "string",
    // Optional
    "continent": "string",
    // Optional
    "lat": 0,
    // Optional
    "lng": 0
    // Optional
  }
}
```

Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "media": [
    "string"
  ],
  "price": 0,
  "maxGuests": 0,
  "rating": 0,
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
}
```

---

## **[Delete venue](https://docs.noroff.dev/docs/v1/holidaze/venues#delete-venue)**

**DELETE/holidaze/venues/<id>**

Delete a venue based on its id.

Returns an empty 204 response on success.