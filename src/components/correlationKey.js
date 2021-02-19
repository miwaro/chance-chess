import React from 'react'
import '../style/components/key.scss';

function correlationKey() {
    return (
        <div className='key-container'>
            <h1 className="title">Key</h1>

            <ul className="col-1">
                <li>Card</li>
                <li>Ace</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>Jack</li>
                <li>Queen</li>
                <li>King</li>
            </ul>

            <ul className="col-2">
                <li>Piece</li>
                <li>A pawn</li>
                <li>B pawn</li>
                <li>C pawn</li>
                <li>D pawn</li>
                <li>E pawn</li>
                <li>F pawn</li>
                <li>G pawn</li>
                <li>H pawn</li>
                <li>Rooks</li>
                <li>Knights</li>
                <li>Bishops</li>
                <li>Queen</li>
                <li>King</li>
            </ul>

        </div>
    )
}

export default correlationKey
