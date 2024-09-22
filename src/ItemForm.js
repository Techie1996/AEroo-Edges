// src/ItemForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

const fetchItems = async () => {
  try {
    const response = await axios.get('https://aeroo-edges.onrender.com/api/items');
    console.log('Fetched items:', response.data); // Log the fetched data
    setItems(response.data);
  } catch (error) {
    console.error('Error fetching items:', error); // Log the error
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with name:', name); // Log form submission
    try {
      if (editing) {
        await axios.put(`https://aeroo-edges.onrender.com/api/items/${editing}`, { name });
        console.log(`Updated item ${editing} with name:`, name); // Log update action
        setEditing(null);
      } else {
        await axios.post('https://aeroo-edges.onrender.com/api/items', { name });
        console.log('Added new item with name:', name); // Log add action
      }
      setName('');
      fetchItems();
    } catch (error) {
      console.error('Error submitting form:', error); // Log submit errors
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditing(item._id);
    console.log('Editing item:', item); // Log edit action
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://aeroo-edges.onrender.com/api/items/${id}`);
      console.log(`Deleted item with id: ${id}`); // Log delete action
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error); // Log delete errors
    }
  };

  return (
    <div style={{
      backgroundImage: 'url(https://picsum.photos/800/400)',
      backgroundSize: 'cover',
      padding: '40px',
      color: 'white',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '20px auto',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Manage Your Items</h2>
        <p>Add, edit, or delete items in your list.</p>
      </div>
      <form onSubmit={handleSubmit} style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '8px',
      }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          required
          style={{
            width: '100%',
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>{editing ? 'Update' : 'Add'}</button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {items?.map(item => (
          <li key={item._id} style={{ margin: '10px 0' }}>
            {item.name}
            <button onClick={() => handleEdit(item)} style={{
              marginLeft: '10px',
              padding: '5px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>Edit</button>
            <button onClick={() => handleDelete(item._id)} style={{
              marginLeft: '10px',
              padding: '5px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemForm;
