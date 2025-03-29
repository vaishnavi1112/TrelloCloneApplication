// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const BoardContext = createContext();

// export const BoardProvider = ({ children }) => {
//   const [board, setBoard] = useState({ lists: [] });
  
//   // Load data from localStorage on initial render
//   useEffect(() => {
//     const savedBoard = localStorage.getItem('trello-board');
//     if (savedBoard) {
//       try {
//         setBoard(JSON.parse(savedBoard));
//       } catch (error) {
//         console.error('Failed to parse board data', error);
//       }
//     }
//   }, []);

//   // Save to localStorage whenever board changes
//   useEffect(() => {
//     localStorage.setItem('trello-board', JSON.stringify(board));
//   }, [board]);

//   const addList = (title) => {
//     const newList = {
//       id: uuidv4(),
//       title,
//       cards: []
//     };

//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: [...prevBoard.lists, newList]
//     }));
//   };

//   const deleteList = (listId) => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.filter(list => list.id !== listId)
//     }));
//   };

//   const editListTitle = (listId, newTitle) => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.map(list => 
//         list.id === listId ? { ...list, title: newTitle } : list
//       )
//     }));
//   };

//   const addCard = (listId, title) => {
//     const newCard = {
//       id: uuidv4(),
//       title,
//       description: '',
//       dueDate: ''
//     };

//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.map(list => 
//         list.id === listId 
//           ? { ...list, cards: [...list.cards, newCard] }
//           : list
//       )
//     }));
//   };

//   const editCard = (listId, cardId, updates) => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.map(list => 
//         list.id === listId 
//           ? { 
//               ...list, 
//               cards: list.cards.map(card => 
//                 card.id === cardId 
//                   ? { ...card, ...updates }
//                   : card
//               )
//             }
//           : list
//       )
//     }));
//   };

//   const deleteCard = (listId, cardId) => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.map(list => 
//         list.id === listId 
//           ? { ...list, cards: list.cards.filter(card => card.id !== cardId) }
//           : list
//       )
//     }));
//   };

//   const moveCard = (sourceListId, destinationListId, draggableId, destinationIndex) => {
//     const sourceList = board.lists.find(list => list.id === sourceListId);
//     if (!sourceList) return;

//     const card = sourceList.cards.find(card => card.id === draggableId);
//     if (!card) return;

//     // Remove card from source list
//     const newSourceList = {
//       ...sourceList,
//       cards: sourceList.cards.filter(c => c.id !== draggableId)
//     };

//     // If moving within the same list
//     if (sourceListId === destinationListId) {
//       const newCards = Array.from(newSourceList.cards);
//       newCards.splice(destinationIndex, 0, card);
      
//       const newList = {
//         ...newSourceList,
//         cards: newCards
//       };

//       setBoard(prevBoard => ({
//         ...prevBoard,
//         lists: prevBoard.lists.map(list => 
//           list.id === sourceListId ? newList : list
//         )
//       }));
      
//       return;
//     }

//     // Moving to a different list
//     const destinationList = board.lists.find(list => list.id === destinationListId);
//     if (!destinationList) return;

//     const newDestinationCards = Array.from(destinationList.cards);
//     newDestinationCards.splice(destinationIndex, 0, card);

//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: prevBoard.lists.map(list => {
//         if (list.id === sourceListId) {
//           return newSourceList;
//         }
//         if (list.id === destinationListId) {
//           return {
//             ...list,
//             cards: newDestinationCards
//           };
//         }
//         return list;
//       })
//     }));
//   };

//   const reorderLists = (sourceIndex, destinationIndex) => {
//     const newLists = Array.from(board.lists);
//     const [removed] = newLists.splice(sourceIndex, 1);
//     newLists.splice(destinationIndex, 0, removed);

//     setBoard(prevBoard => ({
//       ...prevBoard,
//       lists: newLists
//     }));
//   };

//   const resetBoard = () => {
//     setBoard({ lists: [] });
//   };

//   return (
//     <BoardContext.Provider 
//       value={{ 
//         board, 
//         addList, 
//         deleteList, 
//         editListTitle, 
//         addCard, 
//         editCard, 
//         deleteCard, 
//         moveCard, 
//         reorderLists, 
//         resetBoard 
//       }}
//     >
//       {children}
//     </BoardContext.Provider>
//   );
// };

// export const useBoard = () => useContext(BoardContext);

import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("trelloBoard");
    return savedBoard ? JSON.parse(savedBoard) : { lists: [] };
  });

  useEffect(() => {
    localStorage.setItem("trelloBoard", JSON.stringify(board));
  }, [board]);

  const addList = () => {
    const title = prompt("Enter list title:");
    if (title) {
      setBoard((prev) => ({ lists: [...prev.lists, { id: uuidv4(), title, cards: [] }] }));
    }
  };

  const addCard = (listId) => {
    const title = prompt("Enter card title:");
    if (title) {
      setBoard((prev) => {
        const updatedLists = prev.lists.map((list) =>
          list.id === listId ? { ...list, cards: [...list.cards, { id: uuidv4(), title }] } : list
        );
        return { lists: updatedLists };
      });
    }
  };

  const deleteList = (listId) => {
    setBoard((prev) => ({ lists: prev.lists.filter((list) => list.id !== listId) }));
  };

  const deleteCard = (listId, cardId) => {
    setBoard((prev) => {
      const updatedLists = prev.lists.map((list) =>
        list.id === listId ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) } : list
      );
      return { lists: updatedLists };
    });
  };

  return (
    <BoardContext.Provider value={{ board, setBoard, addList, addCard, deleteList, deleteCard }}>
      {children}
    </BoardContext.Provider>
  );
};