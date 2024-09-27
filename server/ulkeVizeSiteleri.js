const ulkeVizeSiteleri = {
  'Kuzey Amerika': {
    'ABD': {
      url: 'https://ais.usvisa-info.com/tr-tr/niv',
      vizeGerekliligi: 'Evet',
      notlar: 'ESTA programı turistik seyahatler için geçerlidir.'
    },
    'Kanada': {
      url: 'https://www.canada.ca/en/services/immigration-citizenship/helpcentre/apply-visitor-visa.html',
      vizeGerekliligi: 'Evet',
      notlar: 'eTA programı bazı ülke vatandaşları için geçerlidir.'
    },
    'Meksika': {
      url: 'https://consulmex.sre.gob.mx/sanfrancisco/index.php/visas-traveling-to-mexico',
      vizeGerekliligi: 'Bazı ülkeler için',
      notlar: 'Bazı ülke vatandaşları için vize muafiyeti vardır.'
    }
  },
  'Avrupa': {
    'Schengen': {
      url: 'https://www.schengenvisainfo.com/apply-from-turkey/',
      vizeGerekliligi: 'Evet',
      notlar: '26 Avrupa ülkesi için geçerlidir.'
    },
    'İngiltere': {
      url: 'https://www.gov.uk/standard-visitor-visa',
      vizeGerekliligi: 'Evet',
      notlar: 'Brexit sonrası yeni vize politikaları uygulanmaktadır.'
    },
    'Rusya': {
      url: 'https://visa.kdmid.ru/PetitionChoice.aspx',
      vizeGerekliligi: 'Evet',
      notlar: 'E-vize uygulaması bazı ülke vatandaşları için geçerlidir.'
    }
  },
  'Asya': {
    'Japonya': {
      url: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
      vizeGerekliligi: 'Çoğu ülke için',
      notlar: 'Bazı ülkeler için vize muafiyeti vardır.'
    },
    'Güney Kore': {
      url: 'https://www.visa.go.kr/openPage.do?MENU_ID=10101',
      vizeGerekliligi: 'Bazı ülkeler için',
      notlar: 'K-ETA programı bazı ülke vatandaşları için geçerlidir.'
    },
    'Çin': {
      url: 'http://www.china-embassy.org/eng/visas/',
      vizeGerekliligi: 'Evet',
      notlar: '144 saat transit vize muafiyeti bazı şehirler için geçerlidir.'
    },
    'Hindistan': {
      url: 'https://indianvisaonline.gov.in/visa/index.html',
      vizeGerekliligi: 'Evet',
      notlar: 'E-Vize uygulaması mevcuttur.'
    }
  },
  'Okyanusya': {
    'Avustralya': {
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder',
      vizeGerekliligi: 'Evet',
      notlar: 'ETA programı bazı ülke vatandaşları için geçerlidir.'
    },
    'Yeni Zelanda': {
      url: 'https://www.immigration.govt.nz/new-zealand-visas',
      vizeGerekliligi: 'Çoğu ülke için',
      notlar: 'NZeTA programı bazı ülke vatandaşları için geçerlidir.'
    }
  },
  'Güney Amerika': {
    'Brezilya': {
      url: 'http://cglondres.itamaraty.gov.br/en-us/visas.xml',
      vizeGerekliligi: 'Bazı ülkeler için',
      notlar: 'Birçok ülke vatandaşı için vize muafiyeti vardır.'
    },
    'Arjantin': {
      url: 'https://www.argentina.gob.ar/interior/migraciones/turista',
      vizeGerekliligi: 'Bazı ülkeler için',
      notlar: 'Birçok ülke vatandaşı için vize muafiyeti vardır.'
    }
  },
  'Afrika': {
    'Güney Afrika': {
      url: 'http://www.dha.gov.za/index.php/immigration-services/apply-for-a-south-african-visa',
      vizeGerekliligi: 'Çoğu ülke için',
      notlar: 'Bazı ülkeler için vize muafiyeti vardır.'
    },
    'Mısır': {
      url: 'https://visa2egypt.gov.eg/',
      vizeGerekliligi: 'Evet',
      notlar: 'E-Vize uygulaması mevcuttur.'
    }
  },
  'Orta Doğu': {
    'Birleşik Arap Emirlikleri': {
      url: 'https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa',
      vizeGerekliligi: 'Çoğu ülke için',
      notlar: 'Bazı ülkeler için varışta vize uygulaması vardır.'
    },
    'İsrail': {
      url: 'https://mfa.gov.il/MFA/ConsularServices/Pages/Visas.aspx',
      vizeGerekliligi: 'Bazı ülkeler için',
      notlar: 'Birçok ülke vatandaşı için vize muafiyeti vardır.'
    }
  }
};

module.exports = ulkeVizeSiteleri;
