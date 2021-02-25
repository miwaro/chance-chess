// import React, { useState } from "react";
import React from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import '../style/components/actionButtons.scss'


function ActionButtons(props) {

    return (
        <div className="actions">
            {props.player1Cards.length > 0 &&
                <Button style={{ backgroundColor: 'orange' }}>
                    Discard All Cards
            </Button>
            }
            {props.player1Cards.length > 0 &&
                <Button onClick={() => props.flip()} style={{ backgroundColor: 'orange', margin: '0 10px' }}>
                    Flip Cards
            </Button>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard
    }
}

export default connect(mapStateToProps, null)(ActionButtons);
