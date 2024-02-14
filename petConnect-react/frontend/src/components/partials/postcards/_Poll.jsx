/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import useVoteResults from "../../../hooks/useVoteResults";
import React, { useState, useEffect } from "react";
import axios from "axios";
//components
import PollChoice from "./_PollChoice";

export default function Poll(props) {
  const { randomImage, petPost, user, handleInspect } = props;
  const [pollData, setPollData] = useState(null);
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);
  const [renderedChoices, setRenderedChoices] = useState(null);
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteResults, setVoteResults] = useState(null);
  // console.log("Poll petPost: ", petPost);
  // console.log("pollData: ", pollData);

  useEffect(() => {
    // Fetch poll data
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/polls/${petPost.post_id}`,
        );
        // console.log(`useFetchData got this data from polls`, response.data);
        setPollData(response.data);
        setChoices(response.data.choices);
      } catch (error) {
        console.error(`Error fetching data from polls`, error.message);
        setError(error.message);
      }
    }
    fetchData();
  }, [petPost.post_id]);

  useEffect(() => {
    // Fetch vote results
    async function fetchVoteResults() {
      try {
        const response = await axios.get(
          `http://localhost:8080/polls/${petPost.post_id}/votes`,
        );
        // console.log("Vote results:", response.data);
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
        console.error("Error fetching vote results:", error.message);
        setError(error.message);
      }
    }
    fetchVoteResults();

  }, [voted]);

  // console.log("voteResults: ", voteResults);

  useEffect(() => {
    // Render choices and buttons
    if (voted) {
      const renderedChoices = choices.map((choice) => (
        <div key={choice.choice_id} className="card__choice">
          <p>{choice.choicetext}</p>
          <p>{voteResults.find((result) => result.choice_id === choice.choice_id)?.percentage || 0}% votes</p>
        </div>
      ));
      setRenderedChoices(renderedChoices);
    } else {
      const renderedChoices = choices.map((choice) => (
        <PollChoice
          key={choice.choice_id}
          choice={choice}
          onSelect={handleSelectChoice}
          isSelected={selected === choice.choice_id}
          voted={voted}
        />
      ));
      setRenderedChoices(renderedChoices);
    }
  }, [choices, selected, voted, voteResults]);

  const handleSelectChoice = (choice_ID) => {
    setSelected(choice_ID);
  };

   const submitVote = async () => {
    setVoted(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/polls/${petPost.post_id}/vote`,
        { poll_ID: petPost.post_id, choice_ID: selected, user_ID: 1 },
      );
      console.log("Vote submitted:", response.data);
    } catch (error) {
      console.error("Error submitting vote:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="card">
      {/* <img id="pfp-thumb" src={user.profile_picture} alt="profile pic" /> */}
      <figure className="card__thumb">
        <img
          src={randomImage()}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <h2 className="card__title">{petPost.title}</h2>
          <div onClick={handleInspect} className="user-details">
            <img src={user.profile_picture} alt="profile picture" className="user-profile-picture"></img>
            <h4 className="card__author">{user.username}</h4>
          </div>
          <div className="card__choices">{renderedChoices}</div>
          {!voted ? (
            <a onClick={submitVote} className="card__button">
              Vote Now!
            </a>
          ) : (
            <p>Thanks for voting!</p>
          )}
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}