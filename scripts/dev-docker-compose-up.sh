#!/bin/bash

docker-compose -f dev-docker-compose.yml --env-file ./.env up
