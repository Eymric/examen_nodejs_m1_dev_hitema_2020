const express = require('express');
const v1 = express.Router();
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.get('/people', async (request, response) => {
    const people = await peopleService.getPeople();
    response.send(people);
});

v1.put('/people/:id', (request, response) => {
    const result = peopleService.updatePeople(request.params.id, request.body);
    if (result.isFind === null)
        return response.sendStatus(HttpStatus.NOT_FOUND);

    result.people ? response.sendStatus(HttpStatus.OK) : response.sendStatus(HttpStatus.NOT_MODIFIED);
});


module.exports = app;
