import React, { useState } from 'react';

const ReportMasterIndex = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'News 1', description: 'Description for News 1' },
    { id: 2, title: 'News 2', description: 'Description for News 2' },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddCard = () => {
    if (newTitle && newDescription) {
      const newCard = {
        id: cards.length + 1,
        title: newTitle,
        description: newDescription,
      };

      setCards([...cards, newCard]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleEditCard = (id, title, description) => {
    setEditMode(true);
    setEditedId(id);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSaveEdit = () => {
    const updatedCards = cards.map(card =>
      card.id === editedId ? { ...card, title: editedTitle, description: editedDescription } : card
    );
    setCards(updatedCards);
    setEditMode(false);
    setEditedId(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const handleDeleteCard = id => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold bg mb-4" style={{color:"#164E63"}}>Report Master</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card.id} className="bg-white">
              {editMode && editedId === card.id ? (
                <>
                  <td className="py-2 px-4 border">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={e => setEditedDescription(e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded mr-2"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border">{card.title}</td>
                  <td className="py-2 px-4 border">{card.description}</td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded mr-2"
                      onClick={() => handleEditCard(card.id, card.title, card.description)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-gray-100 p-4 rounded-md mt-4">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="block w-full rounded-md border-gray-300 mb-2 p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          className="block w-full rounded-md border-gray-300 mb-2 p-2"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleAddCard}
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default ReportMasterIndex;