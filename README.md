# CBACB - Chat Bot Aller Chat Bots

## Members

| Student           | Kürzel | Matrikel-Nr. |
| ----------------- | ------ | ------------ |
| Marcel Willie     | mw232  | 39965        |
| Timo Waldherr     | tw086  | 40093        |
| Philipp Zimmerman | pz016  | 40140        |
| Marvin Pfau       | mp159  | 40550        |
| Christos Kafkalis | ck188  | 40551        |
| Jens Schlegel     | js414  | 40572        |

## Abstract

This (Mobile) Web Application ressembles a chat bot version of messengers like WhatsApp. The user is able to select a chat with a certain chat bot and write with it.

## Getting started

### How to start

1. Run in the root directory

```
docker compose up
```

2. Open a new terminal window and enter the backend container

```
docker exec -it cbacb-backend bash
```

3. Create the database tables

```
yarn migrate:deploy
```

4. Seed demo data

```
yarn seed:prod
```

### Where to open

Open your browser and visit at:

[http://localhost:8080](http://localhost:8080)

### How to log in

After generating demo data:

-   E-Mail: `admin@chatbot.de`
-   Password: `chatbot123`
