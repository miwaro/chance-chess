import React from 'react'
import "../../style/components/playerCard.scss";
import Cards from '../../components/Cards';


function PlayerCard() {
    return (
        <>
            <div className="player-card-container">
                <div className="card-slot"><Cards /></div>
                <div className="card-slot"><Cards /></div>
                <div className="card-slot"><Cards /></div>
            </div>
        </>
    )
}

export default PlayerCard;
