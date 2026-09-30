# 🌾 GramSetu (ग्रामसेतू) — AI-Powered Digital Village Information, Transparency & Public Services Platform

> **“गावातील प्रत्येक नागरिकाला आपल्या गावाबद्दलची सार्वजनिक माहिती सहज समजली पाहिजे.”**  
> *Every villager should know what work is happening, how much money was sanctioned, how much was spent, what facilities exist, which government schemes may help them, what official documents are available, and where to report public problems.*

---

## 🌟 Overview

**GramSetu** is an end-to-end, production-grade civic transparency and village intelligence web application designed for villages across India, starting with the reference fictional village **सोनवाडी (Sonwadi), Taluka Niphad, District Nashik, Maharashtra**.

The platform is **source-backed, evidence-based, politically neutral, accessible, multilingual, and mobile-first**.

---

## 🚀 Key Features Implemented

### 1. Village Selection & Snapshot
- Geographic hierarchy: State (महाराष्ट्र) → District (नाशिक) → Taluka (निफाड) → Village (सोनवाडी) → Gram Panchayat.
- Population (3,420), Households (680), Area (1,240 Ha), PIN (422303).
- Direct public contacts for Sarpanch, Gram Sevak, Talathi, and Health Centre.

### 2. Multilingual Support (i18n)
- **Primary:** मराठी (Marathi - simple colloquial rural Marathi).
- **Secondary:** हिंदी (Hindi) and English.
- Real-time language switcher: **मराठी | हिंदी | English**.

### 3. Development Works Tracker (`/works`)
- Active, Completed, and Approved works with search & filters.
- **Financial Cards:** Sanctioned Amount, Released Amount, Spent Amount, and Remaining Funds.
- **Milestones Timeline:** Proposal → Administrative Approval → Sanction → Started → Inspection → Completed.
- **Project Photos:** Before, During, and After photo stages with verification badges.
- **Source Citation:** Reference to official government work orders (PWD, Jal Jeevan Mission, ZP Nashik).

### 4. Budget Transparency (`/budget`)
- Multi-year financial budget viewer (FY 2025-26, 2024-25).
- Category breakdown: Roads, Water, Sanitation, Schools, Health, Street Lights, Agriculture.
- Validated relationships: `Spent <= Released <= Sanctioned`.
- Local fund audit status and official source citations.

### 5. Government Schemes Finder (`/schemes`)
- Categorized for: **Farmers (शेतकरी), Women (महिला), Students (विद्यार्थी), Senior Citizens (ज्येष्ठ नागरिक), Housing (घरकुल), Health (आरोग्य)**.
- Detailed eligibility checklist, required documents, application process, and direct official government links (MahaDBT, PMAY-G, Ladki Bahin, MJPJAY).

### 6. Facilities Directory (`/facilities`)
- 8+ essential public facilities: PHC Sub-Centre, ZP Primary Digital School, Bank of Maharashtra & 24x7 ATM, Anganwadi, Fair Price Ration Shop, Veterinary Clinic, Post Office.
- Operating hours, available services list, and 1-click phone dialers.

### 7. Interactive Village Map (`/map`)
- Interactive geospatial map with custom colored pins for works, water tanks, schools, and clinics.
- Layer toggles (Works, Health, Schools, Water).
- Offline-ready interactive SVG fallback representation.

### 8. Citizen Grievance / Complaint System (`/complaints`)
- Lodge complaints with categories: Broken road, water leakage, damaged streetlight, drainage, garbage.
- Auto-generated unique tracking ID (e.g. `GRM-2026-004821`).
- Anonymous / confidential citizen option.
- 4-stage tracking timeline: Submitted → Under Review → Assigned → Resolved.

### 9. Public Questions Portal (`/questions`)
- Citizens ask public inquiries regarding works, budgets, or schemes.
- Verified official responses signed by Gram Sevak and Sarpanch.

### 10. Document Center (`/documents`)
- Categorized repository: Budgets, Gram Sabha Minutes, Water Quality Lab Reports, Tenders, GPDP.
- Verified badges and download actions.

### 11. Gram Sabha Assembly Portal (`/gram-sabha`)
- Upcoming meeting notice, date, time, venue, and 5-point agenda.
- Past meetings with attendance counts, resolutions passed, and minutes documentation.

### 12. Information Availability Metric (Transparency Index)
- Overall score (84%) with category breakdown: Works (88%), Budget (80%), Facilities (92%), Gram Sabha (76%).
- Mandatory neutral disclaimer:  
  *“हा आकडा उपलब्ध सार्वजनिक माहितीच्या प्रमाणाचे दर्शक आहे. तो कोणत्याही व्यक्ती किंवा संस्थेच्या प्रामाणिकपणाचे मूल्यांकन नाही.”*

