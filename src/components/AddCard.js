import React, { useState } from 'react';
import { useBoard } from '../contexts/BoardContext';
import './AddCard.css';

const AddCard = ({ listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const { addCard } = useBoard();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cardTitle.trim()) {
      addCard(listId, cardTitle.trim());
      setCardTitle('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setCardTitle('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        className="add-card-button"
        onClick={() => setIsAdding(true)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="add-icon" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
        <span>Add a Card</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <textarea
        className="add-card-textarea"
        placeholder="Enter a title for this card..."
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        autoFocus
      />
      <div className="add-card-actions">
        <button 
          type="submit" 
          className="add-confirm-button"
          disabled={!cardTitle.trim()}
        >
          Add Card
        </button>
        <button 
          type="button" 
          className="add-cancel-button"
          onClick={handleCancel}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="cancel-icon" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AddCard;