import React from 'react'
import JoinGame from './joingame'
import Home from '../Home';
import logo from '../../images/chessLogo5.png';
import '../../style/components/header.scss';
import Button from '@material-ui/core/Button';
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
        isPlayerOne: false,
        didRefresh: false

    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    componentDidMount() {
        const gameId = this.props.match.params.gameId;

        if (gameId && !this.props.gameId) {
            let userState = localStorage.getItem(`${gameId}-users`);
            let gameState = localStorage.getItem(`${gameId}-game`);
            if (userState && gameState) {
                userState = JSON.parse(userState);
                gameState = JSON.parse(gameState);
                this.props.updateUsers(userState);
                this.props.updateGame(gameState, userState.gameId);
                const isPlayerOne = localStorage.getItem(gameId);

                this.setState({
                    inputText: isPlayerOne ? userState.playerOne : userState.playerTwo,
                    didGetUserName: true,
                    isPlayerOne,
                    didRefresh: true
                })

            }
        }

    }

    typingUserName = (e) => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value.toUpperCase();

        // set the state with that text

        this.setState({
            inputText: typedText
        })

    }

    onFormSubmit = e => {
        e.preventDefault();

        if (this.state.inputText !== '') {
            this.setState({
                didGetUserName: true
            })
        }

    }

    render() {
        if (this.state.didRefresh) {
            return (
                <Home myUserName={this.state.inputText} />
            )
        } else {
            return (<React.Fragment>
                {
                    this.state.didGetUserName ?
                        <React.Fragment>
                            <JoinGame userName={this.state.inputText} isCreator={false} />
                            <Home myUserName={this.state.inputText} />
                        </React.Fragment>
                        :
                        <div>
                            <div className="header">
                                <img src={logo} alt="logo" className="logo" />
                                <h1 style={{ color: 'white' }}>Chance Chess</h1>
                            </div>
                            <div style={{ backgroundColor: '#2a2724', margin: '300px auto', padding: '10px', width: '30%', borderRadius: '6px', opacity: '0.9' }}>
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
                                            fontSize: '18px'
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