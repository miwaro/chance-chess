
// Select function

// const SelectCardtoMoveCorrespondingPiece = () => {

//   if (move.piece !== correspondingPiece && move.from[0] !== correspondingFile || move === null) return;






export const deckArray = [
  {
    suits: "Heart",
    card: "A",
    color: "red",
    index: "1",
    correspondingPiece: "p",
    correspondingFile: "a"
  },
  {
    suits: "Heart",
    card: "2",
    color: "red",
    index: "2"
    // ChessPieceEquivalent: Any Pawn on the B file

  },
  {
    suits: "Heart",
    card: "3",
    color: "red",
    index: "3"
    // ChessPieceEquivalent: Any Pawn on the C file

  },
  {
    suits: "Heart",
    card: "4",
    color: "red",
    index: "4"
    // ChessPieceEquivalent: Any Pawn on the D file

  },
  {
    suits: "Heart",
    card: "5",
    color: "red",
    index: "5"
    // ChessPieceEquivalent: Any Pawn on the E file

  },
  {
    suits: "Heart",
    card: "6",
    color: "red",
    index: "6"
    // ChessPieceEquivalent: Any Pawn on the F file

  },
  {
    suits: "Heart",
    card: "7",
    color: "red",
    index: "7"
    // ChessPieceEquivalent: Any Pawn on the G file

  },
  {
    suits: "Heart",
    card: "8",
    color: "red",
    index: "8"
    // ChessPieceEquivalent: Any Pawn on the H file

  },
  {
    suits: "Heart",
    card: "9",
    color: "red",
    index: "9"
    // ChessPieceEquivalent: Rooks

  },
  {
    suits: "Heart",
    card: "10",
    color: "red",
    index: "10"
    // ChessPieceEquivalent: Knights

  },
  {
    suits: "Heart",
    card: "J",
    color: "red",
    index: "11"
    // ChessPieceEquivalent: Bishops

  },
  {
    suits: "Heart",
    card: "Q",
    color: "red",
    index: "12"
    // ChessPieceEquivalent: Queen

  },
  {
    suits: "Heart",
    card: "K",
    color: "red",
    index: "13"
    // ChessPieceEquivalent: King

  },
  {
    suits: "Diamond",
    card: "A",
    color: "red",
    index: "14"
  },
  {
    suits: "Diamond",
    card: "2",
    color: "red",
    index: "15"
  },
  {
    suits: "Diamond",
    card: "3",
    color: "red",
    index: "16"
  },
  {
    suits: "Diamond",
    card: "4",
    color: "red",
    index: "17"
  },
  {
    suits: "Diamond",
    card: "5",
    color: "red",
    index: "18"
  },
  {
    suits: "Diamond",
    card: "6",
    color: "red",
    index: "19"
  },
  {
    suits: "Diamond",
    card: "7",
    color: "red",
    index: "20"
  },
  {
    suits: "Diamond",
    card: "8",
    color: "red",
    index: "21"
  },
  {
    suits: "Diamond",
    card: "9",
    color: "red",
    index: "22"
  },
  {
    suits: "Diamond",
    card: "10",
    color: "red",
    index: "23"
  },
  {
    suits: "Diamond",
    card: "J",
    color: "red",
    index: "24"
  },
  {
    suits: "Diamond",
    card: "Q",
    color: "red",
    index: "25"
  },
  {
    suits: "Diamond",
    card: "K",
    color: "red",
    index: "26"
  },
  {
    suits: "Club",
    card: "A",
    color: "black",
    index: "27"
  },
  {
    suits: "Club",
    card: "2",
    color: "black",
    index: "28"
  },
  {
    suits: "Club",
    card: "3",
    color: "black",
    index: "29"
  },
  {
    suits: "Club",
    card: "4",
    color: "black",
    index: "30"
  },
  {
    suits: "Club",
    card: "5",
    color: "black",
    index: "31"
  },
  {
    suits: "Club",
    card: "6",
    color: "black",
    index: "32"
  },
  {
    suits: "Club",
    card: "7",
    color: "black",
    index: "33"
  },
  {
    suits: "Club",
    card: "8",
    color: "black",
    index: "34"
  },
  {
    suits: "Club",
    card: "9",
    color: "black",
    index: "35"
  },
  {
    suits: "Club",
    card: "10",
    color: "black",
    index: "36"
  },
  {
    suits: "Club",
    card: "J",
    color: "black",
    index: "37"
  },
  {
    suits: "Club",
    card: "Q",
    color: "black",
    index: "38"
  },
  {
    suits: "Club",
    card: "K",
    color: "black",
    index: "39"
  },
  {
    suits: "Spade",
    card: "A",
    color: "black",
    index: "40"
  },
  {
    suits: "Spade",
    card: "2",
    color: "black",
    index: "41"
  },
  {
    suits: "Spade",
    card: "3",
    color: "black",
    index: "42"
  },
  {
    suits: "Spade",
    card: "4",
    color: "black",
    index: "43"
  },
  {
    suits: "Spade",
    card: "5",
    color: "black",
    index: "44"
  },
  {
    suits: "Spade",
    card: "6",
    color: "black",
    index: "45"
  },
  {
    suits: "Spade",
    card: "7",
    color: "black",
    index: "46"
  },
  {
    suits: "Spade",
    card: "8",
    color: "black",
    index: "47"
  },
  {
    suits: "Spade",
    card: "9",
    color: "black",
    index: "48"
  },
  {
    suits: "Spade",
    card: "10",
    color: "black",
    index: "49"
  },
  {
    suits: "Spade",
    card: "J",
    color: "black",
    index: "50"
  },
  {
    suits: "Spade",
    card: "Q",
    color: "black",
    index: "51"
  },
  {
    suits: "Spade",
    card: "K",
    color: "black",
    index: "52"
  }
];