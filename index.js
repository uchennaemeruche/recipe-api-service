// Import packages
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
const { HttpException, errorHandler } = require("./middleware/error_handler");
const DbConfig = require("./utils/database");
const swaggerOptions = require("./docs/swagger.js");
const swaggerJsDoc = require("swagger-jsdoc");

(async() =>{

/*
 Setup MySQL Database and table
*/
await DbConfig()

/* 
Instantiate an express app and use PORT 4000 if process.env.PORT is not set.
*/
const app = express();
const PORT = process.env.PORT || 4000;

/*
Set up logger function
For a production-ready application, you probably will setup logging differently.
*/
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(
            `You received a [${req.method}] of [${res.statusCode}] from [${req.socket.remoteAddress}]`
        );
    });
    next();
});

/*
Set up middleware functions
*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable Cross-Origin Resource Sharing - CORS
app.use(cors()); // pre-flight requests are already handled for all routes


// Add Swagger API documentation
const opts = require("./docs/swagger-output.json")
const swaggerSpec = swaggerJsDoc(swaggerOptions)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}))


/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: Welcome to our Recipe service
 */
app.get('/', (req, res, next) => {
    return res.json({
        msg: "Welcome to our Recipe service"
    })
})
app.use("/api/recipes", require("./routes/api"));



/*
Define Error Handling middleware for unknown routes
*/
app.use((req, res, next) => {
    next(new HttpException(404, "OOps, you hit an unavailable route"));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
});
})()

