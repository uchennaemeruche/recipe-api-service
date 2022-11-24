

const router = require("express").Router();

const { getRecipes, addRecipe, searchRecipe, getRecipeById, updateRecipe, deleteRecipe } = require("../controllers/recipe");
const parseRequest = require("../middleware/promise_handler");

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: List recipes
 *     description: Returns List of Recipes
 *     tags: [Recipe]
 *     responses:
 *       '200':
 *         description: returns array of recipe objects 
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items: 
 *                    $ref: '#/components/schemas/RecipeResponse'
 */
router.get("/", parseRequest(getRecipes))

/**
 * @swagger
 * tags:
 *    name: Recipe
 *    description: Recipe
 */
 
/** 
 * @swagger
 * /api/recipes:
 *   post:
 *      summary: Add new recipe
 *      description: Add new recipe
 *      tags: [Recipe]

 *      requestBody:
 *        description: Recipe Input structure
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/definitions/Recipe'
 *             examples:
 *                recipe:
 *                  summary: Create Recipe
 *                  value: {'author': 'Uchenna', 'title':'Naija Jollof', 'content': 'New naija jollof recipe'}
 *      responses:
 *        200:
 *          description: created
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/responses/AffectedRow'
 *        400:
 *          description: Bad request.
 */
router.post("/", parseRequest(addRecipe))

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: get single recipe
 *     tags: [Recipe]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of recipe
 *     responses:
 *       200:
 *         description: single recipe
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.get('/:id', parseRequest(getRecipeById))
/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: update single recipe
 *     tags: [Recipe]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of recipe
 *     requestBody:
 *        description: Recipe Input structure
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/definitions/Recipe'
 *             examples:
 *                recipe:
 *                  summary: Create Recipe
 *                  value: {'author': 'Uchenna', 'title':'Naija Jollof', 'content': 'New naija jollof recipe'}
 *     responses:
 *       200:
 *         description: single recipe
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/RecipeResponse'
 */
router.put('/:id', parseRequest(updateRecipe))

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: delete single recipe
 *     tags: [Recipe]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of recipe
 *     responses:
 *       200:
 *         description: delete recipe
 *         content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/responses/AffectedRow'
 */
router.delete('/:id', parseRequest(deleteRecipe))
router.post('/search', parseRequest(searchRecipe))

module.exports = router;