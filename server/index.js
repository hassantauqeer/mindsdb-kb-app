
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Routes
const kbRoutes = require('./routes/kb.routes.js');
app.use('/kb', kbRoutes);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
