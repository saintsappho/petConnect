import axios from 'axios';

const useFetchData = async (url, target) => {
  try {
    const response = await axios.get(url);
    console.log(`fetchData got this data from ${target || url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${target || url}:`, error.message);
  }
};

export default useFetchData;