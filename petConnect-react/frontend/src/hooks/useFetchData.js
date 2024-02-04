import axios from 'axios';
import { useEffect } from 'react';

// Custom hook to fetch data from a URL and set it in state
// if using this hook, these states are required
// const [posts, setPosts] = useState([]);
// const [error, setError] = useState(null);
const useFetchData = (url, target, setData, setError) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        console.log(`useFetchData got this data from ${target || url}:`, response.data);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${target || url}:`, error.message);
        setError(error.message);
      }
    }

    fetchData();
  }, [url, target, setData, setError]);
};

export default useFetchData;
