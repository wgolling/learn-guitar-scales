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
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      values: Array(5 * 6).fill(true),
    };
  }

  toggleMessage() {
    this.setState({
      value: !this.state.value,
    });
  }

  toggleValue(i) {
    var newValues = this.state.values.slice();
    newValues[i] = !newValues[i];
    this.setState({
      values: newValues,
    });
  }

  renderFret(i) {
    return (
      <Fret 
        key={i.toString()}
        value={this.state.values[i] ? "Hello!" : "Goodbye!"}
        onClick={() => this.toggleValue(i)}
      />      
    );
  }

  renderString(j) {
    const frets = [];
    const fretsPerString = 5;
    var i;
    for (i=0; i < fretsPerString; i++) {
      frets.push(this.renderFret(j * fretsPerString + i));
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
    for (i = 0; i < 6; i++) {
      strings.push(this.renderString(i));
    }
    return (
      <div className="fretboard">
        {strings}
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
          <FretBoard />
        </div>
      </header>
    </div>
  );
}

export default App;
