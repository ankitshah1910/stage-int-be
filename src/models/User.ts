import mongoose, { Schema, Document, Types } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface WatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

interface MyListItem {
  itemId: Types.ObjectId;
  type: 'movie' | 'tvshow';
  addedOn: Date;
}

interface UserDocument extends Document {
  name:string;
  username: string;
  password: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: WatchHistory[];
  myList: MyListItem[];
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }]
  },
  
  watchHistory: [
    {
      contentId: { type: String },
      watchedOn: { type: Date },
      rating: { type: Number }
    }
  ],
  myList: [
    {
      itemId: { type: Types.ObjectId, required: true },
      type: { type: String, enum: ['movie', 'tvshow'], required: true },
      addedOn: { type: Date, default: Date.now },
    }
  ]
});

const User = mongoose.model<UserDocument>('User', userSchema);


export default User;