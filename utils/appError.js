
const appError = (message, statusCode) => {
    let error = new Error(message);

    error.statusCode = statusCode ? statusCode : 500;

    //error.stack = error.stack;
    return error;
};


class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = "failure";
    }
}

module.exports = {
    appError,
    AppError
};
