import React from 'react'

function Rules() {
    return (
        <div>
            <h3>How to Play</h3>
            <ol>
                <li>Click "Start Game"</li>
                <li>Click on one of your cards to select a card</li>
                <li>Click on "Key" to see which piece your card corresponds with</li>
                <li>If you have a "Combo", click the "Select All" button to play your combo</li>
                <li>If none of your cards can move, click the "Discard All" button to discard your cards and lose your turn</li>
                <li>Move your piece</li>
            </ol>
            <h3>Objective</h3>
            <p>Capture the King! Checks and checkmates are not a part of Chance Chess.</p>
            <h3>Rule Changes</h3>
            <p>No en passant</p>
            <p>The pawn will only promote to Queen</p>

            <h3>About</h3>
            <p>Chance Chess is a lot like chess but the cards you draw dictate which pieces can move which adds a significant amount of
            chance to arguably the most skilled game that exists.
            </p>

            <h3>Tips</h3>
            <p>Observe the cards your opponent has and plan accordingly</p>
            <p>You can be a lot more agressive in your attacks in this game as opposed to regular chess.</p>

        </div>
    )
}

export default Rules
