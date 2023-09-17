import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
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
  const fetchMoviesHandler = useCallback(async () => {
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
      //const response = await fetch("https://swapi.dev/api/films/");
      const response = await fetch(
        "https://react-http-25d42-default-rtdb.firebaseio.com/movies.json"
      );

      //check status
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      //for POST
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      //for GET
      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });

      //setMovies(transformedMovies);
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  //POST
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-25d42-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
