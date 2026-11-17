import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { MovieCatalog } from "./movieCatalog.js";
import type { Movie } from "./movie.js";
import { searchRecursively } from "./search.js";

const prompt = createInterface({ input: stdin, output: stdout });

function showMenu(): void {
  console.log("\n=== Movie Browser ===");
  console.log("1. Search movies");
  console.log("2. Quit");
}

async function searchMovies(movies: Movie[]): Promise<void> {
  const title = (await prompt.question("Enter a movie title: ")).trim();
  if (title.length === 0) {
    console.log("Enter a title to search.");
    return;
  }

  const matches = searchRecursively(movies, title);
  if (matches.length === 0) {
    console.log("No matching movies were found.");
    return;
  }

  console.log(`\nFound ${matches.length} matching movie(s):`);
  matches.forEach((movie, index) => movie.printSummary(index + 1));

  const answer = (await prompt.question("Select a result number for details, or press Enter: ")).trim();
  if (answer.length === 0) {
    return;
  }

  const selectedNumber = Number(answer);
  if (!Number.isInteger(selectedNumber) || selectedNumber < 1 || selectedNumber > matches.length) {
    console.log("That result number is not in the list.");
    return;
  }

  matches[selectedNumber - 1].printDetails();
}

async function main(): Promise<void> {
  const catalog = new MovieCatalog();
  let movies: Movie[];

  try {
    console.log("Loading movie lists from SampleAPIs...");
    movies = await catalog.loadMovies();
  } catch (error: unknown) {
    // A failed request is reported clearly instead of stopping with a stack trace.
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    console.log(`Could not load the movie list: ${message}`);
    return;
  }

  console.log(`Loaded ${movies.length} movies. Search by title or choose quit.`);
  while (true) {
    showMenu();
    const choice = (await prompt.question("Choose 1 or 2: ")).trim();

    if (choice === "2") {
      console.log("Goodbye.");
      return;
    }

    if (choice === "1") {
      await searchMovies(movies);
    } else {
      console.log("Choose 1 to search or 2 to quit.");
    }
  }
}

main()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error(message);
  })
  .finally(() => prompt.close());
