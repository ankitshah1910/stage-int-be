'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config(); // Load environment variables from .env file
// Define a secret key (use environment variables in a real app)
const SECRET_KEY = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  var _a;
  const token =
    (_a = req.headers['authorization']) === null || _a === void 0
      ? void 0
      : _a.split(' ')[1]; // Assuming "Bearer TOKEN"
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
    console.log(err, decoded);
    if (err) {
      return res.status(403).json({ message: 'Forbidden1' });
    }
    // Type assertion here to ensure decoded is treated as JwtPayload
    const user = decoded;
    // Check if user has an id property
    if (user && typeof user.id === 'string') {
      req.user = { id: user.id }; // Set the user with correct type
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
