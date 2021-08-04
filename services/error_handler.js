class HttpException extends Error {
    constructor(statusCode, message, data) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

const errorHandler = (error, req, res, next) => {
    let { statusCode = 500, message, data = null } = error;

    message = statusCode === 500 || !message ? "Internal Server Error" : message;

    error = {
        status: "error",
        message,
        ...data && data
    };
    return res.status(statusCode).json(error);
};

module.exports = { HttpException, errorHandler };