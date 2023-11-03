import React, { useState } from 'react';

const MediaCRUD = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedFile, setEditedFile] = useState(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file && selectedCategory) {
      const newMedia = {
        id: mediaItems.length + 1,
        file,
        category: selectedCategory,
      };
      setMediaItems([...mediaItems, newMedia]);
      setFile(null);
    } else {
      alert('Please select a category and file to upload.');
    }
  };

  const handleEdit = (id) => {
    const mediaToEdit = mediaItems.find((media) => media.id === id);
    setEditId(id);
    setEditedCategory(mediaToEdit.category);
    setEditedFile(mediaToEdit.file);
  };

  const handleSaveEdit = () => {
    const updatedMediaItems = mediaItems.map((media) => {
      if (media.id === editId) {
        return {
          ...media,
          category: editedCategory,
          file: editedFile,
        };
      }
      return media;
    });
    setMediaItems(updatedMediaItems);
    setEditId(null);
    setEditedCategory('');
    setEditedFile(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedCategory('');
    setEditedFile(null);
  };

  const handleDelete = (id) => {
    const updatedMediaItems = mediaItems.filter((item) => item.id !== id);
    setMediaItems(updatedMediaItems);
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-3xl font-bold mb-5" style={{color:"#164E63"}}>Media Master  </h1>
  <div className='p-4 bg-white shadow-md'>  
      <div className="flex flex-wrap items-center justify-between mb-5">
        <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 rounded border mb-3 sm:mb-0 sm:w-1/4">
        <option value="">Select a category</option>
        <option value="MukhyaSamachar">MukhyaSamachar</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Bihar">Bihar</option>
        <option value="Rajya">Rajya</option>
        <option value="Desh">Desh</option>
        <option value="Manoranjan">Manoranjan</option>
        <option value="Vyapaar">Vyapaar</option>
        <option value="Technology">Technology</option>
        <option value="Rashifal">Rashifal</option>
        <option value="Dharmik">Dharmik</option>
        <option value="Khel">Khel</option>
        </select>

        <input type="file" onChange={handleFileChange} className="p-2 rounded border mb-3 sm:mb-0 sm:w-1/4" />
        <button onClick={handleUpload} className="bg-green-500 text-white rounded px-4 py-2 sm:w-1/4">Upload</button>
      </div>
      </div>
      <div className="overflow-x-auto my-2 ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {mediaItems.map((media) => (
              <tr key={media.id}>
                <td className="py-2 px-4 flex justify-center">{media.id}</td>
                <td className="py-2 px-4">
                  {editId === media.id ? (
                    <input value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="p-2 rounded border w-full" />
                  ) : (
                    media.category
                  )}
                </td>
                <td className="py-2 px-4">
                  {editId === media.id ? (
                    <input type="file" onChange={(e) => setEditedFile(e.target.files[0])} className="p-2 rounded border" />
                  ) : (
                    <img src={URL.createObjectURL(media.file)} alt="Media" className="w-24" />
                  )}
                </td>
                <td className="py-2 px-4">
                  {editId === media.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="bg-green-500 text-white rounded px-3 py-1 mr-2">Save</button>
                      <button onClick={handleCancelEdit} className="bg-red-500 text-white rounded px-3 py-1">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(media.id)} className="bg-yellow-500 text-white rounded px-3 py-1 mr-2">Edit</button>
                      <button onClick={() => handleDelete(media.id)} className="bg-red-500 text-white rounded px-3 py-1">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaCRUD;
