// import React, { Component } from "react";
// import { connect } from 'react-redux';
// import Card from "./Card";
// // import { deckArray } from "../utils/DeckArray";

// class Cards extends Component {


// constructor() {
//     super();

// };

// componentDidMount() {
//     let cardsArray = this.state.cardsArray;
//     const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
//     const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

//     this.setState({ cardsArray: newCardsArray })

//     let cardsPickedArray = this.state.cardPicked;
//     cardsPickedArray.length < 52 &&
//         cardsPickedArray.push(randomItem);
//     this.setState({ cardPicked: cardsPickedArray })
// }


//   dealThreeCards = () => {
//     let cardsArray = this.state.cardsArray;
//     const randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
//     const randomItem = randomCard();
//     const randomItem1 = randomCard();
//     const randomItem2 = randomCard();

//     const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

//     this.setState({ cardsArray: newCardsArray })

//     let cardsPickedArray = this.state.cardPicked;
//     cardsPickedArray.length < 3 &&
//       cardsPickedArray.push(randomItem, randomItem1, randomItem2);
//     this.setState({ cardPicked: cardsPickedArray })
//   };

// dealOneCard = () => {
//     let cardsArray = this.state.cardsArray;
//     const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
//     const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

//     this.setState({ cardsArray: newCardsArray })

//     let cardsPickedArray = this.state.cardPicked;
//     cardsPickedArray.length < 52 &&
//         cardsPickedArray.push(randomItem);
//     this.setState({ cardPicked: cardsPickedArray })
// };



render() {

    // const cardsPickedArray = this.state.cardPicked;

    return (
        <div>
            <div>
                {this.props.cardsPickedArray && this.props.cardsPickedArray.map((card, index) => {
                    return (
                        <div className="animated slideInUp" key={index}>
                            <Card
                                cardIndex={card.index}
                                suits={card.suits}
                                card={card.card}
                                color={card.color}
                                front={true}
                                cardPiece={card.correspondingPiece}
                                cardFile={card.correspondingFile}
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    );
};
};

// const mapStateToProps = (state) => {
//     // console.log(state)
//     return {
//         cardsPickedArray: state.chanceChessReducer.cardsArray
//     }
// }

//   const mapDispatchToProps = dispatch => {
//     console.log(dispatch)
//     return {
//       onStartNewGame: () => dispatch(startNewGame())
//     }
//   }

// export default connect(mapStateToProps, null)(Cards);