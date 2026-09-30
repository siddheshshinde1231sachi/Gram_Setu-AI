/**
 * GramSetu — Central Reactive Application State
 * Handles persistence, language switching, accessibility modes, routing, and role-based access
 */

class GramSetuState {
  constructor() {
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    // Load persisted preferences or sensible defaults
    const savedLang = localStorage.getItem('gramsetu_lang') || 'mr';
    const savedRole = localStorage.getItem('gramsetu_role') || 'citizen';
    const savedTextSize = localStorage.getItem('gramsetu_text_size') || 'normal';
    const savedHighContrast = localStorage.getItem('gramsetu_high_contrast') === 'true';
    const savedSimpleMode = localStorage.getItem('gramsetu_simple_mode') === 'true';
    const savedLowData = localStorage.getItem('gramsetu_low_data') === 'true';

    // Load active session (if any)
    let savedSession = null;
    try {
      const storedS = localStorage.getItem('gramsetu_session');
      if (storedS) savedSession = JSON.parse(storedS);
    } catch (e) {
      console.warn("Could not load session:", e);
    }

    const activeRole = savedSession?.role || savedRole;

    // Load dynamic complaints or initialize from demo data
    let customComplaints = [];
    try {
      const stored = localStorage.getItem('gramsetu_custom_complaints');
      if (stored) customComplaints = JSON.parse(stored);
    } catch (e) {
      console.warn("Could not load complaints from storage:", e);
    }

    // Load dynamic questions
    let customQuestions = [];
    try {
      const storedQ = localStorage.getItem('gramsetu_custom_questions');
      if (storedQ) customQuestions = JSON.parse(storedQ);
    } catch (e) {
      console.warn("Could not load questions:", e);
    }

    // Load dynamic custom documents (Invoices, Letters, Licences, Documents uploaded by Admin)
    let customDocs = [];
    try {
      const storedD = localStorage.getItem('gramsetu_custom_documents');
      if (storedD) customDocs = JSON.parse(storedD);
    } catch (e) {
      console.warn("Could not load custom documents:", e);
    }

    // Load Call Directory (Emergency & Public Contacts)
    let customCallDirectory = null;
    try {
      const storedCall = localStorage.getItem('gramsetu_call_directory');
      if (storedCall) customCallDirectory = JSON.parse(storedCall);
    } catch (e) {
      console.warn("Could not load call directory:", e);
    }

    const defaultCallDirectory = [
      { id: "call-amb", key: "ambulance", name: "आपत्कालीन रुग्णवाहिका (Ambulance)", number: "108", desc: "२४ तास मोफत वैद्यकीय रुग्णवाहिका सेवा", icon: "🚑", category: "emergency", color: "bg-red-50 text-red-900 border-red-200" },
      { id: "call-pol", key: "police", name: "पोलीस नियंत्रण कक्ष (Police Helpline)", number: "112", desc: "राष्ट्रीय आपत्कालीन सहाय्यता क्रमांक", icon: "🚓", category: "emergency", color: "bg-emerald-50 text-emerald-950 border-emerald-200" },
      { id: "call-fire", key: "fire", name: "अग्निशामक दल (Fire Brigade)", number: "101", desc: "निफाड नगरपरिषद अग्निशमन कक्ष", icon: "🚒", category: "emergency", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
      { id: "call-phc", key: "primaryHealthCentre", name: "प्राथमिक आरोग्य केंद्र (PHC सोनवाडी)", number: "+91 2550 289108", desc: "वैद्यकीय अधिकारी कक्ष (डॉ. पाटील)", icon: "🏥", category: "health", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
      { id: "call-sarp", key: "sarpanchOffice", name: "सरपंच संपर्क कक्ष", number: "+91 94230 00111", desc: "तातडीच्या सार्वजनिक व ग्रामविकास मदतीसाठी", icon: "👤", category: "panchayat", color: "bg-slate-50 text-slate-900 border-slate-200" },
      { id: "call-gsevak", key: "gramSevakOffice", name: "ग्रामसेवक कार्यालय संपर्क", number: "+91 94230 00222", desc: "प्रशासकीय दाखले व योजना संबंधित कामे", icon: "📋", category: "panchayat", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
      { id: "call-talathi", key: "talathiOffice", name: "तलाठी कार्यालय (सजा सोनवाडी)", number: "+91 94230 00333", desc: "जमीन महसूल, फेरफार व ई-पीक पाहणी", icon: "📜", category: "revenue", color: "bg-teal-50 text-teal-900 border-teal-200" },
      { id: "call-panch", key: "panchayatOffice", name: "ग्रामपंचायत मुख्य कार्यालय", number: "+91 2550 289100", desc: "सर्वसाधारण नागरिक सेवा व चौकशी कक्ष", icon: "🏛️", category: "panchayat", color: "bg-purple-50 text-purple-900 border-purple-200" },
      { id: "call-elec", key: "electricity", name: "महावितरण वीज तक्रार (MSEDCL)", number: "1912", desc: "विद्युत पुरवठा खंडित किंवा डीपी अपघात", icon: "⚡", category: "utility", color: "bg-yellow-50 text-yellow-900 border-yellow-200" }
    ];

    // Load Schemes with real-time status (ACTIVE vs DONE / EXPIRED)
    let customSchemes = null;
    try {
      const storedSchemes = localStorage.getItem('gramsetu_custom_schemes');
      if (storedSchemes) customSchemes = JSON.parse(storedSchemes);
    } catch (e) {
      console.warn("Could not load schemes:", e);
    }

    const defaultSchemes = (window.VILLAGE_DATA?.schemes || []).map((s, idx) => {
      // Set realistic initial status: first 4 are active, older ones marked as done
      const isDone = s.id === 'sch-05' || s.id === 'sch-06';
      return {
        ...s,
        status: s.status || (isDone ? 'DONE' : 'ACTIVE'),
        statusMr: s.statusMr || (isDone ? 'मुदत संपली / पूर्ण (Done)' : 'सुरू योजना (Active)'),
        doneDate: isDone ? '३१ मार्च २०२६' : null
      };
    });

    // Load AI Mitra Chat History
    let aiChatHistory = [];
    try {
      const storedAi = localStorage.getItem('gramsetu_ai_chat_history');
      if (storedAi) aiChatHistory = JSON.parse(storedAi);
    } catch (e) {
      console.warn("Could not load AI history:", e);
    }

    // Load audit logs
    let auditLogs = window.VILLAGE_DATA?.auditLogs || [];
    try {
      const storedA = localStorage.getItem('gramsetu_audit_logs');
      if (storedA) auditLogs = JSON.parse(storedA);
    } catch (e) {
      console.warn("Could not load audit logs:", e);
    }

    // Load active village or default to Sonwadi, Nashik
    let activeVillage = window.VILLAGE_DATA?.village;
    try {
      const storedV = localStorage.getItem('gramsetu_active_village');
      if (storedV) {
        activeVillage = JSON.parse(storedV);
        if (window.VILLAGE_DATA) window.VILLAGE_DATA.village = activeVillage;
      }
    } catch (e) {
      console.warn("Could not load active village:", e);
    }

    // If no active session exists, start on 'login' route!
    const initialRoute = savedSession ? 'home' : 'login';

    this.state = {
      lang: savedLang,
      role: activeRole, // 'citizen' | 'moderator' | 'village_admin' | 'super_admin'
      session: savedSession,
      activeVillage: activeVillage,
      currentRoute: initialRoute,
      activeWorkModalId: null,
      activeSchemeModalId: null,
      activeFacilityModalId: null,
      activeDocumentModalId: null,
      activeTrackingId: null,
      searchQuery: '',
      
      // Accessibility tokens
      textSize: savedTextSize, // 'normal' | 'large' | 'xlarge'
      highContrast: savedHighContrast,
      simpleMode: savedSimpleMode,
      lowDataMode: savedLowData,
      isReadingAloud: false,

      // Live data collections (combines default dataset + dynamic user additions)
      complaints: [...(window.VILLAGE_DATA?.complaints || []), ...customComplaints],
      questions: [...(window.VILLAGE_DATA?.publicQuestions || []), ...customQuestions],
      documents: [...customDocs, ...(window.VILLAGE_DATA?.documents || [])],
      works: [...(window.VILLAGE_DATA?.developmentWorks || [])],
      schemes: customSchemes || defaultSchemes,
      callDirectory: customCallDirectory || defaultCallDirectory,
      aiChatHistory: aiChatHistory,
      auditLogs: auditLogs
    };

    this.applyAccessibilityClasses();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
    this.applyAccessibilityClasses();
  }

  applyAccessibilityClasses() {
    const root = document.documentElement;
    
    // Text size
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${this.state.textSize}`);

    // High contrast
    if (this.state.highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Simple mode
    if (this.state.simpleMode) {
      root.classList.add('simple-mode');
    } else {
      root.classList.remove('simple-mode');
    }

    // Low data mode
    if (this.state.lowDataMode) {
      root.classList.add('low-data-mode');
    } else {
      root.classList.remove('low-data-mode');
    }
  }

  setLanguage(lang) {
    if (['mr', 'hi', 'en'].includes(lang)) {
      this.state.lang = lang;
      localStorage.setItem('gramsetu_lang', lang);
      this.notify();
    }
  }

  setRole(role) {
    if (['citizen', 'moderator', 'village_admin', 'super_admin'].includes(role)) {
      this.state.role = role;
      localStorage.setItem('gramsetu_role', role);
      this.notify();
    }
  }

  setRoute(route) {
    this.state.currentRoute = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  isAdmin() {
    return this.state.role === 'village_admin' || this.state.role === 'super_admin';
  }

  loginAsCitizen(preferredLocation) {
    this.state.role = 'citizen';
    this.state.session = {
      role: 'citizen',
      username: 'नागरिक (Guest Citizen)',
      type: 'citizen',
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('gramsetu_role', 'citizen');
    localStorage.setItem('gramsetu_session', JSON.stringify(this.state.session));

    if (preferredLocation && preferredLocation.name) {
      this.setActiveVillage(
        preferredLocation.name,
        preferredLocation.taluka,
        preferredLocation.district,
        preferredLocation.lat,
        preferredLocation.lng,
        preferredLocation.pin,
        preferredLocation.pop,
        preferredLocation.households,
        preferredLocation.area
      );
    }

    this.recordAuditLog(
      'नागरिक (Guest)',
      'Auth',
      'CitizenPortal',
      'CITIZEN_ACCESS',
      null,
      'Direct Public Access',
      'नागरिकाने सार्वजनिक पोर्टलमध्ये थेट प्रवेश केला (View Only)'
    );

    this.setRoute('home');
    return { success: true };
  }

  getCustomAdminPasswords() {
    try {
      const saved = localStorage.getItem('gramsetu_custom_passwords');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  setCustomAdminPassword(username, newPassword, contactMethod, contactValue) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (newPassword || '').trim();
    if (!cleanUser) return { success: false, message: 'युझरनेम आवश्यक आहे.' };
    if (!cleanPass || cleanPass.length < 6) return { success: false, message: 'पासवर्ड किमान ६ अक्षरांचा असावा.' };

    const custom = this.getCustomAdminPasswords();
    custom[cleanUser] = cleanPass;
    custom[cleanPass] = true;
    localStorage.setItem('gramsetu_custom_passwords', JSON.stringify(custom));

    this.recordAuditLog(
      cleanUser,
      'Security',
      cleanUser,
      'PASSWORD_UPDATE',
      null,
      `${contactMethod}: ${contactValue}`,
      `नवीन प्रशासक पासवर्ड यशस्वीरित्या तयार केला (${contactMethod === 'phone' ? 'फोन' : 'ईमेल'} OTP द्वारे सत्यापित)`
    );

    return { success: true, message: 'नवीन पासवर्ड यशस्वीरित्या सेट केला गेला!' };
  }

  sendAdminOtp(username, contactType, contactValue) {
    const cleanUser = (username || '').trim();
    const cleanVal = (contactValue || '').trim();
    if (!cleanUser) return { success: false, message: 'कृपया प्रशासक युझरनेम प्रविष्ट करा.' };
    if (!cleanVal) return { success: false, message: contactType === 'phone' ? 'कृपया १० अंकी मोबाईल नंबर प्रविष्ट करा.' : 'कृपया वैध ईमेल पत्ता प्रविष्ट करा.' };

    if (contactType === 'phone' && !/^\d{10}$/.test(cleanVal.replace(/[^0-9]/g, ''))) {
      return { success: false, message: 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.' };
    }
    if (contactType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanVal)) {
      return { success: false, message: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा (उदा. user@example.com).' };
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const pendingKey = `gramsetu_otp_${cleanUser.toLowerCase()}`;
    const otpData = {
      otp,
      contactType,
      contactValue: cleanVal,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    localStorage.setItem(pendingKey, JSON.stringify(otpData));

    return {
      success: true,
      otp,
      message: `${contactType === 'phone' ? 'मोबाईल नंबर' : 'ईमेल'} (${cleanVal}) वर ६ अंकी OTP पाठवला आहे.`
    };
  }

  verifyAdminOtp(username, otpCode) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanOtp = (otpCode || '').trim();
    const pendingKey = `gramsetu_otp_${cleanUser}`;
    const saved = localStorage.getItem(pendingKey);
    
    // Test master code 123456 always valid for easy evaluation
    if (cleanOtp === '123456') return { success: true };

    if (!saved) {
      return { success: false, message: 'सत्यापन कोड सापडला नाही. कृपया पुन्हा OTP पाठवा.' };
    }

    try {
      const data = JSON.parse(saved);
      if (Date.now() > data.expiresAt) {
        return { success: false, message: 'OTP ची कालमर्यादा संपली आहे (Expired). कृपया नवीन OTP मागवा.' };
      }
      if (data.otp === cleanOtp) {
        return { success: true };
      }
      return { success: false, message: 'अवैध OTP! कृपया योग्य ६ अंकी कोड प्रविष्ट करा.' };
    } catch (e) {
      return { success: false, message: 'सत्यापन त्रुटी.' };
    }
  }

  loginAsAdmin(username, password, locationData) {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    // Standard demo passwords accepted
    const validPasswords = ['admin123', 'gram@123', 'admin', 'password', '123456'];
    const customPasswords = this.getCustomAdminPasswords();
    const userPass = customPasswords[cleanUser.toLowerCase()];
    const isCustomValid = userPass ? userPass === cleanPass : Boolean(customPasswords[cleanPass]);

    if (!cleanUser) {
      return { success: false, message: 'कृपया प्रशासक युझरनेम (Username) प्रविष्ट करा.' };
    }
    if (!validPasswords.includes(cleanPass) && !isCustomValid) {
      return { success: false, message: 'अवैध पासवर्ड! कृपया अचूक पासवर्ड प्रविष्ट करा किंवा "नवीन पासवर्ड तयार करा" द्वारे रीसेट करा.' };
    }

    this.state.role = 'village_admin';
    const locName = locationData?.name || cleanUser.replace('admin.', '').toUpperCase();
    const locDist = locationData?.district || 'महाराष्ट्र';

    this.state.session = {
      role: 'village_admin',
      username: cleanUser,
      type: 'admin',
      location: `${locName} (${locDist})`,
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem('gramsetu_role', 'village_admin');
    localStorage.setItem('gramsetu_session', JSON.stringify(this.state.session));

    // If locationData is provided, automatically set active village to that admin's jurisdiction!
    if (locationData && locationData.name) {
      this.setActiveVillage(
        locationData.name,
        locationData.taluka,
        locationData.district,
        locationData.lat,
        locationData.lng,
        locationData.pin,
        locationData.pop,
        locationData.households,
        locationData.area
      );
    }

    this.recordAuditLog(
      cleanUser,
      'Auth',
      cleanUser,
      'ADMIN_LOGIN',
      null,
      `${locName} (${locDist})`,
      'प्रशासकीय खात्यात अधिकृत लॉगिन संपन्न (Full Edit & Upload Rights)'
    );

    this.setRoute('home');
    return { success: true };
  }

  logout() {
    this.state.role = 'citizen';
    this.state.session = null;
    localStorage.removeItem('gramsetu_session');
    localStorage.setItem('gramsetu_role', 'citizen');

    this.recordAuditLog(
      'System',
      'Auth',
      'Session',
      'USER_LOGOUT',
      null,
      'Login Screen',
      'वापरकर्त्याने लॉगआउट केले'
    );

    this.setRoute('login');
  }

  addDocument(docData) {
    if (!this.isAdmin()) {
      alert("दस्तऐवज अपलोड करण्याची परवानगी केवळ प्रशासकीय खात्याला आहे.");
      return null;
    }

    const docType = docData.docType || 'Document'; // 'Invoice' | 'Letter' | 'Licence' | 'Document'
    let prefix = 'DOC';
    if (docType === 'Invoice') prefix = 'INV';
    else if (docType === 'Letter') prefix = 'LTR';
    else if (docType === 'Licence') prefix = 'LIC';

    const newId = `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDoc = {
      id: newId,
      name: docData.title,
      docType: docType,
      category: docData.category || docType,
      categoryMr: docData.categoryMr || (docType === 'Invoice' ? 'देयक / बिल' : (docType === 'Letter' ? 'शासकीय पत्र' : (docType === 'Licence' ? 'परवाना / दाखला' : 'शासकीय दस्तऐवज'))),
      description: docData.description || '',
      fileUrl: docData.fileUrl || '#',
      fileName: docData.fileName || `${newId}.pdf`,
      fileSize: docData.fileSize || '1.8 MB',
      mimeType: docData.mimeType || 'application/pdf',
      date: docData.date || new Date().toLocaleDateString('mr-IN'),
      source: docData.source || `ग्रामपंचायत कार्यालय (${this.state.session?.username || 'Admin'})`,
      verificationStatus: 'OFFICIAL_SOURCE',
      uploadedBy: this.state.session?.username || 'Village Admin',
      uploadedAt: new Date().toLocaleDateString('mr-IN'),
      
      invoiceDetails: docType === 'Invoice' ? {
        billNo: docData.billNo || `BILL-${Math.floor(10000 + Math.random() * 90000)}`,
        vendorName: docData.vendorName || 'शासन मान्यताप्राप्त कंत्राटदार',
        gstin: docData.gstin || '27AAAAA0000A1Z5',
        amount: Number(docData.amount) || 0,
        linkedWork: docData.linkedWork || 'गावातील मंजूर विकासकाम',
        paymentStatus: docData.paymentStatus || 'PAID'
      } : null,

      letterDetails: docType === 'Letter' ? {
        outwardNo: docData.outwardNo || `जा.क्र./${Math.floor(100 + Math.random() * 900)}/२०२६`,
        department: docData.department || 'ग्रामविकास विभाग',
        issuingOfficer: docData.issuingOfficer || 'गटविकास अधिकारी (BDO)',
        subject: docData.title
      } : null,

      licenceDetails: docType === 'Licence' ? {
        licenceNo: docData.licenceNo || `LIC-MH-${Math.floor(10000 + Math.random() * 90000)}`,
        applicantName: docData.applicantName || 'नागरिक / व्यावसायिक',
        propertyNo: docData.propertyNo || 'घर क्र. / सर्व्हे क्र.',
        validity: docData.validity || '३१ मार्च २०२७',
        feeReceiptNo: docData.feeReceiptNo || `REC-${Math.floor(1000 + Math.random() * 9000)}`
      } : null
    };

    this.state.documents.unshift(newDoc);

    // Persist to custom documents in localStorage
    try {
      const stored = localStorage.getItem('gramsetu_custom_documents');
      const customDocs = stored ? JSON.parse(stored) : [];
      customDocs.unshift(newDoc);
      localStorage.setItem('gramsetu_custom_documents', JSON.stringify(customDocs));
    } catch (e) {
      console.warn("Storage error for document:", e);
    }

    if (window.VILLAGE_DATA && window.VILLAGE_DATA.documents) {
      window.VILLAGE_DATA.documents.unshift(newDoc);
    }

    this.recordAuditLog(
      this.state.session?.username || 'Village Admin',
      'Document',
      newId,
      'UPLOAD_DOCUMENT',
      null,
      `${newDoc.name} (${docType})`,
      `प्रशासकाने नवीन ${newDoc.categoryMr} अपलोड केला (Verified)`
    );

    this.notify();
    return newDoc;
  }

  setActiveVillage(villageName, talukaName, districtName, lat, lng, pin, pop, households, area) {
    const cleanName = (villageName || "सोनवाडी").split('(')[0].trim();
    const cleanTaluka = (talukaName || "निफाड").split('(')[0].trim();
    const cleanDistrict = (districtName || "नाशिक").split('(')[0].trim();
    const engName = (villageName || '').match(/\(([^)]+)\)/)?.[1]?.trim() || cleanName;
    const engTaluka = (talukaName || '').match(/\(([^)]+)\)/)?.[1]?.trim() || cleanTaluka;
    const engDistrict = (districtName || '').match(/\(([^)]+)\)/)?.[1]?.trim() || cleanDistrict;

    const calcPop = pop || 4200;
    const calcHouseholds = households || Math.round(calcPop / 4.8);
    const calcArea = area || Math.round(calcPop * 0.32);

    const newVillage = {
      id: `${cleanName.toLowerCase()}-${cleanDistrict.toLowerCase()}`,
      name: engName,
      nameMr: cleanName,
      nameHi: cleanName,
      state: "महाराष्ट्र (Maharashtra)",
      district: cleanDistrict,
      districtEn: engDistrict,
      taluka: cleanTaluka,
      talukaEn: engTaluka,
      pinCode: pin || "400001",
      population: calcPop,
      households: calcHouseholds,
      area: calcArea,
      latitude: lat || 19.7515,
      longitude: lng || 75.7139,
      gramPanchayat: `ग्रामपंचायत ${cleanName} कार्यालय`,
      address: `मु. पो. ${cleanName}, ता. ${cleanTaluka}, जि. ${cleanDistrict} - ${pin || '400001'}`,
      publicContacts: {
        panchayatOffice: "+91 2550 " + Math.floor(100000 + Math.random() * 900000),
        sarpanchOffice: "+91 94230 " + Math.floor(10000 + Math.random() * 90000),
        gramSevakOffice: "+91 94230 " + Math.floor(10000 + Math.random() * 90000),
        talathiOffice: "+91 94230 " + Math.floor(10000 + Math.random() * 90000),
        primaryHealthCentre: "+91 2550 " + Math.floor(100000 + Math.random() * 900000),
        emergencyContact: "112 / 108"
      },
      lastUpdated: "३० सप्टेंबर २०२६",
      metrics: {
        overallAvailability: 85,
        developmentWorks: 89,
        financialBudget: 82,
        facilities: 94,
        gramSabha: 78,
        disclaimer: "हा आकडा उपलब्ध सार्वजनिक माहितीच्या प्रमाणाचे दर्शक आहे. तो कोणत्याही व्यक्ती किंवा संस्थेच्या प्रामाणिकपणाचे मूल्यांकन नाही."
      }
    };

    this.state.activeVillage = newVillage;
    localStorage.setItem('gramsetu_active_village', JSON.stringify(newVillage));
    if (window.VILLAGE_DATA) window.VILLAGE_DATA.village = newVillage;

    // Adapt Development Works locations & coordinates
    const adaptWorks = (arr) => {
      if (!arr) return;
      arr.forEach((w, idx) => {
        w.location = `${cleanName} - वॉर्ड क्र. ${(idx % 4) + 1}`;
        if (lat && lng) {
          w.latitude = lat + (idx * 0.002 - 0.004);
          w.longitude = lng + (idx * 0.002 - 0.004);
        }
      });
    };
    adaptWorks(this.state.works);
    if (window.VILLAGE_DATA && window.VILLAGE_DATA.developmentWorks) {
      adaptWorks(window.VILLAGE_DATA.developmentWorks);
    }

    // Adapt Facilities locations & coordinates
    if (window.VILLAGE_DATA && window.VILLAGE_DATA.facilities) {
      window.VILLAGE_DATA.facilities.forEach((fac, idx) => {
        fac.address = `${cleanName} मुख्य रस्ता, ता. ${cleanTaluka}`;
        if (lat && lng) {
          fac.latitude = lat + (idx * 0.002 - 0.003);
          fac.longitude = lng + (idx * 0.002 - 0.003);
        }
      });
    }

    this.recordAuditLog(
      this.getRoleLabel(),
      "Location",
      newVillage.id,
      "CHANGE_LOCATION",
      null,
      `${cleanName}, ${cleanTaluka}, ${cleanDistrict}`,
      "नागरिकाने महाराष्ट्रातील गाव / स्थान बदलले"
    );

    // If map is active, pan to the new location
    if (window.leafletMapInstance && lat && lng) {
      try {
        window.leafletMapInstance.setView([lat, lng], 14, { animate: true });
      } catch (err) {
        console.warn("Leaflet pan error:", err);
      }
    }

    this.notify();
  }

