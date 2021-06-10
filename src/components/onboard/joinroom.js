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
                console.log(userState, gameState)
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
        this.setState({
            didGetUserName: true
        })
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
                        // <div>
                        //     <h1 style={{ textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px" }}>Your Username</h1>

                        //     <input style={{ marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px" }}
                        //         ref={this.textArea}
                        //         onInput={this.typingUserName}></input>

                        //     <Button className="btn btn-primary"
                        //         style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px" }}
                        //         // disabled={!(this.state.inputText.length > 0)}
                        //         onClick={() => {
                        //             // When the 'Submit' button gets pressed from the username screen,
                        //             // We should send a request to the server to create a new room with
                        //             // the uuid we generate here.
                        //             this.setState({
                        //                 didGetUserName: true
                        //             })
                        //         }}>Submit</Button>
                        // </div>
                        <div>
                            <div className="header">
                                <img src={logo} alt="logo" className="logo" />
                                <h1 style={{ color: 'white' }}>Chance Chess</h1>
                            </div>

                            {/* <div style={{ backgroundImage: `url(${ThreeD})`, backgroundRepeat: 'no-repeat' }}> */}
                            <div style={{ backgroundColor: 'rgb(78 75 71)', margin: '300px auto', width: '30%', borderRadius: '6px', border: '2px solid #277714' }}>
                                <h2 style={{ color: '#eaeaea', textAlign: "center" }}
                                >
                                    Enter your <span style={{ color: 'orange' }}>Name</span> to join the Game Room
                            </h2>
                                <form
                                    style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
                                    onSubmit={this.onFormSubmit}>
                                    <input style={{ width: "240px" }}
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