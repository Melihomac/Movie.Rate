import {useState, useEffect} from 'react';
import axios from 'axios';

const useHookGenre = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/genre/movie/list',
    headers: {
      'X-RapidAPI-Key': '53dab87401mshda9821260d66b44p15a68bjsn21d8732943c4',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
    },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      console.log(response.data);
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

  return {data, isLoading, error, refetch};
};

export default useHookGenre;
