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
    const response = await axios.get('http://localhost:5000/api/items');
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/api/items/${editing}`, { name });
      setEditing(null);
    } else {
      await axios.post('http://localhost:5000/api/items', { name });
    }
    setName('');
    fetchItems();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditing(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
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
        {items.map(item => (
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
