import React, { Component } from 'react';

import './App.css';

class GameStatistics extends React.Component {
  render() {
    return (
      <div className='game-panel'>
        <h2>Statistics</h2>
        <ul>
          <li>Human Victories&nbsp;&nbsp;&nbsp;&nbsp; {this.props.humanVictories}</li>
          <li>Computer Victories {this.props.computerVictories}</li>
        </ul>
      </div>
    );
  }
}

export default GameStatistics;