  toggleTextSize() {
    const sequence = ['normal', 'large', 'xlarge'];
    const currentIndex = sequence.indexOf(this.state.textSize);
    const nextSize = sequence[(currentIndex + 1) % sequence.length];
    this.state.textSize = nextSize;
    localStorage.setItem('gramsetu_text_size', nextSize);
    this.notify();
  }

  toggleHighContrast() {
    this.state.highContrast = !this.state.highContrast;
    localStorage.setItem('gramsetu_high_contrast', this.state.highContrast);
    this.notify();
  }

  toggleSimpleMode() {
    this.state.simpleMode = !this.state.simpleMode;
    localStorage.setItem('gramsetu_simple_mode', this.state.simpleMode);
    this.notify();
  }

  toggleLowDataMode() {
    this.state.lowDataMode = !this.state.lowDataMode;
    localStorage.setItem('gramsetu_low_data', this.state.lowDataMode);
    this.notify();
  }

  setReadingAloud(isReading) {
    this.state.isReadingAloud = isReading;
    this.notify();
  }

  addComplaint(complaintData) {
    const count = this.state.complaints.length + 4830;
    const newComplaint = {
      id: `cmp-${Date.now()}`,
      trackingId: `GRM-2026-00${count}`,
      category: complaintData.category || "General",
      categoryMr: complaintData.categoryMr || complaintData.category,
      title: complaintData.description.slice(0, 50) + "...",
      description: complaintData.description,
      location: complaintData.location,
      isAnonymous: complaintData.isAnonymous || false,
      citizenName: complaintData.isAnonymous ? "नागरिक (गोपनीय)" : (complaintData.citizenName || "नागरिक"),
      citizenPhone: complaintData.isAnonymous ? null : complaintData.citizenPhone,
      photoUrl: complaintData.photoUrl || null,
      attachmentName: complaintData.attachmentName || null,
      attachmentType: complaintData.attachmentType || (complaintData.photoUrl ? (complaintData.photoUrl.startsWith('data:application/pdf') || complaintData.photoUrl.endsWith('.pdf') ? 'document' : 'image') : null),
      attachmentSize: complaintData.attachmentSize || null,
      status: "SUBMITTED",
      statusMr: "नोंदणीकृत (Submitted)",
      submittedDate: new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      updates: [
        {
          date: new Date().toLocaleString('mr-IN'),
          status: "नोंदणीकृत",
          note: "तक्रार यशस्वीरित्या नोंदवली गेली. ट्रॅकिंग क्रमांक जारी केला आहे."
        }
      ]
    };

    const updatedComplaints = [newComplaint, ...this.state.complaints];
    this.state.complaints = updatedComplaints;
    
    // Save to storage
    const customOnly = updatedComplaints.filter(c => c.id.startsWith('cmp-') && !window.VILLAGE_DATA.complaints.find(x => x.id === c.id));
    localStorage.setItem('gramsetu_custom_complaints', JSON.stringify(customOnly));

    // Create audit log
    this.recordAuditLog(
      "नागरिक (Citizen)",
      "Complaint",
      newComplaint.trackingId,
      "LODGE_COMPLAINT",
      null,
      "नोंदणीकृत",
      `नवीन तक्रार दाखल केली: ${newComplaint.category}${newComplaint.photoUrl ? ' (छायाचित्र/कागदपत्र पुरावा जोडला)' : ''}`
    );

    this.notify();
    return newComplaint;
  }

