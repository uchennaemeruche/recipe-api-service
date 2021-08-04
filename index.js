// Import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { HttpException, errorHandler } = require("./services/error_handler");

dotenv.config();

/* 
Instantiate an express app and use PORT 4000 if process.env.PORT is not set.
*/
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
    return res.json({
        msg: "Welcome to our Recipe service"
    })
})

/*
Set up logger function
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

/*
Define APi Routes
*/
app.use("/api/recipes", require("./routes/api_routes"));

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