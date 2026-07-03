const { errorResponse } = require("../utils/response");

const validate = (validator) => {
  return (req, res, next) => {
    const error = validator(req.body);

    if (error) {
      return errorResponse(res, 400, error);
    }

    next();
  };
};

module.exports = validate;