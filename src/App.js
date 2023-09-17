import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //get Data
  // function fetchMoviesHandler() {
  //   //default is GET, returns a Promise
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       //1. get response in JSON Object
  //       return response.json();
  //     })
  //     .then((data) => {
  //       //2. get particular data from it
  //       //transform the data ex) opening_craw -> openingText
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });

  //       setMovies(transformedMovies);
  //     });
  // }

  //Another way rather than using then() => async, await
  async function fetchMoviesHandler() {
    //set loading
    setIsLoading(true);

    //initialize Error
    setError(null);

    /*
      check error

      async / await => try catch
      then() => catch()
    */
    try {
      //returns promise
      const response = await fetch("https://swapi.dev/api/films/");

      //check status
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  //handle multiple states
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
