import React from 'react';
import Header from './components/Header';
import Board from './components/Board';
import './styles/globals.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Board />
    </div>
  );
}

export default App;