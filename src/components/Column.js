const Column = ({ column }) => {
    return (
      <div className="bg-black text-white p-4 rounded w-64">
        <h2 className="font-bold text-lg mb-2">{column.title}</h2>
        {column.cards.map((card, index) => (
          <div key={index} className="bg-gray-700 p-2 my-1 rounded">{card}</div>
        ))}
        <button className="text-gray-300 mt-2">+ Add a card</button>
      </div>
    );
  };
  
  export default Column;
  