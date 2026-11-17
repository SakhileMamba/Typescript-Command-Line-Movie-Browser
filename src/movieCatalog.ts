import { Movie } from "./movie.js";
import type { MovieData } from "./movie.js";

interface ApiMovie {
  id?: number;
  title?: string;
  posterURL?: string;
  imdbId?: string;
}

const MOVIE_CATEGORIES = [
  "action-adventure",
  "animation",
  "classic",
  "comedy",
  "drama",
  "horror",
  "family",
  "mystery",
  "scifi-fantasy",
  "western",
] as const;

const API_ROOT = "https://api.sampleapis.com/movies";

export class MovieCatalog {
  public async loadMovies(): Promise<Movie[]> {
    // Download the available categories together so the user waits only once.
    const categoryLists = await Promise.all(
      MOVIE_CATEGORIES.map((category) => this.loadCategory(category)),
    );

    // Some titles can appear in more than one category; keep one copy of each.
    const uniqueMovies = new Map<string, Movie>();
    for (const movies of categoryLists) {
      for (const movie of movies) {
        const key = movie.imdbId || `${movie.category}:${movie.id}`;
        uniqueMovies.set(key, movie);
      }
    }

    if (uniqueMovies.size === 0) {
      throw new Error("The movie service returned no movie records.");
    }

    return [...uniqueMovies.values()].sort((first, second) =>
      first.title.localeCompare(second.title),
    );
  }

  private async loadCategory(category: string): Promise<Movie[]> {
    const response = await fetch(`${API_ROOT}/${category}`);
    if (!response.ok) {
      throw new Error(`Could not load the ${category} list (${response.status}).`);
    }

    const records: unknown = await response.json();
    if (!Array.isArray(records)) {
      throw new Error(`The ${category} endpoint did not return a list.`);
    }

    return records
      .filter((record: unknown): record is ApiMovie => this.isApiMovie(record))
      .map((record: ApiMovie) => this.toMovie(record, category));
  }

  private isApiMovie(record: unknown): record is ApiMovie {
    if (typeof record !== "object" || record === null) {
      return false;
    }

    const candidate = record as ApiMovie;
    return typeof candidate.title === "string";
  }

  private toMovie(record: ApiMovie, category: string): Movie {
    const data: MovieData = {
      id: record.id ?? 0,
      title: record.title ?? "Untitled",
      posterURL: record.posterURL ?? "",
      imdbId: record.imdbId ?? "",
      category: category.replaceAll("-", " "),
    };

    return new Movie(data);
  }
}
