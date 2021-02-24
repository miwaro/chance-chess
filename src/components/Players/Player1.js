import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import '../../style/components/player1.scss';
import '../../style/components/playerCard.scss';
import Card from '../Card';


const Player1 = (props) => {
  return (
    <div className="player1">
      {props.cards.map((card, i) => (
        <div >
          <Card
            cardIndex={card.index}
            suits={card.suits}
            card={card.card}
            front={true}
            color={card.color}
            cardPiece={card.correspondingPiece}
            cardFile={card.correspondingFile}
          />
        </div>
      ))}
      <Button style={{ backgroundColor: 'orange', height: '36px', marginTop: 'auto' }}>
        Discard All Cards
      </Button>
    </div>
  );
};

Player1.propTypes = {
  shuffle: PropTypes.func,
  dealOneCard: PropTypes.func,
  flip: PropTypes.func,
  deckArray: PropTypes.array
};

export default Player1;
