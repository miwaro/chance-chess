import React from 'react'
import '../style/components/key.scss';

function correlationKey() {
    return (
        <div className='key-container'>
            <ul className="col-1">
                <li>Card 🃏</li>
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
                <li>Piece ♟</li>
                <li>a pawn</li>
                <li>b pawn</li>
                <li>c pawn</li>
                <li>d pawn</li>
                <li>e pawn</li>
                <li>f pawn</li>
                <li>g pawn</li>
                <li>h pawn</li>
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
