import React from "react";
import "./App.css";
import Header from './components/Header';
import Board from './components/Game';
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';


const App: React.FC = () => {

  return (
    <div className="App">
      <Header />

      <Player1 />
      <div className="Board">
        <Board />

      </div>

      <Player2 />
    </div>
  );
};

export default App;
