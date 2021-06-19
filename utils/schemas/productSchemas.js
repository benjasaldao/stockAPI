const joi = require('joi');

const productIdSchema = joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/));
const createProductSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    stock: joi.object().required(),
    description: joi.string().min(1).max(250).required(),
    tags: joi.array()
});

const updateProductSchema = joi.object({
    name: joi.string().min(3).max(50),
    stock: joi.object(),
    description: joi.string().min(1).max(250).required(),
    tags: joi.array()
});

module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
};
