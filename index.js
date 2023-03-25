const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY;

app.get('/api-key', (req, res) => {
  res.send(apiKey);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
