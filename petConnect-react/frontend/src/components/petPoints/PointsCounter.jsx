import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PointsCounter({ points }) {
  const [petPoints, setPetPoints] = useState(points);

  const incrementPoints = () => {
    setPetPoints(petPoints + 1);
  };

  return (
    <div>
      <h1>Points: {petPoints}</h1>
      <button onClick={incrementPoints}>Earn Points</button>
    </div>
  );
}

PointsCounter.propTypes = {
  points: PropTypes.number.isRequired,
};