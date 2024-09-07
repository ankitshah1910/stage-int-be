"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const episodeSchema = new mongoose_1.Schema({
    episodeNumber: { type: Number, required: true },
    seasonNumber: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    director: { type: String, required: true },
    actors: [{ type: String }],
    duration: { type: Number, required: true }
});
const tvShowSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
    posterUrl: { type: String, required: true },
    language: { type: String, required: true },
    rating: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    episodes: [episodeSchema]
});
const TVShow = mongoose_1.default.model('TVShow', tvShowSchema);
exports.default = TVShow;
//# sourceMappingURL=TvShows.js.map