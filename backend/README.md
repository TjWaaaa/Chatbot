## Getting Started dev

1. `yarn` to install the backend
2. make sure, that the database is running
3. `yarn migrate` to apply the migrations and update the database tables
4. `yarn dev` to start the backend

Runs the server in the development mode on port 8000

### Test your prisma schema changes

`yarn generate`

### Migrate

Use `yarn migrate` for the following scenarios:

- You made changes to the prisma schema and want commit them. A new migration can then be created with this.
- You have pulled and want to apply the changes to your database.

### CSRF Token

In order for the rest api endpoints to be used, an authorization header must be provided.
For this, the following values must be set in the header:

- **key**: `csrf-token`
- **value**: `cbacb`
