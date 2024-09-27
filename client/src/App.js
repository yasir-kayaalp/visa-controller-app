import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [vatandaslik, setVatandaslik] = useState('');
  const [hedefUlke, setHedefUlke] = useState('');
  const [bulunduguUlke, setBulunduguUlke] = useState('');
  const [ulkeVizeSiteleri, setUlkeVizeSiteleri] = useState({});
  const [yukleniyor, setYukleniyor] = useState(false);
  const [randevuBilgileri, setRandevuBilgileri] = useState(null);

  useEffect(() => {
    axios.get('/api/ulkeler')
      .then(response => {
        console.log('API\'den gelen ülke verileri:', response.data);
        setUlkeVizeSiteleri(response.data);
      })
      .catch(error => {
        console.error('Ülke listesi alınamadı:', error.response ? error.response.data : error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    try {
      const response = await axios.post('/api/randevu', { vatandaslik, hedefUlke, bulunduguUlke });
      setRandevuBilgileri(response.data);
    } catch (error) {
      console.error('Hata:', error);
      alert('Randevu bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
    }
    setYukleniyor(false);
  };

  return (
    <div className="App">
      <h1>Vize Randevu Uygulaması</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vatandaşı olduğunuz ülke"
          value={vatandaslik}
          onChange={(e) => setVatandaslik(e.target.value)}
          required
        />
        <select
          value={hedefUlke}
          onChange={(e) => setHedefUlke(e.target.value)}
          required
        >
          <option value="">Vize almak istediğiniz ülkeyi seçin</option>
          {Object.keys(ulkeVizeSiteleri).length > 0 ? (
            Object.entries(ulkeVizeSiteleri).flatMap(([kita, ulkeler]) =>
              Object.keys(ulkeler).map(ulke => (
                <option key={ulke} value={ulke}>{ulke}</option>
              ))
            )
          ) : (
            <option disabled>Ülke verileri yükleniyor...</option>
          )}
        </select>
        <input
          type="text"
          placeholder="Şu an bulunduğunuz ülke"
          value={bulunduguUlke}
          onChange={(e) => setBulunduguUlke(e.target.value)}
          required
        />
        <button type="submit" disabled={yukleniyor}>
          {yukleniyor ? 'Aranıyor...' : 'Randevu Bul'}
        </button>
      </form>
      {randevuBilgileri && (
        <div className="randevu-bilgileri">
          <h2>{randevuBilgileri.ulke} Vize Randevu Bilgileri</h2>
          <p>Boş Randevu Sayısı: {randevuBilgileri.bosRandevuSayisi}</p>
          <h3>Müsait Randevu Tarihleri:</h3>
          <ul>
            {randevuBilgileri.randevuTarihleri.map((tarih, index) => (
              <li key={index}>{tarih}</li>
            ))}
          </ul>
          <p>
            Randevu almak için{' '}
            <a href={randevuBilgileri.randevuLinki} target="_blank" rel="noopener noreferrer">
              buraya tıklayın
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
