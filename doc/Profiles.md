# **Profiles**

Profiles related to Holidaze

These are authenticated endpoints. You can visit[authentication](https://docs.noroff.dev/docs/v1/holidaze/authentication)to get an access token.

This endpoint allows you to manage profiles. They are the users of the Holidaze site.

These endpoints support pagination and sorting. Read more about these features[here](https://docs.noroff.dev/docs/v1/pagination-sorting).

## **[The Profile model](https://docs.noroff.dev/docs/v1/holidaze/profiles#the-profile-model)**

| Prop         | Type    | Default |
|--------------|---------|---------|
| name         | string  | -       |
| email        | string  | -       |
| avatar       | string  | -       |
| venueManager | boolean | -       |
| _count       | Object  | -       |

---

## **[Query parameters](https://docs.noroff.dev/docs/v1/holidaze/profiles#query-parameters)**

Not all of the properties of a profile are returned by default. You can use the following optional query parameters to include additional properties in the response.

| Prop      | Type    | Default |
|-----------|---------|---------|
| _bookings | boolean | false   |
| _venues   | boolean | false   |

Example with all optional query parameters

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "venueManager": false,
  "venues": [
    {
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
    }
  ],
  "bookings": [
    {
      "id": "string",
      "dateFrom": "string",
      "dateTo": "string",
      "guests": 0,
      "created": "string",
      "updated": "string"
    }
  ],
  "_count": {
    "venues": 0,
    "bookings": 0
  }
}
```

---

## **[All profiles](https://docs.noroff.dev/docs/v1/holidaze/profiles#all-profiles)**

**GET/holidaze/profiles**

Retrieve all profiles.

Response

```json
[
  {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg",
    "venueManager": false,
    "_count": {
      "venues": 0,
      "bookings": 0
    }
  },
  {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg",
    "venueManager": false,
    "_count": {
      "venues": 0,
      "bookings": 0
    }
  }
]
```

---

## **[Single profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#single-profile)**

**GET/holidaze/profiles/<name>**

Retrieve a single profile by its id.

Response

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "venueManager": false,
  "_count": {
    "venues": 0,
    "bookings": 0
  }
}
```

---

## **[All bookings by profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#all-bookings-by-profile)**

**GET/holidaze/profiles/<name>/bookings**

Retrieve all bookings made by profile.

The response is the same as the[bookings](https://docs.noroff.dev/docs/v1/holidaze/bookings#all-bookings)endpoint, and accepts the same optional query parameters and flags.

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

## **[All venues by profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#all-venues-by-profile)**

**GET/holidaze/profiles/<name>/venues**

Retrieve all venues made by profile.

The response is the same as the[venues](https://docs.noroff.dev/docs/v1/holidaze/venues#all-venues)endpoint, and accepts the same optional query parameters and flags.

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

## **[Update profile](https://docs.noroff.dev/docs/v1/holidaze/profiles#update-profile)**

**PUT/holidaze/profiles/<name>**

This endpoint allows for the profile`venueManager`boolean to be changed.

If you want to update the profile`avatar`image, use the[Update profile media](https://docs.noroff.dev/docs/v1/holidaze/profiles#update-profile-media)endpoint.

Request

```json
{
  "venueManager": true
}
```

Response

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "venueManager": true
},
```

---

## **[Update profile media](https://docs.noroff.dev/docs/v1/holidaze/profiles#update-profile-media)**

**PUT/holidaze/profiles/<name>/media**

Update or set profile`avatar`image.

Remove the`avatar`by setting the property to`null`.

Please note that the`avatar`property must be fully formed URL that links to a live and publicly accessible image. The API will check the provided URL and if it cannot be accessed publicly you will receive a 400 error response.

Request

```json
{
  "avatar": "https://url.com/image.jpg"
}
```

Response

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "venueManager": false
},
```