const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY;

app.use(cors());

app.get('/api-key', (req, res) => {
  res.send(apiKey);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
