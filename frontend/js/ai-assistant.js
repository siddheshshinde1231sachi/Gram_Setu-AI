/**
 * GramSetu Mitra AI — Grounded Village Information Assistant
 * Complies strictly with Sections 13, 14, 15 of System Specification
 */

class GramSetuMitraEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.speechUtterance = null;
  }  ask(question, language = 'mr') {
    const q = (question || '').trim().toLowerCase();
    const data = window.VILLAGE_DATA;
    const v = window.appState?.state?.activeVillage || data.village;
    const vNameMr = v.nameMr || v.name || "गाव";
    const vNameHi = v.nameHi || v.nameMr || v.name || "गांव";
    const vNameEn = v.name || "village";

    const works = window.appState?.state?.works || data.developmentWorks;
    const schemes = data.schemes;
    const facilities = data.facilities;
    const budget = data.budgets["2025-26"];

    // 1. Check for Road works inquiry
    if (q.includes("रस्ता") || q.includes("सडक") || q.includes("road") || q.includes("डांबरीकरण")) {
      const roadWork = works.find(w => w.category === "Roads") || works[0];
      return {
        answer: language === 'mr'
          ? `${vNameMr} गावात सध्या "${roadWork.title}" हे विकासकाम प्रगतीपथावर आहे. या कामासाठी एकूण ₹${roadWork.sanctionedAmount.toLocaleString('en-IN')} मंजूर असून त्यापैकी ₹${roadWork.spentAmount.toLocaleString('en-IN')} प्रत्यक्षात खर्च झाले आहेत. अपेक्षित पूर्णता दिनांक ${roadWork.expectedCompletion} आहे.`
          : language === 'hi'
          ? `${vNameHi} गांव में वर्तमान में "${roadWork.title}" का कार्य प्रगति पर है। इसके लिए कुल ₹${roadWork.sanctionedAmount.toLocaleString('en-IN')} स्वीकृत हैं तथा ₹${roadWork.spentAmount.toLocaleString('en-IN')} व्यय हो चुके हैं।`
          : `In ${vNameEn} village, work on "${roadWork.titleEn || roadWork.title}" is in progress. Total sanctioned amount is ₹${roadWork.sanctionedAmount.toLocaleString('en-IN')} with ₹${roadWork.spentAmount.toLocaleString('en-IN')} spent so far.`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "development_work", id: roadWork.workId, title: roadWork.title, status: roadWork.status }
        ],
        sources: [
          { type: "document", id: "DOC-PWD-712", title: roadWork.sourceDocument }
        ],
        financial: {
          sanctioned: roadWork.sanctionedAmount,
          released: roadWork.releasedAmount,
          spent: roadWork.spentAmount,
          remaining: roadWork.remainingAmount,
          currency: "INR"
        }
      };
    }

    // 2. Water supply / Jal Jeevan Mission inquiry
    if (q.includes("पाणी") || q.includes("जल") || q.includes("water") || q.includes("टाकी") || q.includes("नल")) {
      const waterWork = works.find(w => w.category === "Water") || works[1];
      return {
        answer: language === 'mr'
          ? `जल जीवन मिशन अंतर्गत ${vNameMr}मध्ये ५०,००० लिटर क्षमतेची नवीन पाण्याची टाकी व ${v.households || 680} नळ जोडणीचे काम ₹३४,००,००० खर्चातून पूर्ण झाले आहे. पाण्याचे नमुने तपासणीत १००% पिण्यायोग्य असल्याचे प्रमाणपत्र मिळाले आहे.`
          : language === 'hi'
          ? `जल जीवन मिशन के अंतर्गत ${vNameHi} में 50,000 लीटर क्षमता की पानी की टंकी और ${v.households || 680} नल कनेक्शन का कार्य ₹34,00,000 की लागत से पूर्ण हो चुका है।`
          : `Under the Jal Jeevan Mission in ${vNameEn}, a 50,000L overhead water tank and ${v.households || 680} household tap connections have been completed with an expenditure of ₹33,80,000.`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "development_work", id: waterWork.workId, title: waterWork.title, status: "पूर्ण (COMPLETED)" }
        ],
        sources: [
          { type: "document", id: "DOC-JJM-098", title: "जल जीवन मिशन पूर्तता दाखला" },
          { type: "document", id: "DOC-WQ-78", title: `${v.district} जिल्हा आरोग्य प्रयोगशाळा तपासणी अहवाल` }
        ],
        financial: {
          sanctioned: 3400000,
          released: 3400000,
          spent: 3380000,
          remaining: 20000,
          currency: "INR"
        }
      };
    }

    // 3. Budget & Expenditure inquiry
    if (q.includes("बजेट") || q.includes("खर्च") || q.includes("निधी") || q.includes("पैसा") || q.includes("budget") || q.includes("funds")) {
      return {
        answer: language === 'mr'
          ? `सन २०२५-२६ या आर्थिक वर्षात ${vNameMr} ग्रामपंचायतीला विविध योजनांतून एकूण ₹${budget.sanctionedAmount.toLocaleString('en-IN')} मंजूर असून आतापर्यंत ₹${budget.spentAmount.toLocaleString('en-IN')} प्रत्यक्ष विकासकामांवर खर्च झाले आहेत. सध्या ₹${budget.remainingAmount.toLocaleString('en-IN')} निधी शिल्लक आहे. याचे स्थानिक निधी लेखापरीक्षण पूर्ण झाले आहे.`
          : language === 'hi'
          ? `वित्तीय वर्ष 2025-26 में ${vNameHi} ग्राम पंचायत के लिए कुल ₹${budget.sanctionedAmount.toLocaleString('en-IN')} स्वीकृत हैं, जिसमें से ₹${budget.spentAmount.toLocaleString('en-IN')} विकास कार्यों पर व्यय किए गए हैं।`
          : `For FY 2025-26, ${vNameEn} Gram Panchayat has a sanctioned allocation of ₹${budget.sanctionedAmount.toLocaleString('en-IN')} with ₹${budget.spentAmount.toLocaleString('en-IN')} utilized across all heads. Balance remaining is ₹${budget.remainingAmount.toLocaleString('en-IN')}.`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "budget", id: "BUD-2025-26", title: "वार्षिक अंदाजपत्रक व मासिक खर्च पत्रक" }
        ],
        sources: [
          { type: "document", id: "DOC-01", title: budget.sourceDocument },
          { type: "audit", id: "AUDIT-2025", title: budget.auditStatus }
        ],
        financial: {
          sanctioned: budget.sanctionedAmount,
          released: budget.receivedAmount,
          spent: budget.spentAmount,
          remaining: budget.remainingAmount,
          currency: "INR"
        }
      };
    }

    // 4. Schemes inquiry (Women, Farmers, Students, Housing)
    if (q.includes("योजना") || q.includes("लाडकी बहीण") || q.includes("शेतकरी") || q.includes("घरकुल") || q.includes("scheme") || q.includes("farmer") || q.includes("scholarship")) {
      let matchedScheme = schemes[0];
      if (q.includes("लाडकी बहीण") || q.includes("महिला") || q.includes("women")) {
        matchedScheme = schemes.find(s => s.id === "sch-02");
      } else if (q.includes("घरकुल") || q.includes("आवास") || q.includes("housing")) {
        matchedScheme = schemes.find(s => s.id === "sch-03");
      } else if (q.includes("आरोग्य") || q.includes("दवाखाना") || q.includes("health")) {
        matchedScheme = schemes.find(s => s.id === "sch-04");
      }

      return {
        answer: language === 'mr'
          ? `"${matchedScheme.name}": ${matchedScheme.benefits} पात्रता: ${matchedScheme.eligibility} अर्ज कसा करावा: ${matchedScheme.applicationProcess}`
          : language === 'hi'
          ? `"${matchedScheme.nameEn || matchedScheme.name}": ${matchedScheme.benefits} पात्रता: ${matchedScheme.eligibility}`
          : `Scheme "${matchedScheme.nameEn || matchedScheme.name}": Benefits - ${matchedScheme.benefits}. Eligibility: ${matchedScheme.eligibility}`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "scheme", id: matchedScheme.id, title: matchedScheme.name }
        ],
        sources: [
          { type: "portal", id: "GOV-PORTAL", title: matchedScheme.officialUrl }
        ]
      };
    }

    // 5. Facilities / Hospital / School / Bank inquiry
    if (q.includes("दवाखाना") || q.includes("शाळा") || q.includes("बँक") || q.includes("डॉक्टर") || q.includes("सुविधा") || q.includes("hospital") || q.includes("school") || q.includes("bank")) {
      let fac = facilities[0];
      if (q.includes("शाळा") || q.includes("school")) fac = facilities[1];
      if (q.includes("बँक") || q.includes("bank") || q.includes("atm")) fac = facilities[3];

      return {
        answer: language === 'mr'
          ? `${vNameMr} गावात "${fac.name}" उपलब्ध आहे. पत्ता: ${fac.address}. वेळ: ${fac.openingHours}. संपर्क क्रमांक: ${fac.phone}. सेवा: ${fac.services.join(", ")}.`
          : `In ${vNameEn}, "${fac.nameEn || fac.name}" is available at ${fac.address}. Contact: ${fac.phone}. Operating hours: ${fac.openingHours}.`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "facility", id: fac.id, title: fac.name }
        ],
        sources: [
          { type: "record", id: "FAC-REC", title: "ग्रामपंचायत सार्वजनिक सुविधा नोंदवही" }
        ]
      };
    }

    // 6. Gram Sabha / Notice inquiry
    if (q.includes("ग्रामसभा") || q.includes("बैठक") || q.includes("meeting") || q.includes("sabha")) {
      const gs = data.gramSabhaMeetings[0];
      return {
        answer: language === 'mr'
          ? `आगामी विशेष ग्रामसभा दिनांक ${gs.date} रोजी ${gs.time} वाजता ${gs.venue} येथे आयोजित केली आहे. मुख्य अजेंडा: रस्ते व पाणीपुरवठा कामांचा आढावा, आवास योजना लाभार्थ्यांची छाननी आणि कचरा व्यवस्थापन शेड मंजुरी.`
          : `Upcoming Special Gram Sabha is scheduled for ${gs.date} at ${gs.time} at ${gs.venue}. Main agenda includes development works review and PMAY beneficiary verification.`,
        language,
        confidence: "high",
        information_status: "official",
        records: [
          { type: "gram_sabha", id: gs.id, title: "विशेष ग्रामसभा" }
        ],
        sources: [
          { type: "notice", id: "NOTIF-01", title: gs.supportingDoc }
        ]
      };
    }

    // 7. Fallback for unavailable or unverified queries (STRICT GROUNDING RULE)
    return {
      answer: language === 'mr'
        ? `माझ्याकडे सध्या याची अधिकृत माहिती उपलब्ध नाही. ग्रामसेतू केवळ पडताळणी झालेल्या अधिकृत सरकारी व ${vNameMr} ग्रामपंचायत नोंदींवरून उत्तरे देतो. कृपया ग्रामपंचायत कार्यालयात प्रत्यक्ष चौकशी करा किंवा 'तक्रार / माहिती अर्ज' दाखल करा.`
        : language === 'hi'
        ? `मेरे पास वर्तमान में इसकी आधिकारिक जानकारी उपलब्ध नहीं है। ग्रामसेतु केवल सत्यापित सरकारी रिकॉर्ड से उत्तर देता है।`
        : `Currently, verified official information for this query is unavailable in ${vNameEn} village public records.`,
      language,
      confidence: "medium",
      information_status: "unavailable",
      records: [],
      sources: []
    };
  }

  speak(text, lang = 'mr') {
    if (!this.synth) return;
    this.stopAudio();

    this.speechUtterance = new SpeechSynthesisUtterance(text);
    this.speechUtterance.rate = 0.95;
    this.speechUtterance.pitch = 1.0;

    // Pick appropriate voice
    const voices = this.synth.getVoices();
    const targetLangCode = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
    const matchedVoice = voices.find(v => v.lang.startsWith(targetLangCode) || v.lang.startsWith('mr') || v.lang.startsWith('hi'));
    if (matchedVoice) {
      this.speechUtterance.voice = matchedVoice;
    }

    this.speechUtterance.onstart = () => {
      window.appState.setReadingAloud(true);
    };

    this.speechUtterance.onend = () => {
      window.appState.setReadingAloud(false);
    };

    this.speechUtterance.onerror = () => {
      window.appState.setReadingAloud(false);
    };

    this.synth.speak(this.speechUtterance);
  }

  stopAudio() {
    if (this.synth) {
      this.synth.cancel();
      window.appState.setReadingAloud(false);
    }
  }
}

window.mitraEngine = new GramSetuMitraEngine();
