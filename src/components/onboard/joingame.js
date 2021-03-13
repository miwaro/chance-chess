import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { joinGame } from '../../redux/actions/userActions';
const socket = require('../../connection/socket').socket

/**
 * 'Join game' is where we actually join the game room. 
 */


const JoinGameRoom = (gameId, userName, isCreator) => {
    /**
     * For this browser instance, we want 
     * to join it to a gameRoom. For now
     * assume that the game room exists 
     * on the backend. 
     *  
     * 
     * TODO: handle the case when the game room doesn't exist. 
     */
    const idData = {
        gameId: gameId,
        userName: userName,
        isCreator: isCreator
    }
    console.log(gameId)
    socket.emit("playerJoinGame", idData)
}

const JoinGame = (props) => {
    const { gameId } = useParams()
    if (props.isCreator) localStorage.setItem(gameId, true);
    props.onJoinGame(props.userName, props.isCreator, gameId);
    JoinGameRoom(gameId, props.userName, props.isCreator)
    return (<div></div>)
}

const mapDispatchToProps = dispatch => {
    return {
        onJoinGame: (username, isCreator, gameId) => dispatch(joinGame(username, isCreator, gameId))
    }
}

export default connect(null, mapDispatchToProps)(JoinGame);

