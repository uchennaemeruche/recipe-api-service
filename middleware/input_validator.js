const joi = require("joi");

exports.createRecipeSchema = joi.object({
    title: joi.string().required(),
    createdBy: joi.string().required(),
    content: joi.string().required(),
    likes: joi.number(),
    reviews: joi.string(),
});

exports.updateRecipeSchema = joi.object({
    title: joi.string(),
    createdBy: joi.string(),
    content: joi.string(),
    likes: joi.number(),
    reviews: joi.string(),
})