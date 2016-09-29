import React, { Component } from 'react';

import './App.css';

class Cell extends React.Component {
  render() {
    if (this.props.data.isPlayed) {
        return <div className='played-cell'><div className='child'>{this.props.data.playedBy}</div></div>;
    } else {
        return <button className='unplayed-cell' onClick={this._handleClick.bind(this)}/>;
    }
  }

  _handleClick (event) {
    event.preventDefault();
    this.props.move(this.props.data);
  }
}

export default Cell;
