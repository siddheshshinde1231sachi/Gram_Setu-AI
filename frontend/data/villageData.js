/**
 * GramSetu — Fictional Reference Village Dataset
 * Village: सोनवाडी (Sonwadi)
 * Taluka: निफाड (Niphad), District: नाशिक (Nashik), State: महाराष्ट्र (Maharashtra)
 * 
 * NOTE: सर्व माहिती नमुना व शैक्षणिक प्रात्यक्षिकासाठी आहे (DEMO DATA).
 * कोणत्याही प्रत्यक्ष व्यक्ती किंवा अधिकाऱ्याची नावे नाहीत.
 */

window.VILLAGE_DATA = {
  village: {
    id: "sonwadi-nashik",
    name: "Sonwadi",
    nameMr: "सोनवाडी",
    nameHi: "सोनवाड़ी",
    state: "महाराष्ट्र (Maharashtra)",
    district: "नाशिक (Nashik)",
    taluka: "निफाड (Niphad)",
    pinCode: "422303",
    population: 3420,
    households: 680,
    area: 1240, // Hectares
    latitude: 20.0835,
    longitude: 74.0210,
    gramPanchayat: "ग्रामपंचायत सोनवाडी कार्यालय",
    address: "मु. पो. सोनवाडी, मुख्य बाजारपेठ रोड, ता. निफाड, जि. नाशिक - ४२२३०३",
    publicContacts: {
      panchayatOffice: "+91 2550 289100",
      sarpanchOffice: "+91 94230 00111",
      gramSevakOffice: "+91 94230 00222",
      talathiOffice: "+91 94230 00333",
      primaryHealthCentre: "+91 2550 289108",
      emergencyContact: "112 / 108"
    },
    lastUpdated: "२८ सप्टेंबर २०२६",
    metrics: {
      overallAvailability: 84,
      developmentWorks: 88,
      financialBudget: 80,
      facilities: 92,
      gramSabha: 76,
      disclaimer: "हा आकडा उपलब्ध सार्वजनिक माहितीच्या प्रमाणाचे दर्शक आहे. तो कोणत्याही व्यक्ती किंवा संस्थेच्या प्रामाणिकपणाचे मूल्यांकन नाही."
    }
  },

  developmentWorks: [
    {
      id: "wrk-01",
      workId: "WRK-2025-089",
      title: "मुख्य बसस्थानक ते मारुती मंदिर रस्ता डांबरीकरण",
      titleEn: "Main Bus Stop to Maruti Temple Road Asphalting",
      category: "Roads",
      categoryMr: "रस्ते व वाहतूक",
      department: "सार्वजनिक बांधकाम विभाग (PWD) व ग्रा.पं.",
      scheme: "मुख्यमंत्री ग्राम सडक योजना (टप्पा ४)",
      location: "वार्ड क्र. २, मुख्य रस्ता",
      status: "IN_PROGRESS", // IN_PROGRESS, COMPLETED, APPROVED
      sanctionDate: "१५ जानेवारी २०२५",
      expectedCompletion: "३० नोव्हेंबर २०२६",
      actualCompletion: null,
      estimatedCost: 2850000,
      sanctionedAmount: 2850000,
      releasedAmount: 2200000,
      spentAmount: 1850000,
      remainingAmount: 1000000,
      contractor: "सह्याद्री इन्फ्रा प्रोजेक्ट्स (निविदा क्र. १४४/२०२५)",
      sourceDocument: "ना.जि.प. बांधकाम विभाग कार्यारंभ आदेश क्र. ७१२/२०२५",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "२२ सप्टेंबर २०२६",
      latitude: 20.0842,
      longitude: 74.0205,
      timeline: [
        { stage: "प्रस्ताव सादर", date: "१० ऑक्टोबर २०२४", status: "COMPLETED", note: "ग्रामसभेत ठराव क्र. ६ अन्वये मंजूर" },
        { stage: "प्रशासकीय मान्यता", date: "१२ डिसेंबर २०२४", status: "COMPLETED", note: "जि.प. नाशिक कडून तांत्रिक व प्रशासकीय मंजुरी" },
        { stage: "निधी मंजुरी", date: "१५ जानेवारी २०२५", status: "COMPLETED", note: "₹२८.५० लाख निधी लेखाशीर्ष ४५१५ अन्वये वर्ग" },
        { stage: "काम सुरू", date: "०५ फेब्रुवारी २०२५", status: "COMPLETED", note: "खडीकरण व साईड पट्ट्यांचे काम पूर्ण" },
        { stage: "प्रगती पाहणी", date: "२० ऑगस्ट २०२६", status: "IN_PROGRESS", note: "शाखा अभियंता यांच्याकडून गुणवत्ता चाचणी पूर्ण" },
        { stage: "काम पूर्ण", date: "३० नोव्हेंबर २०२६ (अपेक्षित)", status: "PENDING", note: "अंतिम डांबरीकरण स्तर बाकी" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80",
        after: null
      }
    },
    {
      id: "wrk-02",
      workId: "WRK-2024-042",
      title: "जल जीवन मिशन अंतर्गत नवीन ५०,००० लिटर पाणी साठवण टाकी व नळ जोडणी",
      titleEn: "Jal Jeevan Mission 50,000L Overhead Water Tank & Tap Connection",
      category: "Water",
      categoryMr: "पिण्याचे पाणी",
      department: "ग्रामीण पाणीपुरवठा विभाग, नाशिक",
      scheme: "जल जीवन मिशन (केंद्र व राज्य शासन)",
      location: "वार्ड क्र. ४, टेकडी परिसर",
      status: "COMPLETED",
      sanctionDate: "०५ मार्च २०२४",
      expectedCompletion: "३१ मार्च २०२५",
      actualCompletion: "१५ एप्रिल २०२५",
      estimatedCost: 3400000,
      sanctionedAmount: 3400000,
      releasedAmount: 3400000,
      spentAmount: 3380000,
      remainingAmount: 20000,
      contractor: "कृष्णा वॉटर वर्क्स प्रा. लि.",
      sourceDocument: "पाणीपुरवठा समिती पूर्तता प्रमाणपत्र क्र. JJM/NSK/098",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "१० मे २०२५",
      latitude: 20.0860,
      longitude: 74.0230,
      timeline: [
        { stage: "प्रस्ताव", date: "१२ ऑगस्ट २०२३", status: "COMPLETED", note: "गावातील पाण्याची टंचाई दूर करण्यासाठी प्रस्ताव" },
        { stage: "मंजुरी", date: "०५ मार्च २०२४", status: "COMPLETED", note: "तांत्रिक मंजुरी प्राप्त" },
        { stage: "निधी वितरीत", date: "२० एप्रिल २०२४", status: "COMPLETED", note: "₹३४ लाख उपलब्ध" },
        { stage: "काम सुरू", date: "१५ मे २०२४", status: "COMPLETED", note: "पाया खोदकाम व स्तंभ उभारणी" },
        { stage: "पाहणी व चाचणी", date: "२० फेब्रुवारी २०२५", status: "COMPLETED", note: "जल चाचणी व प्रेशर टेस्ट यशस्वी" },
        { stage: "काम पूर्ण व हस्तांतरित", date: "१५ एप्रिल २०२५", status: "COMPLETED", note: "६८० घरांना थेट नळजोडणी कार्यान्वित" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
        after: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: "wrk-03",
      workId: "WRK-2025-112",
      title: "जिल्हा परिषद प्राथमिक शाळा २ नवीन स्मार्ट डिजिटल वर्गखोल्या व सौर ऊर्जा प्रकल्प",
      titleEn: "ZP Primary School 2 New Smart Classrooms & Solar Energy Setup",
      category: "School",
      categoryMr: "शिक्षण व शाळा",
      department: "शिक्षण विभाग, जिल्हा परिषद नाशिक",
      scheme: "समग्र शिक्षा अभियान व ग्रामपंचायत स्वनिधी",
      location: "शाळा आवार, मध्यवर्ती वस्ती",
      status: "COMPLETED",
      sanctionDate: "१० नोव्हेंबर २०२४",
      expectedCompletion: "१५ जून २०२५",
      actualCompletion: "१० जून २०२५",
      estimatedCost: 1650000,
      sanctionedAmount: 1650000,
      releasedAmount: 1650000,
      spentAmount: 1625000,
      remainingAmount: 25000,
      contractor: "ज्ञानदीप कन्स्ट्रक्शन्स",
      sourceDocument: "शाळा व्यवस्थापन समिती ठराव व जि.प. हस्तांतरण पत्र",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "१५ जुलै २०२५",
      latitude: 20.0820,
      longitude: 74.0215,
      timeline: [
        { stage: "प्रस्ताव", date: "०५ जुलै २०२४", status: "COMPLETED", note: "शाळा व्यवस्थापन समिती मागणी" },
        { stage: "मंजुरी", date: "१० नोव्हेंबर २०२४", status: "COMPLETED", note: "₹१६.५० लाख मंजूर" },
        { stage: "काम सुरू", date: "०२ जानेवारी २०२५", status: "COMPLETED", note: "बांधकाम व ५ किलोवॅट सोलर बसवणे" },
        { stage: "पूर्ण", date: "१० जून २०२५", status: "COMPLETED", note: "शाळा सुरू होण्यापूर्वी वर्गखोल्या कार्यान्वित" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80",
        after: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: "wrk-04",
      workId: "WRK-2026-015",
      title: "गावात ४५ नवीन सौर एलईडी पथदिवे (Solar Street Lights) बसविणे",
      titleEn: "Installation of 45 New Solar LED Street Lights",
      category: "Street Lights",
      categoryMr: "दिवाबत्ती",
      department: "ग्रामपंचायत सोनवाडी व महाऊर्जा (MEDA)",
      scheme: "१५ वा वित्त आयोग (अनटाईड ग्रांट)",
      location: "सर्व वाड्या-वस्त्या व प्रमुख रस्ते",
      status: "IN_PROGRESS",
      sanctionDate: "१५ फेब्रुवारी २०२६",
      expectedCompletion: "३० ऑक्टोबर २०२६",
      actualCompletion: null,
      estimatedCost: 850000,
      sanctionedAmount: 850000,
      releasedAmount: 600000,
      spentAmount: 520000,
      remainingAmount: 330000,
      contractor: "उर्जा सोल्युशन्स नाशिक",
      sourceDocument: "ग्रा.पं. ठराव क्र. १०/२०२६ व खरेदी पावती",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "१५ सप्टेंबर २०२६",
      latitude: 20.0810,
      longitude: 74.0240,
      timeline: [
        { stage: "मंजुरी", date: "१५ फेब्रुवारी २०२६", status: "COMPLETED", note: "१५ व्या वित्त आयोगातून तरतूद" },
        { stage: "सामग्री पुरवठा", date: "१० मे २०२६", status: "COMPLETED", note: "४५ पोल व सोलार पॅनेल्स दाखल" },
        { stage: "३० दिवे बसवले", date: "१५ ऑगस्ट २०२६", status: "IN_PROGRESS", note: "उर्वरित १५ दिवे शेतवस्ती रस्त्यावर बसवणे सुरू" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80",
        after: null
      }
    },
    {
      id: "wrk-05",
      workId: "WRK-2026-033",
      title: "बंदिस्त गटार व भूमिगत सांडपाणी निचरा वाहिनी (टप्पा २)",
      titleEn: "Underground Drainage System Phase 2",
      category: "Drainage",
      categoryMr: "सांडपाणी व स्वच्छता",
      department: "जिल्हा परिषद आरोग्य व स्वच्छता विभाग",
      scheme: "स्वच्छ भारत मिशन (ग्रामीण टप्पा २)",
      location: "गावठाण अंतर्गत गल्ली क्र. १ ते ३",
      status: "IN_PROGRESS",
      sanctionDate: "१० एप्रिल २०२६",
      expectedCompletion: "१५ डिसेंबर २०२६",
      actualCompletion: null,
      estimatedCost: 1950000,
      sanctionedAmount: 1950000,
      releasedAmount: 1200000,
      spentAmount: 980000,
      remainingAmount: 970000,
      contractor: "ओम कन्स्ट्रक्शन संगमनेर",
      sourceDocument: "स्वच्छ भारत मिशन प्रकल्प मंजुरी आदेश क्र. SBM/2026/89",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "२० सप्टेंबर २०२६",
      latitude: 20.0848,
      longitude: 74.0195,
      timeline: [
        { stage: "तांत्रिक मंजुरी", date: "१० एप्रिल २०२६", status: "COMPLETED", note: "गटार योजनेचा नकाशा मंजूर" },
        { stage: "खोदकाम सुरू", date: "०१ जून २०२६", status: "COMPLETED", note: "६०० मीटर पाईपलाईन टाकणे पूर्ण" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format&fit=crop&q=80",
        after: null
      }
    },
    {
      id: "wrk-06",
      workId: "WRK-2026-070",
      title: "शेतकऱ्यांसाठी शेततळे खोलीकरण व बंधारा दुरुस्ती",
      titleEn: "Farm Pond Desiltation & Check Dam Repair for Farmers",
      category: "Agriculture",
      categoryMr: "शेती व जलसंधारण",
      department: "कृषी व मृदसंधारण विभाग",
      scheme: "जलयुक्त शिवार अभियान २.०",
      location: "सोनवाडी उत्तर शिव, गट क्र. १५४",
      status: "APPROVED",
      sanctionDate: "२० जुलै २०२६",
      expectedCompletion: "२८ फेब्रुवारी २०२७",
      actualCompletion: null,
      estimatedCost: 1450000,
      sanctionedAmount: 1450000,
      releasedAmount: 500000,
      spentAmount: 0,
      remainingAmount: 1450000,
      contractor: "निविदा प्रक्रिया सुरू (Tender In Process)",
      sourceDocument: "कृषी उपसंचालक नाशिक आदेश क्र. AGRI/2026/11",
      verificationStatus: "GOVERNMENT_DOCUMENT",
      lastUpdated: "०५ सप्टेंबर २०२६",
      latitude: 20.0890,
      longitude: 74.0280,
      timeline: [
        { stage: "प्रशासकीय मान्यता", date: "२० जुलै २०२६", status: "COMPLETED", note: "कृषी विभागाकडून मंजुरी" },
        { stage: "ई-निविदा प्रसिद्धी", date: "१५ ऑगस्ट २०२६", status: "IN_PROGRESS", note: "कंत्राटदार निवड सुरू" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
        during: null,
        after: null
      }
    },
    {
      id: "wrk-07",
      workId: "WRK-2025-055",
      title: "प्राथमिक आरोग्य उपकेंद्र नूतनीकरण व औषध साठा कक्ष",
      titleEn: "Primary Health Sub-Centre Renovation & Pharmacy Store",
      category: "Health",
      categoryMr: "आरोग्य सुविधा",
      department: "जिल्हा आरोग्य अधिकारी, नाशिक",
      scheme: "राष्ट्रीय आरोग्य अभियान (NHM)",
      location: "आरोग्य केंद्र आवार",
      status: "COMPLETED",
      sanctionDate: "१२ ऑगस्ट २०२४",
      expectedCompletion: "३० मार्च २०२५",
      actualCompletion: "२५ मार्च २०२५",
      estimatedCost: 980000,
      sanctionedAmount: 980000,
      releasedAmount: 980000,
      spentAmount: 960000,
      remainingAmount: 20000,
      contractor: "आरोग्य सेवा बांधकाम कक्ष",
      sourceDocument: "सार्वजनिक आरोग्य विभाग पूर्णता दाखला NHM/2025/44",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "०२ एप्रिल २०२५",
      latitude: 20.0828,
      longitude: 74.0180,
      timeline: [
        { stage: "मंजुरी", date: "१२ ऑगस्ट २०२४", status: "COMPLETED", note: "आरोग्य यंत्रणा बळकटीकरण" },
        { stage: "पूर्ण", date: "२५ मार्च २०२५", status: "COMPLETED", note: "माता-बाल तपासणी कक्ष व कोल्ड चेन सुरू" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
        during: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80",
        after: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: "wrk-08",
      workId: "WRK-2026-088",
      title: "घनकचरा व्यवस्थापन व सेंद्रिय खत प्रकल्प शेड उभारणी",
      titleEn: "Solid Waste Management & Organic Compost Facility",
      category: "Waste Management",
      categoryMr: "कचरा व्यवस्थापन",
      department: "ग्रामपंचायत व स्वच्छ महाराष्ट्र अभियान",
      scheme: "स्वच्छ भारत मिशन (ग्रामीण)",
      location: "गावाबाहेरील सामाईक गायरान जमीन",
      status: "APPROVED",
      sanctionDate: "०१ ऑगस्ट २०२६",
      expectedCompletion: "१५ जानेवारी २०२७",
      actualCompletion: null,
      estimatedCost: 750000,
      sanctionedAmount: 750000,
      releasedAmount: 300000,
      spentAmount: 0,
      remainingAmount: 750000,
      contractor: "स्थानिक महिला बचत गट सहकार्य",
      sourceDocument: "जि.प. ग्रामपंचायत विभाग मान्यता पत्र क्र. ९९४",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "१० सप्टेंबर २०२६",
      latitude: 20.0895,
      longitude: 74.0170,
      timeline: [
        { stage: "प्रस्ताव मंजूर", date: "०१ ऑगस्ट २०२६", status: "COMPLETED", note: "जागा निश्चिती व अंदाजपत्रक तयार" }
      ],
      photos: {
        before: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
        during: null,
        after: null
      }
    }
  ],

  budgets: {
    "2025-26": {
      financialYear: "2025-26",
      sanctionedAmount: 11880000,
      receivedAmount: 9730000,
      spentAmount: 8335000,
      remainingAmount: 3545000,
      auditStatus: "लेखापरीक्षण पूर्ण (Audited by Local Fund Accounts)",
      sourceDocument: "ग्रामपंचायत अंदाजपत्रक व मासिक खर्च पत्रक २०२५-२६",
      categories: [
        { name: "रस्ते व वाहतूक", sanctioned: 3800000, received: 3000000, spent: 2550000, color: "#065f46" },
        { name: "पिण्याचे पाणी (JJM)", sanctioned: 3400000, received: 3400000, spent: 3380000, color: "#0d9488" },
        { name: "सांडपाणी व स्वच्छता", sanctioned: 1950000, received: 1200000, spent: 980000, color: "#10b981" },
        { name: "शिक्षण व शाळा", sanctioned: 1650000, received: 1650000, spent: 1625000, color: "#047857" },
        { name: "आरोग्य सेवा", sanctioned: 980000, received: 980000, spent: 960000, color: "#059669" },
        { name: "दिवाबत्ती (Solar)", sanctioned: 850000, received: 600000, spent: 520000, color: "#34d399" },
        { name: "शेती व इतर", sanctioned: 1250000, received: 500000, spent: 220000, color: "#14b8a6" }
      ]
    },
    "2024-25": {
      financialYear: "2024-25",
      sanctionedAmount: 9450000,
      receivedAmount: 9450000,
      spentAmount: 9280000,
      remainingAmount: 170000,
      auditStatus: "अंतिम लेखापरीक्षण अहवाल निर्गमित (AG Audit Cleared)",
      sourceDocument: "वार्षिक हिशोब पत्रक २०२४-२५",
      categories: [
        { name: "रस्ते", sanctioned: 3200000, received: 3200000, spent: 3180000, color: "#065f46" },
        { name: "पाणीपुरवठा", sanctioned: 2800000, received: 2800000, spent: 2750000, color: "#0d9488" },
        { name: "स्वच्छता", sanctioned: 1400000, received: 1400000, spent: 1380000, color: "#10b981" },
        { name: "शिक्षण", sanctioned: 1100000, received: 1100000, spent: 1050000, color: "#047857" },
        { name: "इतर", sanctioned: 950000, received: 950000, spent: 920000, color: "#14b8a6" }
      ]
    }
  },

  schemes: [
    {
      id: "sch-01",
      name: "नमो शेतकरी महासन्मान निधी योजना",
      nameEn: "Namo Shetkari Maha Samman Nidhi",
      category: "Farmers",
      categoryMr: "शेतकरी",
      department: "कृषी विभाग, महाराष्ट्र शासन",
      benefits: "पीएम किसान सन्मान निधीच्या ₹६,००० शिवाय राज्य शासनाकडून वर्षाला आणखी ₹६,००० (एकूण ₹१२,००० थेट बँक खात्यात).",
      eligibility: "महाराष्ट्रातील भूधारक शेतकरी, ज्यांचे बँक खाते आधारशी लिंक व डीबीटी सक्षम आहे.",
      requiredDocuments: [
        "७/१२ उतारा व ८-अ दाखला",
        "आधार कार्ड",
        "बँक पासबुक (आधार लिंक)",
        "मोबाईल क्रमांक (आधारशी लिंक)"
      ],
      applicationProcess: "महाडीबीटी (MahaDBT) किंवा पीएम किसान पोर्टलवर ई-केवायसी पूर्ण करा. ग्रामपंचायतीच्या सीएससी (CSC) केंद्रावर मोफत मार्गदर्शन उपलब्ध.",
      officialUrl: "https://mahadbt.maharashtra.gov.in",
      deadline: "सुरू (कायमस्वरूपी योजना)",
      lastVerified: "१५ सप्टेंबर २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "sch-02",
      name: "मुख्यमंत्री माझी लाडकी बहीण योजना",
      nameEn: "Mukhyamantri Majhi Ladki Bahin Yojana",
      category: "Women",
      categoryMr: "महिला",
      department: "महिला व बाल विकास विभाग",
      benefits: "दरमहा ₹१,५०० थेट लाभार्थी महिलेच्या आधार लिंक बँक खात्यात आर्थिक स्वावलंबनासाठी जमा.",
      eligibility: "२१ ते ६५ वर्षे वयोगटातील विवाहित, विधवा, घटस्फोटित, परित्यक्ता व निराधार महिला. कुटुंबाचे वार्षिक उत्पन्न २.५ लाख रुपयांपेक्षा कमी असावे.",
      requiredDocuments: [
        "आधार कार्ड",
        "अधिवास प्रमाणपत्र / रेशन कार्ड",
        "उत्पन्न दाखला (पिवळे/केशरी रेशन कार्ड असल्यास उत्पन्नाचा दाखला गृहीत)",
        "बँक खाते पासबुक"
      ],
      applicationProcess: "नारीशक्ती दूत ॲप किंवा अंगणवाडी सेविकेमार्फत थेट अर्ज सादर करता येतो.",
      officialUrl: "https://ladkibahin.maharashtra.gov.in",
      deadline: "सुरू",
      lastVerified: "२० सप्टेंबर २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "sch-03",
      name: "प्रधानमंत्री आवास योजना (ग्रामीण)",
      nameEn: "Pradhan Mantri Awaas Yojana - Gramin",
      category: "Housing",
      categoryMr: "घरकुल",
      department: "ग्रामविकास मंत्रालय, भारत शासन",
      benefits: "कच्चे घर किंवा बेघर कुटुंबांना पक्के घर बांधण्यासाठी ₹१,२०,००० ते ₹१,३०,००० अनुदान + मनरेगा मजुरीचे ₹२१,०००.",
      eligibility: "SECC २०११ यादीतील किंवा ग्रामसभेने पात्र ठरवलेले बेघर, कच्च्या मातीच्या घरात राहणारे कुटुंब.",
      requiredDocuments: [
        "जमीन मालकी हक्क अथवा ग्रामपंचायत नमुना ८ दाखला",
        "आधार कार्ड व कुटुंबाचे फोटो",
        "बँक खाते तपशील",
        "जॉब कार्ड (मनरेगा)"
      ],
      applicationProcess: "ग्रामपंचायत ग्रामसभेत नाव नोंदणी करून ग्रामसेवकामार्फत आवास सॉफ्ट (AwaasSoft) वर जिओ-टॅगिंग केले जाते.",
      officialUrl: "https://pmayg.nic.in",
      deadline: "वार्षिक कोटा आधारित",
      lastVerified: "१० ऑगस्ट २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "sch-04",
      name: "महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)",
      nameEn: "Mahatma Jyotirao Phule Jan Arogya Yojana",
      category: "Health",
      categoryMr: "आरोग्य",
      department: "सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन",
      benefits: "कुटुंबाला दरवर्षी ₹५ लाखांपर्यंत मोफत व कॅशलेस वैद्यकीय उपचार (१,३५६ आजार व शस्त्रक्रिया समाविष्ट).",
      eligibility: "महाराष्ट्रातील सर्व शिधापत्रिकाधारक (रेशन कार्ड धारक) कुटुंबे पात्र आहेत.",
      requiredDocuments: [
        "रेशन कार्ड (कोणतेही - पिवळे, केशरी किंवा पांढरे)",
        "आधार कार्ड किंवा मतदार ओळखपत्र"
      ],
      applicationProcess: "सोनवाडी जवळील निफाड अथवा नाशिक येथील कोणत्याही अंगीकृत रुग्णालयातील 'आरोग्यमित्र' यांच्याशी संपर्क साधावा.",
      officialUrl: "https://www.jeevandayee.gov.in",
      deadline: "कायमस्वरूपी",
      lastVerified: "०१ सप्टेंबर २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "sch-05",
      name: "सावित्रीबाई फुले कन्या शिष्यवृत्ती योजना",
      nameEn: "Savitribai Phule Scholarship for Girls",
      category: "Students",
      categoryMr: "विद्यार्थी",
      department: "सामाजिक न्याय व विशेष सहाय्य विभाग",
      benefits: "इयत्ता ५ वी ते १० वी मधील विद्यार्थिनींना दरमहा शिष्यवृत्ती व शैक्षणिक साहित्यासाठी थेट आर्थिक सहाय्य.",
      eligibility: "शासकीय किंवा अनुदानित शाळेत शिकणाऱ्या मुली (विशेषतः मागासवर्गीय व आर्थिक दुर्बल घटक).",
      requiredDocuments: [
        "शाळेचे बोनाफाईड प्रमाणपत्र",
        "आधार कार्ड",
        "जातीचा दाखला (लागू असल्यास)",
        "विद्यार्थिनीचे बँक पासबुक"
      ],
      applicationProcess: "मुख्याध्यापकांमार्फत महाडीबीटी पोर्टलवर शाळेकडून थेट ऑनलाईन अर्ज भरला जातो.",
      officialUrl: "https://mahadbt.maharashtra.gov.in",
      deadline: "प्रत्येक शैक्षणिक वर्षाच्या ३० ऑक्टोबरपर्यंत",
      lastVerified: "१२ ऑगस्ट २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "sch-06",
      name: "संजय गांधी निराधार अनुदान योजना",
      nameEn: "Sanjay Gandhi Niradhar Anudan Yojana",
      category: "Senior Citizens",
      categoryMr: "ज्येष्ठ नागरिक व निराधार",
      department: "सामाजिक न्याय विभाग",
      benefits: "निराधार व्यक्ती, विधवा, अंध, अपंग, अनाथ बालके व दुर्धर आजारग्रस्त व्यक्तींना दरमहा ₹१,५०० मासिक पेन्शन.",
      eligibility: "६५ वर्षांवरील निराधार किंवा ६५ वर्षाखालील अपंग/विधवा ज्यांचे कौटुंबिक उत्पन्न ₹२१,००० पेक्षा कमी आहे.",
      requiredDocuments: [
        "वयाचा दाखला / शाळा सोडल्याचा दाखला",
        "तहसीलदारांचा उत्पन्नाचा दाखला",
        "अपंगत्व प्रमाणपत्र (लागू असल्यास ४०% पेक्षा जास्त)",
        "निवासी दाखला व आधार कार्ड"
      ],
      applicationProcess: "तहसीलदार कार्यालय किंवा सेतू सुविधा केंद्रात विहित नमुन्यातील अर्ज सादर करावा.",
      officialUrl: "https://sjsa.maharashtra.gov.in",
      deadline: "कायमस्वरूपी",
      lastVerified: "०५ जुलै २०२६",
      verificationStatus: "OFFICIAL_SOURCE"
    }
  ],

  facilities: [
    {
      id: "fac-01",
      name: "प्राथमिक आरोग्य उपकेंद्र, सोनवाडी",
      nameEn: "Primary Health Sub-Centre, Sonwadi",
      category: "Health",
      categoryMr: "आरोग्य केंद्र",
      address: "गावातील मुख्य चौक, निफाड रोड",
      phone: "+91 2550 289108",
      openingHours: "सकाळी ९:०० ते संध्याकाळी ५:०० (आपत्कालीन २४ तास)",
      services: ["मोफत बाह्यरुग्ण तपासणी (OPD)", "माता व बाल संगोपन", "लसीकरण (प्रत्येक बुधवार)", "प्रसूती पूर्व व पश्चात सेवा", "आवश्यक मोफत औषधे"],
      latitude: 20.0828,
      longitude: 74.0180,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-02",
      name: "जिल्हा परिषद प्राथमिक शाळा (डिजिटल मॉडेल स्कूल)",
      nameEn: "ZP Primary Digital School",
      category: "School",
      categoryMr: "शाळा व शिक्षण",
      address: "वार्ड क्र. २, मंदिर परिसर",
      phone: "+91 2550 289104",
      openingHours: "सकाळी ९:३० ते संध्याकाळी ४:३० (सोम ते शनि)",
      services: ["इयत्ता १ ली ते ७ वी शिक्षण", "मोफत पाठ्यपुस्तके व गणवेश", "डिजिटल स्मार्ट क्लासरूम", "गरम पौष्टिक माध्यान्ह भोजन (MDM)", "संगणक लॅब"],
      latitude: 20.0820,
      longitude: 74.0215,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-03",
      name: "ग्रामपंचायत कार्यालय व आपले सरकार सेवा केंद्र",
      nameEn: "Gram Panchayat Office & Maha E-Seva Kendra",
      category: "Government",
      categoryMr: "प्रशासकीय कार्यालय",
      address: "सोनवाडी गावठाण केंद्र",
      phone: "+91 2550 289100",
      openingHours: "सकाळी १०:०० ते संध्याकाळी ६:०० (रविवार सुट्टी)",
      services: ["जन्म-मृत्यू दाखला नोंदणी", "घरपट्टी व पाणीपट्टी कर भरणा", "७/१२ व ८-अ दाखले", "शासकीय योजना अर्ज नोंदणी", "ग्रामसभा आयोजन"],
      latitude: 20.0835,
      longitude: 74.0210,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-04",
      name: "बँक ऑफ महाराष्ट्र शाखा व २४ तास ATM",
      nameEn: "Bank of Maharashtra Branch & 24x7 ATM",
      category: "Banking",
      categoryMr: "बँक व पतसंस्था",
      address: "निफाड-सोनवाडी मुख्य रस्ता",
      phone: "+91 2550 289122",
      openingHours: "सकाळी १०:०० ते दुपारी ४:०० (ATM २४ तास सुरू)",
      services: ["बचत व चालू खाते", "शेतकरी पीक कर्ज (KCC)", "आधार लिंक डीबीटी सुविधा", "महिला बचत गट कर्ज", "पैसे काढणे व भरणे"],
      latitude: 20.0845,
      longitude: 74.0225,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-05",
      name: "अंगणवाडी केंद्र क्र. १ व २",
      nameEn: "Anganwadi Centres 1 & 2",
      category: "Anganwadi",
      categoryMr: "अंगणवाडी",
      address: "वार्ड क्र. १ आणि वार्ड क्र. ३",
      phone: "+91 94230 00444",
      openingHours: "सकाळी ९:०० ते दुपारी २:००",
      services: ["० ते ६ वर्षे बालकांना पोषण आहार", "पूर्व प्राथमिक शिक्षण", "गर्भवती महिलांना पोषण किट", "वजन व उंची वाढीचे सनियंत्रण"],
      latitude: 20.0815,
      longitude: 74.0200,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-06",
      name: "शासकीय रास्त भाव धान्य दुकान (Ration Shop)",
      nameEn: "Fair Price Fair Ration Shop",
      category: "Ration",
      categoryMr: "रेशन दुकान",
      address: "बाजार ओट्या शेजारी",
      phone: "+91 94230 00555",
      openingHours: "सकाळी ८:०० ते १२:००, संध्याकाळी ४:०० ते ७:००",
      services: ["राष्ट्रीय अन्न सुरक्षा योजना धान्य वितरण", "बायोमेट्रिक ई-पॉस (e-PoS) मशिन द्वारे मोफत गहू व तांदूळ वाटप"],
      latitude: 20.0838,
      longitude: 74.0208,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-07",
      name: "पशुवैद्यकीय दवाखाना (श्रेणी २)",
      nameEn: "Veterinary Dispensary (Grade 2)",
      category: "Agriculture",
      categoryMr: "पशुसंवर्धन",
      address: "सोनवाडी डेअरी रोड",
      phone: "+91 2550 289130",
      openingHours: "सकाळी ८:३० ते दुपारी १:००",
      services: ["जनावरांचे मोफत उपचार", "लाळ खुरकूत व घटसर्प लसीकरण", "कृत्रिम रेतन सुविधा", "दुग्ध उत्पादक मार्गदर्शन"],
      latitude: 20.0855,
      longitude: 74.0245,
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "fac-08",
      name: "भारतीय टपाल कार्यालय (India Post Sub-Post Office)",
      nameEn: "India Post Sub-Post Office",
      category: "Post Office",
      categoryMr: "पोस्ट ऑफिस",
      address: "पोस्ट गल्ली, सोनवाडी",
      phone: "+91 2550 289115",
      openingHours: "सकाळी ९:०० ते दुपारी ३:००",
      services: ["पत्र व पार्सल सेवा", "सुकन्या समृद्धी योजना", "पोस्ट ऑफिस बचत खाते व RD", "आधार कार्ड नोंदणी व अपडेट", "डीबीटी पेन्शन वाटप"],
      latitude: 20.0825,
      longitude: 74.0190,
      verificationStatus: "OFFICIAL_SOURCE"
    }
  ],

  complaints: [
    {
      id: "cmp-01",
      trackingId: "GRM-2026-004821",
      category: "Road",
      categoryMr: "खराब रस्ता व खड्डे",
      title: "मारुती मंदिरासमोरील रस्त्यावर पावसामुळे मोठे खड्डे व चिखल",
      description: "गेल्या आठवड्यातील पावसामुळे मारुती मंदिरासमोरील डांबरी रस्त्यावर मोठा खड्डा पडला असून शाळकरी मुले व दुचाकी वाहने घसरून पडत आहेत. तात्काळ मुरूम टाकून खड्डे बुजवावेत.",
      location: "मारुती मंदिर चौक, मुख्य रस्ता, वार्ड क्र. २",
      isAnonymous: false,
      citizenName: "रमेश एकनाथ पाटील",
      citizenPhone: "98******12",
      photoUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
      status: "IN_PROGRESS", // SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED
      statusMr: "काम सुरू",
      submittedDate: "१८ सप्टेंबर २०२६",
      updates: [
        { date: "१८ सप्टेंबर २०२६, १०:१५ AM", status: "नोंदणीकृत", note: "तक्रार यशस्वीरित्या नोंदवली गेली. ट्रॅकिंग आयडी जनरेट झाला." },
        { date: "१९ सप्टेंबर २०२६, ०२:३० PM", status: "छाननी", note: "ग्रामपंचायत कर्मचाऱ्यांकडून तक्रारीची पडताळणी पूर्ण." },
        { date: "२१ सप्टेंबर २०२६, ११:०० AM", status: "कामाचे वाटप", note: "बांधकाम विभागाच्या कंत्राटदाराला सूचना दिली. मुरूम व खडी भरण्याचे काम सुरू." }
      ]
    },
    {
      id: "cmp-02",
      trackingId: "GRM-2026-004815",
      category: "Water",
      categoryMr: "पाणीपुरवठा",
      title: "टेकडी वस्तीवरील नळाला गेल्या ३ दिवसांपासून कमी दाबाने पाणी",
      description: "जल जीवन मिशन अंतर्गत दिलेल्या पाईपलाईनला जोडलेल्या टेकडी भागातील नळांना खूप कमी पाणी येत आहे. व्हॉल्व्ह तपासण्याची विनंती.",
      location: "टेकडी परिसर, घर क्र. १२४ ते १५०",
      isAnonymous: true,
      citizenName: "नागरिक (गोपनीय)",
      citizenPhone: null,
      photoUrl: null,
      status: "RESOLVED",
      statusMr: "निवारण झाले",
      submittedDate: "१० सप्टेंबर २०२६",
      updates: [
        { date: "१० सप्टेंबर २०२६", status: "नोंदणीकृत", note: "पाणीपुरवठा विभागाकडे तक्रार वर्ग" },
        { date: "११ सप्टेंबर २०२६", status: "दुरुस्ती", note: "पाणीपुरवठा कर्मचारी श्री. शिंदे यांनी व्हॉल्व्हमधील कचरा साफ केला" },
        { date: "१२ सप्टेंबर २०२६", status: "निवारण", note: "पाणीपुरवठा सुरळीत झाल्याची नागरिकांकडून खात्री." }
      ]
    },
    {
      id: "cmp-03",
      trackingId: "GRM-2026-004830",
      category: "Electricity",
      categoryMr: "बंद पथदिवे",
      title: "शाळेसमोरील सौर पथदिवा गेल्या आठवड्यापासून बंद आहे",
      description: "शाळेच्या मुख्य प्रवेशद्वाराजवळ बसवलेला सौर दिवा संध्याकाळी पेटत नाही. रात्रीच्या वेळी अंधार राहतो.",
      location: "प्राथमिक शाळा मुख्य गेट",
      isAnonymous: false,
      citizenName: "सुनील बबन काळे",
      citizenPhone: "94******45",
      photoUrl: null,
      status: "UNDER_REVIEW",
      statusMr: "छाननी सुरू",
      submittedDate: "२६ सप्टेंबर २०२६",
      updates: [
        { date: "२६ सप्टेंबर २०२६", status: "नोंदणीकृत", note: "सौर दिवा देखभाल कंत्राटदाराकडे विनंती पाठवली आहे." }
      ]
    }
  ],

  publicQuestions: [
    {
      id: "qst-01",
      questionId: "QST-2026-0104",
      question: "गावातील डांबरी रस्त्याचे काम कधीपर्यंत पूर्ण होणार आहे व मंजूर निधी किती आहे?",
      questionEn: "When will the road asphalting work finish and what is the sanctioned budget?",
      category: "विकासकामे (Development Works)",
      askedBy: "ग्रामस्थ, वार्ड क्र. २",
      date: "१२ सप्टेंबर २०२६",
      status: "ANSWERED",
      officialResponse: "सोनवाडी मुख्य रस्ता डांबरीकरणासाठी मुख्यमंत्री ग्राम सडक योजनेतून ₹२८,५०,००० मंजूर आहेत. पावसाळा संपल्यानंतर अंतिम डांबरीकरणाचा थर देऊन ३० नोव्हेंबर २०२६ पर्यंत काम पूर्ण करण्याचे नियोजन आहे. सविस्तर कार्यारंभ आदेश ग्रामपंचायत सूचना फलकावर उपलब्ध आहे.",
      respondedBy: "ग्रामसेवक व सरपंच, ग्रामपंचायत सोनवाडी",
      responseDate: "१६ सप्टेंबर २०२६",
      supportingDocument: "PWD कार्यारंभ आदेश क्र. ७१२/२०२५"
    },
    {
      id: "qst-02",
      questionId: "QST-2026-0102",
      question: "जल जीवन मिशनच्या पाईपलाईनचे पाणी पिण्यायोग्य असल्याची लॅब तपासणी झाली आहे का?",
      category: "पाणी व आरोग्य (Water Quality)",
      askedBy: "आरोग्य समिती सदस्य",
      date: "०५ ऑगस्ट २०२६",
      status: "ANSWERED",
      officialResponse: "होय, जिल्हा आरोग्य प्रयोगशाळा नाशिक यांच्यामार्फत दि. १८ जुलै २०२६ रोजी पाण्याच्या नमुन्यांची जैविक व रासायनिक तपासणी करण्यात आली असून पाणी १००% पिण्यायोग्य असल्याचा अहवाल (Lab Report No. WQ-2026-78) प्राप्त झाला आहे.",
      respondedBy: "आरोग्य निरीक्षक व ग्रामपंचायत पाणीपुरवठा समिती",
      responseDate: "०८ ऑगस्ट २०२६",
      supportingDocument: "पाणी गुणवत्ता तपासणी अहवाल २०२६"
    }
  ],

  documents: [
    {
      id: "inv-01",
      name: "रस्ता डांबरीकरण काम - देयक (Invoice) क्र. ३ व GST बिल",
      docType: "Invoice",
      category: "Invoice",
      categoryMr: "देयक व बिल (Invoice)",
      description: "मुख्य बसस्थानक ते मारुती मंदिर रस्ता खडीकरण व डांबरीकरण कामाचे तृतीय देयक (Running Bill) व कंत्राटदाराचे अधिकृत जीएसटी बिल.",
      fileUrl: "#",
      fileName: "GST-INV-2025-089.pdf",
      fileSize: "1.4 MB",
      mimeType: "application/pdf",
      date: "२२ सप्टेंबर २०२६",
      source: "सार्वजनिक बांधकाम विभाग व ग्रामपंचायत वित्त",
      verificationStatus: "OFFICIAL_SOURCE",
      invoiceDetails: {
        billNo: "GST-INV/2026/894",
        vendorName: "श्री स्वामी समर्थ इन्फ्रास्ट्रक्चर प्रा. लि.",
        gstin: "27AAACS1234F1Z9",
        amount: 350000,
        linkedWork: "मुख्य रस्ता डांबरीकरण काम (WRK-2025-089)",
        paymentStatus: "PAID"
      }
    },
    {
      id: "ltr-01",
      name: "जिल्हा परिषद ग्रामीण पाणीपुरवठा मंजुरी व प्रशासकीय आदेश पत्र",
      docType: "Letter",
      category: "Letter",
      categoryMr: "शासकीय पत्र (Govt Letter)",
      description: "जल जीवन मिशन अंतर्गत नवीन पाण्याच्या टाकीसाठी तांत्रिक मान्यता व निधी वितरण प्रशासकीय आदेश.",
      fileUrl: "#",
      fileName: "ZP-LTR-2026-442.pdf",
      fileSize: "980 KB",
      mimeType: "application/pdf",
      date: "१० ऑगस्ट २०२६",
      source: "मुख्य कार्यकारी अधिकारी, जिल्हा परिषद",
      verificationStatus: "OFFICIAL_SOURCE",
      letterDetails: {
        outwardNo: "जा.क्र./जि.प./ग्रापापु/२०२६/४४२",
        department: "ग्रामीण पाणीपुरवठा व स्वच्छता विभाग",
        issuingOfficer: "कार्यकारी अभियंता, जि.प.",
        subject: "पाणीपुरवठा योजना पूर्तता आदेश"
      }
    },
    {
      id: "lic-01",
      name: "ग्रामपंचायत अधिकृत व्यवसाय परवाना (Trade Licence)",
      docType: "Licence",
      category: "Licence",
      categoryMr: "परवाना व दाखला (Licence)",
      description: "महाराष्ट्र ग्रामपंचायत अधिनियम कलम ५२ नुसार जारी केलेला नवीन कृषी सेवा केंद्र व दुकान व्यवसाय परवाना.",
      fileUrl: "#",
      fileName: "TRADE-LIC-2026-112.pdf",
      fileSize: "720 KB",
      mimeType: "application/pdf",
      date: "१२ जुलै २०२६",
      source: "ग्रामपंचायत कार्यालय",
      verificationStatus: "OFFICIAL_SOURCE",
      licenceDetails: {
        licenceNo: "GP-LIC-2026-112",
        applicantName: "किसान कृषी सेवा केंद्र, मुख्य बाजारपेठ",
        propertyNo: "मिळकत क्र. २८४/२",
        validity: "३१ मार्च २०२७",
        feeReceiptNo: "REC-2026-981"
      }
    },
    {
      id: "doc-01",
      name: "ग्रामपंचायत वार्षिक अंदाजपत्रक (Budget) २०२५-२६",
      docType: "Document",
      category: "Budget",
      categoryMr: "बजेट व वित्त",
      description: "सन २०२५-२६ या आर्थिक वर्षातील ग्रामपंचायतीचे सर्व उत्पन्न, शासकीय अनुदान व विकासकामांच्या खर्चाचे अधिकृत अंदाजपत्रक.",
      fileUrl: "#",
      fileName: "BUDGET-2025-26.pdf",
      fileSize: "2.4 MB",
      mimeType: "application/pdf",
      date: "२५ मार्च २०२५",
      source: "ग्रामपंचायत सामान्य सभा ठराव",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "doc-02",
      name: "विशेष ग्रामसभा इतिवृत्त व ठराव (Minutes of Meeting) - ऑक्टोबर २०२५",
      docType: "Document",
      category: "Gram Sabha",
      categoryMr: "ग्रामसभा इतिवृत्त",
      description: "गांधी जयंती निमित्त आयोजित विशेष ग्रामसभेचे अधिकृत इतिवृत्त, उपस्थित नागरिकांची स्वाक्षरी यादी व मंजूर २१ ठराव.",
      fileUrl: "#",
      fileName: "GS-MINUTES-OCT2025.pdf",
      fileSize: "1.8 MB",
      mimeType: "application/pdf",
      date: "०२ ऑक्टोबर २०२५",
      source: "ग्रामसभा नोंदवही पान क्र. ४५ ते ५२",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "doc-03",
      name: "जिल्हा आरोग्य प्रयोगशाळा पाणी गुणवत्ता चाचणी अहवाल २०२६",
      docType: "Document",
      category: "Reports",
      categoryMr: "तपासणी अहवाल",
      description: "पिण्याच्या पाण्याचे शुद्धीकरण व टीक्यु तपासणी प्रमाणपत्र, जिल्हा सार्वजनिक आरोग्य प्रयोगशाळा.",
      fileUrl: "#",
      fileName: "LAB-WATER-TEST-2026.pdf",
      fileSize: "850 KB",
      mimeType: "application/pdf",
      date: "१८ जुलै २०२६",
      source: "जिल्हा आरोग्य प्रयोगशाळा",
      verificationStatus: "GOVERNMENT_DOCUMENT"
    },
    {
      id: "doc-04",
      name: "रस्ता डांबरीकरण निविदा व कार्यारंभ आदेश (Work Order)",
      docType: "Document",
      category: "Works",
      categoryMr: "बांधकाम आदेश",
      description: "मुख्य रस्ता डांबरीकरण कामाचा सविस्तर तांत्रिक नकाशा, निविदा अटी व कार्यारंभ आदेश क्र. ७१२/२०२५.",
      fileUrl: "#",
      fileName: "WORK-ORDER-712.pdf",
      fileSize: "3.1 MB",
      mimeType: "application/pdf",
      date: "१५ जानेवारी २०२५",
      source: "कार्यकारी अभियंता, जि.प. बांधकाम विभाग",
      verificationStatus: "OFFICIAL_SOURCE"
    },
    {
      id: "doc-05",
      name: "गावनिहाय विकास आराखडा (GPDP) २०२६-२७ मसुदा",
      docType: "Document",
      category: "Planning",
      categoryMr: "विकास आराखडा",
      description: "पुढील वर्षासाठी ग्रामसभेने प्रस्तावित केलेल्या विकासकामांचा वार्षिक विकास आराखडा.",
      fileUrl: "#",
      fileName: "GPDP-2026-27.pdf",
      fileSize: "4.2 MB",
      mimeType: "application/pdf",
      date: "१५ ऑगस्ट २०२६",
      source: "ग्रामविकास समिती",
      verificationStatus: "OFFICIAL_SOURCE"
    }
  ],

  gramSabhaMeetings: [
    {
      id: "gs-01",
      date: "०२ ऑक्टोबर २०२६",
      time: "सकाळी १०:०० वाजता",
      venue: "ग्रामपंचायत कार्यालय प्रांगण, सोनवाडी",
      status: "UPCOMING",
      statusMr: "आगामी ग्रामसभा",
      agenda: [
        "१. मागील ग्रामसभा इतिवृत्त वाचून कायम करणे.",
        "२. गावातील रस्ते व पाणीपुरवठा विकासकामांच्या प्रगतीचा आढावा.",
        "३. प्रधानमंत्री आवास योजना (ग्रामीण) नवीन लाभार्थ्यांची यादी वाचन व छाननी.",
        "४. स्वच्छ भारत अभियान टप्पा २ अंतर्गत कचरा व्यवस्थापन शेड मंजुरी.",
        "५. अध्यक्ष यांच्या परवानगीने ऐनवेळी येणारे विषय."
      ],
      chairperson: "सरपंच, ग्रामपंचायत सोनवाडी",
      supportingDoc: "ग्रामसभा जाहीर सूचना पत्रक क्र. ४५/२०२६"
    },
    {
      id: "gs-02",
      date: "१५ ऑगस्ट २०२६",
      time: "सकाळी ११:०० वाजता",
      venue: "जिल्हा परिषद शाळा हॉल, सोनवाडी",
      status: "COMPLETED",
      statusMr: "संपन्न",
      agenda: [
        "स्वातंत्र्य दिन ध्वजारोहण व विशेष ग्रामसभा",
        "वार्षिक जमा-खर्च अंदाजपत्रक वाचन",
        "जल जीवन मिशन नळ पाणीपुरवठा नियोजन",
        "ग्रामविकास आराखडा (GPDP) मंजुरी"
      ],
      attendeesCount: 245,
      resolutions: [
        "ठराव १: गावातील सर्व ४५ सौर दिवे बसविण्याच्या कामास एकमुखाने मंजुरी.",
        "ठराव २: प्लास्टिक बंदी कडक अंमलबजावणी व ओला-सुका कचरा वर्गीकरण बंधनकारक.",
        "ठराव ३: शेतरस्त्यांच्या दुरुस्तीसाठी रोजगार हमी योजनेतून प्रस्ताव पाठवण्याचा निर्णय."
      ],
      minutesDoc: "ग्रामसभा नोंदवही क्र. ३, पृष्ठ ४८"
    },
    {
      id: "gs-03",
      date: "०१ मे २०२६",
      time: "सकाळी १०:३० वाजता",
      venue: "ग्रामपंचायत कार्यालय",
      status: "COMPLETED",
      statusMr: "संपन्न",
      agenda: ["महाराष्ट्र दिन विशेष ग्रामसभा", "पाणीटंचाई निवारण कृती आराखडा"],
      attendeesCount: 198,
      resolutions: ["विहिरीतील गाळ काढणे व बोअरवेल दुरुस्ती करणे"],
      minutesDoc: "ग्रामसभा नोंदवही क्र. ३, पृष्ठ ४०"
    }
  ],

  notifications: [
    {
      id: "notif-01",
      title: "विशेष ग्रामसभा जाहीर सूचना - २ ऑक्टोबर २०२६",
      titleEn: "Special Gram Sabha Notice - 2nd October 2026",
      category: "GRAM_SABHA",
      categoryMr: "ग्रामसभा",
      urgency: "HIGH",
      date: "२५ सप्टेंबर २०२६",
      content: "सर्व ग्रामस्थांना कळविण्यात येते की, गांधी जयंती निमित्त दि. २ ऑक्टोबर २०२६ रोजी सकाळी १०:०० वाजता ग्रामपंचायत प्रांगणात विशेष ग्रामसभेचे आयोजन केले आहे. तरी सर्व महिला व पुरुषांनी उपस्थित राहावे.",
      publishedBy: "ग्रामपंचायत कार्यालय, सोनवाडी"
    },
    {
      id: "notif-02",
      title: "जल जीवन मिशन मुख्य पाईपलाईन जोडणीमुळे उद्या पाणीपुरवठा बंद",
      titleEn: "Water supply shut down tomorrow for pipeline maintenance",
      category: "WATER",
      categoryMr: "पिण्याचे पाणी",
      urgency: "HIGH",
      date: "२७ सप्टेंबर २०२६",
      content: "टेकडी परिसरातील नवीन ५०,००० लिटर टाकीची मुख्य जोडणी करायची असल्याने उद्या दि. २९ सप्टेंबर रोजी सकाळचा पाणीपुरवठा बंद राहील. नागरिकांनी आजच आवश्यक पाण्याचा साठा करून ठेवावा.",
      publishedBy: "पाणीपुरवठा विभाग सोनवाडी"
    },
    {
      id: "notif-03",
      title: "मोफत पशु आरोग्य व लाळ खुरकूत रोग प्रतिबंधक लसीकरण शिबीर",
      titleEn: "Free Cattle Vaccination Camp on 5th October",
      category: "HEALTH",
      categoryMr: "आरोग्य व शेती",
      urgency: "NORMAL",
      date: "२४ सप्टेंबर २०२६",
      content: "दि. ५ ऑक्टोबर २०२६ रोजी पशुवैद्यकीय दवाखान्यात सर्व गायी व म्हशींसाठी मोफत लसीकरण शिबीर आयोजित केले आहे. पशुपालकांनी जनावरांना सकाळी ८ ते दुपारी १२ या वेळेत आणावे.",
      publishedBy: "पशुवैद्यकीय अधिकारी, निफाड"
    },
    {
      id: "notif-04",
      title: "ई-पीक पाहणी (Dharani/E-Crop) नोंदणीची अंतिम मुदत १५ ऑक्टोबर",
      titleEn: "E-Pik Pahani Crop Survey Last Date 15th October",
      category: "GOVERNMENT",
      categoryMr: "शासकीय योजना",
      urgency: "NORMAL",
      date: "२० सप्टेंबर २०२६",
      content: "खरीप हंगाम २०२६ मधील पिकांची ई-पीक पाहणी मोबाईल ॲपद्वारे नोंदवण्याची अंतिम मुदत १५ ऑक्टोबर २०२६ आहे. पीक विमा व नुकसान भरपाईसाठी ई-पीक नोंदणी अत्यंत आवश्यक आहे.",
      publishedBy: "तलाठी कार्यालय, सोनवाडी"
    }
  ],

  auditLogs: [
    {
      id: "aud-01",
      actor: "ग्रामसेवक (Village Admin)",
      entity: "DevelopmentWork",
      entityId: "WRK-2025-089",
      action: "UPDATE_STATUS",
      previousValue: "काम सुरू (₹१५,००,००० खर्च)",
      newValue: "काम प्रगतीपथावर (₹१८,५०,००० खर्च)",
      reason: "शाखा अभियंता गुणवत्ता अहवाल व देयक क्र. ३ नुसार खर्च अद्ययावत केला.",
      timestamp: "२२ सप्टेंबर २०२६, ०३:४५ PM"
    },
    {
      id: "aud-02",
      actor: "प्रशासक (Super Admin)",
      entity: "Document",
      entityId: "DOC-2026-003",
      action: "VERIFY_DOCUMENT",
      previousValue: "COMMUNITY_PENDING",
      newValue: "OFFICIAL_SOURCE",
      reason: "जिल्हा आरोग्य प्रयोगशाळेच्या मूळ डिजिटल स्वाक्षरीची पडताळणी झाली.",
      timestamp: "२० सप्टेंबर २०२६, ११:२० AM"
    },
    {
      id: "aud-03",
      actor: "मध्यस्थ (Moderator)",
      entity: "Complaint",
      entityId: "GRM-2026-004821",
      action: "STATUS_CHANGE",
      previousValue: "छाननी सुरू",
      newValue: "कामाचे वाटप (कंत्राटदाराला सूचना)",
      reason: "स्थळ पाहणी करून रस्ता दुरुस्ती आदेश जारी केला.",
      timestamp: "२१ सप्टेंबर २०२६, १०:३० AM"
    },
    {
      id: "aud-04",
      actor: "ग्रामसेवक (Village Admin)",
      entity: "GramSabhaMeeting",
      entityId: "GS-2026-01",
      action: "PUBLISH_AGENDA",
      previousValue: "DRAFT",
      newValue: "PUBLISHED",
      reason: "२ ऑक्टोबर विशेष ग्रामसभेचा अधिकृत अजेंडा सूचना फलकावर प्रसिद्ध.",
      timestamp: "२५ सप्टेंबर २०२६, ०४:०० PM"
    }
  ]
};
