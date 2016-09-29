import React, { Component } from 'react';

import './App.css';

class GameOperations extends React.Component {
    render () {
      return (
        <div className="operations">
          <button onClick={this._onClick.bind(this)}>New Game</button>
        </div>
      );
    }

    _onClick(event) {
      event.preventDefault();
      this.props.reset();
    }
}

export default GameOperations;
