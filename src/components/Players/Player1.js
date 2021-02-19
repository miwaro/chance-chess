import React from "react";
import PropTypes from "prop-types";
import PlayerCard from './PlayerCard';
// import Button from '@material-ui/core/Button';
import Key from '../keySidebar'
import '../../style/components/player1.scss';


const Player1 = (props) => {
  return (
    <>
      <div className="player1">
        <PlayerCard />
        <button style={{ backgroundColor: 'orange' }}>
          Discard All Cards
        </button>
        <Key />
      </div>

    </>
  );
};

Player1.propTypes = {
  shuffle: PropTypes.func,
  dealOneCard: PropTypes.func,
  flip: PropTypes.func,
  deckArray: PropTypes.array
};

export default Player1;
