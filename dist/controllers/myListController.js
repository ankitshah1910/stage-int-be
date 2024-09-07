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
exports.removeItem = exports.listItems = exports.addItem = void 0;
const User_1 = __importDefault(require("../models/User"));
const Movie_1 = __importDefault(require("../models/Movie"));
const TvShows_1 = __importDefault(require("../models/TvShows"));
const mongoose_1 = require("mongoose");
// Add an item to the user's list
const addItem = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, itemId, type }) {
    // Check if the user exists
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    // Validate the item based on type
    let item;
    if (type === 'movie') {
        item = yield Movie_1.default.findById(itemId).lean(); // Use lean() for performance if you don't need full Mongoose document
        if (!item) {
            throw new Error('Movie not found');
        }
    }
    else if (type === 'tvshow') {
        item = yield TvShows_1.default.findById(itemId).lean();
        if (!item) {
            throw new Error('TV Show not found');
        }
    }
    else {
        throw new Error('Invalid item type');
    }
    // Check if the item is already in the user's list to avoid duplicates
    const isItemInList = user.myList.some((listItem) => listItem.itemId.equals(new mongoose_1.Types.ObjectId(itemId)) && listItem.type === type);
    if (isItemInList) {
        throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} is already in the list`);
    }
    // Add the item to the user's list with the addedOn field
    user.myList.push({
        itemId: new mongoose_1.Types.ObjectId(itemId),
        type,
        addedOn: new Date() // Set the current date when the item is added
    });
    // Save the user document
    yield user.save();
    return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} added to the list` };
});
exports.addItem = addItem;
// List items in the user's list
const listItems = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, page, limit }) {
    const user = yield User_1.default.findById(userId).lean(); // Use lean() for performance
    if (!user) {
        throw new Error('User not found');
    }
    // Paginate the user's myList array
    const startIndex = (page - 1) * limit;
    const paginatedList = user.myList.slice(startIndex, startIndex + limit);
    // Separate movies and tv shows
    const movieIds = [];
    const tvShowIds = [];
    paginatedList.forEach((item) => {
        if (item.type === 'movie') {
            movieIds.push(item.itemId);
        }
        else if (item.type === 'tvshow') {
            tvShowIds.push(item.itemId);
        }
    });
    // Fetch detailed movie and tv show information
    const movies = yield Movie_1.default.find({ _id: { $in: movieIds } }).lean();
    const tvShows = yield TvShows_1.default.find({ _id: { $in: tvShowIds } }).lean();
    // Pagination metadata
    const totalItems = user.myList.length;
    const totalPages = Math.ceil(totalItems / limit);
    return {
        movies,
        tvShows,
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
            hasNextPage: startIndex + limit < totalItems,
            hasPreviousPage: page > 1,
        },
    };
});
exports.listItems = listItems;
// Remove an item from the list
const removeItem = (userId, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const user = yield User_1.default.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    // Check if the item exists in the user's list
    const itemIndex = user.myList.findIndex((item) => item.itemId.equals(contentId));
    if (itemIndex === -1) {
        throw new Error('Item not found in the list');
    }
    // Remove the item from the list
    user.myList.splice(itemIndex, 1);
    // Save the updated user document
    yield user.save();
    return { success: true, message: 'Item removed successfully' };
});
exports.removeItem = removeItem;
//# sourceMappingURL=myListController.js.map