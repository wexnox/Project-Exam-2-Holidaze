#                  

# **Authentication**

Authentication related to Holidaze

This authentication is only related to the`/holidaze`endpoints.

These endpoints are used to authorize yourself with the API server. All`/holidaze`routes require an authorization token to be included in the request.

---

## **[Register](https://docs.noroff.dev/docs/v1/holidaze/authentication#register)**

**POST/holidaze/auth/register**

Register a new user profile.

You will need to send all of the required values in your`POST`request:

Request

``` json
{
  "name": "my_username", // Required  
  "email": "first.last@stud.noroff.no", // Required
  "password": "UzI1NiIsInR5cCI", // Required
  "avatar": "https://img.service.com/avatar.jpg", // Optional (default: null) 
  "venueManager": false // Optional (default: false)}
```

The`name`value must not contain punctuation symbols apart from underscore (`_`).

The`email`value must be a valid`stud.noroff.no`or`noroff.no`email address.

The`password`value must be at least 8 characters.

The`avatar`value must be a valid URL.

The`venueManager`value must be a boolean. If`true`the user will be able to create, edit, and delete venues.

You can now use your registered account to log in.

---

## **[Login](https://docs.noroff.dev/docs/v1/holidaze/authentication#login)**

**POST/holidaze/auth/login**

Login with your registered user.

Request

``` json
{
  "email": "first.last@stud.noroff.no",
  "password": "UzI1NiIsInR5cCI"
}
```

Response

``` json
{
"name": "my_username",
"email": "first.last@stud.noroff.no",
"avatar": "https://img.service.com/avatar.jpg",
"venueManager": false,
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

You can now use this access token as the Bearer token in the`Authorization`header for all`/holidaze`endpoints.

---

## **[Example of sending Authorization header.](https://docs.noroff.dev/docs/v1/holidaze/authentication#example-of-sending-authorization-header)**

Example

```jsx
const options = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
    }
}
const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, options)
const data = await response.json()
```