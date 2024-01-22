const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/buscar-modelos', async (req, res) => {
  try {
    const brandId = req.query.brandId || 6; // ID de la marca AUDI (valor predeterminado: 6)
    const groupId = req.query.groupId || 10; // ID del grupo (valor predeterminado: 10)
    const apiUrl = 'https://api.infoauto.com.ar/cars/pub/';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNTkyODExMywianRpIjoiNDhkMGYwMzUtYWI0OS00YzFmLTgxZGQtNjVlMWRjZWRlMGY0IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjozOTEsIm5iZiI6MTcwNTkyODExMywiZXhwIjoxNzA1OTMxNzEzLCJyb2xlcyI6W3siaWQiOjExLCJuYW1lIjoiMGttIn0seyJpZCI6MTksIm5hbWUiOiJEZXNhcnJvbGxvIn0seyJpZCI6MTAsIm5hbWUiOiJFeHRyYXMifSx7ImlkIjo5LCJuYW1lIjoiTW9kZWxvcyJ9LHsiaWQiOjEyLCJuYW1lIjoiVXNhZG9zIn1dfQ.NuT5aOh_v0SsDC41yMYS9XTd7c_8D2sM4y4B4fq5ULw';

    const response = await axios.get(`${apiUrl}/brands/${brandId}/groups/${groupId}/models/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const modelos = response.data;

    res.json({ modelos });
  } catch (error) {
    console.error('Error al hacer la consulta:', error.message);
    res.status(500).json({ error: 'Error al hacer la consulta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
