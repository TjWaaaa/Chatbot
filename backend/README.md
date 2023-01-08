### `npm run dev`

Runs the server in the development mode on port :8000.\

### Test your prisma schema changes

`yarn generate`

### Run a migration to create your database tables

`yarn migrate`

"

### CSRF Token

In order for the rest api endpoints to be used, an authorization header must be provided.
For this, the following values must be set in the header:

-   **key**: `csrf-token`
-   **value**: `cbacb`
