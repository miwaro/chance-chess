import React from "react";
import PropTypes from "prop-types";
import Card from '../Card';
import '../../style/components/player2.scss';

const Player2 = (props) => {
    return (
        <div className="player2">
            {props.cards.map((card, i) => (
                <div>
                    <Card
                        cardIndex={card.index}
                        suits={card.suits}
                        card={card.card}
                        front={props.front}
                        color={card.color}
                        cardPiece={card.correspondingPiece}
                        cardFile={card.correspondingFile}
                    />
                </div>
            ))}
        </div>
    );
};

Player2.propTypes = {
    shuffle: PropTypes.func,
    dealOneCard: PropTypes.func,
    flip: PropTypes.func,
    deckArray: PropTypes.array
};

export default Player2;
