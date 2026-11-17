export interface MovieData {
  id: number;
  title: string;
  posterURL: string;
  imdbId: string;
  category: string;
}

// A class keeps each API record in one consistent shape for the CLI.
export class Movie {
  public readonly id: number;
  public readonly title: string;
  public readonly posterURL: string;
  public readonly imdbId: string;
  public readonly category: string;

  public constructor(data: MovieData) {
    this.id = data.id;
    this.title = data.title;
    this.posterURL = data.posterURL;
    this.imdbId = data.imdbId;
    this.category = data.category;
  }

  public printSummary(number: number): void {
    console.log(`${number}. ${this.title} [${this.category}]`);
  }

  public printDetails(): void {
    console.log(`\n${this.title}`);
    console.log(`Category: ${this.category}`);
    console.log(`Catalog ID: ${this.id}`);
    if (this.imdbId.length > 0) {
      console.log(`IMDb: https://www.imdb.com/title/${this.imdbId}/`);
    }
    if (this.posterURL.length > 0) {
      console.log(`Poster: ${this.posterURL}`);
    }
  }
}
