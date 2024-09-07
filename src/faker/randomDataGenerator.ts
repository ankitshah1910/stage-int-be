import { faker } from '@faker-js/faker';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

const genres: Genre[] = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'];

export const getRandomGenre = (): Genre[] => {
    const randomCount = Math.floor(Math.random() * genres.length) + 1; // Random count between 1 and total genres
    const selectedGenres = new Set<Genre>();

    while (selectedGenres.size < randomCount) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        selectedGenres.add(randomGenre);
    }

    return Array.from(selectedGenres);
};

export const generateRandomMovie = () => {
    return {
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        genres: getRandomGenre(),
        releaseDate: faker.date.past(),
        director: faker.person.fullName(),
        actors: [faker.person.fullName(), faker.person.fullName(), faker.person.fullName()], // Random 3 actors
        posterUrl: 'update_later',
    };
};

export const generateRandomTVShow = () => {
    const numberOfEpisodes = Math.floor(Math.random() * 10) + 1; // Random number of episodes

    const episodes = Array.from({ length: numberOfEpisodes }, (_, index) => ({
        episodeNumber: index + 1,
        seasonNumber: Math.floor(Math.random() * 5) + 1, // Random season between 1 and 5
        releaseDate: faker.date.past(),
        director: faker.person.fullName(),
        actors: [faker.person.fullName(), faker.person.fullName(), faker.person.fullName()], // Random 3 actors
        duration: Math.floor(Math.random() * 60) + 20, // Duration between 20 and 80 minutes
    }));

    return {
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        genres: getRandomGenre(),
        posterUrl: 'update_later',
        language: faker.helpers.arrayElement(['Hindi', 'Haryanvi', 'Rajasthani', 'Maithili']),
        rating: Math.random() * 10, // Random rating between 0 and 10
        isAvailable: Math.random() < 0.5, // Random availability
        episodes,
    };
};