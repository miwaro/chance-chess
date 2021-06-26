import React from 'react';
// import { connect } from 'react-redux';

import whitePawnImg from "../style/images/chessPieces/white/pawn.png";
import whiteRookImg from "../style/images/chessPieces/white/rook.png";
import whiteKnightImg from "../style/images/chessPieces/white/knight.png";
import whiteBishopImg from "../style/images/chessPieces/white/bishop.png";
import whiteQueenImg from "../style/images/chessPieces/white/queen.png";
import whiteKingImg from "../style/images/chessPieces/white/king.png";

import blackPawnImg from "../style/images/chessPieces/black/blackPawn.png";
import blackRookImg from "../style/images/chessPieces/black/blackRook.png";
import blackKnightImg from "../style/images/chessPieces/black/blackKnight.png";
import blackBishopImg from "../style/images/chessPieces/black/blackBishop.png";
import blackQueenImg from "../style/images/chessPieces/black/blackQueen.png";
import blackKingImg from "../style/images/chessPieces/black/blackKing.png";

function CaptureSidebar(props) {

    const { piecesCaptured: { W, B } } = props;

    let whitePieces = Object.values(W)
    let blackPieces = Object.values(B)
    // logic to display white pawns
    let pawn = whitePieces[0];
    let whitePawns = [pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn];
    let numOfPawns = pawn;
    whitePawns.splice(numOfPawns);

    // display black pawns
    let blackPawn = blackPieces[0];
    let blackPawns = [blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn];
    let numOfBlackPawns = blackPawn;
    blackPawns.splice(numOfBlackPawns);

    // display whiteKnights
    let whiteKnight = whitePieces[1];
    let whiteKnights = [whiteKnight, whiteKnight];
    let numOfKnights = whiteKnight;
    whiteKnights.splice(numOfKnights);

    // display blackKnights
    let blackKnight = blackPieces[1];
    let blackKnights = [blackKnight, blackKnight];
    let numOfBlackKnights = blackKnight;
    blackKnights.splice(numOfBlackKnights);

    // display Bishops
    let whiteBishop = whitePieces[2];
    let whiteBishops = [whiteBishop, whiteBishop];
    let numOfBishops = whiteBishop;
    whiteBishops.splice(numOfBishops);


    let blackBishop = blackPieces[2];
    let blackBishops = [blackBishop, blackBishop];
    let numOfBlackBishops = blackBishop;
    blackBishops.splice(numOfBlackBishops);

    // display Rooks
    let whiteRook = whitePieces[3];
    let whiteRooks = [whiteRook, whiteRook];
    let numOfRooks = whiteRook;
    whiteRooks.splice(numOfRooks);


    let blackRook = blackPieces[3];
    let blackRooks = [blackRook, blackRook];
    let numOfBlackRooks = blackRook;
    blackRooks.splice(numOfBlackRooks);

    // display Queen
    let whiteQueen = whitePieces[4];
    let whiteQueens = [whiteQueen];
    let numOfQueens = whiteQueen;
    whiteQueens.splice(numOfQueens);


    let blackQueen = blackPieces[4];
    let blackQueens = [blackQueen];
    let numOfBlackQueens = blackQueen;
    blackQueens.splice(numOfBlackQueens);

    // display King
    let whiteKing = whitePieces[5];
    let whiteKings = [whiteKing];
    let numOfKings = whiteKing;
    whiteKings.splice(numOfKings);


    let blackKing = blackPieces[5];
    let blackKings = [blackKing];
    let numOfBlackKings = blackKing;
    blackKings.splice(numOfBlackKings);



    return (
        <div style={{ position: 'relative', width: '0', height: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 15px', }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', position: 'absolute', left: '0', top: '318px' }} >
                    <div >
                        {whitePawns.map(pawn => (
                            <img src={whitePawnImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {whiteKnights.map(pawn => (
                            <img src={whiteKnightImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>

                    <div>
                        {whiteBishops.map(pawn => (
                            <img src={whiteBishopImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {whiteRooks.map(pawn => (
                            <img src={whiteRookImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {whiteQueens.map(pawn => (
                            <img src={whiteQueenImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {whiteKings.map(king => (
                            <img src={whiteKingImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                </div>



                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '100px', top: '318px' }}>

                    <div style={{ display: 'flex' }}>
                        {blackPawns.map(pawn => (
                            <div >
                                <img src={blackPawnImg} alt="white-pawn" style={{ height: 34 }} />

                            </div>
                        ))}
                    </div>
                    <div>
                        {blackKnights.map(pawn => (
                            <img src={blackKnightImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>

                    <div>
                        {blackBishops.map(pawn => (
                            <img src={blackBishopImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {blackRooks.map(pawn => (
                            <img src={blackRookImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {blackQueens.map(pawn => (
                            <img src={blackQueenImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                    <div>
                        {blackKings.map(king => (
                            <img src={blackKingImg} alt="white-pawn" style={{ height: 34 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CaptureSidebar;