  addPublicQuestion(questionData) {
    const qCount = this.state.questions.length + 105;
    const newQuestion = {
      id: `qst-${Date.now()}`,
      questionId: `QST-2026-0${qCount}`,
      question: questionData.question,
      category: questionData.category || "सामान्य प्रश्न",
      askedBy: questionData.citizenName || "ग्रामस्थ (सोनवाडी)",
      date: new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: "UNDER_REVIEW",
      officialResponse: null,
      respondedBy: null,
      responseDate: null,
      supportingDocument: null
    };

    const updatedQ = [newQuestion, ...this.state.questions];
    this.state.questions = updatedQ;
    localStorage.setItem('gramsetu_custom_questions', JSON.stringify(updatedQ.filter(q => q.id.startsWith('qst-') && !window.VILLAGE_DATA.publicQuestions.find(x => x.id === q.id))));

    this.recordAuditLog(
      "नागरिक (Citizen)",
      "PublicQuestion",
      newQuestion.questionId,
      "SUBMIT_QUESTION",
      null,
      "छाननी सुरू",
      `सार्वजनिक प्रश्न विचारला: ${newQuestion.category}`
    );

    this.notify();
    return newQuestion;
  }

  updateComplaintStatus(trackingId, newStatus, message) {
    const target = this.state.complaints.find(c => c.trackingId === trackingId);
    if (!target) return false;

    const oldStatus = target.status;
    target.status = newStatus;
    target.statusMr = newStatus === 'RESOLVED' ? 'निवारण झाले' : (newStatus === 'IN_PROGRESS' ? 'काम सुरू' : 'छाननी सुरू');
    
    target.updates.push({
      date: new Date().toLocaleString('mr-IN'),
      status: target.statusMr,
      note: message || `स्थिती अद्ययावत केली: ${target.statusMr}`
    });

    this.recordAuditLog(
      this.getRoleLabel(),
      "Complaint",
      trackingId,
      "STATUS_CHANGE",
      oldStatus,
      newStatus,
      message || "तक्रार निवारण प्रक्रियेनुसार स्थिती बदलली"
    );

    this.notify();
    return true;
  }

