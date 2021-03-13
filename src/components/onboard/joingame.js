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
    /**
     * Extract the 'gameId' from the URL. 
     * the 'gameId' is the gameRoom ID. 
     */
    const { gameid } = useParams()
    props.onJoinGame(props.username, props.isCreator, gameid);
    JoinGameRoom(gameid, props.userName, props.isCreator)
    return (<div></div>)
        // props.isCreator &&
        // <div style={{ position: 'absolute', left: '400px', top: '30px', color: '#eaeaea' }}>
        //     Copy this link to invite a friend: {`${config.url}/game/${gameid}`}
        // </div>
    
}

const mapDispatchToProps = dispatch => {
    return {
        onJoinGame: (username, isCreator, gameid) => dispatch(joinGame(username, isCreator, gameid))
    }
}

export default connect(null, mapDispatchToProps)(JoinGame);

