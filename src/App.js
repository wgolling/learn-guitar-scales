import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FretBoard />
      </header>
    </div>
  );
}

class FretBoard extends React.Component {
  render() {
    return (
      <p>
        Learn to play guitar scales.
      </p>
    );
  }
}
export default App;