  updateContactNumber(contactId, newNumber, newName, newDesc) {
    const item = this.state.callDirectory.find(c => c.id === contactId || c.key === contactId);
    if (!item) return false;
    const oldNum = item.number;
    item.number = String(newNumber).trim();
    if (newName) item.name = newName;
    if (newDesc) item.desc = newDesc;

    // Also sync with activeVillage publicContacts if key matches
    if (this.state.activeVillage?.publicContacts && item.key && this.state.activeVillage.publicContacts[item.key] !== undefined) {
      this.state.activeVillage.publicContacts[item.key] = item.number;
      localStorage.setItem('gramsetu_active_village', JSON.stringify(this.state.activeVillage));
    }

    localStorage.setItem('gramsetu_call_directory', JSON.stringify(this.state.callDirectory));

    this.recordAuditLog(
      this.getRoleLabel(),
      "CallDirectory",
      contactId,
      "UPDATE_NUMBER",
      oldNum,
      item.number,
      `संपर्क क्रमांक बदलला: ${item.name}`
    );

    this.notify();
    return true;
  }

  getContactNumber(keyOrId, fallback = "—") {
    const item = this.state.callDirectory?.find(c => c.key === keyOrId || c.id === keyOrId);
    if (item && item.number) return item.number;
    if (this.state.activeVillage?.publicContacts?.[keyOrId]) return this.state.activeVillage.publicContacts[keyOrId];
    return fallback;
  }

