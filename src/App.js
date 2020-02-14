import React from 'react';
import './App.css';
import Scale from './Scale.js';


const assert = require('assert');

function Fret(props) {
  return (
    <button
      className="fret"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


class FretBoard extends React.Component {
  renderFret(i) {
    return (
      <Fret 
        key={i.toString()}
        value={this.props.marks[i]}
        onClick={() => this.props.onClick(i)}
      />      
    );
  }

  renderString(j) {
    const frets = [];
    var i;
    for (i=0; i < this.props.fretsPerString; i++) {
      frets.push(this.renderFret(j * this.props.fretsPerString + i));
    }
    return (
      <div className="string" key={j.toString()}>
        {frets}
      </div>
    );
  }

  render() {
    const strings = [];
    var i;
    for (i = this.props.strings - 1; i >= 0; i--) {
      strings.push(this.renderString(i));
    }
    return (
      <div className="fretboard">
        {strings}
      </div>
    );
  }
}


class FretBoardInterface extends React.Component {
  constructor(props) {
    super(props);
    this.strings = 6;
    this.fretsPerString = 5;
    var empty = Scale.empty();
    this.state = {
      mode:        empty,
      notes:       FretBoardInterface.scaleToFretboard(empty),
      userValues:  FretBoardInterface.scaleToFretboard(empty),
      marks:       FretBoardInterface.scaleToFretboard(empty),
    };
  }

  static scaleToFretboard(scale) {
    var notes = scale.notes.slice();
    notes.unshift(false);                                                    // Start the scale on the second fret.
    notes.splice(4 * 5, 0, false);                                           // Need to add a shift before the B string.
    var len = 6 * 5 - notes.length;
    for (len; len > 0; len--) {
      notes.push(false);
    }
    return notes;
  }

  handleClick(i) {
    var newValues = this.state.userValues.slice();
    var newMarks = this.state.marks.slice();

    newValues[i] = !newValues[i];
    if (newValues[i]) {
      newMarks[i] = this.state.notes[i] ? "O" : "X";
    } else {
      newMarks[i] = " ";
    }
    this.setState({
      userValues: newValues,
      marks: this.newMark(i, newValues),
    });
  }

  setMark(i, values, newMarks) {
    if (values[i]) {
      newMarks[i] = this.state.notes[i] ? "O" : "X";      
    } else {
      newMarks[i] = " ";
    }    
  }

  newMark(i, newValues) {
    var newMarks = this.state.marks.slice();
    this.setMark(i, newValues, newMarks);
    return newMarks;
  }

  refreshMarks(notes) {
    var newMarks = this.state.marks.slice();
    var i;
    for (i = 0; i < this.state.marks.length; i++) {
      if (this.state.userValues[i]) {
        newMarks[i] = notes[i] ? "O" : "X";      
      } else {
        newMarks[i] = " ";
      }    
      // this.setMark(i, this.state.userValues, newMarks);
    }
    return newMarks;
  }

  changeMode(m) {
    var newScale = Scale.mode(m);
    var newNotes = FretBoardInterface.scaleToFretboard(newScale);
    var newMarks = this.refreshMarks(newNotes);
    this.setState({
      mode: newScale,
      notes: newNotes,
      marks: newMarks,
    });
  }

  selectButton(m) {
    return (
      <button 
        className="select-button" 
        key={m.toString()} 
        onClick={() => this.changeMode(m)}
      >
        {Scale.modes.names[m]}
      </button>
    );
  }

  gameOver() { 
    var a = this.state.notes;
    var b = this.state.userValues;
    assert(a.length === b.length);
    var result = true;
    var i;
    for (i = 0; i < this.state.notes.length; i++) {
      result = result && (a[i] === b[i]);
    }
    return result;
  }

  render() {
    var buttons = [];
    var numberOfModes = Scale.modes.names.length;
    var i;
    for (i = 0; i < numberOfModes; i++) {
      buttons.push(this.selectButton(i));
    }

    return (
      <div>
        <FretBoard 
          strings={this.strings}  
          fretsPerString={this.fretsPerString}
          marks={this.state.marks}
          onClick={(i) => this.handleClick(i)}
        />
        {buttons}
        <div>
          {this.state.mode.name}
        </div>
        <div>
          {this.gameOver() ? "You did it!" : "Keep trying!"}
        </div>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>
            Learn To Play Guitar.
          </p>
        </div>
        <div className="App-fretboard">
          <FretBoardInterface />
        </div>
      </header>
    </div>
  );
}

export default App;
