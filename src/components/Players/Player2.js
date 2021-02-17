import React from "react";
import PropTypes from "prop-types";
import PlayerCard from './PlayerCard';

const Player2 = (props) => {
    return (
        <>
            <PlayerCard />
            <button>Withdraw All Cards and Lose Turn</button>
        </>
    );
};

Player2.propTypes = {
    shuffle: PropTypes.func,
    dealOneCard: PropTypes.func,
    flip: PropTypes.func,
    deckArray: PropTypes.array
};

export default Player2;
