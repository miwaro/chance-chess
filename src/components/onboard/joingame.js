import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { joinGame } from '../../redux/actions/userActions';
const socket = require('../../connection/socket').socket

/**
 * 'Join game' is where we actually join the game room. 
 */


const JoinGameRoom = (gameid, userName, isCreator) => {
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
        gameId: gameid,
        userName: userName,
        isCreator: isCreator
    }
    console.log(gameid)
    socket.emit("playerJoinGame", idData)
}

const JoinGame = (props) => {
    const { gameid } = useParams()
    props.onJoinGame(props.userName, props.isCreator, gameid);
    JoinGameRoom(gameid, props.userName, props.isCreator)
    return (<div></div>)
}

const mapDispatchToProps = dispatch => {
    return {
        onJoinGame: (username, isCreator, gameid) => dispatch(joinGame(username, isCreator, gameid))
    }
}

export default connect(null, mapDispatchToProps)(JoinGame);

