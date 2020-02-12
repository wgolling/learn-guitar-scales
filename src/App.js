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


class FretBoardInterface extends React.Component {
  constructor(props) {
    super(props);
    this.strings = 6;
    this.fretsPerString = 5;
    var notes = Scale.mode(3).notes.slice();
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
