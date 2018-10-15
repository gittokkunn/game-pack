import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class StartGame
 extends Component {
  render() {
    return (
      <div className="StartGame">
        <div>ゲームパック2018</div>
        <div>
          <Link to="/game">エイトパズル</Link>
        </div>
      </div>
    );
  }
}

export default StartGame
;
