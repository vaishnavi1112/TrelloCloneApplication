import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

function List({ list, index, onAddCard, onDeleteList, onUpdateListTitle, onDeleteCard, onUpdateCard }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleBlur = () => {
    if (listTitle.trim() !== '') {
      onUpdateListTitle(list.id, listTitle);
    } else {
      setListTitle(list.title);
    }
    setEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleBlur();
    }
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    if (newCardTitle.trim() !== '') {
      onAddCard(list.id, newCardTitle);
      setNewCardTitle('');
      setShowAddCard(false);
    }
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="list"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-header">
            {editingTitle ? (
              <input
                type="text"
                className="list-title-input"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <h2 className="list-title" onClick={handleTitleClick}>
                {list.title}
              </h2>
            )}
            <button
              className="delete-list-button"
              onClick={() => onDeleteList(list.id)}
            >
              ✕
            </button>
          </div>
          
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="cards-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={cardIndex}
                    listId={list.id}
                    onDeleteCard={onDeleteCard}
                    onUpdateCard={onUpdateCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          {showAddCard ? (
            <form className="add-card-form" onSubmit={handleSubmitCard}>
              <input
                type="text"
                placeholder="Enter a title for this card..."
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                autoFocus
              />
              <div className="add-card-buttons">
                <button type="submit" className="add-card-submit">
                  Add Card
                </button>
                <button
                  type="button"
                  className="add-card-cancel"
                  onClick={() => setShowAddCard(false)}
                >
                  ✕
                </button>
              </div>
            </form>
          ) : (
            <button
              className="add-card-button"
              onClick={() => setShowAddCard(true)}
            >
              + Add a card
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default List;