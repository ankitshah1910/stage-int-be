"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myListController_1 = require("../controllers/myListController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Apply the authentication middleware to all routes
router.use(authMiddleware_1.default);
// Add an item to the list
router.post('/my-list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the user ID from the middleware
        const { itemId, type } = req.body;
        if (!userId || !itemId || !type) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const result = yield (0, myListController_1.addItem)({ userId, itemId, type });
        return res.status(200).json(result);
    }
    catch (error) {
        return next(error); // Pass the error to error-handling middleware
    }
}));
// List items with pagination
router.get('/my-list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the user ID from the middleware
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const result = yield (0, myListController_1.listItems)({ userId, page, limit });
        return res.status(200).json(result);
    }
    catch (error) {
        return next(error); // Pass the error to error-handling middleware
    }
}));
// Remove an item from the list
router.delete('/my-list/:contentId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the user ID from the middleware
        const { contentId } = req.params;
        if (!userId || !contentId) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }
        const result = yield (0, myListController_1.removeItem)(userId, contentId);
        return res.status(200).json(result);
    }
    catch (error) {
        return next(error); // Pass the error to error-handling middleware
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map