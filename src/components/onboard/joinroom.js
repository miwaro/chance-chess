import React from 'react'
import JoinGame from './joingame'
import Home from '../Home';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateUsers } from '../../redux/actions/userActions';
import { updateGame } from '../../redux/actions/cardActions';

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        didRefresh: false
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    componentDidMount() {
        const gameId = this.props.match.params.gameId;
  
        console.log(gameId);
        if (gameId && !this.props.gameId) {
            let userState = localStorage.getItem(`${gameId}-users`);
            let gameState = localStorage.getItem(`${gameId}-game`);
            if (userState && gameState) {
                console.log(userState, gameState)
                userState = JSON.parse(userState);
                gameState = JSON.parse(gameState);
                this.props.updateUsers(userState);
                this.props.updateGame(gameState, userState.gameId);
                const isPlayerOne = localStorage.getItem(gameId);

                this.setState({
                    inputText: isPlayerOne ? userState.playerOne : userState.playerTwo,
                    didGetUserName: true,
                    didRefresh: true
                });
            }
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

        if (this.state.didRefresh) {
            return (
                <Home myUserName = {this.state.inputText}/>
            )
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        gameId: state.usersReducer.gameId,
        numPlayers: state.usersReducer.numPlayers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateGame: (state, gameId) => dispatch(updateGame(state, gameId)),
      updateUsers: state => dispatch(updateUsers(state)),
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinRoom));