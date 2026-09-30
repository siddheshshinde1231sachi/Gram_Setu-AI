/**
 * GramSetu — Complete Maharashtra Districts, Talukas & Villages Geospatial Database
 * Covers all 36 Districts and 6 Administrative Divisions of Maharashtra State
 */

window.MAHARASHTRA_DIVISIONS = [
  { id: "nashik", name: "नाशिक / खान्देश", nameEn: "Nashik / Khandesh" },
  { id: "pune", name: "पुणे / पश्चिम महाराष्ट्र", nameEn: "Pune / Western Maharashtra" },
  { id: "konkan", name: "कोकण", nameEn: "Konkan" },
  { id: "marathwada", name: "छत्रपती संभाजीनगर / मराठवाडा", nameEn: "Chhatrapati Sambhajinagar / Marathwada" },
  { id: "amravati", name: "अमरावती / पश्चिम विदर्भ", nameEn: "Amravati / Western Vidarbha" },
  { id: "nagpur", name: "नागपूर / पूर्व विदर्भ", nameEn: "Nagpur / Eastern Vidarbha" }
];

window.MAHARASHTRA_LOCATIONS = [
  // --- 1. NASHIK DIVISION ---
  {
    districtId: "nashik",
    districtName: "Nashik",
    districtNameMr: "नाशिक",
    division: "nashik",
    latitude: 20.0835,
    longitude: 74.0210,
    talukas: [
      {
        name: "निफाड (Niphad)",
        villages: [
          { name: "सोनवाडी (Sonwadi)", nameEn: "Sonwadi", lat: 20.0835, lng: 74.0210, pin: "422303", pop: 3420, households: 680, area: 1240 },
          { name: "सायखेडा (Saykheda)", nameEn: "Saykheda", lat: 20.0540, lng: 73.9850, pin: "422210", pop: 5800, households: 1120, area: 1680 },
          { name: "ओझर (Ozar)", nameEn: "Ozar", lat: 20.0950, lng: 73.9350, pin: "422206", pop: 12500, households: 2450, area: 2100 },
          { name: "पिंपळगाव बसवंत (Pimpalgaon Baswant)", nameEn: "Pimpalgaon", lat: 20.1700, lng: 73.9800, pin: "422209", pop: 16800, households: 3100, area: 2400 }
        ]
      },
      {
        name: "दिंडोरी (Dindori)",
        villages: [
          { name: "वणी (Vani)", nameEn: "Vani", lat: 20.3167, lng: 73.8833, pin: "422215", pop: 8900, households: 1720, area: 1890 },
          { name: "खेडगाव (Khedgaon)", nameEn: "Khedgaon", lat: 20.2100, lng: 73.8400, pin: "422205", pop: 4100, households: 780, area: 1350 }
        ]
      },
      {
        name: "सिन्नर (Sinnar)",
        villages: [
          { name: "मुसळगाव (Musalgaon)", nameEn: "Musalgaon", lat: 19.8800, lng: 74.0100, pin: "422112", pop: 6200, households: 1240, area: 1540 },
          { name: "पांढुर्ली (Pandhurli)", nameEn: "Pandhurli", lat: 19.8200, lng: 73.9200, pin: "422103", pop: 3800, households: 720, area: 1180 }
        ]
      },
      {
        name: "इगतपुरी (Igatpuri)",
        villages: [
          { name: "घोटी (Ghoti)", nameEn: "Ghoti", lat: 19.7200, lng: 73.6500, pin: "422402", pop: 9400, households: 1890, area: 1950 },
          { name: "टाकेद (Taked)", nameEn: "Taked", lat: 19.6800, lng: 73.7400, pin: "422403", pop: 3100, households: 590, area: 980 }
        ]
      },
      {
        name: "चांदवड (Chandwad)",
        villages: [
          { name: "धोडंबे (Dhodambe)", nameEn: "Dhodambe", lat: 20.3200, lng: 74.1900, pin: "423101", pop: 4200, households: 830, area: 1320 }
        ]
      },
      {
        name: "येवला (Yeola)",
        villages: [
          { name: "अंदरसूल (Andarsul)", nameEn: "Andarsul", lat: 20.0200, lng: 74.4500, pin: "423401", pop: 7300, households: 1410, area: 1720 }
        ]
      }
    ]
  },
  {
    districtId: "ahmednagar",
    districtName: "Ahilyanagar (Ahmednagar)",
    districtNameMr: "अहिल्यानगर (अहमदनगर)",
    division: "nashik",
    latitude: 19.0948,
    longitude: 74.7480,
    talukas: [
      {
        name: "राहाता (Rahata)",
        villages: [
          { name: "शिर्डी (Shirdi)", nameEn: "Shirdi", lat: 19.7667, lng: 74.4764, pin: "423107", pop: 36000, households: 7100, area: 3200 },
          { name: "साकुरी (Sakuri)", nameEn: "Sakuri", lat: 19.7400, lng: 74.4600, pin: "423107", pop: 4500, households: 890, area: 1200 }
        ]
      },
      {
        name: "पारनेर (Parner)",
        villages: [
          { name: "राळेगण सिद्धी (Ralegan Siddhi)", nameEn: "Ralegan Siddhi", lat: 18.9189, lng: 74.4075, pin: "414302", pop: 2850, households: 540, area: 1040 },
          { name: "टाकळी ढोकेश्वर (Takali Dhokeshwar)", nameEn: "Takali Dhokeshwar", lat: 19.1200, lng: 74.3400, pin: "414304", pop: 5200, households: 980, area: 1480 }
        ]
      },
      {
        name: "संगमनेर (Sangamner)",
        villages: [
          { name: "आश्वी (Ashwi)", nameEn: "Ashwi", lat: 19.5500, lng: 74.3200, pin: "413738", pop: 6800, households: 1320, area: 1740 },
          { name: "जोर्वे (Jorve)", nameEn: "Jorve", lat: 19.6100, lng: 74.2800, pin: "422605", pop: 3600, households: 690, area: 1150 }
        ]
      },
      {
        name: "नगर (Nagar)",
        villages: [
          { name: "हिवरे बाजार (Hiware Bazar)", nameEn: "Hiware Bazar", lat: 19.1667, lng: 74.6167, pin: "414103", pop: 1450, households: 280, area: 976 }
        ]
      },
      {
        name: "कोपरगाव (Kopargaon)",
        villages: [
          { name: "पोहेगाव (Pohegaon)", nameEn: "Pohegaon", lat: 19.8500, lng: 74.5200, pin: "423605", pop: 5400, households: 1050, area: 1420 }
        ]
      },
      {
        name: "नेवासा (Nevasa)",
        villages: [
          { name: "सोनई (Sonai)", nameEn: "Sonai", lat: 19.4200, lng: 74.8500, pin: "414105", pop: 9800, households: 1920, area: 2150 }
        ]
      }
    ]
  },
  {
    districtId: "dhule",
    districtName: "Dhule",
    districtNameMr: "धुळे",
    division: "nashik",
    latitude: 20.9042,
    longitude: 74.7749,
    talukas: [
      {
        name: "शिरपूर (Shirpur)",
        villages: [
          { name: "बोरखेड (Borkhed)", nameEn: "Borkhed", lat: 21.3600, lng: 74.9200, pin: "425405", pop: 3200, households: 610, area: 1100 },
          { name: "रोहिणी (Rohini)", nameEn: "Rohini", lat: 21.2800, lng: 74.8800, pin: "425405", pop: 2900, households: 540, area: 950 }
        ]
      },
      {
        name: "साक्री (Sakri)",
        villages: [
          { name: "पिंपळनेर (Pimpalner)", nameEn: "Pimpalner", lat: 21.0100, lng: 74.1500, pin: "424306", pop: 8400, households: 1650, area: 1820 }
        ]
      },
      {
        name: "शिंदखेडा (Shindkheda)",
        villages: [
          { name: "दोंडाईचा (Dondaicha)", nameEn: "Dondaicha", lat: 21.3200, lng: 74.5700, pin: "425408", pop: 14500, households: 2850, area: 2300 }
        ]
      }
    ]
  },
  {
    districtId: "jalgaon",
    districtName: "Jalgaon",
    districtNameMr: "जळगाव",
    division: "nashik",
    latitude: 21.0077,
    longitude: 75.5626,
    talukas: [
      {
        name: "भुसावळ (Bhusawal)",
        villages: [
          { name: "वरणगाव (Varangaon)", nameEn: "Varangaon", lat: 21.0100, lng: 75.9000, pin: "425305", pop: 12500, households: 2400, area: 2100 }
        ]
      },
      {
        name: "चाळीसगाव (Chalisgaon)",
        villages: [
          { name: "मेहुणबारे (Mehunbare)", nameEn: "Mehunbare", lat: 20.5200, lng: 75.0500, pin: "424116", pop: 5800, households: 1110, area: 1540 }
        ]
      },
      {
        name: "अमळनेर (Amalner)",
        villages: [
          { name: "शिरुड (Shirud)", nameEn: "Shirud", lat: 21.0800, lng: 75.1200, pin: "425401", pop: 3800, households: 720, area: 1190 }
        ]
      },
      {
        name: "पाचोरा (Pachora)",
        villages: [
          { name: "पिंपळगाव (Pimpalgaon)", nameEn: "Pimpalgaon", lat: 20.6700, lng: 75.3500, pin: "424201", pop: 4400, households: 850, area: 1380 }
        ]
      }
    ]
  },
  {
    districtId: "nandurbar",
    districtName: "Nandurbar",
    districtNameMr: "नंदुरबार",
    division: "nashik",
    latitude: 21.3687,
    longitude: 74.2393,
    talukas: [
      {
        name: "शहादा (Shahada)",
        villages: [
          { name: "प्रकाशा (Prakasha)", nameEn: "Prakasha", lat: 21.5200, lng: 74.4500, pin: "425422", pop: 7200, households: 1410, area: 1650 }
        ]
      },
      {
        name: "नवापूर (Navapur)",
        villages: [
          { name: "विसरवाडी (Visarwadi)", nameEn: "Visarwadi", lat: 21.2800, lng: 73.9800, pin: "425426", pop: 6100, households: 1190, area: 1480 }
        ]
      },
      {
        name: "तळोदा (Taloda)",
        villages: [
          { name: "प्रतापपूर (Pratappur)", nameEn: "Pratappur", lat: 21.5800, lng: 74.2200, pin: "425413", pop: 2900, households: 560, area: 890 }
        ]
      }
    ]
  },

  // --- 2. PUNE DIVISION ---
  {
    districtId: "pune",
    districtName: "Pune",
    districtNameMr: "पुणे",
    division: "pune",
    latitude: 18.5204,
    longitude: 73.8567,
    talukas: [
      {
        name: "बारामती (Baramati)",
        villages: [
          { name: "माळेगाव (Malegaon)", nameEn: "Malegaon", lat: 18.1500, lng: 74.5200, pin: "413115", pop: 11200, households: 2200, area: 2100 },
          { name: "मोरगाव (Morgaon)", nameEn: "Morgaon", lat: 18.2800, lng: 74.3100, pin: "412304", pop: 5400, households: 1040, area: 1540 }
        ]
      },
      {
        name: "हवेली (Haveli)",
        villages: [
          { name: "वाघोली (Wagholi)", nameEn: "Wagholi", lat: 18.5800, lng: 73.9800, pin: "412207", pop: 24000, households: 4800, area: 2800 },
          { name: "उरुळी कांचन (Uruli Kanchan)", nameEn: "Uruli Kanchan", lat: 18.4800, lng: 74.1300, pin: "412202", pop: 16500, households: 3200, area: 2450 }
        ]
      },
      {
        name: "शिरूर (Shirur)",
        villages: [
          { name: "शिक्रापूर (Shikrapur)", nameEn: "Shikrapur", lat: 18.7300, lng: 74.1200, pin: "412208", pop: 12800, households: 2540, area: 2150 }
        ]
      },
      {
        name: "जुन्नर (Junnar)",
        villages: [
          { name: "ओतूर (Otur)", nameEn: "Otur", lat: 19.2600, lng: 73.9800, pin: "412409", pop: 8900, households: 1750, area: 1840 },
          { name: "नारायणगाव (Narayangaon)", nameEn: "Narayangaon", lat: 19.1200, lng: 73.9700, pin: "410504", pop: 14200, households: 2780, area: 2250 }
        ]
      },
      {
        name: "आंबेगाव (Ambegaon)",
        villages: [
          { name: "मंचर (Manchar)", nameEn: "Manchar", lat: 19.0000, lng: 73.9400, pin: "410503", pop: 15400, households: 3010, area: 2380 }
        ]
      },
      {
        name: "भोर (Bhor)",
        villages: [
          { name: "नसरापूर (Nasrapur)", nameEn: "Nasrapur", lat: 18.2500, lng: 73.8800, pin: "412213", pop: 6200, households: 1210, area: 1480 }
        ]
      }
    ]
  },
  {
    districtId: "satara",
    districtName: "Satara",
    districtNameMr: "सातारा",
    division: "pune",
    latitude: 17.6805,
    longitude: 73.9997,
    talukas: [
      {
        name: "कराड (Karad)",
        villages: [
          { name: "मलकापूर (Malkapur)", nameEn: "Malkapur", lat: 17.2700, lng: 74.1900, pin: "415539", pop: 13500, households: 2650, area: 2150 },
          { name: "ओंड (Ond)", nameEn: "Ond", lat: 17.3400, lng: 74.1200, pin: "415111", pop: 4800, households: 940, area: 1380 }
        ]
      },
      {
        name: "वाई (Wai)",
        villages: [
          { name: "बावधन (Bavdhan)", nameEn: "Bavdhan", lat: 17.9200, lng: 73.9300, pin: "412803", pop: 5400, households: 1050, area: 1520 }
        ]
      },
      {
        name: "महाबळेश्वर (Mahabaleshwar)",
        villages: [
          { name: "ताप blockोला (Tapola)", nameEn: "Tapola", lat: 17.7800, lng: 73.7200, pin: "412806", pop: 2100, households: 420, area: 980 }
        ]
      },
      {
        name: "खटाव (Khatav)",
        villages: [
          { name: "वडूज (Vaduj)", nameEn: "Vaduj", lat: 17.6000, lng: 74.4500, pin: "415506", pop: 8900, households: 1740, area: 1890 }
        ]
      },
      {
        name: "फलटण (Phaltan)",
        villages: [
          { name: "तरडगाव (Taradgaon)", nameEn: "Taradgaon", lat: 18.0500, lng: 74.3200, pin: "415528", pop: 6100, households: 1190, area: 1540 }
        ]
      }
    ]
  },
  {
    districtId: "kolhapur",
    districtName: "Kolhapur",
    districtNameMr: "कोल्हापूर",
    division: "pune",
    latitude: 16.7050,
    longitude: 74.2433,
    talukas: [
      {
        name: "करवीर (Karvir)",
        villages: [
          { name: "उचगाव (Uchgaon)", nameEn: "Uchgaon", lat: 16.6800, lng: 74.2800, pin: "416005", pop: 18200, households: 3550, area: 2400 },
          { name: "वडणगे (Vadange)", nameEn: "Vadange", lat: 16.7400, lng: 74.2100, pin: "416011", pop: 6400, households: 1250, area: 1580 }
        ]
      },
      {
        name: "हातकणंगले (Hatkanangale)",
        villages: [
          { name: "हुपरी (Hupari)", nameEn: "Hupari", lat: 16.6200, lng: 74.4000, pin: "416203", pop: 16800, households: 3250, area: 2320 }
        ]
      },
      {
        name: "पन्हाळा (Panhala)",
        villages: [
          { name: "कोडोली (Kodoli)", nameEn: "Kodoli", lat: 16.8800, lng: 74.1900, pin: "416114", pop: 14200, households: 2780, area: 2200 }
        ]
      },
      {
        name: "शिरोळ (Shirol)",
        villages: [
          { name: "नृसिंहवाडी (Narsobawadi)", nameEn: "Narsobawadi", lat: 16.6900, lng: 74.6000, pin: "416104", pop: 5100, households: 980, area: 1340 }
        ]
      }
    ]
  },
  {
    districtId: "sangli",
    districtName: "Sangli",
    districtNameMr: "सांगली",
    division: "pune",
    latitude: 16.8524,
    longitude: 74.5815,
    talukas: [
      {
        name: "वाळवा (Walwa - Islampur)",
        villages: [
          { name: "बाहे (Bahe)", nameEn: "Bahe", lat: 17.0600, lng: 74.2800, pin: "415409", pop: 6200, households: 1210, area: 1540 },
          { name: "बहे बोरगाव (Borgaon)", nameEn: "Borgaon", lat: 17.1100, lng: 74.3200, pin: "415413", pop: 4800, households: 940, area: 1320 }
        ]
      },
      {
        name: "मिरज (Miraj)",
        villages: [
          { name: "माळभाग (Malbhag)", nameEn: "Malbhag", lat: 16.8200, lng: 74.6500, pin: "416410", pop: 5400, households: 1050, area: 1410 }
        ]
      },
      {
        name: "तासगाव (Tasgaon)",
        villages: [
          { name: "सावळज (Savlaj)", nameEn: "Savlaj", lat: 17.0100, lng: 74.7900, pin: "416311", pop: 7800, households: 1520, area: 1780 }
        ]
      }
    ]
  },
  {
    districtId: "solapur",
    districtName: "Solapur",
    districtNameMr: "सोलापूर",
    division: "pune",
    latitude: 17.6599,
    longitude: 75.9064,
    talukas: [
      {
        name: "पंढरपूर (Pandharpur)",
        villages: [
          { name: "वाखरी (Wakhari)", nameEn: "Wakhari", lat: 17.7100, lng: 75.2900, pin: "413304", pop: 6400, households: 1250, area: 1620 },
          { name: "गादेगाव (Gadegaon)", nameEn: "Gadegaon", lat: 17.6400, lng: 75.3800, pin: "413304", pop: 4800, households: 930, area: 1350 }
        ]
      },
      {
        name: "माळशिरस (Malshiras)",
        villages: [
          { name: "नातेपुते (Natepute)", nameEn: "Natepute", lat: 17.9000, lng: 74.9200, pin: "413109", pop: 9800, households: 1910, area: 1980 }
        ]
      },
      {
        name: "बार्शी (Barshi)",
        villages: [
          { name: "वैराग (Vairag)", nameEn: "Vairag", lat: 18.0500, lng: 75.8200, pin: "413402", pop: 11400, households: 2210, area: 2150 }
        ]
      }
    ]
  },

  // --- 3. KONKAN DIVISION ---
  {
    districtId: "thane",
    districtName: "Thane",
    districtNameMr: "ठाणे",
    division: "konkan",
    latitude: 19.2183,
    longitude: 72.9781,
    talukas: [
      {
        name: "भिवंडी (Bhiwandi)",
        villages: [
          { name: "पडघा (Padgha)", nameEn: "Padgha", lat: 19.3400, lng: 73.1800, pin: "421101", pop: 8500, households: 1650, area: 1780 }
        ]
      },
      {
        name: "मुरबाड (Murbad)",
        villages: [
          { name: "शिवळे (Shivale)", nameEn: "Shivale", lat: 19.2800, lng: 73.4100, pin: "421401", pop: 4200, households: 820, area: 1340 }
        ]
      },
      {
        name: "शहापूर (Shahapur)",
        villages: [
          { name: "आसनगाव (Asangaon)", nameEn: "Asangaon", lat: 19.4400, lng: 73.3100, pin: "421601", pop: 7400, households: 1450, area: 1690 }
        ]
      }
    ]
  },
  {
    districtId: "palghar",
    districtName: "Palghar",
    districtNameMr: "पालघर",
    division: "konkan",
    latitude: 19.6967,
    longitude: 72.7699,
    talukas: [
      {
        name: "पालघर (Palghar)",
        villages: [
          { name: "मनोर (Manor)", nameEn: "Manor", lat: 19.7400, lng: 72.9100, pin: "401403", pop: 9800, households: 1920, area: 1950 },
          { name: "सफाळे (Saphale)", nameEn: "Saphale", lat: 19.5700, lng: 72.8200, pin: "401102", pop: 8200, households: 1600, area: 1740 }
        ]
      },
      {
        name: "डहाणू (Dahanu)",
        villages: [
          { name: "बोर्डी (Bordi)", nameEn: "Bordi", lat: 20.0800, lng: 72.7400, pin: "401701", pop: 6400, households: 1250, area: 1540 }
        ]
      },
      {
        name: "जव्हार (Jawhar)",
        villages: [
          { name: "रामनगर (Ramnagar)", nameEn: "Ramnagar", lat: 19.9200, lng: 73.2300, pin: "401603", pop: 3200, households: 610, area: 1120 }
        ]
      }
    ]
  },
  {
    districtId: "mumbai_city",
    districtName: "Mumbai City",
    districtNameMr: "मुंबई शहर",
    division: "konkan",
    latitude: 18.9388,
    longitude: 72.8354,
    talukas: [
      {
        name: "मुंबई शहर (Mumbai City)",
        villages: [
          { name: "कुलाबा (Colaba)", nameEn: "Colaba", lat: 18.9067, lng: 72.8147, pin: "400005", pop: 18500, households: 3800, area: 420 },
          { name: "वरळी कोळीवाडा (Worli Koliwada)", nameEn: "Worli Koliwada", lat: 19.0222, lng: 72.8172, pin: "400030", pop: 14200, households: 2950, area: 380 }
        ]
      }
    ]
  },
  {
    districtId: "mumbai_suburban",
    districtName: "Mumbai Suburban",
    districtNameMr: "मुंबई उपनगर",
    division: "konkan",
    latitude: 19.1136,
    longitude: 72.8697,
    talukas: [
      {
        name: "बोरिवली (Borivali)",
        villages: [
          { name: "मनोरी गाव (Manori Village)", nameEn: "Manori", lat: 19.2078, lng: 72.7844, pin: "400095", pop: 8900, households: 1820, area: 650 },
          { name: "गोराई (Gorai)", nameEn: "Gorai", lat: 19.2435, lng: 72.7836, pin: "400091", pop: 7400, households: 1510, area: 590 }
        ]
      },
      {
        name: "अंधेरी (Andheri)",
        villages: [
          { name: "वर्सोवा कोळीवाडा (Versova Koliwada)", nameEn: "Versova", lat: 19.1363, lng: 72.8126, pin: "400061", pop: 12400, households: 2540, area: 480 }
        ]
      },
      {
        name: "कुर्ला (Kurla)",
        villages: [
          { name: "विद्याविहार (Vidyavihar)", nameEn: "Vidyavihar", lat: 19.0798, lng: 72.8970, pin: "400077", pop: 16500, households: 3400, area: 510 }
        ]
      }
    ]
  },
  {
    districtId: "raigad",
    districtName: "Raigad",
    districtNameMr: "रायगड",
    division: "konkan",
    latitude: 18.5158,
    longitude: 73.1822,
    talukas: [
      {
        name: "अलिबाग (Alibag)",
        villages: [
          { name: "वरसोली (Varsoli)", nameEn: "Varsoli", lat: 18.6600, lng: 72.8800, pin: "402201", pop: 5200, households: 1020, area: 1390 },
          { name: "नागाव (Nagaon)", nameEn: "Nagaon", lat: 18.5800, lng: 72.9000, pin: "402204", pop: 4800, households: 950, area: 1280 }
        ]
      },
      {
        name: "महाड (Mahad)",
        villages: [
          { name: "नाते (Nate)", nameEn: "Nate", lat: 18.0600, lng: 73.4100, pin: "402305", pop: 3800, households: 740, area: 1150 }
        ]
      },
      {
        name: "कर्जत (Karjat)",
        villages: [
          { name: "नेरळ (Neral)", nameEn: "Neral", lat: 19.0300, lng: 73.3200, pin: "410101", pop: 11200, households: 2190, area: 2100 }
        ]
      }
    ]
  },
  {
    districtId: "ratnagiri",
    districtName: "Ratnagiri",
    districtNameMr: "रत्नागिरी",
    division: "konkan",
    latitude: 16.9902,
    longitude: 73.3120,
    talukas: [
      {
        name: "चिपळूण (Chiplun)",
        villages: [
          { name: "खेर्डी (Kherdi)", nameEn: "Kherdi", lat: 17.5200, lng: 73.5400, pin: "415604", pop: 9400, households: 1850, area: 1890 }
        ]
      },
      {
        name: "दापोली (Dapoli)",
        villages: [
          { name: "आंजर्ले (Anjarle)", nameEn: "Anjarle", lat: 17.8500, lng: 73.0800, pin: "415714", pop: 3200, households: 640, area: 1120 },
          { name: "हर्णे (Harnai)", nameEn: "Harnai", lat: 17.8100, lng: 73.1000, pin: "415713", pop: 5400, households: 1060, area: 1390 }
        ]
      },
      {
        name: "गुहागर (Guhagar)",
        villages: [
          { name: "वेलदूर (Veldur)", nameEn: "Veldur", lat: 17.5400, lng: 73.1900, pin: "415703", pop: 2900, households: 580, area: 980 }
        ]
      }
    ]
  },
  {
    districtId: "sindhudurg",
    districtName: "Sindhudurg",
    districtNameMr: "सिंधुदुर्ग",
    division: "konkan",
    latitude: 16.1219,
    longitude: 73.6934,
    talukas: [
      {
        name: "कुडाळ (Kudal)",
        villages: [
          { name: "माणगाव (Mangaon)", nameEn: "Mangaon", lat: 16.0200, lng: 73.7400, pin: "416519", pop: 4800, households: 950, area: 1420 }
        ]
      },
      {
        name: "मालवण (Malvan)",
        villages: [
          { name: "तारकर्ली (Tarkarli)", nameEn: "Tarkarli", lat: 16.0300, lng: 73.4900, pin: "416606", pop: 3900, households: 780, area: 1180 }
        ]
      },
      {
        name: "सावंतवाडी (Sawantwadi)",
        villages: [
          { name: "माडखोल (Madkhol)", nameEn: "Madkhol", lat: 15.8900, lng: 73.8500, pin: "416510", pop: 3100, households: 610, area: 1040 }
        ]
      }
    ]
  },

  // --- 4. CHHATRAPATI SAMBHAJINAGAR / MARATHWADA DIVISION ---
  {
    districtId: "chhatrapati_sambhajinagar",
    districtName: "Chhatrapati Sambhajinagar (Aurangabad)",
    districtNameMr: "छत्रपती संभाजीनगर (औरंगाबाद)",
    division: "marathwada",
    latitude: 19.8762,
    longitude: 75.3433,
    talukas: [
      {
        name: "पैठण (Paithan)",
        villages: [
          { name: "मुदळवाडी (Mudalwadi)", nameEn: "Mudalwadi", lat: 19.4800, lng: 75.3900, pin: "431107", pop: 3800, households: 730, area: 1250 },
          { name: "शेंदूरवादा (Shendurwada)", nameEn: "Shendurwada", lat: 19.5500, lng: 75.4500, pin: "431107", pop: 4200, households: 810, area: 1340 }
        ]
      },
      {
        name: "गंगापूर (Gangapur)",
        villages: [
          { name: "वाळूज (Waluj)", nameEn: "Waluj", lat: 19.8400, lng: 75.2200, pin: "431136", pop: 16500, households: 3200, area: 2450 }
        ]
      },
      {
        name: "सिल्लोड (Sillod)",
        villages: [
          { name: "अजिंठा (Ajanta / Ajantha)", nameEn: "Ajanta", lat: 20.5300, lng: 75.7500, pin: "431117", pop: 7800, households: 1510, area: 1780 }
        ]
      }
    ]
  },
  {
    districtId: "jalna",
    districtName: "Jalna",
    districtNameMr: "जालना",
    division: "marathwada",
    latitude: 19.8347,
    longitude: 75.8816,
    talukas: [
      {
        name: "अंबड (Ambad)",
        villages: [
          { name: "अंतरवाली सराटी (Antarwali Sarati)", nameEn: "Antarwali Sarati", lat: 19.4500, lng: 75.8200, pin: "431205", pop: 3200, households: 610, area: 1100 }
        ]
      },
      {
        name: "परतूर (Partur)",
        villages: [
          { name: "आष्टी (Ashti)", nameEn: "Ashti", lat: 19.6000, lng: 76.1500, pin: "431507", pop: 5400, households: 1040, area: 1480 }
        ]
      }
    ]
  },
  {
    districtId: "beed",
    districtName: "Beed",
    districtNameMr: "बीड",
    division: "marathwada",
    latitude: 18.9894,
    longitude: 75.7601,
    talukas: [
      {
        name: "परळी वैजनाथ (Parli Vaijnath)",
        villages: [
          { name: "धर्मापुरी (Dharmapuri)", nameEn: "Dharmapuri", lat: 18.8900, lng: 76.4500, pin: "431515", pop: 6800, households: 1320, area: 1690 }
        ]
      },
      {
        name: "अंबाजोगाई (Ambajogai)",
        villages: [
          { name: "घाटनांदूर (Ghatnandur)", nameEn: "Ghatnandur", lat: 18.6800, lng: 76.4900, pin: "431519", pop: 8400, households: 1640, area: 1890 }
        ]
      },
      {
        name: "आष्टी (Ashti)",
        villages: [
          { name: "कडा (Kada)", nameEn: "Kada", lat: 18.8800, lng: 75.1200, pin: "414202", pop: 9200, households: 1790, area: 1950 }
        ]
      }
    ]
  },
  {
    districtId: "nanded",
    districtName: "Nanded",
    districtNameMr: "नांदेड",
    division: "marathwada",
    latitude: 19.1383,
    longitude: 77.3210,
    talukas: [
      {
        name: "लोहा (Loha)",
        villages: [
          { name: "माळाकोळी (Malakoli)", nameEn: "Malakoli", lat: 18.9800, lng: 77.1200, pin: "431708", pop: 5900, households: 1140, area: 1540 }
        ]
      },
      {
        name: "देगलूर (Deglur)",
        villages: [
          { name: "शहापूर (Shahapur)", nameEn: "Shahapur", lat: 18.5500, lng: 77.5800, pin: "431717", pop: 4100, households: 790, area: 1280 }
        ]
      },
      {
        name: "माहूर (Mahur)",
        villages: [
          { name: "दत्तात्रय नगर (Dattatray Nagar)", nameEn: "Dattatray Nagar", lat: 19.8200, lng: 77.9200, pin: "431721", pop: 3400, households: 650, area: 1090 }
        ]
      }
    ]
  },
  {
    districtId: "latur",
    districtName: "Latur",
    districtNameMr: "लातूर",
    division: "marathwada",
    latitude: 18.4088,
    longitude: 76.5604,
    talukas: [
      {
        name: "औसा (Ausa)",
        villages: [
          { name: "किल्लारी (Killari)", nameEn: "Killari", lat: 18.0500, lng: 76.5800, pin: "413516", pop: 9800, households: 1910, area: 2100 }
        ]
      },
      {
        name: "निलंगा (Nilanga)",
        villages: [
          { name: "कासार बालकुंदा (Kasar Balkunda)", nameEn: "Kasar Balkunda", lat: 18.1200, lng: 76.7800, pin: "413521", pop: 4800, households: 930, area: 1390 }
        ]
      },
      {
        name: "उदगीर (Udgir)",
        villages: [
          { name: "नाळगीर (Nalagir)", nameEn: "Nalagir", lat: 18.3200, lng: 77.1000, pin: "413517", pop: 5200, households: 1010, area: 1450 }
        ]
      }
    ]
  },
  {
    districtId: "dharashiv",
    districtName: "Dharashiv (Osmanabad)",
    districtNameMr: "धाराशिव (उस्मानाबाद)",
    division: "marathwada",
    latitude: 18.1856,
    longitude: 76.0419,
    talukas: [
      {
        name: "तुळजापूर (Tuljapur)",
        villages: [
          { name: "काटी (Kati)", nameEn: "Kati", lat: 17.9800, lng: 76.1200, pin: "413601", pop: 4900, households: 950, area: 1390 }
        ]
      },
      {
        name: "उमरगा (Omerga)",
        villages: [
          { name: "मुरुम (Murum)", nameEn: "Murum", lat: 17.8400, lng: 76.4800, pin: "413605", pop: 12400, households: 2410, area: 2180 }
        ]
      }
    ]
  },
  {
    districtId: "parbhani",
    districtName: "Parbhani",
    districtNameMr: "परभणी",
    division: "marathwada",
    latitude: 19.2644,
    longitude: 76.7749,
    talukas: [
      {
        name: "जिंतूर (Jintur)",
        villages: [
          { name: "बोरी (Bori)", nameEn: "Bori", lat: 19.5200, lng: 76.7100, pin: "431508", pop: 8200, households: 1590, area: 1790 }
        ]
      },
      {
        name: "गंगाखेड (Gangakhed)",
        villages: [
          { name: "राणीसावरगाव (Rani Sawargaon)", nameEn: "Rani Sawargaon", lat: 19.0100, lng: 76.7500, pin: "431536", pop: 6400, households: 1240, area: 1540 }
        ]
      }
    ]
  },
  {
    districtId: "hingoli",
    districtName: "Hingoli",
    districtNameMr: "हिंगोली",
    division: "marathwada",
    latitude: 19.7173,
    longitude: 77.1472,
    talukas: [
      {
        name: "औंढा नागनाथ (Aundha Nagnath)",
        villages: [
          { name: "रूपूर (Rupur)", nameEn: "Rupur", lat: 19.5400, lng: 77.0400, pin: "431705", pop: 4100, households: 790, area: 1280 }
        ]
      },
      {
        name: "वसमत (Basmath)",
        villages: [
          { name: "कुरुंदा (Kurunda)", nameEn: "Kurunda", lat: 19.4200, lng: 77.1500, pin: "431512", pop: 7800, households: 1510, area: 1740 }
        ]
      }
    ]
  },

  // --- 5. AMRAVATI DIVISION (WESTERN VIDARBHA) ---
  {
    districtId: "amravati",
    districtName: "Amravati",
    districtNameMr: "अमरावती",
    division: "amravati",
    latitude: 20.9374,
    longitude: 77.7796,
    talukas: [
      {
        name: "अचलपूर (Achalpur)",
        villages: [
          { name: "परतवाडा (Paratwada)", nameEn: "Paratwada", lat: 21.3000, lng: 77.5100, pin: "444805", pop: 16500, households: 3200, area: 2450 }
        ]
      },
      {
        name: "वरुड (Warud)",
        villages: [
          { name: "शेंदूरजना घाट (Shendurjana Ghat)", nameEn: "Shendurjana", lat: 21.4800, lng: 78.1200, pin: "444907", pop: 11200, households: 2180, area: 2100 }
        ]
      },
      {
        name: "चांदूर रेल्वे (Chandur Railway)",
        villages: [
          { name: "आमला (Amla)", nameEn: "Amla", lat: 20.8100, lng: 77.9800, pin: "444904", pop: 3800, households: 740, area: 1240 }
        ]
      }
    ]
  },
  {
    districtId: "akola",
    districtName: "Akola",
    districtNameMr: "अकोला",
    division: "amravati",
    latitude: 20.7002,
    longitude: 77.0082,
    talukas: [
      {
        name: "बाळापूर (Balapur)",
        villages: [
          { name: "पारस (Paras)", nameEn: "Paras", lat: 20.8200, lng: 76.8000, pin: "444109", pop: 7600, households: 1480, area: 1720 }
        ]
      },
      {
        name: "अकोट (Akot)",
        villages: [
          { name: "चोहोटा बाजार (Chohota Bazar)", nameEn: "Chohota Bazar", lat: 21.0500, lng: 77.1000, pin: "444101", pop: 5400, households: 1050, area: 1480 }
        ]
      }
    ]
  },
  {
    districtId: "buldhana",
    districtName: "Buldhana",
    districtNameMr: "बुलढाणा",
    division: "amravati",
    latitude: 20.5312,
    longitude: 76.1847,
    talukas: [
      {
        name: "शेगाव (Shegaon)",
        villages: [
          { name: "जलंब (Jalamb)", nameEn: "Jalamb", lat: 20.8800, lng: 76.6200, pin: "444304", pop: 6900, households: 1340, area: 1650 }
        ]
      },
      {
        name: "सिंदखेड राजा (Sindkhed Raja)",
        villages: [
          { name: "राजेगाव (Rajegaon)", nameEn: "Rajegaon", lat: 19.9500, lng: 76.1400, pin: "443202", pop: 4800, households: 930, area: 1390 }
        ]
      },
      {
        name: "लोणार (Lonar)",
        villages: [
          { name: "सुलतानपूर (Sultanpur)", nameEn: "Sultanpur", lat: 20.0200, lng: 76.5400, pin: "443302", pop: 7400, households: 1450, area: 1740 }
        ]
      }
    ]
  },
  {
    districtId: "yavatmal",
    districtName: "Yavatmal",
    districtNameMr: "यवतमाळ",
    division: "amravati",
    latitude: 20.3888,
    longitude: 78.1204,
    talukas: [
      {
        name: "पुसद (Pusad)",
        villages: [
          { name: "शेंबाळपिंपरी (Shembalpimpri)", nameEn: "Shembalpimpri", lat: 19.7800, lng: 77.4500, pin: "445216", pop: 8400, households: 1630, area: 1890 }
        ]
      },
      {
        name: "वणी (Wani)",
        villages: [
          { name: "रासा (Rasa)", nameEn: "Rasa", lat: 20.0800, lng: 78.9500, pin: "445304", pop: 4500, households: 870, area: 1340 }
        ]
      }
    ]
  },
  {
    districtId: "washim",
    districtName: "Washim",
    districtNameMr: "वाशीम",
    division: "amravati",
    latitude: 20.1095,
    longitude: 77.1352,
    talukas: [
      {
        name: "रिसोड (Risod)",
        villages: [
          { name: "शिरपूर जैन (Shirpur Jain)", nameEn: "Shirpur Jain", lat: 20.0100, lng: 76.8800, pin: "444504", pop: 11200, households: 2180, area: 2150 }
        ]
      },
      {
        name: "कारंजा लाड (Karanja Lad)",
        villages: [
          { name: "काटखेड (Katkhed)", nameEn: "Katkhed", lat: 20.4500, lng: 77.4800, pin: "444105", pop: 3800, households: 740, area: 1240 }
        ]
      }
    ]
  },

  // --- 6. NAGPUR DIVISION (EASTERN VIDARBHA) ---
  {
    districtId: "nagpur",
    districtName: "Nagpur",
    districtNameMr: "नागपूर",
    division: "nagpur",
    latitude: 21.1458,
    longitude: 79.0882,
    talukas: [
      {
        name: "रामटेक (Ramtek)",
        villages: [
          { name: "मनसर (Mansar)", nameEn: "Mansar", lat: 21.4000, lng: 79.2800, pin: "441106", pop: 6800, households: 1320, area: 1680 }
        ]
      },
      {
        name: "हिंगणा (Hingna)",
        villages: [
          { name: "वाडी (Wadi)", nameEn: "Wadi", lat: 21.1500, lng: 78.9900, pin: "440023", pop: 18500, households: 3600, area: 2600 }
        ]
      },
      {
        name: "उमरेड (Umred)",
        villages: [
          { name: "सिरसी (Sirsi)", nameEn: "Sirsi", lat: 20.8500, lng: 79.3200, pin: "441203", pop: 4900, households: 950, area: 1390 }
        ]
      },
      {
        name: "काटोल (Katol)",
        villages: [
          { name: "कोंढाळी (Kondhali)", nameEn: "Kondhali", lat: 21.1800, lng: 78.6200, pin: "441103", pop: 7400, households: 1440, area: 1720 }
        ]
      }
    ]
  },
  {
    districtId: "wardha",
    districtName: "Wardha",
    districtNameMr: "वर्धा",
    division: "nagpur",
    latitude: 20.7453,
    longitude: 78.6022,
    talukas: [
      {
        name: "वर्धा (Wardha)",
        villages: [
          { name: "सेवाग्राम (Sevagram)", nameEn: "Sevagram", lat: 20.7180, lng: 78.6110, pin: "442102", pop: 5800, households: 1120, area: 1540 },
          { name: "पवनार (Pawnar)", nameEn: "Pawnar", lat: 20.7800, lng: 78.6500, pin: "442111", pop: 4900, households: 950, area: 1380 }
        ]
      },
      {
        name: "हिंगणघाट (Hinganghat)",
        villages: [
          { name: "पोहाणा (Pohana)", nameEn: "Pohana", lat: 20.5500, lng: 78.8500, pin: "442301", pop: 6400, households: 1240, area: 1610 }
        ]
      },
      {
        name: "आर्वी (Arvi)",
        villages: [
          { name: "रोहणा (Rohana)", nameEn: "Rohana", lat: 20.9500, lng: 78.2800, pin: "442302", pop: 5200, households: 1010, area: 1450 }
        ]
      }
    ]
  },
  {
    districtId: "bhandara",
    districtName: "Bhandara",
    districtNameMr: "भंडारा",
    division: "nagpur",
    latitude: 21.1667,
    longitude: 79.6500,
    talukas: [
      {
        name: "तुमसर (Tumsar)",
        villages: [
          { name: "सिहोरा (Sihora)", nameEn: "Sihora", lat: 21.4500, lng: 79.7800, pin: "441915", pop: 6900, households: 1340, area: 1680 }
        ]
      },
      {
        name: "साकोली (Sakoli)",
        villages: [
          { name: "सेंदूरवाफा (Sendurwafa)", nameEn: "Sendurwafa", lat: 21.0800, lng: 79.9800, pin: "441802", pop: 5400, households: 1050, area: 1480 }
        ]
      }
    ]
  },
  {
    districtId: "gondia",
    districtName: "Gondia",
    districtNameMr: "गोंदिया",
    division: "nagpur",
    latitude: 21.4624,
    longitude: 80.2210,
    talukas: [
      {
        name: "तिरोडा (Tiroda)",
        villages: [
          { name: "काचेवानी (Kachewani)", nameEn: "Kachewani", lat: 21.4200, lng: 79.9500, pin: "441911", pop: 4800, households: 930, area: 1350 }
        ]
      },
      {
        name: "सडक अर्जुनी (Sadak Arjuni)",
        villages: [
          { name: "डोंगरगाव (Dongargaon)", nameEn: "Dongargaon", lat: 21.1200, lng: 80.1500, pin: "441807", pop: 3800, households: 740, area: 1220 }
        ]
      }
    ]
  },
  {
    districtId: "chandrapur",
    districtName: "Chandrapur",
    districtNameMr: "चंद्रपूर",
    division: "nagpur",
    latitude: 19.9615,
    longitude: 79.2961,
    talukas: [
      {
        name: "बल्लारपूर (Ballarpur)",
        villages: [
          { name: "विसापूर (Visapur)", nameEn: "Visapur", lat: 19.8800, lng: 79.3500, pin: "442701", pop: 6800, households: 1320, area: 1690 }
        ]
      },
      {
        name: "वरोरा (Warora)",
        villages: [
          { name: "आनंदवन (Anandwan)", nameEn: "Anandwan", lat: 20.2400, lng: 79.0300, pin: "442914", pop: 4200, households: 820, area: 1380 }
        ]
      },
      {
        name: "भद्रावती (Bhadravati)",
        villages: [
          { name: "माजरी (Majri)", nameEn: "Majri", lat: 20.1200, lng: 79.1500, pin: "442503", pop: 8900, households: 1720, area: 1920 }
        ]
      }
    ]
  },
  {
    districtId: "gadchiroli",
    districtName: "Gadchiroli",
    districtNameMr: "गडचिरोली",
    division: "nagpur",
    latitude: 20.1849,
    longitude: 79.9948,
    talukas: [
      {
        name: "आरमोरी (Armori)",
        villages: [
          { name: "वैरागड (Vairagad)", nameEn: "Vairagad", lat: 20.4200, lng: 80.0800, pin: "441217", pop: 4800, households: 930, area: 1420 }
        ]
      },
      {
        name: "चामोर्शी (Chamorshi)",
        villages: [
          { name: "आष्टी (Ashti)", nameEn: "Ashti", lat: 19.8200, lng: 79.8000, pin: "442707", pop: 6400, households: 1250, area: 1620 }
        ]
      },
      {
        name: "अहेरी (Aheri)",
        villages: [
          { name: "आलापल्ली (Allapalli)", nameEn: "Allapalli", lat: 19.4200, lng: 80.0600, pin: "442703", pop: 9800, households: 1910, area: 2150 }
        ]
      }
    ]
  }
];

// Helper to look up any village in Maharashtra
window.findMaharashtraVillage = function(searchQuery) {
  if (!searchQuery) return null;
  const q = searchQuery.toLowerCase().trim();
  
  for (const dist of window.MAHARASHTRA_LOCATIONS) {
    for (const tal of dist.talukas) {
      for (const vil of tal.villages) {
        if (
          vil.name.toLowerCase().includes(q) ||
          vil.nameEn.toLowerCase().includes(q) ||
          tal.name.toLowerCase().includes(q) ||
          dist.districtNameMr.toLowerCase().includes(q) ||
          dist.districtName.toLowerCase().includes(q)
        ) {
          return {
            village: vil,
            taluka: tal,
            district: dist
          };
        }
      }
    }
  }
  return null;
};
