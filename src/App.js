import React from 'react';
import './App.css';
import Scale from './Scale.js';


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
    var value;
    if (this.props.values[i]) {
      value = this.props.answers[i] ? "O" : "X";
    } else {
      value = " ";
    }
    return (
      <Fret 
        key={i.toString()}
        value={value}
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
      mode: empty,
      notes: FretBoardInterface.scaleToFretboard(empty),
      userValues: FretBoardInterface.scaleToFretboard(empty),
    };
  }

  static scaleToFretboard(scale) {
    var notes = scale.notes.slice();
    notes.unshift(false);                                                    // Start the scale on the second fret.
    notes.splice(4 * 5, 0, false);                                           // Need to add a shift before the B string.
    return notes;
  }

  handleClick(i) {
    var newValues = this.state.userValues.slice();
    newValues[i] = !newValues[i];
    this.setState({
      userValues: newValues,
    });
  }

  changeMode(m) {
    var scale = Scale.mode(m);
    this.setState({
      mode: scale,
      notes: FretBoardInterface.scaleToFretboard(scale),
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

  render() {
    console.log(this.state.notes);
    console.log(this.state.userValues);

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
          values={this.state.userValues}
          answers={this.state.notes}
          onClick={(i) => this.handleClick(i)}
        />
        {buttons}
        <div>
          {this.state.mode.name}
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
