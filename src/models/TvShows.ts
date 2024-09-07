import mongoose, { Schema, Document } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
  duration: number;
}

interface TVShowDocument extends Document {
  title: string;
  description: string;
  genres: Genre[];
  posterUrl: string;
  language: string;
  rating: number;
  isAvailable: boolean;
  episodes: Episode[];
}

const episodeSchema = new Schema<Episode>({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
  duration: { type: Number, required: true }
});

const tvShowSchema = new Schema<TVShowDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
  posterUrl: { type: String, required: true },
  language: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  episodes: [episodeSchema]
});

const TVShow = mongoose.model<TVShowDocument>('TVShow', tvShowSchema);

export default TVShow;