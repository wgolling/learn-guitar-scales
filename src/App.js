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

class Scale {
  static modes = {
    names: [
      "Empty", 
      "Ionian", 
      "Dorian", 
      "Phrygian", 
      "Lydian", 
      "Mixolydian",
      "Aeolian",
      "?"
    ],
    scales: [
      [],
      [0, 2, 4, 5, 7, 9, 11, 12],
    ],
  };
  static mode_names = [
    "Empty", 
    "Ionian", 
    "Dorian", 
    "Phrygian", 
    "Lydian", 
    "Mixolydian",
    "Aeolian",
    "?"
  ];
  static mode_scales = [

  ]; 

  constructor(name, notes) {
    this.name = name;
    this.notes = arrayToScale(notes);
  }

  static empty() {
    return new Scale("Empty", []);
  }

  static mode(scale_mode) {
    if (scale_mode < 0 || scale_mode >= Scale.modes.names.length) {
      throw "Mode must be between 0 and 7";
    }
    return new Scale(this.modes.names[scale_mode], this.modes.scales[scale_mode]);
  }
}


class FretBoardInterface extends React.Component {
  constructor(props) {
    super(props);
    this.strings = 6;
    this.fretsPerString = 5;
    this.state = {
      values: Scale.mode(1).notes,
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
