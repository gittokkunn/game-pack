import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import StartGame from './pages/StartGame'
import Game from './pages/Game'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path='/' component={StartGame} />
            <Route exact path='/game' component={Game} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
