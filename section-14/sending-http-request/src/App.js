import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // promise version
  // const fetchMoviesHandler = () => {
  //   fetch('https://swapi.dev/api/films/')
  //   .then(response => {
  //     return response.json();    
  //   })
  //   .then(data => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       };
  //     });
  //     setMovies(transformedMovies);
  //   });
  // }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-24f57-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // async await version
  // const fetchMoviesHandler = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films/');
  //     if (!response.ok) {
  //       throw new Error('Something went wrong!');
  //     }

  //     const data = await response.json();

  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       };
  //     });
  //     setMovies(transformedMovies);
  //   } catch(error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-24f57-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }      

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
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
