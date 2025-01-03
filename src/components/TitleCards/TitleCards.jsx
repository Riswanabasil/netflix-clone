import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'
import { useMovies } from '../../context/MovieContext';



const TitleCards = ({title, category}) => {
// const[apiData, setApiData]=useState([])

//   const cardsRef=useRef()
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDRjZWY1MDlhNGM3ZjZiZTllY2I4NDNjYmVkY2E5NiIsIm5iZiI6MTczNDMzNjI3MC45NTIsInN1YiI6IjY3NWZkZjBlZTMzNjBjNDNiNmJlYWE4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SQAPJru9sR2_soKBimHKWeaPnEvcMR16zPoNE239NXA'
//     }
//   };
 

// const handleWheel=(event)=>{
//   event.preventDefault()
//   cardsRef.current.scrollLeft += event.deltaY;
// }

// useEffect(()=>{
//    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
//     .then(res => res.json())
//     .then(res => setApiData(res.results))
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

//   cardsRef.current.addEventListener('wheel',handleWheel)
// },[])

const { movies, fetchMoviesByCategory } = useMovies(); 
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetchMoviesByCategory(category);

    const ref = cardsRef.current;
    ref.addEventListener('wheel', handleWheel);
    return () => ref.removeEventListener('wheel', handleWheel);
  }, [category, fetchMoviesByCategory]);

  return (
    <div className='titlecards'>
      {/* <h2>{title?title:"Popular on Netflix"}</h2> */}
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
       {/* {apiData.map((card,index)=>{
        return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.poster_path} alt=''/>
          <p>{card.original_title}</p>
        </Link>
       })} */}

{movies[category]?.map((movie) => (
          <Link to={`/player/${movie.id}`} className="card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
            <p>{movie.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
