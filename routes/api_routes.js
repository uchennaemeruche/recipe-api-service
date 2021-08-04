const router = require("express").Router();

const { getRecipes, addRecipe, searchRecipe, getRecipeById, updateRecipe, deleteRecipe } = require("../controllers/recipe");
const parseRequest = require("../middleware/promiseHandler.middleware");

// router.get("/", parseRequest(getRecipes)); // Returns all the available recipes;
// router.post("/search", parseRequest(searchRecipe)); // Returns recipes for the defined class of food
// router.get("/:id", parseRequest(getRecipeById)); // Returns a particular recipe.
// router.post("/", parseRequest(addRecipe)); // Create a new recipe;
// router.put("/:id", parseRequest(updateRecipe));
// router.delete("/:id", parseRequest(deleteRecipe));

router.route('/')
    .get(parseRequest(getRecipes))
    .post(parseRequest(addRecipe))
router.route('/:id')
    .get(parseRequest(getRecipeById))
    .put(parseRequest(updateRecipe))
    .delete(parseRequest(deleteRecipe))
router.post('search', parseRequest(searchRecipe))

module.exports = router;