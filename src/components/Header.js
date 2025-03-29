import React from 'react';

function Header() {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the board? All lists and cards will be deleted.')) {
      localStorage.removeItem('trelloBoardData');
      window.location.reload();
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1>TrelloBoard</h1>
      </div>
      <div className="header-buttons">
        <button onClick={handleReset} className="reset-button">
          Reset Board
        </button>
      </div>
    </header>
  );
}

export default Header;