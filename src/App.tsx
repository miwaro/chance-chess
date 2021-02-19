import React from "react";
import "./App.css";
import Header from './components/Header';
import Key from './components/correlationKey';
import Board from './components/Game';
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';


const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <div className="Player-1">
        <Player1 />
      </div>
      <div className="Board">
        <Board />
        <Key />
      </div>

      <div className="Player-2">
        <Player2 />
      </div>
    </div>
  );
};

export default App;
