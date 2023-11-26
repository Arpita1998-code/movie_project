import React, { useEffect, useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const apiKey = '1a85467aa576e7e8ec1d09bc874e5c20';
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
    

    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
    }
  

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => 
        setMovies(data.results))
      .catch((error) => 
        console.log('Error fetching data:', error));
  }, [searchQuery]); 

  const handleSearch= (event) =>{
    setSearchQuery(event.target.value);
  };

  const filteredMovies= movies.filter((movie)=>
  movie.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className='movie'>
      <h1>Movie List</h1>
      
      
      <div className='search'>
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchQuery}
        onChange={handleSearch}/>
      </div>
      
      <div className='movieList'>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movieCard">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} height={400} width={300} />
            <h2>{movie.title}</h2>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;