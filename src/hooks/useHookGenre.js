import {useState, useEffect} from 'react';
import axios from 'axios';

const useHookGenre = () => {
  const [dataGenre, setDataGenre] = useState([]); // Değişiklik burada
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: {language: 'en'},
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmZhNzNmNGY2N2ZkOGZiOTFlNzdiNTE5Y2Q0ODQ0ZiIsInN1YiI6IjYyNzZjYjQ2Mzk0YTg3MDBhMTg5ZWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kq4WwZtSZydcuBwF1ygTYgCw-9NVPrO1rTDDww00Mec',
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setDataGenre(response.data?.genres);
      console.log(response.data?.genres);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      console.log(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {dataGenre, isLoading, error, refetch};
};

export default useHookGenre;
