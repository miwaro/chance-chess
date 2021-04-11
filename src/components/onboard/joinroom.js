import React from 'react'
import JoinGame from './joingame'
import Home from '../Home';
import { connect } from 'react-redux';

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();

        // if we already have 2 players, it means the user refreshed the browser. So, go directly to game.
        if (this.props.numPlayers === 2) {
            this.setState({
                didGetUserName: true
            })
        }
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value
        
        // set the state with that text
        this.setState({
            inputText: typedText
        })
    }

    render() {
    
        return (<React.Fragment>
            {
                this.state.didGetUserName ? 
                <React.Fragment>
                    <JoinGame userName = {this.state.inputText} isCreator = {false}/>
                    <Home myUserName = {this.state.inputText}/>
                </React.Fragment>
            :
               <div>
                    <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>

                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>
                           
                    <button className="btn btn-primary" 
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            this.setState({
                                didGetUserName: true
                            })
                        }}>Submit</button>
                </div>
            }
            </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        numPlayers: state.usersReducer.numPlayers
    }
}

export default connect(mapStateToProps, null)(JoinRoom);