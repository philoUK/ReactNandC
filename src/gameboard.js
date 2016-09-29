import React, { Component } from 'react';

import './App.css';
import GameStatistics from './gamestatistics';
import GameOperations from './gameoperations';
import GameStatus from './gamestatus';
import Game from './game';

class GameBoard extends React.Component {
  constructor() {
      super();
      this.state = {humanVictories : 0,
                    computerVictories : 0,
                    status : {computerWon: false, humanWon: false, drawn: false},
                    board : this._makeBoard()};
  }

  render() {
    return (
      <div className="center">
          <table>
            <tbody>
            <tr>
              <td><GameStatistics humanVictories={this.state.humanVictories} computerVictories={this.state.computerVictories}  /></td>
              <td><Game board={this.state.board} move={this._move.bind(this)} /></td>
            </tr>
            <tr>
              <td><GameOperations reset={this._reset.bind(this)}/></td>
              <td><GameStatus status={this.state.status} /></td>
            </tr>
            </tbody>
          </table>
      </div>
    );
  }

  _reset() {
    this.setState({
      humanVictories : this.state.humanVictories,
      computerVictories : this.state.computerVictories,
      status : {computerWon: false, humanWon: false, drawn: false},
      board : this._makeBoard()});
  }

  _makeBoard() {
    let result = [];
    for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++) {
        var item = {row : row, column: col, isPlayed: false};
        result.push(item);
      }
    }
    return result;
  }

  _move (row, column) {
    // the human player is moving his/her "X" into this square.
    // in a real implementation, we would be calling a remote api or something
    var newCells = [] = this._markCellPlayedByPlayer(row, column);
    // did the human win?
    if(this._humanWon(newCells)) {
      this._recordHumanWin(newCells);
    } else if(this._isGameDrawn(newCells)) {
      this._recordDraw(newCells);
    } else {
      var computerCells = this._markCellPlayedByComputer(newCells);
      if(this._computerWon(computerCells)) {
        this._recordComputerWin(computerCells);
      } else if(this._isGameDrawn(computerCells)) {
        this._recordDraw(computerCells);
      } else {
        this._recordGameInProgress(computerCells);
      }
    }
  }

  _markCellPlayedByPlayer(row, column) {
    var newCells = [];
    this.state.board.map((cell) => {
      if(cell.row === row && cell.column === column) {
        cell.isPlayed = true;
        cell.playedBy = 'X';
      }
      newCells.push(cell);
    });
    return newCells;
  }

  _markCellPlayedByComputer(cells) {
    var computerCells = [];
    var moveMade = false;
    cells.map((cell) => {
      if(!cell.isPlayed && !moveMade) {
        cell.isPlayed = true;
        cell.playedBy = 'O';
        moveMade = true;
      }
      computerCells.push(cell);
    });
    return computerCells;
  }

  _recordHumanWin (cells) {
    this.setState({humanVictories : this.state.humanVictories+1,
                   computerVictories : this.state.computerVictories,
                   status : {computerWon : false, humanWon : true, drawn : false},
                   board : this._blockOutUnplayedCells(cells)});
  }

  _recordComputerWin (cells) {
    this.setState({humanVictories : this.state.humanVictories,
                   computerVictories : this.state.computerVictories + 1,
                   status : {computerWon : true, humanWon : false, drawn : false},
                   board : this._blockOutUnplayedCells(cells)});
  }

  _recordDraw (cells) {
    this.setState({humanVictories : this.state.humanVictories,
                   computerVictories : this.state.computerVictories,
                   status : {computerWon : false, humanWon : false, drawn : true},
                   board : cells});
  }

  _recordGameInProgress (cells) {
    this.setState({humanVictories : this.state.humanVictories,
                   computerVictories : this.state.computerVictories,
                   status : {computerWon : false, humanWon : false, drawn : false},
                   board : cells});
  }

  _getCell (row, column, cells) {
    return cells.find((cell) => cell.row === row && cell.column === column);
  }

  _getRows (cells) {
    return [[this._getCell(0,0, cells), this._getCell(0,1, cells), this._getCell(0,2, cells)],
            [this._getCell(1,0, cells), this._getCell(1,1, cells), this._getCell(1,2, cells)],
            [this._getCell(2,0, cells), this._getCell(2,1, cells), this._getCell(2,2, cells)]];
  }

  _getColumns (cells) {
    return [[this._getCell(0,0, cells), this._getCell(1,0, cells), this._getCell(2,0, cells)],
            [this._getCell(0,1, cells), this._getCell(1,1, cells), this._getCell(2,1, cells)],
            [this._getCell(0,2, cells), this._getCell(1,2, cells), this._getCell(2,2, cells)]];
  }

  _getDiagonals (cells) {
    return [[this._getCell(0,0, cells), this._getCell(1,1, cells), this._getCell(2,2, cells)],
            [this._getCell(2,0, cells), this._getCell(1,1, cells), this._getCell(0, 2, cells)]];
  }

  _humanWon (cells) {
    return this._isGameWon ('X', cells);
  }

  _computerWon (cells) {
    return this._isGameWon ('O', cells);
  }

  _isGameWon (player, cells) {
    var isWon = false;
    this._getRows(cells).map((row) => {
      if(!isWon) {
        isWon = this._allCellsPlayedBy(player, row);
      }
    });
    this._getColumns(cells).map((column) => {
      if(!isWon) {
        isWon = this._allCellsPlayedBy(player, column);
      }
    });
    this._getDiagonals(cells).map((diagonal) => {
      if(!isWon) {
        isWon = this._allCellsPlayedBy(player, diagonal);
      }
    });
    return isWon;
  }

  _isGameDrawn (cells) {
    if(this._humanWon(cells) || this._computerWon(cells)) {
      return false;
    }
    var isDrawn = true;
    cells.map((cell) => {
      if(isDrawn) {
        isDrawn = cell.isPlayed;
      }
    });
    return isDrawn;
  }

  _allCellsPlayedBy(player, cells) {
    var areAllPlayedBy = true;
    cells.map((cell) => {
      if(areAllPlayedBy) {
        areAllPlayedBy = cell.isPlayed && cell.playedBy === player;
      }
    });
    return areAllPlayedBy;
  }

  _blockOutUnplayedCells (cells) {
    return cells.map((cell) => {
      if(!cell.isPlayed) {
        cell.isPlayed = true;
      }
      return cell;
    });
  }
/*
  render: function() {
  return <TextInput ref={(c) => this._input = c} />;
},
componentDidMount: function() {
  this._input.focus();
},
*/

}

export default GameBoard;
