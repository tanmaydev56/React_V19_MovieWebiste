
import { useEffect, useState } from 'react'
import './App.css'
import Search from './Components/Search'

const api_base_url = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const api_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${api_key}`
}
};
function App() {
const [searchterm,setsearchterm]=useState('');
const [errormsg,seterrormsg]=useState('');
const [movies,setmovies]=useState([]);
const [loading,setloading]=useState(false);
const fetchMovies=async (query)=>{
  try{
     const endpoint = query
        ? `${api_base_url}/search/movie?query=${encodeURIComponent(query)}`
        : `${api_base_url}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,api_options);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if(data.Response === "False"){
      seterrormsg(data.Error||'An unknown error occurred while fetching movies.');
    }else{
      console.log(data.results);
      seterrormsg('');
    }
  }catch(error){
    console.error(`Error fetching movies:",${error}`);
    seterrormsg("Failed to fetch movies. Please try again later.");
  }
};
useEffect(()=>{
 fetchMovies();
},[]);
//only runs when this component loads
  return(
 <main>
  <div className='pattern'/>
  <div className='wrapper'>
    <header>
      <img src="./hero.png" alt="Hero" />

      <h1>Find <span className='text-gradient'>Movies</span>You'll Enjoy Without the Hassle</h1>

    <Search searchterm={searchterm} setsearchterm={setsearchterm}/>
    
    </header>
<section className='all-movies'>
  <h2>All Movies</h2>
  {errormsg && <p className='text-red-500'>{errormsg}</p>}
</section>
  </div>
 </main>
  )
}

export default App
