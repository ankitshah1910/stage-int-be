import express from 'express';
import { getMovies, getTVShows } from '../controllers/mediaController';

const router = express.Router();

// Get paginated movies
router.get('/movies', getMovies);

// Get paginated TV shows
router.get('/tv-shows', getTVShows);

export default router;
