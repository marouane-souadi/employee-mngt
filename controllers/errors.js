const expressValidation = require("express-validation");

const notFound = (req, res, next) => {
    let err = new Error('Not found')
    err.status = 404
    next(err)
}

const error = (err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        return res.status(err.statusCode).json(err);
    } else {
        return res.status(err.status || 500)
            .json({
                message: err.message || 'Oops, something went wrong'
            });
    }
}

module.exports = {
    notFound,
    error,
}