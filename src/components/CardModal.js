import React, { useState } from 'react';

function CardModal({ card, listId, onClose, onDeleteCard, onUpdateCard }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    
    onUpdateCard(listId, card.id, {
      title,
      description,
      dueDate: dueDate || null
    });
    
    onClose();
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDeleteCard(listId, card.id);
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <input
              type="text"
              className="modal-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card Title"
              autoFocus
            />
            <button
              type="button"
              className="modal-close-button"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <div className="modal-section">
            <h3>Description</h3>
            <textarea
              className="modal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a more detailed description..."
              rows={5}
            />
          </div>
          
          <div className="modal-section">
            <h3>Due Date</h3>
            <input
              type="date"
              className="modal-date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="modal-actions">
            <button type="submit" className="modal-save-button">
              Save
            </button>
            <button
              type="button"
              className="modal-delete-button"
              onClick={handleDelete}
            >
              Delete Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;