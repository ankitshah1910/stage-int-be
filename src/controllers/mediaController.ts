import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';
import TVShow from '../models/TvShows';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        const [movies, totalMovies] = await Promise.all([
            Movie.find().skip(skip).limit(limit).lean(),
            Movie.countDocuments(),
        ]);
    
        return res.status(200).json({
            page,
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies,
            data: movies,
        });
    } catch (error) {
        return next(error);
    }
};

export const getTVShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;


        const [tvShows, totalTVShows] = await Promise.all([
            TVShow.find().skip(skip).limit(limit).lean(),
            TVShow.countDocuments(),
        ]);

        return res.status(200).json({
            page,
            totalPages: Math.ceil(totalTVShows / limit),
            totalTVShows,
            data: tvShows,
        });
    } catch (error) {
        return next(error);
    }
};