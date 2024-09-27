const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getRandevuBilgileri } = require('./vizeRandevuPack');
const ulkeVizeSiteleri = require('./ulkeVizeSiteleri');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/ulkeler', (req, res) => {
  res.json(ulkeVizeSiteleri);
});

app.post('/api/randevu', async (req, res) => {
  const { vatandaslik, hedefUlke, bulunduguUlke } = req.body;
  console.log('Randevu bilgisi isteği alındı:', { vatandaslik, hedefUlke, bulunduguUlke });
  
  try {
    const randevuBilgileri = await getRandevuBilgileri(vatandaslik, hedefUlke, bulunduguUlke);
    console.log('Randevu bilgileri bulundu:', randevuBilgileri);
    res.json(randevuBilgileri);
  } catch (error) {
    console.error('Sunucu hatası:', error);
    res.status(500).json({ error: error.message || 'Randevu bilgileri bulunamadı', details: error.stack });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
