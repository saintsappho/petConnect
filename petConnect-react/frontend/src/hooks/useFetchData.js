import axios from 'axios';
import { useEffect } from 'react';

const useFetchData = (url, target, setData, setError) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        console.log(`useFetchData got this data from ${target || url}:`, response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching data from ${target || url}:`, error.message);
        setError(error.message);
      }
    }

    fetchData();
  }, [url, target, setData, setError]);
};

export default useFetchData;
