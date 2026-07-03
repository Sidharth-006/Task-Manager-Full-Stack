const { errorResponse } = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  return errorResponse(
    res,
    err.statusCode || 500,
    err.message || "Internal Server Error"
  );
};

module.exports = errorMiddleware;