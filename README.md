# Overview

Movie Browser is a small terminal program for searching movie titles and viewing basic information. It uses the movie lists from SampleAPIs and practices TypeScript classes, typed lists, recursive functions, asynchronous requests, and exception handling.

The program loads movie lists, searches titles, and lets you select a result to see its category, IMDb link, and poster URL.

[Software Demo Video](https://www.loom.com/share/0daf62bb255d4117932e80b0f08370bf)


# Development Environment

The project uses Node.js, TypeScript, and a terminal. TypeScript is compiled with `tsc`. The program uses Node's built-in `readline/promises` module for prompts and the built-in `fetch` function for API requests. It does not need a runtime library for its command-line interface.

The `Movie` class represents each API record. Search results are kept in a typed array. The catalog asynchronously fetches the movie categories, and a recursive function checks each title for a match. HTTP and data errors are thrown and handled with a message in the terminal.

## Running the program

The movie data comes from SampleAPIs, a learning API that does not require an account, API key, or payment card. Its movie data is for educational use and may reset or change.

1. Install Node.js 18 or newer.
2. Install the project dependencies and compile the TypeScript files:

   ```sh
   npm install
   npm run build
   ```

3. Start the program:

   ```sh
   npm start
   ```

# Useful Websites

- [SampleAPIs movie lists](https://www.sampleapis.com/api-list/movies)
- [SampleAPIs project and no-auth usage guide](https://github.com/jermbo/sampleapis)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js documentation](https://nodejs.org/docs/latest/api/)

# Future Work

- Add a filter to search within a selected category.
- Add release years if the movie data source provides them.
- Save favorite movie titles to a local file.