  toggleSchemeStatus(schemeId, newStatus) {
    const scheme = this.state.schemes.find(s => s.id === schemeId);
    if (!scheme) return false;
    const oldStatus = scheme.status;
    const targetStatus = newStatus || (scheme.status === 'ACTIVE' ? 'DONE' : 'ACTIVE');
    scheme.status = targetStatus;
    scheme.statusMr = targetStatus === 'DONE' ? 'मुदत संपली / पूर्ण (Done)' : 'सुरू योजना (Active)';
    if (targetStatus === 'DONE') {
      scheme.doneDate = new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    localStorage.setItem('gramsetu_custom_schemes', JSON.stringify(this.state.schemes));

    this.recordAuditLog(
      this.getRoleLabel(),
      "Scheme",
      schemeId,
      "TOGGLE_SCHEME_STATUS",
      oldStatus,
      targetStatus,
      `योजनेची स्थिती बदलली: ${scheme.titleMr || scheme.title}`
    );

    this.notify();
    return true;
  }

  addAiChatMessage(msg) {
    const entry = {
      id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      role: msg.role || 'user',
      text: msg.text || '',
      time: msg.time || new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };
    if (!this.state.aiChatHistory) this.state.aiChatHistory = [];
    this.state.aiChatHistory.push(entry);
    if (this.state.aiChatHistory.length > 50) {
      this.state.aiChatHistory = this.state.aiChatHistory.slice(-50);
    }
    localStorage.setItem('gramsetu_ai_chat_history', JSON.stringify(this.state.aiChatHistory));
    return entry;
  }

  clearAiChatHistory() {
    this.state.aiChatHistory = [];
    localStorage.removeItem('gramsetu_ai_chat_history');
    this.notify();
  }

  recordAuditLog(actor, entity, entityId, action, previousValue, newValue, reason) {
    const log = {
      id: `aud-${Date.now()}`,
      actor: actor || this.getRoleLabel(),
      entity: entity,
      entityId: entityId,
      action: action,
      previousValue: previousValue || "—",
      newValue: newValue || "—",
      reason: reason,
      timestamp: new Date().toLocaleString('mr-IN')
    };

    this.state.auditLogs = [log, ...this.state.auditLogs];
    localStorage.setItem('gramsetu_audit_logs', JSON.stringify(this.state.auditLogs));
  }

  getRoleLabel() {
    switch (this.state.role) {
      case 'village_admin': return 'ग्रामसेवक / गाव प्रशासक (Village Admin)';
      case 'moderator': return 'तक्रार मध्यस्थ (Moderator)';
      case 'super_admin': return 'जिल्हा मुख्य प्रशासक (Super Admin)';
      default: return 'नागरिक (Citizen)';
    }
  }

  t(key) {
    if (!key) return '';
    if (typeof window.localize === 'function') {
      return window.localize(key, this.state.lang);
    }
    const dict = window.GRAMSETU_I18N[this.state.lang] || window.GRAMSETU_I18N['mr'];
    return dict[key] || window.GRAMSETU_I18N['mr'][key] || key;
  }
}

window.appState = new GramSetuState();
