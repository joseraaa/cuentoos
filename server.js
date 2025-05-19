const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/crear-cuento', async (req, res) => {
  const { nombre, personaje, lugar, tipo, mensaje } = req.body;

  const prompt = `
Eres un escritor de cuentos mágicos para niños. Escribe un cuento corto y creativo con estos elementos:
- Nombre del niño o niña: ${nombre}
- Personaje: ${personaje}
- Lugar mágico: ${lugar}
- Tipo de aventura: ${tipo}
${mensaje ? `- Mensaje mágico: ${mensaje}` : ''}
El cuento debe ser tierno, con un mensaje positivo, y con un final feliz.
  `;

  try {
    const respuesta = await axios.post(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GOOGLE_API_KEY,
  {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);


    const cuento = respuesta.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!cuento) {
      return res.status(500).json({ error: '❌ No se generó contenido' });
    }

    res.json({ cuento });

  } catch (error) {
    console.error('❌ Error al generar cuento con Gemini:');
    if (error.response) {
      console.error('📄 Status:', error.response.status);
      console.error('📄 Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    res.status(500).json({ error: '❌ Error al generar cuento con Gemini' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
