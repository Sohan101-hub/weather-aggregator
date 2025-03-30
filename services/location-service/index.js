const express = require('express');
const app = express();
const PORT = 3000;

app.get('/location', (req, res) => {
  const city = req.query.city || 'Paris';
  res.json({
    city: city,
    latitude: 48.8566,
    longitude: 2.3522
  });
});

app.listen(PORT, () => {
  console.log(`Location Service running on port ${PORT}`);
});
