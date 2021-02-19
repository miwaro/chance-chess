import React from "react";
import "./App.css";
import Header from './components/Header';
import Board from './components/Game';
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';
// import KeySidebar from './components/keySidebar';


const App: React.FC = () => {

  return (
    <div className="App">

      <Header />
      {/* <KeySidebar /> */}
      <div className="Player-1">
        <Player1 />
      </div>

      <div className="Board">
        <Board />
      </div>
      <div className="Player-2">
        <Player2 />
      </div>
    </div>
  );
};

export default App;
