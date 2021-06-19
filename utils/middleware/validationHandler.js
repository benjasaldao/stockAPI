const joi = require('joi');
const boom = require('@hapi/boom');

function validationHandler(schema, check = "body") {
    return function(req, res, next ){
        const error = schema.validate(req[check]);

        error ? next() : next(boom.badRequest(error));
    }
};

module.exports = validationHandler;