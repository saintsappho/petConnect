/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import useFetchData from "../../../hooks/useFetchData";
import React, { useState, useEffect } from "react";
import axios from "axios";
//components
import PollChoice from "./_PollChoice";

export default function Poll(props) {
  const { randomImage, petPost } = props;
  const [pollData, setPollData] = useState(null);
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);
  const [renderedChoices, setRenderedChoices] = useState(null);
  const [selected, setSelected] = useState(null);
  // console.log("Poll petPost: ", petPost);
  // console.log("pollData: ", pollData);

  useEffect(() => { // Fetch poll data
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/polls/${petPost.post_id}`,
        );
        console.log(`useFetchData got this data from polls`, response.data);
        setPollData(response.data);
        setChoices(response.data.choices);
      } catch (error) {
        console.error(`Error fetching data from polls`, error.message);
        setError(error.message);
      }
    }
    fetchData();
  }, [petPost.post_id]);

  useEffect(() => { // Render choices and buttons
    console.log("choices: ", choices);
    console.log("selected: ", selected);
    const renderedChoices = choices.map((choice) => (
      <PollChoice
        key={choice.choice_id}
        choice={choice}
        onSelect={handleSelectChoice}
        isSelected={selected === choice.choice_id}
      />
    ));
    setRenderedChoices(renderedChoices);
  }, [choices, selected]);

  const handleSelectChoice = (choice_ID) => {
    setSelected(choice_ID);
  };

  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={randomImage()}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <h2 className="card__title">{petPost.title}</h2>
          <div className="card__choices">{renderedChoices}</div>
          <a className="card__button">Vote Now!</a>
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
