/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function EventPost(props) {
  const { handleSubmit, handlePostStateChange, postState } = props;
  const { title, content } = postState;
  const [numChoices, setNumChoices] = useState(2);
  const [choice, setChoice] = useState([]);

  const htmlchoices = [];
  for (let i = 0; i < numChoices; i++) {
    htmlchoices.push(
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id={"choice" + [i]}
            value={choice[i]}
            onChange={() => {
              handlePostStateChange(event, ("choice" + [i]));
            }}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="new-choice">Option</label>
        </div>
      </div>,
    );
  }
  const handlePlusClick = () => {
    setNumChoices(numChoices + 1);
  };
  const handleMinusClick = () => {
    setNumChoices(numChoices - 1);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-question"
            className="input-data"
            value={title}
            onChange={() => {
              handlePostStateChange(event, "title");
            }}
            rows="8"
            cols="20"
            required
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="new-title">Question:</label>
        </div>
      </div>
      <div className="form-row">
        {htmlchoices}
      </div>
        <div>
          <button className="bubbly-button more" onClick={handlePlusClick}>
            Add an Option
          </button>
          {numChoices > 2 && (
            <button className="bubbly-button less" onClick={handleMinusClick}>
              Remove an Option
            </button>
          )}
        </div>
        <br/>
        <button className="bubbly-button submit" type="submit">
          Post!
        </button>
    </form>
  );
}
