const puppeteer = require('puppeteer');
const ulkeVizeSiteleri = require('./ulkeVizeSiteleri');

async function getRandevuBilgileri(vatandaslik, hedefUlke, bulunduguUlke) {
  let browser;
  try {
    console.log('getRandevuBilgileri fonksiyonu çağrıldı');
    console.log('Puppeteer başlatılıyor');
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      defaultViewport: null,
    });
    console.log('Puppeteer başlatıldı');
    const page = await browser.newPage();

    // User-Agent'ı ayarla
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Hedef ülke için doğru URL'yi bul
    let vizeSitesi = null;
    for (const [kita, ulkeler] of Object.entries(ulkeVizeSiteleri)) {
      if (ulkeler[hedefUlke]) {
        vizeSitesi = ulkeler[hedefUlke].url;
        break;
      }
    }

    if (!vizeSitesi) {
      throw new Error(`${hedefUlke} için vize randevu sitesi bulunamadı.`);
    }

    console.log(`${vizeSitesi} adresine gidiliyor...`);
    await page.goto(vizeSitesi, { waitUntil: 'networkidle0', timeout: 120000 });

    let randevuBilgileri;
    if (hedefUlke === 'ABD') {
      randevuBilgileri = await handleUSVisa(page, vatandaslik, bulunduguUlke);
    } else if (hedefUlke === 'Schengen') {
      randevuBilgileri = await handleSchengenVisa(page, vatandaslik, bulunduguUlke);
    } else {
      throw new Error(`${hedefUlke} için işlem tanımlanmamış.`);
    }

    return randevuBilgileri;
  } catch (error) {
    console.error(`Vize randevu hatası (${hedefUlke}):`, error);
    throw new Error(`${hedefUlke} için randevu bilgileri alınırken bir hata oluştu: ${error.message}`);
  } finally {
    if (browser) {
      console.log('Tarayıcı kapatılıyor...');
      await browser.close();
    }
  }
}

async function handleUSVisa(page, vatandaslik, bulunduguUlke) {
  console.log('ABD vize sayfası işleniyor...');
  
  // Sayfanın yüklenmesi için daha uzun bir süre bekleyelim
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });
  
  console.log('Sayfa yüklendi, elementler aranıyor...');
  
  // Sayfanın HTML içeriğini kontrol edelim
  const pageContent = await page.content();
  console.log('Sayfa içeriği:', pageContent.substring(0, 500) + '...'); // İlk 500 karakteri göster
  
  try {
    await page.waitForSelector('#form-select-1', { timeout: 60000 });
    console.log('#form-select-1 elementi bulundu');
    await page.select('#form-select-1', vatandaslik);
    // Diğer gerekli işlemler...
  } catch (error) {
    console.error('Element bulunamadı veya seçilemedi:', error);
    throw error;
  }
  
  try {
    // Randevu bilgilerini toplama
    const randevuTarihleri = await page.evaluate(() => {
      // Bu kısım, sitenin yapısına göre değişecektir
      const tarihler = Array.from(document.querySelectorAll('.randevu-tarihi')).map(el => el.textContent);
      return tarihler;
    });

    const bosRandevuSayisi = randevuTarihleri.length;

    return {
      ulke: 'ABD',
      randevuTarihleri,
      bosRandevuSayisi,
      randevuLinki: page.url()
    };
  } catch (error) {
    console.error('Randevu bilgileri alınamadı:', error);
    throw error;
  }
}

async function handleSchengenVisa(page, vatandaslik, bulunduguUlke) {
  // Schengen vize randevu sitesi için özel işlemler
  await page.waitForSelector('#nationalitySelect');
  await page.select('#nationalitySelect', vatandaslik);
  await page.waitForSelector('#residenceSelect');
  await page.select('#residenceSelect', bulunduguUlke);
  await page.waitForSelector('#btnContinue');
  await page.click('#btnContinue');
}

module.exports = { getRandevuBilgileri };
