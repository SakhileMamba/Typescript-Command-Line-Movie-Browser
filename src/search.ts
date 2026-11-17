import type { Movie } from "./movie.js";

// The base case stops at the end of the list; each step checks one title.
export function searchRecursively(
  movies: Movie[],
  query: string,
  index = 0,
  matches: Movie[] = [],
): Movie[] {
  if (index >= movies.length) {
    return matches;
  }

  const movie = movies[index];
  if (movie.title.toLowerCase().includes(query.toLowerCase())) {
    matches.push(movie);
  }

  return searchRecursively(movies, query, index + 1, matches);
}
