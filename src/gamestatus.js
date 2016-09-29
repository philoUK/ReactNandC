import React, { Component } from 'react';

import './App.css';

class GameStatus extends React.Component {
  render () {
      if(!this.props.status.drawn && !this.props.status.humanWon && !this.props.status.computerWon) {
        return (<span className='in-progress'>Game in progress</span>);
      } else if(this.props.status.humanWon) {
        return (<span className='you-won'>You Won!</span>);
      } else if(this.props.status.computerWon) {
        return (<span className='you-lost'>You Lost!</span>);
      } else if(this.props.status.drawn) {
        return (<span className='you-drew'>You drew!</span>);
      }
  }
}

export default GameStatus;
