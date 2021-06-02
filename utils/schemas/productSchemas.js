const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().min(3).max(20);
const productDescriptionSchema = joi.string().max(500);
const productStockSchema = joi.number().min(0);

const createProductSchema = {
    name: productNameSchema.required(),
    description: productDescriptionSchema.required(),
    stock: productStockSchema.required()
};

const updateProductSchema = {
    name: productNameSchema,
    description: productDescriptionSchema,
    stock: productStockSchema
};

module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
};