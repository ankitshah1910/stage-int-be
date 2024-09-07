import mongoose, { Schema, Document } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface MovieDocument extends Document {
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
  posterUrl: string;
}

const movieSchema = new Schema<MovieDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
  posterUrl: { type: String, required: true },
});

const Movie = mongoose.model<MovieDocument>('Movie', movieSchema);

export default Movie;