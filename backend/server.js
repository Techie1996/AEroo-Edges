// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mern-crud', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// Connect to MongoDB

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(process.env.MONGODB_URI)

// Item Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Consider hashing passwords
});

const User = mongoose.model('User', userSchema);

// CRUD Routes for Items
app.post('/api/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.put('/api/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});

app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).send({ message: 'User created successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
