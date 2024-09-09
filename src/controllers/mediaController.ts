import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';
import TVShow from '../models/TvShows';
import redisClient from '../config/redisClient';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        // Check cache
        const cacheKey = `movies:page:${page}:limit${limit}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData)); // Return cached data
        }

        // Fetch data from the database
        const [movies, totalMovies] = await Promise.all([
            Movie.find().skip(skip).limit(limit).lean(),
            Movie.countDocuments(),
        ]);

        const response = {
            page,
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies,
            data: movies,
        };

        // Cache the response
        await redisClient.set(cacheKey, JSON.stringify(response), 'EX', 3600); // Cache for 1 hour

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

export const getTVShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        // Check cache
        const cacheKey = `tvshows:page:${page}:limit${limit}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData)); // Return cached data
        }

        // Fetch data from the database
        const [tvShows, totalTVShows] = await Promise.all([
            TVShow.find().skip(skip).limit(limit).lean(),
            TVShow.countDocuments(),
        ]);

        const response = {
            page,
            totalPages: Math.ceil(totalTVShows / limit),
            totalTVShows,
            data: tvShows,
        };

        // Cache the response
        await redisClient.set(cacheKey, JSON.stringify(response), 'EX', 3600); // Cache for 1 hour

        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};