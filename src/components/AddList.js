import React, { useState } from 'react';

function AddList({ onAddList }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listTitle.trim() !== '') {
      onAddList(listTitle);
      setListTitle('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="add-list-container">
      {showAddForm ? (
        <form className="add-list-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter list title..."
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            autoFocus
          />
          <div className="add-list-buttons">
            <button type="submit" className="add-list-submit">
              Add List
            </button>
            <button
              type="button"
              className="add-list-cancel"
              onClick={() => setShowAddForm(false)}
            >
              ✕
            </button>
          </div>
        </form>
      ) : (
        <button
          className="add-list-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add another list
        </button>
      )}
    </div>
  );
}

export default AddList;