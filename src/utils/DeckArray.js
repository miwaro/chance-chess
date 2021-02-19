
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
    index: "2",
    correspondingPiece: "p",
    correspondingFile: "b"
    // ChessPieceEquivalent: Any Pawn on the B file

  },
  {
    suits: "Heart",
    card: "3",
    color: "red",
    index: "3",
    correspondingPiece: "p",
    correspondingFile: "c"
    // ChessPieceEquivalent: Any Pawn on the C file

  },
  {
    suits: "Heart",
    card: "4",
    color: "red",
    index: "4",
    correspondingPiece: "p",
    correspondingFile: "d"
    // ChessPieceEquivalent: Any Pawn on the D file

  },
  {
    suits: "Heart",
    card: "5",
    color: "red",
    index: "5",
    correspondingPiece: "p",
    correspondingFile: "e"
    // ChessPieceEquivalent: Any Pawn on the E file

  },
  {
    suits: "Heart",
    card: "6",
    color: "red",
    index: "6",
    correspondingPiece: "p",
    correspondingFile: "f"
    // ChessPieceEquivalent: Any Pawn on the F file

  },
  {
    suits: "Heart",
    card: "7",
    color: "red",
    index: "7",
    correspondingPiece: "p",
    correspondingFile: "g"
    // ChessPieceEquivalent: Any Pawn on the G file

  },
  {
    suits: "Heart",
    card: "8",
    color: "red",
    index: "8",
    correspondingPiece: "p",
    correspondingFile: "h"
    // ChessPieceEquivalent: Any Pawn on the H file

  },
  {
    suits: "Heart",
    card: "9",
    color: "red",
    index: "9",
    correspondingPiece: "r"
    // ChessPieceEquivalent: Rooks

  },
  {
    suits: "Heart",
    card: "10",
    color: "red",
    index: "10",
    correspondingPiece: "n"
    // ChessPieceEquivalent: Knights

  },
  {
    suits: "Heart",
    card: "J",
    color: "red",
    index: "11",
    correspondingPiece: "b"
  },
  {
    suits: "Heart",
    card: "Q",
    color: "red",
    index: "12",
    correspondingPiece: "q"
  },
  {
    suits: "Heart",
    card: "K",
    color: "red",
    index: "13",
    correspondingPiece: "k"
  },
  {
    suits: "Diamond",
    card: "A",
    color: "red",
    index: "14",
    correspondingPiece: "p",
    correspondingFile: "a"
  },
  {
    suits: "Diamond",
    card: "2",
    color: "red",
    index: "15",
    correspondingPiece: "p",
    correspondingFile: "b"
  },
  {
    suits: "Diamond",
    card: "3",
    color: "red",
    index: "16",
    correspondingPiece: "p",
    correspondingFile: "c"
  },
  {
    suits: "Diamond",
    card: "4",
    color: "red",
    index: "17",
    correspondingPiece: "p",
    correspondingFile: "d"
  },
  {
    suits: "Diamond",
    card: "5",
    color: "red",
    index: "18",
    correspondingPiece: "p",
    correspondingFile: "e"
  },
  {
    suits: "Diamond",
    card: "6",
    color: "red",
    index: "19",
    correspondingPiece: "p",
    correspondingFile: "f"
  },
  {
    suits: "Diamond",
    card: "7",
    color: "red",
    index: "20",
    correspondingPiece: "p",
    correspondingFile: "g"
  },
  {
    suits: "Diamond",
    card: "8",
    color: "red",
    index: "21",
    correspondingPiece: "p",
    correspondingFile: "h"
  },
  {
    suits: "Diamond",
    card: "9",
    color: "red",
    index: "22",
    correspondingPiece: "r"
  },
  {
    suits: "Diamond",
    card: "10",
    color: "red",
    index: "23",
    correspondingPiece: "n"
  },
  {
    suits: "Diamond",
    card: "J",
    color: "red",
    index: "24",
    correspondingPiece: "b"
  },
  {
    suits: "Diamond",
    card: "Q",
    color: "red",
    index: "25",
    correspondingPiece: "q"
  },
  {
    suits: "Diamond",
    card: "K",
    color: "red",
    index: "26",
    correspondingPiece: "k"
  },
  {
    suits: "Club",
    card: "A",
    color: "black",
    index: "27",
    correspondingPiece: "p",
    correspondingFile: "a"
  },
  {
    suits: "Club",
    card: "2",
    color: "black",
    index: "28",
    correspondingPiece: "p",
    correspondingFile: "b"
  },
  {
    suits: "Club",
    card: "3",
    color: "black",
    index: "29",
    correspondingPiece: "p",
    correspondingFile: "c"
  },
  {
    suits: "Club",
    card: "4",
    color: "black",
    index: "30",
    correspondingPiece: "p",
    correspondingFile: "d"
  },
  {
    suits: "Club",
    card: "5",
    color: "black",
    index: "31",
    correspondingPiece: "p",
    correspondingFile: "e"
  },
  {
    suits: "Club",
    card: "6",
    color: "black",
    index: "32",
    correspondingPiece: "p",
    correspondingFile: "f"
  },
  {
    suits: "Club",
    card: "7",
    color: "black",
    index: "33",
    correspondingPiece: "p",
    correspondingFile: "g"
  },
  {
    suits: "Club",
    card: "8",
    color: "black",
    index: "34",
    correspondingPiece: "p",
    correspondingFile: "h"
  },
  {
    suits: "Club",
    card: "9",
    color: "black",
    index: "35",
    correspondingPiece: "r",
  },
  {
    suits: "Club",
    card: "10",
    color: "black",
    index: "36",
    correspondingPiece: "n",
  },
  {
    suits: "Club",
    card: "J",
    color: "black",
    index: "37",
    correspondingPiece: "b",
  },
  {
    suits: "Club",
    card: "Q",
    color: "black",
    index: "38",
    correspondingPiece: "q",
  },
  {
    suits: "Club",
    card: "K",
    color: "black",
    index: "39",
    correspondingPiece: "k",
  },
  {
    suits: "Spade",
    card: "A",
    color: "black",
    index: "40",
    correspondingPiece: "p",
    correspondingFile: "a"
  },
  {
    suits: "Spade",
    card: "2",
    color: "black",
    index: "41",
    correspondingPiece: "p",
    correspondingFile: "b"
  },
  {
    suits: "Spade",
    card: "3",
    color: "black",
    index: "42",
    correspondingPiece: "p",
    correspondingFile: "c"
  },
  {
    suits: "Spade",
    card: "4",
    color: "black",
    index: "43",
    correspondingPiece: "p",
    correspondingFile: "d"
  },
  {
    suits: "Spade",
    card: "5",
    color: "black",
    index: "44",
    correspondingPiece: "p",
    correspondingFile: "e"
  },
  {
    suits: "Spade",
    card: "6",
    color: "black",
    index: "45",
    correspondingPiece: "p",
    correspondingFile: "f"
  },
  {
    suits: "Spade",
    card: "7",
    color: "black",
    index: "46",
    correspondingPiece: "p",
    correspondingFile: "g"
  },
  {
    suits: "Spade",
    card: "8",
    color: "black",
    index: "47",
    correspondingPiece: "p",
    correspondingFile: "h"
  },
  {
    suits: "Spade",
    card: "9",
    color: "black",
    index: "48",
    correspondingPiece: "r",
  },
  {
    suits: "Spade",
    card: "10",
    color: "black",
    index: "49",
    correspondingPiece: "n",
  },
  {
    suits: "Spade",
    card: "J",
    color: "black",
    index: "50",
    correspondingPiece: "b",
  },
  {
    suits: "Spade",
    card: "Q",
    color: "black",
    index: "51",
    correspondingPiece: "q",
  },
  {
    suits: "Spade",
    card: "K",
    color: "black",
    index: "52",
    correspondingPiece: "k",
  }
];