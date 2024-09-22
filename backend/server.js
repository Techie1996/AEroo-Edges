const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://aeroedge.netlify.app', // Allow requests from this origin
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://govindayadav962:nKBWWSkSwMUzlVyN@cluster0.bb6qy.mongodb.net/mern-crud?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../build')));
// Root route
app.get('/', (req, res) => {
  res.send('Backend connected');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

// Item Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// CRUD Routes for Items
app.post('/api/items', async (req, res) => {
  console.log('Received POST request:', req.body); // Log the request body
  const item = new Item(req.body);
  await item.save();
  console.log('Item saved:', item); // Log the saved item
  res.status(201).send(item);
});

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  console.log('Fetched items:', items); // Log the fetched items
  res.send(items);
});

app.put('/api/items/:id', async (req, res) => {
  console.log('Received PUT request for ID:', req.params.id, 'with body:', req.body); // Log the request details
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  console.log('Updated item:', item); // Log the updated item
  res.send(item);
});

app.delete('/api/items/:id', async (req, res) => {
  console.log('Received DELETE request for ID:', req.params.id); // Log the ID being deleted
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  console.log('Received signup request:', req.body); // Log the signup request body
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  console.log('User created:', user); // Log the created user
  res.status(201).send({ message: 'User created successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
