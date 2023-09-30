import {useState, useEffect} from 'react';
import axios from 'axios';

const useHookTrend = () => {
  const [dataTrend, setDataTrend] = useState([]);
  const [isLoadingTrend, setIsLoading] = useState(false);
  const [errorTrend, setError] = useState(null);
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {language: 'en-US', page: '1'},
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
      setDataTrend(response.data?.results);
      //console.log(response.data?.results);
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

  return {dataTrend, isLoadingTrend, errorTrend, refetch};
};

export default useHookTrend;
