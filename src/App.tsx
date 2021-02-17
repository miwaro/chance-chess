import React from "react";
import "./App.css";
import Game from './components/Game';
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';


const App: React.FC = () => {

  return (
    <div className="App">
      <h1>Chance Chess</h1>

      <Player1 />
      <div className="Board">
        <Game />

      </div>

      <Player2 />
    </div>
  );
};

export default App;
