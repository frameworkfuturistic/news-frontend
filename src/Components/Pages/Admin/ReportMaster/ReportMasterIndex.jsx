import React, { useState } from 'react';

const CrudComponent = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', content: 'This is the content of card 1' },
    { id: 2, title: 'Card 2', content: 'This is the content of card 2' },
    { id: 3, title: 'Card 3', content: 'This is the content of card 3' },
  ]);

  const [editing, setEditing] = useState(null);
  const [newCard, setNewCard] = useState({ id: null, title: '', content: '' });

  const handleEdit = (id) => {
    setEditing(id);
    const cardToEdit = cards.find((card) => card.id === id);
    setNewCard({ id: id, title: cardToEdit.title, content: cardToEdit.content });
  };

  const handleSave = () => {
    if (editing !== null) {
      setCards(cards.map((card) => (card.id === editing ? { ...card, title: newCard.title, content: newCard.content } : card)));
      setEditing(null);
    } else {
      setCards([...cards, { id: Date.now(), title: newCard.title, content: newCard.content }]);
    }
    setNewCard({ id: null, title: '', content: '' });
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(2); // Number of cards per page
    // Logic to calculate index of the last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    // Logic to calculate index of the first card on the current page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    // Logic to get the current cards for the current page
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <input
          className="w-full p-2 mt-2 border rounded"
          type="text"
          placeholder="Content"
          value={newCard.content}
          onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
        />
        <button
          className="w-full mt-2    text-white font-bold py-2 px-4 rounded" style={{color:"#164E63", backgroundColor:"#164E63" }}
          onClick={handleSave}
        >
          {editing !== null ? 'Save' : 'Add'}
        </button>
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.id} className="bg-gray-100 rounded p-4 mb-4">
            {editing === card.id ? (
              <div>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                />
                <input
                  className="w-full p-2 mt-2 border rounded"
                  type="text"
                  value={newCard.content}
                  onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
                />
              </div>
            ) : (
              <div>
              {currentCards.map((card) => (
                <><h3 className="text-lg font-bold mb-2">{card.title}</h3><p>{card.content}</p></>
   ))}
              </div>
            )}
            <div className="mt-2">
              <button
                className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleEdit(card.id)}
              >
                {editing === card.id ? 'Cancel' : 'Edit'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(card.id)}
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
            {/* Pagination buttons */}
            {cards.length > cardsPerPage && (
              <div>
                {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      currentPage === index + 1 ? 'bg-blue-700' : ''
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudComponent;