// src/components/Board.jsx - Fixed version
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';
import AddList from './AddList';
import { loadState, saveState } from '../utils/localstorage';

function Board() {
  const [lists, setLists] = useState([]);
  
  useEffect(() => {
    const savedData = loadState('trelloBoardData');
    if (savedData && savedData.lists) {
      setLists(savedData.lists);
    }
  }, []);

  useEffect(() => {
    saveState('trelloBoardData', { lists });
  }, [lists]);

  const addList = (title) => {
    const newList = {
      id: `list-${Date.now()}`,
      title,
      cards: []
    };
    setLists([...lists, newList]);
  };

  const deleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setLists(lists.filter(list => list.id !== listId));
    }
  };

  const updateListTitle = (listId, newTitle) => {
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return { ...list, title: newTitle };
        }
        return list;
      })
    );
  };

  const addCard = (listId, cardTitle) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: cardTitle,
      description: '',
      dueDate: null
    };
    
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        }
        return list;
      })
    );
  };

  const deleteCard = (listId, cardId) => {
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
          };
        }
        return list;
      })
    );
  };

  const updateCard = (listId, cardId, updatedCard) => {
    setLists(
      lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(card => 
              card.id === cardId ? { ...card, ...updatedCard } : card
            )
          };
        }
        return list;
      })
    );
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // If no destination or dropped at the same spot
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle list reordering
    if (type === 'list') {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      setLists(newLists);
      return;
    }

    // Handle card reordering
    const sourceList = lists.find(list => list.id === source.droppableId);
    const destList = lists.find(list => list.id === destination.droppableId);
    
    // If moving within the same list
    if (sourceList.id === destList.id) {
      const newCards = Array.from(sourceList.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);
      
      const newLists = lists.map(list => {
        if (list.id === sourceList.id) {
          return { ...list, cards: newCards };
        }
        return list;
      });
      
      setLists(newLists);
    } else {
      // Moving from one list to another
      const sourceCards = Array.from(sourceList.cards);
      const destCards = Array.from(destList.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);
      
      const newLists = lists.map(list => {
        if (list.id === sourceList.id) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destList.id) {
          return { ...list, cards: destCards };
        }
        return list;
      });
      
      setLists(newLists);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div 
            className="board"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists.map((list, index) => (
              <List
                key={list.id}
                list={list}
                index={index}
                onAddCard={addCard}
                onDeleteList={deleteList}
                onUpdateListTitle={updateListTitle}
                onDeleteCard={deleteCard}
                onUpdateCard={updateCard}
              />
            ))}
            {provided.placeholder}
            <AddList onAddList={addList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;