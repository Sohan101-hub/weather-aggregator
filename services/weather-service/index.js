const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

const API_KEY = "enter_api_key_here";

app.use(cors());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required. Example: ?city=Paris" });
  }

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: city
      }
    });

    const data = response.data;
    res.json({
      location: `${data.location.name}, ${data.location.country}`,
      temperature: `${data.current.temp_c} °C`,
      humidity: `${data.current.humidity} %`,
      condition: data.current.condition.text,
      icon: `https:${data.current.condition.icon}`
    });

  } catch (err) {
    console.error("Error fetching data:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Could not fetch weather data. Please check city name." });
  }
});

app.listen(PORT, () => {
  console.log(`Weather API Service running on port ${PORT}`);
});

