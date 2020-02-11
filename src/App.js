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
      value: "Hello!",
    };
  }

  changeMessage(message) {
    this.setState({
      value: message,
    });
  }
  renderFret() {
    return (
      <Fret 
        value={this.state.value}
        onClick={() => this.changeMessage("Goodbye!")}
      />      
    );
  }

  render() {
    return (
      <div>
        {this.renderFret()}
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
