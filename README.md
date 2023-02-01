# CBACB - Chat Bot Aller Chat Bots

## Members

| Student | Kürzel | Matrikel-Nr. |
| ------ | ------ | ------ |
| Marcel Willie | mw232 | 39965 |
| Timo Waldherr | tw086 | 40093 |
| Philipp Zimmerman | pz016 | 40140 |
| Marvin Pfau | mp159 | 40550 |
| Christos Kafkalis | ck188 | 40551 |
| Jens Schlegel | js414 | 40572 |

## Abstract

This (Mobile) Web Application ressembles a chat bot version of messengers like WhatsApp. The user is able to select a chat with a certain chat bot and write with it.

## Getting started

### How to started

Run in the root directory:
```
docker compose up
```

### Generate Demo Data

After starting the whole application:

1. Enter the backend container
2. Run the following command
```
yarn seed:prod
```

### Where to open

Open your browser and visit at:
```
localhost:8080
```

### How to log in

After generating demo data:
- E-Mail: `admin@chatbot.de`
- Password: `chatbot123`