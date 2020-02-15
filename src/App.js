import React from 'react';
import './App.css';
import Scale from './Scale.js';

const assert = require('assert');


/*
 * A functional component representing a fret on a guitar.
 */
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

/**
 * A component representing a guitar fretboard, wrapping an array of Frets.
 */
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

  /**
   * Renders a row of Frets.
   */
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


/**
 * A button interface representing a section of a guitar fretboard.
 * It has 6 strings, and each string has 5 frets.
 * The user selects which scale they want to test, and the fretboard tells them
 * whether their selected notes are in the scale or not, with a "O" or and "X".
 */
class FretBoardInterface extends React.Component {

  static strings = 6;
  // The fifth fret on the G string and the first on the B string are the same note.
  // Taking this into account requires extra logic.
  static bString = 4;                                                         
  static fretsPerString = 5;

  constructor(props) {
    super(props);
    var empty = Scale.empty();
    this.state = {
      mode:        empty,
      notes:       FretBoardInterface.scaleToFretboard(empty),
      userValues:  FretBoardInterface.scaleToFretboard(empty),
      marks:       FretBoardInterface.scaleToFretboard(empty),
    };
  }

  /**
   * Converts a scale object to an array of the appropriate length.
   */
  static scaleToFretboard(scale) {
    var notes = scale.notes.slice();
    notes.unshift(false);                                                    // Start the scale on the second fret.
    notes.splice(this.bString * this.fretsPerString, 0, false);              // Need to add a shift before the B string.
    var len = this.strings * this.fretsPerString - notes.length;
    for (len; len > 0; len--) {
      notes.push(false);
    }
    return notes;
  }

  /**
   * Toggles the user's value in fret i and calculates the new marks.
   * Updates state.
   */
  handleClick(i) {
    var newValues = this.state.userValues.slice();
    newValues[i] = !newValues[i];
    this.setState({
      userValues: newValues,
      marks: this.setMark(i, this.state.marks.slice(), newValues, this.state.notes),
    });
  }

  setMark(i, marks, userValues, notes) {
    if (userValues[i]) {
      marks[i] = notes[i] ? "O" : "X";      
    } else {
      marks[i] = " ";
    }    
    return marks;
  }

  /**
   * Changes the mode that the user is testing against.
   * Preserves the user's input, and recalculates the marks.
   * Updates state.
   */
  changeMode(m) {
    var newScale = Scale.mode(m);
    var newNotes = FretBoardInterface.scaleToFretboard(newScale);
    var newMarks = this.refreshMarks(newNotes);
    this.setState({
      mode:  newScale,
      notes: newNotes,
      marks: newMarks,
    });
  }

  /**
   * Computes marks array directly by comparing user's input and the notes.
   */
  refreshMarks(notes) {
    var newMarks = this.state.marks.slice();
    var i;
    for (i = 0; i < this.state.marks.length; i++) {
      this.setMark(i, newMarks, this.state.userValues, notes);
    }
    return newMarks;
  }

  /**
   * Button for selecting the mode.
   */ 
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

  /**
   * Determines if the user has correctly completed the mode.
   */
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

  /**
   * Render.
   */
  render() {
    // Make array of mode select buttons.
    var buttons = [];
    var numberOfModes = Scale.modes.names.length;
    var i;
    for (i = 0; i < numberOfModes; i++) {
      buttons.push(this.selectButton(i));
    }

    return (
      <div>
        <FretBoard 
          strings={FretBoardInterface.strings}  
          fretsPerString={FretBoardInterface.fretsPerString}
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
