import User from '../models/User';
import Movie from '../models/Movie';
import TVShow from '../models/TvShows';
import { Types } from 'mongoose';

interface AddItemParams {
  userId: string;
  itemId: string;
  type: 'movie' | 'tvshow';
}

// Add an item to the user's list
export const addItem = async ({ userId, itemId, type }: AddItemParams) => {
  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Validate the item based on type
  let item;
  if (type === 'movie') {
    item = await Movie.findById(itemId).lean();
    if (!item) {
      throw new Error('Movie not found');
    }
  } else if (type === 'tvshow') {
    item = await TVShow.findById(itemId).lean();
    if (!item) {
      throw new Error('TV Show not found');
    }
  } else {
    throw new Error('Invalid item type');
  }

  // Check if the item is already in the user's list to avoid duplicates
  const isItemInList = user.myList.some((listItem) => listItem.itemId.equals(new Types.ObjectId(itemId)) && listItem.type === type);
  if (isItemInList) {
    throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} is already in the list`);
  }

  user.myList.push({
    itemId: new Types.ObjectId(itemId),
    type,
    addedOn: new Date() // Set the current date when the item is added
  });

  // Save the user document
  await user.save();
  return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} added to the list` };
};

interface ListItemsParams {
  userId: string;
  page: number;
  limit: number;
}

// List items in the user's list
export const listItems = async ({ userId, page, limit }: ListItemsParams) => {
  const user = await User.findById(userId).lean(); // Use lean() for performance
  if (!user) {
    throw new Error('User not found');
  }

  // Paginate the user's myList array
  const startIndex = (page - 1) * limit;
  const paginatedList = user.myList.slice(startIndex, startIndex + limit);

  // Separate movies and tv shows
  const movieIds: Types.ObjectId[] = [];
  const tvShowIds: Types.ObjectId[] = [];

  paginatedList.forEach((item) => {
    if (item.type === 'movie') {
      movieIds.push(item.itemId);
    } else if (item.type === 'tvshow') {
      tvShowIds.push(item.itemId);
    }
  });

  // Fetch detailed movie and tv show information
  const [movies, tvShows] = await Promise.all([
    Movie.find({ _id: { $in: movieIds } }).lean(),
    TVShow.find({ _id: { $in: tvShowIds } }).lean(),
  ]);

  // Pagination metadata
  const totalItems = user.myList.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: [
      ...movies,
      ...tvShows
    ],
    totalItems,
    totalPages,
    currentPage: page,
  };
};

// Remove an item from the list
export const removeItem = async (userId: string, contentId: string) => {
  // Check if the user exists
  const user = await User.findById(userId);
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
  await user.save();

  return { success: true, message: 'Item removed successfully' };
};