import React from 'react'

function Rules() {
    return (
        <div>
            <h3>How to Play</h3>
            <ol>
                <li>Click the Plus icon next to the deck to get your cards</li>
                <li>Click on one of your cards to select a card</li>
                <li>Click on the Key icon to see which piece your card corresponds with</li>
                <li>If you have a "Combo", click the "Select All" button to play your combo (check the "Key Icon" to see the combos)</li>
                <li>If none of your cards can move or you want all new cards on your next turn, click the "Discard All" button to discard your cards and lose your turn</li>
                <li>Additionally, you may "select" and "discard" an individual card which also results in the end of your turn (This may help you achieve a combo)</li>
                <li>Move your piece</li>
            </ol>
            <h3>Objective</h3>
            <p>Capture the King! (Checks and checkmates are not a part of Chance Chess.)</p>
            <h3>Differences from regular Chess</h3>
            <ol>
                <li>No checks</li>
                <li>No checkmates</li>
                <li>No stalemates</li>
                <li>No en passant</li>
                <li>Pawns only promote to a Queen</li>
                <li>Draws are basically impossible</li>
            </ol>
            <h3>About</h3>
            <p>Chance Chess is a lot like chess but the cards you draw determine which pieces can move. This adds a significant amount of
                chance to arguably the most skilled game that exists, but do not be mistaken, there is still plenty of skill involved.
            </p>

            <h3>Tips</h3>
            <p>You may not always want to draw a card, as this gives your opponent more information.</p>
            <p>Observe the cards your opponent has and plan accordingly.</p>
            <p>You can be more agressive in your attacks in this game as opposed to regular chess since you often know your opponent's potential moves.</p>
            <p>Only one deck is used, so counting cards can be used to your benefit.  For example, if there have been 3 knight moves, then you know there's only one "10" left in the deck.</p>

            <h3>Other</h3>
            <p>If you really enjoy this game, please feel free to buy me a cup of coffee. Donations can me made at the bottom of the screen.</p>
        </div>
    )
}

export default Rules
