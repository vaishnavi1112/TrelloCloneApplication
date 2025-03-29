import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

function Card({ card, index, listId, onDeleteCard, onUpdateCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleOpenModal}
          >
            <div className="card-content">
              <p>{card.title}</p>
              {card.dueDate && (
                <div className="card-due-date">
                  Due: {new Date(card.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
      
      {isModalOpen && (
        <CardModal
          card={card}
          listId={listId}
          onClose={handleCloseModal}
          onDeleteCard={onDeleteCard}
          onUpdateCard={onUpdateCard}
        />
      )}
    </>
  );
}

export default Card;