### 13. 🤖 GramSetu Mitra AI Assistant (`/assistant`)
- Grounded strictly in verified village public records.
- Source citations attached to every factual response.
- Clear distinction between official records and community submissions.
- Safe fallback when data is unavailable:  
  *“माझ्याकडे सध्या याची अधिकृत माहिती उपलब्ध नाही.”*
- Web Speech API integration for **Read Aloud (Voice Output)**.

### 14. Emergency 24x7 Directory (`/emergency`)
- 1-click dials for 108 Ambulance, 112 Police, Fire Brigade, Village Doctor, Sarpanch, and MSEDCL Electricity Helpline.

### 15. Admin Portal with Role-Based Access (`/admin`)
- Role switcher: **Citizen, Moderator, Village Admin, Super Admin**.
- Development Works CRUD (Add work, update spending).
- Complaint workflow management (change status to Assigned / Resolved).
- Full Audit Logging with immutable timestamp, actor, entity, and change reason.

### 16. Accessibility & Low Data Mode
- Text scaling: `Normal` → `Large` → `X-Large`.
- High Contrast Mode (WCAG compliant dark & yellow theme).
- Simple Mode for senior village residents.
- Low Data Mode (hides heavy images, disables animations for 2G/3G speeds).
- PWA manifest (`manifest.json`) and service worker (`sw.js`).

---

## 📁 Repository Structure

```text
gram-setu/
├── frontend/                          # Client-Side Application (HTML, CSS, JS, PWA)
│   ├── index.html                     # Complete Single Page Application UI
│   ├── app.css                        # Design system, themes, high contrast, typography
│   ├── manifest.json                  # PWA manifest
│   ├── sw.js                          # Offline caching service worker
│   ├── data/
│   │   ├── maharashtraLocations.js    # All 36 Districts & Talukas geospatial database
│   │   └── villageData.js             # Comprehensive dataset for Sonwadi, Nashik
│   └── js/
│       ├── i18n.js                    # Marathi (Primary), Hindi, English translations
│       ├── state.js                   # Reactive state manager, local storage persistence
│       ├── ai-assistant.js            # GramSetu Mitra grounded AI engine & voice TTS
│       └── components.js              # Full UI views, modals & real-time updates
│
├── backend/                           # Server-Side Services & Database Architecture
│   ├── package.json                   # Backend server dependencies & npm scripts
│   ├── server.js                      # Express API gateway (AI gateway, complaints API)
│   ├── .env.example                   # Backend environment template
│   ├── prisma/
│   │   └── schema.prisma              # PostgreSQL enterprise schema (21 models)
│   └── lib/
│       ├── validation/
│       │   └── schemas.ts             # Zod validation schemas for all inputs & entities
│       └── ai/
│           └── gemini.ts              # Server-side Gemini AI provider architecture
│
├── index.html                         # Root quick launcher / auto-redirect to frontend/
├── .env                               # Local secrets (strictly gitignored)
├── .env.example                       # Root environment template
├── .gitignore                         # Comprehensive ignore rules
└── README.md                          # Documentation
```

---

## 🏃 How to Run Locally

### Option 1: Instant Browser Launch (Zero Dependencies)
Simply double-click `index.html` at the project root or open `frontend/index.html` directly in any modern web browser:
```text
file:///c:/Users/Admin/Desktop/gram%20setu/index.html
```

### Option 2: Using Any Local Web Server
```bash
# Serve frontend directly:
npx serve frontend
# Or with Python:
cd frontend && python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

### Option 3: Running Backend API Server
```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Demo Roles for Testing

Navigate to **प्रशासकीय कक्ष (Admin Portal)** or use the role switcher in the top bar:
- **Citizen (नागरिक):** Submit complaints, ask public questions, browse all verified information.
- **Moderator (मध्यस्थ):** Review and update complaint statuses.
- **Village Admin (ग्रामसेवक):** Add new development works, publish notices, view audit trails.
- **Super Admin (मुख्य प्रशासक):** System configuration and complete audit logs access.

---

## ⚖️ Neutrality & Disclaimer Notice

* **DEMO / नमुना माहिती:** सर्व आकडेवारी व नावे शैक्षणिक आणि प्रात्यक्षिकासाठी तयार केलेली नमुना माहिती आहे. ही प्रत्यक्ष सरकारी आकडेवारी नाही.
* ग्रामसेतू मंच कोणत्याही राजकीय पक्षाशी संबंधित नाही. ही प्रणाली केवळ अधिकृत शासकीय व ग्रामपंचायत दस्तऐवजांच्या आधारे माहिती सादर करते.
# gram-setu_1
# tred
# Gram_Setu-AI
"# Gram_Setu-AI" 
"# Gram_Setu-AI" 
