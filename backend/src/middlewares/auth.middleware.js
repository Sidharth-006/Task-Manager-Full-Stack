const User = require("../domain/user.domain");
const { verifyToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    // Get Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return errorResponse(res, 401, "Access token is required");
    }

    // Check Bearer Token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return errorResponse(res, 401, "Invalid token format");
    }

    // Verify Token
    const decoded = verifyToken(token);

    // Find User
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return errorResponse(res, 401, "User not found");
    }

    // Check Active User
    if (!user.isActive) {
      return errorResponse(res, 403, "Account is deactivated");
    }

    // Attach User to Request
    req.user = user;

    next();

  } catch (error) {
    return errorResponse(res, 401, "Invalid or expired token");
  }
};

module.exports = authMiddleware;