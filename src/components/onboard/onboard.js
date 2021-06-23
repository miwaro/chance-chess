import React from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4'
import logo from '../../images/chessLogo5.png';
import '../../style/components/header.scss';
// import ThreeD from "../../style/images/3d.png";

import Button from '@material-ui/core/Button';
import { ColorContext } from '../../context/colorcontext'
const socket = require('../../connection/socket').socket

/**
 * Onboard is where we create the game room.
 */

class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    send = () => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier. 
         */
        const newGameRoomId = uuid()

        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later. 
        this.setState({
            gameId: newGameRoomId
        })

        // emit an event to the server to create a new room 
        socket.emit('createNewGame', newGameRoomId)
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value

        // set the state with that text

        this.setState({

            inputText: typedText
        })

    }

    onFormSubmit = e => {
        e.preventDefault();
        this.props.didRedirect()
        this.props.setUserName(this.state.inputText)
        this.setState({
            didGetUserName: true
        })
        this.send()
    }

    render() {


        return (<React.Fragment>
            {
                this.state.didGetUserName ?

                    <Redirect to={"/game/" + this.state.gameId}><button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button></Redirect>

                    :
                    <div>
                        <div className="header">
                            <img src={logo} alt="logo" className="logo" />
                            <h1 style={{ color: 'white' }}>Chance Chess</h1>
                        </div>

                        <div style={{ backgroundColor: 'rgb(78 75 71)', margin: '300px auto', width: '30%', borderRadius: '6px', border: '2px solid #277714' }}>
                            <h2 style={{ color: '#eaeaea', textAlign: "center" }}
                            >
                                Enter your <span style={{ color: 'orange' }}>Name</span> to join the Game Room
                            </h2>
                            <form

                                style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
                                onSubmit={this.onFormSubmit}>
                                <input style={{ width: "240px" }}
                                    type="text"
                                    minLength={1}
                                    maxLength={11}
                                    autoFocus
                                    ref={this.textArea}
                                    onInput={this.typingUserName}></input>

                                <Button type="submit"
                                    style={{
                                        backgroundColor: "#277714",
                                        color: "white",
                                        width: '75px',
                                        marginLeft: '12px',
                                        fontSize: '18px',
                                        border: '1px solid orange'
                                    }}
                                >
                                    Go!
                                </Button>
                            </form>
                        </div>
                    </div>

            }
        </React.Fragment>)
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect={color.playerDidRedirect} setUserName={props.setUserName} />
}


export default Onboard