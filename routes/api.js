const router = require("express").Router();

const { getRecipes, addRecipe, searchRecipe, getRecipeById, updateRecipe, deleteRecipe } = require("../controllers/recipe");
const parseRequest = require("../middleware/promise_handler");

router.route('/')
    .get(parseRequest(getRecipes))
    .post(parseRequest(addRecipe))
router.route('/:id')
    .get(parseRequest(getRecipeById))
    .put(parseRequest(updateRecipe))
    .delete(parseRequest(deleteRecipe))
router.post('/search', parseRequest(searchRecipe))

module.exports = router;