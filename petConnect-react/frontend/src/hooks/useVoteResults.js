import { useState, useEffect } from 'react';
import axios from 'axios';

const useVoteResults = (pollID) => {
  const [voteResults, setVoteResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/polls/${pollID}/votes`);
        const { choices, votes } = response.data;

        const totalVotes = votes.length;
        const results = choices.map((choice) => {
          const choiceVotes = votes.filter((vote) => vote.choice_id === choice.choice_id).length;
          const percentage = totalVotes === 0 ? 0 : (choiceVotes / totalVotes) * 100;

          return {
            choice_id: choice.choice_id,
            choicetext: choice.choicetext,
            percentage: percentage.toFixed(2),
          };
        });

        setVoteResults(results);
      } catch (error) {
        console.error('Error fetching vote results:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [pollID]);

  return { voteResults, error };
};

export default useVoteResults;
