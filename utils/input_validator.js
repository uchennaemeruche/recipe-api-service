const joi = require("joi");

exports.createRecipeSchema = joi.object({
    author: joi.string().required(),
    title: joi.string().required(),
    content: joi.string().required(),
    likes: joi.number(),
});

exports.updateRecipeSchema = joi.object({
    author: joi.string(),
    title: joi.string(),
    content: joi.string(),
    likes: joi.number(),
})