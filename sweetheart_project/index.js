require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user');
const confessRoutes = require('./server/routes/confess');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', userRoutes);
app.use('/confessions', confessRoutes);

// Root route - serve the login page by default or index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sweetheart-login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
