const express = require('express');
const StockService = require('../services/stock.js');
const {
    productIdSchema,
    createProductSchema,
    updateProductSchema
} = require('../utils/schemas/productSchemas.js');

const validationHandler = require('../utils/middleware/validationHandler.js');

function stockApi(app) {
    const router = express.Router();
    app.use("/api/stock", router);

    const stockService = new StockService();

    router.get("/", async function(req, res, next) {
        const {tags} = req.query;

        try {
            const stock = await stockService.getProducts({tags})

            res.status(200).json({
                data: stock,
                message: 'stock listed'
            });
        }
        catch (err) {
            next(err);
        }
    });
    router.get("/:productId", validationHandler({productId: productIdSchema}, 'params'), async function(req, res, next) {
        const {productId} = req.params;

        try {
            const product = await stockService.getProduct({productId});

            res.status(200).json({
                data: product,
                message: 'product retrieved'
            });
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/", validationHandler(createProductSchema), async function(req, res, next) {
        const {body: product} = req;
        try {
            const createdProductId = await stockService.createProduct({product})

            res.status(201).json({
                data: createdProductId,
                message: 'product created'
            });
        }
        catch (err) {
            next(err);
        }
    });
    router.put("/:productId", validationHandler({productId: productIdSchema}, 'params'), validationHandler(updateProductSchema), async function(req, res, next) {
        const {productId} = req.params;
        const {body: product} = req;
        try {
            const updatedProductId = await stockService.updateProduct({
                productId,
                product
            });

            res.status(200).json({
                data: updatedProductId,
                message: 'Product updated'
            });
        }
        catch (err) {
            next(err);
        }
    });
    router.delete("/:productId", validationHandler({productId: productIdSchema}, 'params'), async function(req, res, next) {
        const {productId} = req.params;
        try {
            const deletedProductId = await stockService.deleteProduct({productId});

            res.status(200).json({
                data: deletedProductId,
                message: 'Product deleted'
            });
        }
        catch (err) {
            next(err);
        }
    });
}

module.exports = stockApi;