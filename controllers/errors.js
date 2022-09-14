const expressValidation = require("express-validation");

const notFound = (req, res, next) => {
    let err = new Error('Not found')
    err.status = 404
    next(err)
}

const error = (err, req, res) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.statusCode).json(err);
    } else {
        res.status(err.status || 500)
            .json({
                message: err.message || 'Oops, something went wrong'
            });
    }
}

module.exports = {
    notFound,
    error,
}