export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: number;
}

export const MOVIE_DATA: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop',
    genre: 'Sci-Fi',
    year: 2010,
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop',
    genre: 'Drama',
    year: 1994,
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop',
    genre: 'Crime',
    year: 1994,
  },
];