import React from 'react';
import './App.css';


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
        value={this.props.values[i] ? "O" : " "}
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

function arrayToScale(notes) {
  var firstNote = 1;
  var scale = Array(5 * 6).fill(false);
  notes.forEach(number => {
     scale[firstNote + number] = true;
  });
  return scale;
}
function patternToScale(pattern, startingPoint) {
  var scale = Array(5 * 6).fill(false);

  var spotInPattern = startingPoint;
  var note = 0;
  var notesPlaced; 
  for (notesPlaced = 0; notesPlaced < 15; notesPlaced++) {
    // console.log("Notes placed: " + notesPlaced);
    // console.log("Note: " + note);
    scale[note] = true;

    spotInPattern = spotInPattern % pattern.length;
    // console.log("Spot in pattern: " + spotInPattern);
    // console.log("Pattern element: " + pattern[spotInPattern]);
    note = note + pattern[spotInPattern];
    // console.log("New note: " + note);
    spotInPattern++;
  }
  // console.log(scale);
  return scale;
}

class Scale {
  static modes = {
    names: [
      "Ionian", 
      "Dorian", 
      "Phrygian", 
      "Lydian", 
      "Mixolydian",
      "Aeolian",
      "?"
    ],
    pattern: [2, 2, 1, 2, 2, 2, 1],
  };

  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
  }

  static empty() {
    return new Scale("Empty", []);
  }

  static mode(scale_mode) {
    if (scale_mode < 0 || scale_mode >= Scale.modes.names.length) {
      throw "Mode must be between 0 and 6";
    }
    var notes = patternToScale(this.modes.pattern, scale_mode);
    return new Scale(this.modes.names[scale_mode], notes);
  }
}


class FretBoardInterface extends React.Component {
  constructor(props) {
    super(props);
    this.strings = 6;
    this.fretsPerString = 5;
    var notes = Scale.mode(5).notes.slice();
    notes.unshift(false);
    notes.splice(4 * this.fretsPerString, 0, false);
    this.state = {
      values: notes,
    };
  }


  handleClick(i) {

    var newValues = this.state.values.slice();
    newValues[i] = !newValues[i];
    this.setState({
      values: newValues,
    });
  }

  render() {
    return (
      <FretBoard 
        strings={this.strings}  
        fretsPerString={this.fretsPerString}
        values={this.state.values}
        onClick={(i) => this.handleClick(i)}
      />
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
