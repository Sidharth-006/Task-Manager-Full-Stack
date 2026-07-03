const { errorResponse } = require("../utils/response");

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    // User comes from auth.middleware
    if (!req.user) {
      return errorResponse(res, 401, "Authentication required");
    }

    // Check user role
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        "Access denied. Insufficient permissions."
      );
    }

    next();
  };
};

module.exports = roleMiddleware;