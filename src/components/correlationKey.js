
import React from 'react'
import '../style/components/key.scss';

function correlationKey() {
    return (
        <>
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
                    <li>Joker</li>
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
                    <li>Any Piece</li>
                </ul>
            </div>
            <h2 style={{ color: 'white', textAlign: 'center', background: 'linear-gradient(90deg, #123709 0%, #277714 24%, #33b115 85%)' }}>Combos</h2>
            <p style={{ textAlign: 'center' }}>Click the "Select All" button to activate</p>
            <div className='key-container'>
                <ul className="col-1">
                    <li>Flush</li>
                    <li>3 ♣'s</li>
                    <li style={{ color: 'red' }}>3 ♦'s</li>
                    <li>3 ♠'s</li>
                    <li style={{ color: 'red' }}>3 ♥'s</li>
                </ul>
                <ul className="col-2">
                    <li>Piece ♟</li>
                    <li>Knights</li>
                    <li>Bishops</li>
                    <li>Rooks or King</li>
                    <li>Queen</li>
                </ul>
            </div>

            <div className='key-container' style={{ marginTop: '20px' }}>
                <ul className="col-1">
                    <li>Straight</li>
                    <li>E.g. (A, 2, 3)</li>

                </ul>
                <ul className="col-2">
                    <li>Piece ♟</li>
                    <li>King or Any Pawn</li>
                </ul>
            </div>

            <div className='key-container' style={{ marginTop: '20px' }}>
                <ul className="col-1">
                    <li>3 of a kind</li>
                    <li>E.g. (5, 5, 5) </li>

                </ul>
                <ul className="col-2">
                    <li>Piece ♟</li>
                    <li>Knight, Bishop, or Rook</li>
                </ul>
            </div>

            <div className='key-container' style={{ marginTop: '20px' }}>
                <ul className="col-1">
                    <li>Straight Flush</li>
                    <li>E.g. (10d, Jd, Qd) </li>

                </ul>
                <ul className="col-2">
                    <li>Piece ♟</li>
                    <li>Any Piece</li>
                </ul>
            </div>

            {/* <p>Although 3 of a kind is easier to get in Poker, it is more difficult to get in this game and therefore has a greater reward.</p> */}
            <p>The probability of getting each combo is not equivalent to the probablity in Poker.</p>
        </>
    )
}

export default correlationKey

