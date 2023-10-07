import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '36fa73f4f67fd8fb91e77b519cd4844f';

const useHookSearch = async (search, movies) => {
  console.log('fetch movies', search);
  if (!search) {
    const response = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
    return [...movies, ...response.data.results];
  } else {
    console.log('in else');
    const response = await axios.get(
      `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`,
    );
    return [...response.data.results];
  }
};

export default useHookSearch;
