/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export default function PollChoice (props) {
  const { choice, isSelected, onSelect } = props;
  const handleClick = () => {
    onSelect(choice.choice_id);
  };

  return (
    <button
      key={choice.choice_id}
      className={`card__choice ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {choice.choicetext}
    </button>
  );
};

