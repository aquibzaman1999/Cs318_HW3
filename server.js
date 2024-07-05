const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://aquibzaman1999:Aquib2024@aquibapi.mrsif7j.mongodb.net/books?retryWrites=true&w=majority&appName=aquibAPI', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(3000, () => console.log('Server Started'));
