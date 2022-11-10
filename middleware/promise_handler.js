const requestPromiseHandler = (middleware) => {
    return async(req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = requestPromiseHandler;