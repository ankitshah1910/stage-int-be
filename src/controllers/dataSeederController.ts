// seedDataController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import Movie from '../models/Movie';
import TVShow from '../models/TvShows';
import { generateRandomMovie, generateRandomTVShow } from '../faker/randomDataGenerator';
import redisClient from '../config/redisClient';

const DATA_SEEDER_API_URL = process.env.SEEDER_API_URL;
const API_KEY = process.env.SEEDER_API_KEY;

export const seedData = async (req: Request, res: Response) => {
    const apiKey = req.headers['x-api-key'];

    // Check if the provided API key matches & seeder api url exists
    if (apiKey !== API_KEY || !DATA_SEEDER_API_URL) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // Fetch data from the Stage API
        const response = await axios.get(DATA_SEEDER_API_URL);
        const allContent = response.data.data.allContent.docs;

        const movies: any[] = [];
        const tvShows: any[] = [];

        allContent.forEach((item: any) => {
            const isMovie = Math.random() < 0.5; // 50% chance for movie or TV show
            const posterUrl = item.thumbnail.vertical.ratio1.sourceLink;

            if (isMovie) {
                const movie = {
                    ...generateRandomMovie(),
                    title: item.title, // Use the title from API
                    posterUrl, // Use the poster URL from API
                };
                movies.push(movie);
            } else {
                const tvShow = {
                    ...generateRandomTVShow(),
                    title: item.title, // Use the title from API
                    posterUrl, // Use the poster URL from API
                };
                tvShows.push(tvShow);
            }
        });

        // Seed Movies into the database
        await Movie.insertMany(movies);

        // Seed TV Shows into the database
        await TVShow.insertMany(tvShows);

        // Clear cache for movies and TV shows
        const cacheKeyMovies = 'movies:*'; // Use wildcard for all pages
        const cacheKeyTVShows = 'tvshows:*'; // Use wildcard for all pages

        // Get all keys matching the pattern
        const keysMovies = await redisClient.keys(cacheKeyMovies);
        const keysTVShows = await redisClient.keys(cacheKeyTVShows);

        // Delete all matching keys
        await Promise.all([
            ...keysMovies.map((key) => redisClient.del(key)),
            ...keysTVShows.map((key) => redisClient.del(key)),
        ]);

        return res.status(200).json({ message: 'Data seeded successfully and cache cleared' });
    } catch (error) {
        console.error('Error seeding data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};