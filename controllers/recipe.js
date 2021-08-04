const Recipe = require("../models/recipe.model");
const { HttpException } = require('../services/error_handler');
const { createRecipeSchema, updateRecipeSchema } = require('../middleware/input_validator');
const Joi = require("joi");


const getRecipes = async(req, res, next) => {
    let recipes = await Recipe.findAll();
    sendResponse(res, recipes);
};
const searchRecipe = async(req, res, next) => {
    checkValidation(Joi.object({
        searchCriteria: Joi.string().min(3).required()
    }).validate(req.body))

    const { searchCriteria } = req.body;
    const result = await Recipe.findOne({
        params: [
            ["title", "like", `%${searchCriteria}%`],
            ["OR", "content", "like", `%${searchCriteria}%`]
        ]
    });
    sendResponse(res, result);
};
const getRecipeById = async(req, res, next) => {
    checkValidation(Joi.object({
        id: Joi.string().required()
    }).validate(req.params))

    const id = req.params.id;
    const recipe = await Recipe.findOne({
        fields: ["title", "content"],
        params: [
            ["id", "=", id]
        ]
    });
    sendResponse(res, recipe);
};
const addRecipe = async(req, res, next) => {
    checkValidation(createRecipeSchema.validate(req.body));
    const result = await Recipe.create(req.body);
    sendResponse(res, result, "Could not create recipe, please try again");

};
const updateRecipe = async(req, res, next) => {
    const params = [
        ["id", "=", req.params.id]
    ];
    checkValidation(updateRecipeSchema.validate(req.body));
    const result = await Recipe.update(params, req.body);
    sendResponse(res, result, "Could not update recipe, please try again");
}

const deleteRecipe = async(req, res, next) => {
    const params = [
        ["id", "=", req.params.id]
    ];
    const result = await Recipe.delete(params);
    sendResponse(res, result, "Recipe deleted");
}

const checkValidation = (schema) => {
    const { error, value } = schema;
    if (error) {
        throw new HttpException(400, 'Validation failed', error);
    }
}

const sendResponse = (res, data, msg = "No available recipe with the given criteria!") => {
    if (data.errorno) throw new HttpException(500, data)
    if (!data.length) throw new HttpException(404, msg);
    return res.status(200).json({
        data,
    });
}

module.exports = {
    getRecipes,
    searchRecipe,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
};