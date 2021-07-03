const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// call from frontend with search data in body
if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  })
  app.get('/build/bundle.js', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'));
  })
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));