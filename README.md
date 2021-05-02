# matchnlearn_form_api

[![Deploy](https://github.com/mono424/matchnlearn_form_api/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/mono424/matchnlearn_form_api/actions/workflows/deploy.yml)

Url: https://matchnlearn-form-api.herokuapp.com

## REST-Endpoints

### GET **/**
returns a welcome message.

### GET **/auth**
Call this endpoint with an student-payload(json). The student will be pushed into the database.

### GET **/export**
Call this endpoint to receive an export of the database in csv.