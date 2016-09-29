import React, { Component } from 'react';

import './App.css';
import Cell from './cell.js';

class Game extends React.Component {

  render() {
    return (
      <div className='game-panel'>
        <table>
          <tbody>
            <tr>
              <td><Cell data={this._makeCell(0,0)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(0,1)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(0,2)} move={this._move.bind(this)} /></td>
            </tr>
            <tr>
              <td><Cell data={this._makeCell(1,0)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(1,1)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(1,2)} move={this._move.bind(this)} /></td>
            </tr>
            <tr>
              <td><Cell data={this._makeCell(2,0)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(2,1)} move={this._move.bind(this)} /></td>
              <td><Cell data={this._makeCell(2,2)} move={this._move.bind(this)} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  _makeCell (r, c) {
    return this.props.board.find((cell) => cell.row === r && cell.column === c);
  }

  _move (cell) {
    this.props.move(cell.row, cell.column);
  }
}

export default Game;
