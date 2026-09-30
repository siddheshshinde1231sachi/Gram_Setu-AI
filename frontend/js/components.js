/**
 * GramSetu — Core UI Components & View Renderers
 * Highly modular, accessible, translation-aware, and responsive
 */

window.components = {
  // 1. Accessibility Toolbar
  renderAccessibilityToolbar() {
    const s = window.appState.state;
    const t = (k) => window.appState.t(k);

    return `
      <aside aria-label="Accessibility controls" class="bg-emerald-950 text-white text-xs py-2 px-4 border-b border-emerald-900">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <!-- Text size & Modes -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-emerald-200 font-medium hidden sm:inline">सुगमता / Accessibility:</span>
            
            <button onclick="window.appState.toggleTextSize()" class="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 rounded border border-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white" title="${t('a11yTextIncrease')}">
              अ / A (${s.textSize.toUpperCase()})
            </button>

            <button onclick="window.appState.toggleHighContrast()" class="px-2.5 py-1 ${s.highContrast ? 'bg-white text-emerald-950 font-black' : 'bg-emerald-900 hover:bg-emerald-800 text-white'} rounded border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" title="${t('a11yHighContrast')}">
              🌓 ${t('a11yHighContrast')}
            </button>

            <button onclick="window.appState.toggleSimpleMode()" class="px-2.5 py-1 ${s.simpleMode ? 'bg-white text-emerald-950 font-black' : 'bg-emerald-900 hover:bg-emerald-800 text-white'} rounded border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" title="${t('a11ySimpleMode')}">
              👓 ${t('a11ySimpleMode')}
            </button>

            <button onclick="window.appState.toggleLowDataMode()" class="px-2.5 py-1 ${s.lowDataMode ? 'bg-white text-emerald-950 font-black' : 'bg-emerald-900 hover:bg-emerald-800 text-white'} rounded border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" title="${t('a11yLowData')}">
              📶 ${t('a11yLowData')}
            </button>

            ${s.isReadingAloud ? `
              <button onclick="window.mitraEngine.stopAudio()" class="px-2.5 py-1 bg-red-600 text-white rounded font-bold animate-pulse focus:outline-none">
                ⏹️ ${t('a11yStopAudio')}
              </button>
            ` : `
              <button onclick="window.mitraEngine.speak(document.querySelector('main')?.innerText || 'ग्रामसेतू मंचात आपले स्वागत आहे', '${s.lang}')" class="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded border border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" title="${t('a11yReadAloud')}">
                🔊 ${t('a11yReadAloud')}
              </button>
            `}
          </div>

          <!-- Language Switcher & Role (Bottle Green & White) -->
          <div class="flex items-center gap-3">
            <div class="flex items-center bg-emerald-900/90 rounded p-0.5 border border-emerald-800">
              <button onclick="window.appState.setLanguage('mr')" class="px-2.5 py-0.5 rounded text-xs font-bold transition ${s.lang === 'mr' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'}">
                मराठी
              </button>
              <button onclick="window.appState.setLanguage('hi')" class="px-2.5 py-0.5 rounded text-xs font-bold transition ${s.lang === 'hi' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'}">
                हिंदी
              </button>
              <button onclick="window.appState.setLanguage('en')" class="px-2.5 py-0.5 rounded text-xs font-bold transition ${s.lang === 'en' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'}">
                English
              </button>
            </div>

            <!-- Role Indicator & Switch Button -->
            <button 
              onclick="window.appState.setRoute('login')" 
              class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-900 border border-emerald-800 hover:border-emerald-600 text-[11px] text-white transition cursor-pointer"
              title="भूमिका बदला किंवा लॉगिन करा"
            >
              <span class="w-2 h-2 rounded-full ${window.appState.isAdmin() ? 'bg-white shadow-xs animate-pulse ring-1 ring-emerald-300' : 'bg-emerald-300'}"></span>
              <span>${window.appState.getRoleLabel().split('(')[0]}</span>
              <span class="text-[9px] bg-emerald-950 text-emerald-200 border border-emerald-800 px-1 rounded font-bold">बदला 🔄</span>
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  // 1B. Welcome & Login Interface (Gate view appearing first)
  renderLoginView() {
    const t = (k) => window.appState.t(k);
    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const curV = window.appState.state.activeVillage || window.VILLAGE_DATA.village;

    return `
      <section class="min-h-[85vh] bg-gradient-to-br from-[#011a14] via-[#064e3b] to-[#022c22] text-white py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div class="relative max-w-5xl w-full mx-auto space-y-8">
          
          <!-- Top Civic Header Emblem -->
          <div class="text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200 shadow-sm">
              <span>🏛️</span>
              <span>महाराष्ट्र शासन • ग्रामविकास व पंचायत राज विभाग</span>
            </div>

            <div class="flex items-center justify-center gap-3">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-xl font-black text-3xl border border-emerald-500/40">
                ग
              </div>
              <div class="text-left">
                <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>${t('appName')}</span>
                  <span class="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 bg-white text-emerald-950 rounded-md shadow-xs">Civic Portal</span>
                </h1>
                <p class="text-xs sm:text-sm text-emerald-200 font-medium">सार्वजनिक धोरण पारदर्शकता, माहिती अधिकार व नागरिक सेवा मंच</p>
              </div>
            </div>

            <p class="text-xs text-emerald-100 max-w-xl mx-auto">
              महाराष्ट्रातील सर्व ३६ जिल्हे व हजारो ग्रामपंचायतींसाठी एकात्मिक पारदर्शक पोर्टल. कृपया खालीलपैकी आपला प्रवेश प्रकार निवडा.
            </p>
          </div>

          <!-- Dual Portal Login Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            <!-- SECTION 1: CITIZEN / USER (DIRECT ACCESS WITHOUT ID/PASSWORD) -->
            <div class="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-500/40 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500 transition-all">
              <div class="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-sm">
                🔓 खुला प्रवेश (Direct Access)
              </div>

              <div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mb-4 shadow-xs">
                  🧑‍🤝‍🧑
                </div>

                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
                  <span>नागरिक (View Only / केवळ वाचक)</span>
                </div>

                <h2 class="text-2xl font-black text-slate-900 mb-2">नागरिक विभाग (Citizen Portal)</h2>
                <p class="text-xs text-slate-500 leading-relaxed mb-5">
                  नागरिकांसाठी पूर्णपणे खुला व मोफत मंच. <strong>कोणत्याही आयडी किंवा पासवर्डची आवश्यकता नाही.</strong> नागरिक गावातील विकासकामे, खर्च, बजेट, शासकीय योजना व परवाने तपासू शकतात.
                </p>

                <!-- What citizens can see -->
                <div class="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div class="flex items-center gap-2 font-bold text-slate-800 mb-1">
                    <span>👁️</span>
                    <span>नागरिक अधिकारात काय पाहू शकतात?</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>गावातील रस्ते व विकासकामांचा प्रत्यक्ष खर्च व प्रगती</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>ग्रामपंचायत वार्षिक बजेट, निधी वाटप व शिल्लक</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>शासकीय योजना, पात्रता व लाभार्थ्यांची माहिती</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>जिओ-टॅग्ड डिजिटल नकाशे व सार्वजनिक सुविधा</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>अधिकृत बिले, पत्रे, परवाने व ठराव डाउनलोड करा</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>थेट ऑनलाईन तक्रार व सार्वजनिक प्रश्न नोंदवा</span>
                  </div>
                </div>

                <!-- Optional preferred village selector -->
                <div class="mb-6">
                  <label class="block text-[11px] font-bold text-slate-700 mb-1">
                    📍 सुरुवातीचे गाव निवडा (Optional Initial Location):
                  </label>
                  <select 
                    id="citizen-loc-select"
                    class="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">-- सध्याचे गाव वापरा (${curV.nameMr}, ${curV.district}) --</option>
                    ${locations.map(d => `
                      <option value="${d.districtId}">${d.districtNameMr} (${d.districtName}) - ${d.talukas[0]?.villages[0]?.name || d.districtNameMr}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <!-- Big Direct Access Button -->
              <div>
                <button 
                  onclick="window.components.handleCitizenLogin()" 
                  class="w-full py-4 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02]"
                >
                  <span>नागरिक म्हणून थेट प्रवेश करा (Direct Access)</span>
                  <span class="group-hover:translate-x-1.5 transition-transform text-lg">🚀 →</span>
                </button>
                <p class="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  कोणतीही नोंदणी किंवा पासवर्ड आवश्यक नाही • एका क्लिकवर थेट प्रवेश
                </p>
              </div>
            </div>

            <!-- SECTION 2: ADMIN PORTAL (SECURE & LOCATION-WISE) -->
            <div class="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-900/30 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-700 transition-all">
              <div class="absolute top-0 right-0 bg-emerald-900 text-white text-[11px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-sm">
                🔐 प्रशासकीय लॉगिन (Admin)
              </div>

              <div>
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-950 flex items-center justify-center text-2xl mb-4 shadow-xs">
                  🛡️
                </div>

                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-950 text-xs font-bold mb-2 border border-emerald-200">
                  <span>संपादन व अपलोड अधिकार (Full Admin Rights)</span>
                </div>

                <h2 class="text-2xl font-black text-slate-900 mb-2">प्रशासक लॉगिन (Admin Portal)</h2>
                <p class="text-xs text-slate-500 leading-relaxed mb-4">
                  केवळ ग्रामसेवक, सरपंच, तलाठी व जिल्हा प्रशासनासाठी. प्रशासक नवीन विकासकामे जोडू शकतात आणि <strong>देयके (Invoices), शासकीय पत्रे (Letters), परवाने (Licence) व दस्तऐवज (Documents) अपलोड करू शकतात.</strong>
                </p>

                <!-- Location-wise Admin Selector Form -->
                <div class="space-y-3.5 mb-6">
                  <!-- Location Dropdown -->
                  <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">
                      १. स्थाननिहाय प्रशासन निवडा (Location-Wise Jurisdiction) *
                    </label>
                    <select 
                      id="admin-loc-select"
                      onchange="window.components.onAdminLocationPicked(this.value)"
                      class="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-xs"
                    >
                      <option value="admin.nashik|nashik|निफाड|सोनवाडी (Sonwadi)|20.0835|74.0210|422303|3420">📍 नाशिक प्रशासन (सोनवाडी ग्रामपंचायत) - admin.nashik</option>
                      <option value="admin.pune|pune|बारामती|माळेगाव (Malegaon)|18.1500|74.5200|413115|11200">📍 पुणे प्रशासन (बारामती तालुका) - admin.pune</option>
                      <option value="admin.shirdi|ahmednagar|राहाता|शिर्डी (Shirdi)|19.7667|74.4764|423107|36000">📍 अहिल्यानगर प्रशासन (शिर्डी ग्रामपंचायत) - admin.shirdi</option>
                      <option value="admin.csambhajinagar|chhatrapati_sambhajinagar|सिल्लोड|अजिंठा (Ajanta)|20.5300|75.7500|431117|7800">📍 छत्रपती संभाजीनगर प्रशासन - admin.csambhajinagar</option>
                      <option value="admin.nagpur|nagpur|रामटेक|मनसर (Mansar)|21.4000|79.2800|441106|6800">📍 नागपूर जिल्हा प्रशासन - admin.nagpur</option>
                      <option value="admin.kolhapur|kolhapur|करवीर|उचगाव (Uchgaon)|16.6800|74.2800|416005|18200">📍 कोल्हापूर जिल्हा प्रशासन - admin.kolhapur</option>
                      <option value="admin.thane|thane|भिवंडी|पडघा (Padgha)|19.3400|73.1800|421101|8500">📍 ठाणे / कोकण प्रशासन - admin.thane</option>
                      <option value="admin.amravati|amravati|अचलपूर|परतवाडा (Paratwada)|21.2900|77.5100|444805|12400">📍 अमरावती जिल्हा प्रशासन - admin.amravati</option>
                      <option value="admin.solapur|solapur|पंढरपूर|वाखरी (Wakhari)|17.7100|75.2900|413304|6400">📍 सोलापूर प्रशासन (पंढरपूर) - admin.solapur</option>
                    </select>
                  </div>

                  <!-- Admin Username -->
                  <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">
                      २. प्रशासक युझरनेम (Username) *
                    </label>
                    <div class="relative">
                      <input 
                        type="text" 
                        id="admin-login-username" 
                        value="admin.nashik" 
                        placeholder="उदा. admin.nashik किंवा admin.pune"
                        class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                      <span class="absolute left-3 top-2.5 text-slate-400 text-xs">👤</span>
                    </div>
                  </div>

                  <!-- Password -->
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="block text-[11px] font-bold text-slate-700">
                        ३. पासवर्ड (Password) *
                      </label>
                      <button 
                        type="button" 
                        onclick="window.components.openResetPasswordModal()" 
                        class="text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer flex items-center gap-1 text-[11px]"
                        title="फोन किंवा ईमेल पडताळणीद्वारे नवीन पासवर्ड तयार करा"
                      >
                        <span>🔑 नवीन पासवर्ड तयार करा</span>
                      </button>
                    </div>
                    <div class="relative">
                      <input 
                        type="password" 
                        id="admin-login-password" 
                        value="admin123" 
                        placeholder="पासवर्ड प्रविष्ट करा"
                        class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        onkeypress="if(event.key === 'Enter') window.components.handleAdminLogin()"
                      />
                      <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔑</span>
                    </div>
                    <div class="flex items-center justify-between mt-1 text-[10px]">
                      <span class="text-slate-400">पासवर्ड बदलायचा आहे किंवा विसरलात?</span>
                      <button 
                        type="button" 
                        onclick="window.components.openResetPasswordModal()" 
                        class="text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer"
                      >
                        फोन / ईमेल OTP द्वारे रीसेट करा &rarr;
                      </button>
                    </div>
                  </div>

                  <!-- Quick Auto-Fill Chips -->
                  <div>
                    <span class="text-[10px] text-slate-500 font-bold block mb-1">द्रुत चाचणी युझरनेम (Quick Fill):</span>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <button type="button" onclick="window.components.quickFillAdmin('admin.nashik', 'admin123', 'nashik', 'निफाड', 'सोनवाडी (Sonwadi)', 20.0835, 74.0210, '422303', 3420)" class="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[10px] font-bold border border-emerald-200">
                        📍 admin.nashik
                      </button>
                      <button type="button" onclick="window.components.quickFillAdmin('admin.pune', 'admin123', 'pune', 'बारामती', 'माळेगाव (Malegaon)', 18.1500, 74.5200, '413115', 11200)" class="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[10px] font-bold border border-emerald-200">
                        📍 admin.pune
                      </button>
                      <button type="button" onclick="window.components.quickFillAdmin('admin.shirdi', 'admin123', 'ahmednagar', 'राहाता', 'शिर्डी (Shirdi)', 19.7667, 74.4764, '423107', 36000)" class="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[10px] font-bold border border-emerald-200">
                        📍 admin.shirdi
                      </button>
                      <button type="button" onclick="window.components.quickFillAdmin('admin.nagpur', 'admin123', 'nagpur', 'रामटेक', 'मनसर (Mansar)', 21.4000, 79.2800, '441106', 6800)" class="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[10px] font-bold border border-emerald-200">
                        📍 admin.nagpur
                      </button>
                    </div>
                  </div>

                  <div id="admin-login-error" class="hidden p-2.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-200"></div>
                </div>
              </div>

              <!-- Admin Login Submit Button -->
              <div>
                <button 
                  onclick="window.components.handleAdminLogin()" 
                  class="w-full py-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02]"
                >
                  <span>प्रशासकीय खात्यात लॉगिन करा (Admin Login)</span>
                  <span class="group-hover:scale-110 transition-transform">🔒</span>
                </button>
                <p class="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  डेमो पासवर्ड: <code class="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono font-bold">admin123</code> किंवा <code class="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono font-bold">gram@123</code>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  },

  handleCitizenLogin() {
    const locSelect = document.getElementById('citizen-loc-select');
    let preferredLoc = null;
    if (locSelect && locSelect.value) {
      const locations = window.MAHARASHTRA_LOCATIONS || [];
      const dist = locations.find(d => d.districtId === locSelect.value);
      if (dist && dist.talukas[0]?.villages[0]) {
        const v = dist.talukas[0].villages[0];
        preferredLoc = {
          name: v.name,
          taluka: dist.talukas[0].name,
          district: dist.districtNameMr,
          lat: v.lat,
          lng: v.lng,
          pin: v.pin,
          pop: v.pop
        };
      }
    }
    window.appState.loginAsCitizen(preferredLoc);
  },

  onAdminLocationPicked(val) {
    if (!val) return;
    const parts = val.split('|');
    const username = parts[0];
    const usernameInput = document.getElementById('admin-login-username');
    if (usernameInput) usernameInput.value = username;
    this.selectedAdminLocation = {
      username: parts[0],
      district: parts[1],
      taluka: parts[2],
      name: parts[3],
      lat: Number(parts[4]),
      lng: Number(parts[5]),
      pin: parts[6],
      pop: Number(parts[7])
    };
  },

  quickFillAdmin(user, pass, distId, taluka, village, lat, lng, pin, pop) {
    const userInput = document.getElementById('admin-login-username');
    const passInput = document.getElementById('admin-login-password');
    if (userInput) userInput.value = user;
    if (passInput) passInput.value = pass;
    this.selectedAdminLocation = {
      name: village,
      taluka: taluka,
      district: distId,
      lat: lat,
      lng: lng,
      pin: pin,
      pop: pop
    };
  },

  handleAdminLogin() {
    const user = document.getElementById('admin-login-username')?.value || '';
    const pass = document.getElementById('admin-login-password')?.value || '';
    const errBox = document.getElementById('admin-login-error');

    let locationData = this.selectedAdminLocation || null;
    if (!locationData) {
      const locSelect = document.getElementById('admin-loc-select');
      if (locSelect && locSelect.value) {
        const parts = locSelect.value.split('|');
        locationData = {
          username: parts[0],
          district: parts[1],
          taluka: parts[2],
          name: parts[3],
          lat: Number(parts[4]),
          lng: Number(parts[5]),
          pin: parts[6],
          pop: Number(parts[7])
        };
      }
    }

    const res = window.appState.loginAsAdmin(user, pass, locationData);
    if (!res.success) {
      if (errBox) {
        errBox.innerText = res.message;
        errBox.classList.remove('hidden');
      } else {
        alert(res.message);
      }
      return;
    }
  },

  // --- Admin Password Reset & Verification System ---
  resetPasswordState: {
    method: 'phone', // 'phone' | 'email'
    username: 'admin.nashik',
    phone: '9822012345',
    email: 'admin.nashik@gramsetu.gov.in',
    otpSent: false,
    generatedOtp: '',
    showNewPass: false,
    showConfirmPass: false,
    error: '',
    success: ''
  },

  openResetPasswordModal(prefillUser) {
    const curUser = prefillUser || document.getElementById('admin-login-username')?.value || 'admin.nashik';
    this.resetPasswordState.username = curUser.trim() || 'admin.nashik';
    this.resetPasswordState.otpSent = false;
    this.resetPasswordState.generatedOtp = '';
    this.resetPasswordState.error = '';
    this.resetPasswordState.success = '';
    this.setResetUsername(this.resetPasswordState.username);
    this.renderResetPasswordModal();
  },

  closeResetPasswordModal() {
    const modal = document.getElementById('reset-password-modal-container');
    if (modal) modal.remove();
  },

  switchResetMethod(method) {
    this.resetPasswordState.method = method;
    this.resetPasswordState.error = '';
    this.renderResetPasswordModal();
  },

  setResetUsername(val) {
    this.resetPasswordState.username = val;
    if (val.includes('nashik')) {
      this.resetPasswordState.phone = '9822012345';
      this.resetPasswordState.email = 'admin.nashik@gramsetu.gov.in';
    } else if (val.includes('pune')) {
      this.resetPasswordState.phone = '9822054321';
      this.resetPasswordState.email = 'admin.pune@gramsetu.gov.in';
    } else if (val.includes('shirdi')) {
      this.resetPasswordState.phone = '9822099999';
      this.resetPasswordState.email = 'admin.shirdi@gramsetu.gov.in';
    } else if (val.includes('nagpur')) {
      this.resetPasswordState.phone = '9822088888';
      this.resetPasswordState.email = 'admin.nagpur@gramsetu.gov.in';
    }
    this.renderResetPasswordModal();
  },

  toggleResetPasswordVisibility(field) {
    if (field === 'new') {
      this.resetPasswordState.showNewPass = !this.resetPasswordState.showNewPass;
    } else {
      this.resetPasswordState.showConfirmPass = !this.resetPasswordState.showConfirmPass;
    }
    this.renderResetPasswordModal();
  },

  sendResetOtp() {
    const s = this.resetPasswordState;
    const userInput = document.getElementById('reset-modal-username')?.value || s.username;
    s.username = userInput.trim();

    let contactVal = '';
    if (s.method === 'phone') {
      contactVal = document.getElementById('reset-modal-phone')?.value || s.phone;
      s.phone = contactVal.trim();
    } else {
      contactVal = document.getElementById('reset-modal-email')?.value || s.email;
      s.email = contactVal.trim();
    }

    const res = window.appState.sendAdminOtp(s.username, s.method, contactVal);
    if (!res.success) {
      s.error = res.message;
      s.success = '';
      this.renderResetPasswordModal();
      return;
    }

    s.otpSent = true;
    s.generatedOtp = res.otp;
    s.error = '';
    s.success = res.message;
    this.renderResetPasswordModal();
  },

  fillDemoOtp() {
    const otpInput = document.getElementById('reset-modal-otp');
    if (otpInput && this.resetPasswordState.generatedOtp) {
      otpInput.value = this.resetPasswordState.generatedOtp;
    }
  },

  handleSaveNewPassword() {
    const s = this.resetPasswordState;
    const userInput = document.getElementById('reset-modal-username')?.value || s.username;
    const otpInput = document.getElementById('reset-modal-otp')?.value || '';
    const newPassInput = document.getElementById('reset-modal-newpass')?.value || '';
    const confirmPassInput = document.getElementById('reset-modal-confirmpass')?.value || '';

    const cleanUser = userInput.trim();
    const cleanOtp = otpInput.trim();
    const cleanNewPass = newPassInput.trim();
    const cleanConfirmPass = confirmPassInput.trim();

    if (!cleanUser) {
      s.error = 'कृपया प्रशासक युझरनेम प्रविष्ट करा.';
      this.renderResetPasswordModal();
      return;
    }

    if (!s.otpSent) {
      s.error = 'कृपया प्रथम "सत्यापन OTP पाठवा" बटणावर क्लिक करा.';
      this.renderResetPasswordModal();
      return;
    }

    if (!cleanOtp) {
      s.error = 'कृपया ६ अंकी सत्यापन कोड (OTP) प्रविष्ट करा.';
      this.renderResetPasswordModal();
      return;
    }

    // Verify OTP
    const verifyRes = window.appState.verifyAdminOtp(cleanUser, cleanOtp);
    if (!verifyRes.success) {
      s.error = verifyRes.message;
      this.renderResetPasswordModal();
      return;
    }

    if (!cleanNewPass || cleanNewPass.length < 6) {
      s.error = 'नवीन पासवर्ड किमान ६ अक्षरांचा (Characters) असावा.';
      this.renderResetPasswordModal();
      return;
    }

    if (cleanNewPass !== cleanConfirmPass) {
      s.error = 'नवीन पासवर्ड आणि पुष्टीकरण पासवर्ड जुळत नाहीत! कृपया पुन्हा तपासा.';
      this.renderResetPasswordModal();
      return;
    }

    const contactVal = s.method === 'phone' ? s.phone : s.email;
    const saveRes = window.appState.setCustomAdminPassword(cleanUser, cleanNewPass, s.method, contactVal);

    if (!saveRes.success) {
      s.error = saveRes.message;
      this.renderResetPasswordModal();
      return;
    }

    s.error = '';
    s.success = `🎉 नवीन पासवर्ड यशस्वीरित्या तयार झाला! आता आपण '${cleanNewPass}' या पासवर्डने अधिकृत लॉगिन करू शकता.`;
    
    // Auto-update inputs on the main login form!
    const mainUser = document.getElementById('admin-login-username');
    const mainPass = document.getElementById('admin-login-password');
    if (mainUser) mainUser.value = cleanUser;
    if (mainPass) mainPass.value = cleanNewPass;

    this.renderResetPasswordModal(true);
  },

  renderResetPasswordModal(isComplete = false) {
    let container = document.getElementById('reset-password-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'reset-password-modal-container';
      document.body.appendChild(container);
    }

    const s = this.resetPasswordState;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeResetPasswordModal()">
        <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
          
          <!-- Header -->
          <div class="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white p-5 sm:p-6 relative">
            <button 
              onclick="window.components.closeResetPasswordModal()" 
              class="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition cursor-pointer"
              title="बंद करा"
            >✕</button>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-800/40 border border-emerald-400/40 flex items-center justify-center text-2xl text-emerald-200 shadow-inner">
                🔐
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-black text-white tracking-tight">नवीन पासवर्ड तयार करा</h3>
                <p class="text-xs text-emerald-200 mt-0.5">Admin Password Creation & Verification</p>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-4">
            
            ${isComplete ? `
              <div class="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3">
                <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-3xl">
                  ✅
                </div>
                <h4 class="text-base font-black text-emerald-950">पासवर्ड यशस्वीरित्या सेट झाला!</h4>
                <p class="text-xs text-emerald-800 leading-relaxed font-medium">
                  आपला नवीन पासवर्ड जतन करण्यात आला असून लॉगिन फॉर्ममध्ये आपोआप भरला गेला आहे. आपण आता थेट प्रशासकीय खात्यात प्रवेश करू शकता.
                </p>
                <div class="p-3 bg-white rounded-xl border border-emerald-200 text-xs font-mono font-bold text-slate-800">
                  युझरनेम: <span class="text-emerald-950">${s.username}</span> | 
                  नवीन पासवर्ड: <span class="text-emerald-700">••••••••</span>
                </div>
                <button 
                  onclick="window.components.closeResetPasswordModal(); window.components.handleAdminLogin()" 
                  class="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>प्रशासकीय खात्यात थेट लॉगिन करा</span>
                  <span>&rarr;</span>
                </button>
              </div>
            ` : `

              <!-- Notification / Error / Success Banners -->
              ${s.error ? `
                <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2 animate-shake">
                  <span>⚠️</span>
                  <span>${s.error}</span>
                </div>
              ` : ''}

              ${s.success ? `
                <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 space-y-1">
                  <div class="flex items-center gap-1.5">
                    <span>✅</span>
                    <span>${s.success}</span>
                  </div>
                  ${s.generatedOtp ? `
                    <div class="mt-2 p-2 bg-white rounded-lg border border-emerald-200 flex items-center justify-between">
                      <span class="text-slate-600 font-normal">चाचणी OTP कोड:</span>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-emerald-100 text-emerald-950 font-mono font-black text-sm rounded border border-emerald-300 tracking-widest">${s.generatedOtp}</span>
                        <button type="button" onclick="window.components.fillDemoOtp()" class="text-[11px] text-emerald-800 font-bold hover:underline cursor-pointer">
                          आपोआप भरा
                        </button>
                      </div>
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Verification Method Tabs -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-2">
                  १. सत्यापन पद्धत निवडा (Choose Verification Method):
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    type="button" 
                    onclick="window.components.switchResetMethod('phone')" 
                    class="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border ${s.method === 'phone' ? 'bg-emerald-900 text-white border-emerald-950 shadow-md ring-2 ring-emerald-500/30' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'}"
                  >
                    <span>📱</span>
                    <span>मोबाईल नंबर (SMS OTP)</span>
                  </button>
                  <button 
                    type="button" 
                    onclick="window.components.switchResetMethod('email')" 
                    class="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border ${s.method === 'email' ? 'bg-emerald-900 text-white border-emerald-950 shadow-md ring-2 ring-emerald-500/30' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'}"
                  >
                    <span>✉️</span>
                    <span>ईमेल पत्ता (Email OTP)</span>
                  </button>
                </div>
              </div>

              <!-- Admin Username -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  २. प्रशासक युझरनेम (Admin Username) *
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    id="reset-modal-username" 
                    value="${s.username}" 
                    placeholder="उदा. admin.nashik" 
                    class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <span class="absolute left-3 top-2.5 text-slate-400 text-xs">👤</span>
                </div>
                <!-- Quick User Chips -->
                <div class="flex items-center gap-1.5 flex-wrap mt-1.5">
                  <span class="text-[10px] text-slate-400 font-bold">खाते निवडा:</span>
                  <button type="button" onclick="window.components.setResetUsername('admin.nashik')" class="px-2 py-0.5 rounded text-[10px] font-bold border ${s.username === 'admin.nashik' ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}">admin.nashik</button>
                  <button type="button" onclick="window.components.setResetUsername('admin.pune')" class="px-2 py-0.5 rounded text-[10px] font-bold border ${s.username === 'admin.pune' ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}">admin.pune</button>
                  <button type="button" onclick="window.components.setResetUsername('admin.shirdi')" class="px-2 py-0.5 rounded text-[10px] font-bold border ${s.username === 'admin.shirdi' ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}">admin.shirdi</button>
                  <button type="button" onclick="window.components.setResetUsername('admin.nagpur')" class="px-2 py-0.5 rounded text-[10px] font-bold border ${s.username === 'admin.nagpur' ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}">admin.nagpur</button>
                </div>
              </div>

              <!-- Phone or Email input -->
              ${s.method === 'phone' ? `
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ३. नोंदणीकृत मोबाईल नंबर (Phone Number for OTP) *
                  </label>
                  <div class="relative flex">
                    <span class="inline-flex items-center px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-xs font-bold">
                      🇮🇳 +91
                    </span>
                    <input 
                      type="tel" 
                      id="reset-modal-phone" 
                      value="${s.phone}" 
                      maxlength="10" 
                      placeholder="१० अंकी मोबाईल नंबर प्रविष्ट करा" 
                      class="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <p class="text-[10px] text-slate-400 mt-1">या मोबाईल नंबरवर तात्काळ SMS सत्यापन कोड पाठवला जाईल.</p>
                </div>
              ` : `
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ३. प्रशासकीय ईमेल पत्ता (Email Address for OTP) *
                  </label>
                  <div class="relative">
                    <input 
                      type="email" 
                      id="reset-modal-email" 
                      value="${s.email}" 
                      placeholder="उदा. admin@gramsetu.gov.in" 
                      class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                    <span class="absolute left-3 top-2.5 text-slate-400 text-xs">✉️</span>
                  </div>
                  <p class="text-[10px] text-slate-400 mt-1">या ईमेलवर तात्काळ ६ अंकी सुरक्षा पडताळणी कोड पाठवला जाईल.</p>
                </div>
              `}

              <!-- Send OTP Button -->
              <div>
                <button 
                  type="button" 
                  onclick="window.components.sendResetOtp()" 
                  class="w-full py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>📨</span>
                  <span>${s.otpSent ? 'पुन्हा नवीन OTP पाठवा (Resend OTP)' : 'सत्यापन OTP पाठवा (Send Verification OTP)'}</span>
                </button>
              </div>

              <!-- Divider -->
              <div class="relative flex py-2 items-center">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink mx-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  ${s.otpSent ? 'पडताळणी व नवीन पासवर्ड' : 'OTP पाठवल्यानंतर पासवर्ड सेट करा'}
                </span>
                <div class="flex-grow border-t border-slate-200"></div>
              </div>

              <!-- OTP Verification Input -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-bold text-slate-700">
                    ४. प्राप्त झालेला ६ अंकी OTP प्रविष्ट करा *
                  </label>
                  ${s.generatedOtp ? `
                    <button type="button" onclick="window.components.fillDemoOtp()" class="text-[11px] text-emerald-800 font-bold hover:underline cursor-pointer">
                      चाचणी कोड (${s.generatedOtp}) भरा
                    </button>
                  ` : ''}
                </div>
                <div class="relative">
                  <input 
                    type="text" 
                    id="reset-modal-otp" 
                    maxlength="6" 
                    placeholder="६ अंकी OTP कोड (उदा. 123456)" 
                    class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 ${!s.otpSent ? 'opacity-60' : ''}"
                  />
                  <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🛡️</span>
                </div>
                <p class="text-[10px] text-slate-400 mt-1">मास्टर टेस्ट कोड: <code class="bg-slate-100 px-1 rounded font-bold text-slate-700">123456</code> देखील वैध आहे.</p>
              </div>

              <!-- New Password Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ५. नवीन पासवर्ड (New Password) *
                  </label>
                  <div class="relative">
                    <input 
                      type="${s.showNewPass ? 'text' : 'password'}" 
                      id="reset-modal-newpass" 
                      placeholder="किमान ६ अक्षरे" 
                      class="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                    <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔑</span>
                    <button 
                      type="button" 
                      onclick="window.components.toggleResetPasswordVisibility('new')" 
                      class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                      title="पासवर्ड दाखवा/लपवा"
                    >
                      ${s.showNewPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ६. पासवर्ड पुष्टी (Confirm Password) *
                  </label>
                  <div class="relative">
                    <input 
                      type="${s.showConfirmPass ? 'text' : 'password'}" 
                      id="reset-modal-confirmpass" 
                      placeholder="पुन्हा तोच पासवर्ड टाका" 
                      class="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                    <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔒</span>
                    <button 
                      type="button" 
                      onclick="window.components.toggleResetPasswordVisibility('confirm')" 
                      class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                      title="पासवर्ड दाखवा/लपवा"
                    >
                      ${s.showConfirmPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Submit / Save Button -->
              <div class="pt-2">
                <button 
                  type="button" 
                  onclick="window.components.handleSaveNewPassword()" 
                  class="w-full py-3.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-white font-black text-sm rounded-2xl shadow-xl transition cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <span>💾 नवीन पासवर्ड जतन करा (Save & Apply New Password)</span>
                </button>
              </div>
            `}

          </div>

          <!-- Footer -->
          <div class="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span class="flex items-center gap-1 font-medium">
              <span>🔒</span>
              <span>256-Bit एनक्रिप्टेड व सुरक्षित</span>
            </span>
            <button 
              type="button" 
              onclick="window.components.closeResetPasswordModal()" 
              class="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              रद्द करा (Cancel)
            </button>
          </div>

        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  // 2. Main Header & Navigation
  renderHeader() {
    const s = window.appState.state;
    const t = (k) => window.appState.t(k);
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    const isAdmin = window.appState.isAdmin();

    // If currently on login page, render clean header
    if (s.currentRoute === 'login') {
      return `
        <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#022c22] via-[#064e3b] to-emerald-600 flex items-center justify-center text-white shadow-md font-extrabold text-2xl border border-emerald-500/50">
                ग
              </div>
              <div>
                <span class="font-extrabold text-2xl tracking-tight text-emerald-950">${t('appName')}</span>
                <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded ml-1.5 border border-emerald-200">Civic</span>
              </div>
            </div>
            
            <div class="text-xs text-slate-500 font-semibold hidden sm:flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>महाराष्ट्र शासन डिजिटल ग्राम पारदर्शकता मंच</span>
            </div>
          </div>
        </header>
      `;
    }

    const navLinks = [
      { id: 'home', label: t('navHome'), icon: '🏠' },
      { id: 'works', label: t('navWorks'), icon: '🏗️' },
      { id: 'budget', label: t('navBudget'), icon: '📊' },
      { id: 'schemes', label: t('navSchemes'), icon: '📜' },
      { id: 'facilities', label: t('navFacilities'), icon: '🏥' },
      { id: 'map', label: t('navMap'), icon: '🗺️' },
      { id: 'complaints', label: t('navComplaints'), icon: '📝' },
      { id: 'questions', label: t('navQuestions'), icon: '❓' },
      { id: 'documents', label: t('navDocuments'), icon: '📂' },
      { id: 'gram-sabha', label: t('navGramSabha'), icon: '👥' },
      { id: 'notifications', label: t('navNotifications'), icon: '🔔' },
      { id: 'assistant', label: t('navAssistant'), icon: '🤖' },
      { id: 'emergency', label: t('navEmergency'), icon: '🚨' }
    ];

    if (isAdmin) {
      navLinks.push({ id: 'admin', label: t('navAdmin'), icon: '⚙️' });
    }

    return `
      <!-- Top Demo Disclaimer Banner (Bottle Green & White) -->
      <aside aria-label="Demo notice" class="bg-emerald-900 text-white font-bold text-xs py-1.5 px-4 text-center border-b border-emerald-950 shadow-sm flex items-center justify-center gap-2">
        <span class="bg-white text-emerald-950 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-extrabold shadow-xs">DEMO / नमुना</span>
        <span>${t('demoNotice')}</span>
      </aside>

      <!-- Main Navigation Bar -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          <!-- Logo & Village Selector -->
          <div class="flex items-center gap-4">
            <a href="javascript:void(0)" onclick="window.appState.setRoute('home')" class="flex items-center gap-3 group focus:outline-none">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md font-extrabold text-2xl group-hover:scale-105 transition-transform border border-emerald-400/30">
                ग
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-2xl tracking-tight text-emerald-950">${t('appName')}</span>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded border border-emerald-200">Civic</span>
                </div>
                <p class="text-xs text-slate-500 font-medium hidden sm:block">${t('appTagline')}</p>
              </div>
            </a>

            <!-- Village Indicator & Location Switcher Button -->
            <button 
              onclick="window.components.openLocationModal()" 
              class="flex items-center gap-2 pl-3 pr-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs transition cursor-pointer text-left group shadow-xs"
              title="स्थान / गाव बदला (Click to Change Village / Location)"
            >
              <span class="text-emerald-700 text-sm group-hover:scale-125 transition-transform animate-pulse">📍</span>
              <div>
                <div class="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span>स्थान / गाव</span>
                  <span class="text-[9px] bg-emerald-200 text-emerald-950 px-1 rounded font-black">बदला ▼</span>
                </div>
                <span class="font-extrabold text-emerald-950 text-xs sm:text-sm">
                  ${v.nameMr} (${v.taluka}, ${v.district})
                </span>
              </div>
            </button>
          </div>

          <!-- Quick Global Search Input -->
          <div class="hidden md:flex flex-1 max-w-md mx-4">
            <div class="relative w-full flex items-center">
              <input 
                type="text" 
                id="global-header-search" 
                placeholder="${t('heroSearchPlaceholder')}"
                class="w-full pl-9 pr-14 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
                onkeypress="if(event.key === 'Enter') window.components.handleGlobalSearch(this.value)"
              />
              <span class="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
              <button 
                onclick="window.components.handleGlobalSearch(document.getElementById('global-header-search').value)"
                class="absolute right-1.5 top-1 px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full text-xs font-bold transition cursor-pointer shadow-xs"
                title="शोधा"
              >
                शोधा
              </button>
            </div>
          </div>

          <!-- Quick Action Buttons + ADMIN DEDICATED UPLOAD BUTTON + ROLE BADGE -->
          <div class="flex items-center gap-2">
            
            <!-- SEPARATE DEDICATED BUTTON TO UPLOAD DOCUMENTS ONLY FOR ADMIN -->
            ${isAdmin ? `
              <button 
                onclick="window.components.openUploadDocumentModal()" 
                class="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-xs font-black shadow-md transition hover:scale-105 cursor-pointer"
                title="अधिकृत दस्तऐवज, बिले, शासकीय पत्रे किंवा परवाने अपलोड करा"
              >
                <span>📤</span>
                <span class="hidden sm:inline">दस्तऐवज अपलोड</span>
                <span class="bg-white text-emerald-950 text-[9px] px-1.5 py-0.5 rounded font-black">Admin</span>
              </button>
            ` : ''}

            <button onclick="window.appState.setRoute('assistant')" class="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm transition">
              <span>🤖</span>
              <span class="hidden sm:inline">${t('navAssistant')}</span>
            </button>

            <button onclick="window.appState.setRoute('complaints')" class="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition">
              <span>📝</span>
              <span class="hidden sm:inline">${t('qaComplaint')}</span>
            </button>

            <!-- Role Badge & Switch / Logout Button -->
            ${isAdmin ? `
              <div class="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div class="text-right">
                  <div class="text-[10px] text-emerald-700 font-extrabold flex items-center justify-end gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>प्रशासक</span>
                  </div>
                  <div class="text-xs font-black text-slate-800 font-mono">${s.session?.username || 'admin'}</div>
                </div>
                <button onclick="window.appState.logout()" class="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg font-bold border border-red-200" title="लॉगआउट करा">
                  लॉगआउट 🚪
                </button>
              </div>
            ` : `
              <div class="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div class="text-right">
                  <div class="text-[10px] text-emerald-800 font-bold">नागरिक</div>
                  <div class="text-[11px] font-semibold text-slate-500">केवळ वाचक</div>
                </div>
                <button 
                  onclick="window.appState.setRoute('login')" 
                  class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                  title="प्रशासक म्हणून लॉगिन करा"
                >
                  <span>🔐</span>
                  <span>Admin Login</span>
                </button>
              </div>
            `}

            <!-- Mobile Drawer Menu Toggle -->
            <button onclick="window.components.toggleMobileMenu()" class="lg:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-lg">
              ☰
            </button>
          </div>
        </div>

        <!-- Desktop Horizontal Navigation Links -->
        <nav class="hidden lg:block bg-slate-50 border-t border-slate-200/80 px-4">
          <div class="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1">
            ${navLinks.map(link => `
              <button 
                onclick="window.appState.setRoute('${link.id}')"
                class="px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${s.currentRoute === link.id ? 'bg-emerald-900 text-white shadow-sm font-bold' : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-950'}"
              >
                <span>${link.icon}</span>
                <span>${link.label}</span>
              </button>
            `).join('')}
          </div>
        </nav>

        <!-- Mobile Drawer Overlay Menu -->
        <div id="mobile-menu-drawer" class="hidden lg:hidden bg-white border-t border-slate-200 px-4 py-3 shadow-xl">
          <!-- Mobile Language Switcher -->
          <div class="mb-3 p-2 bg-slate-100 rounded-xl flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700 flex items-center gap-1">🌐 भाषा / Language:</span>
            <div class="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
              <button onclick="window.appState.setLanguage('mr'); window.components.toggleMobileMenu();" class="px-2.5 py-1 rounded-md text-xs font-bold ${s.lang === 'mr' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'}">मराठी</button>
              <button onclick="window.appState.setLanguage('hi'); window.components.toggleMobileMenu();" class="px-2.5 py-1 rounded-md text-xs font-bold ${s.lang === 'hi' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'}">हिंदी</button>
              <button onclick="window.appState.setLanguage('en'); window.components.toggleMobileMenu();" class="px-2.5 py-1 rounded-md text-xs font-bold ${s.lang === 'en' ? 'bg-emerald-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'}">English</button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mb-3">
            ${navLinks.map(link => `
              <button 
                onclick="window.appState.setRoute('${link.id}'); window.components.toggleMobileMenu();"
                class="p-2.5 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${s.currentRoute === link.id ? 'bg-emerald-900 text-white' : 'bg-slate-50 text-slate-800 hover:bg-emerald-50'}"
              >
                <span class="text-base">${link.icon}</span>
                <span>${link.label}</span>
              </button>
            `).join('')}
          </div>
          <div class="pt-2 border-t border-slate-200 text-center text-xs text-slate-500">
            📍 ${v.nameMr} (${v.name}), ${v.taluka}, ${v.district}
          </div>
        </div>
      </header>
    `;
  },

  toggleMobileMenu() {
    const el = document.getElementById('mobile-menu-drawer');
    if (el) el.classList.toggle('hidden');
  },

  handleGlobalSearch(query) {
    if (query === undefined || query === null) {
      const heroIn = document.getElementById('hero-search-input');
      const headerIn = document.getElementById('global-header-search');
      query = (heroIn?.value || headerIn?.value || '').trim();
    } else {
      query = String(query).trim();
    }

    if (!query) {
      const heroIn = document.getElementById('hero-search-input');
      const headerIn = document.getElementById('global-header-search');
      const target = heroIn || headerIn;
      if (target) {
        target.focus();
        target.placeholder = "⚠️ कृपया येथे शब्द टाईप करा...";
        setTimeout(() => {
          target.placeholder = window.appState.t('heroSearchPlaceholder');
        }, 2000);
      }
      return;
    }

    const q = query.toLowerCase();
    const state = window.appState.state;

    // 1. Search Development Works
    const matchedWorks = (state.works || []).filter(w => 
      (w.title && w.title.toLowerCase().includes(q)) ||
      (w.workId && w.workId.toLowerCase().includes(q)) ||
      (w.location && w.location.toLowerCase().includes(q)) ||
      (w.department && w.department.toLowerCase().includes(q)) ||
      (w.scheme && w.scheme.toLowerCase().includes(q)) ||
      (w.contractor && w.contractor.toLowerCase().includes(q))
    );

    // 2. Search Schemes
    const matchedSchemes = (state.schemes || []).filter(s => 
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(q)) ||
      (s.benefits && s.benefits.toLowerCase().includes(q)) ||
      (s.eligibility && s.eligibility.toLowerCase().includes(q)) ||
      (s.categoryMr && s.categoryMr.toLowerCase().includes(q)) ||
      (s.department && s.department.toLowerCase().includes(q))
    );

    // 3. Search Facilities
    const matchedFacilities = (window.VILLAGE_DATA?.facilities || []).filter(f => 
      (f.name && f.name.toLowerCase().includes(q)) ||
      (f.category && f.category.toLowerCase().includes(q)) ||
      (f.address && f.address.toLowerCase().includes(q)) ||
      (f.phone && f.phone.includes(q))
    );

    // 4. Search Documents
    const matchedDocs = (state.documents || []).filter(d => 
      (d.name && d.name.toLowerCase().includes(q)) ||
      (d.docType && d.docType.toLowerCase().includes(q)) ||
      (d.department && d.department.toLowerCase().includes(q))
    );

    // 5. Search Complaints
    const matchedComplaints = (state.complaints || []).filter(c => 
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      (c.trackingId && c.trackingId.toLowerCase().includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q))
    );

    // 6. Search Call Directory
    const matchedContacts = (state.callDirectory || []).filter(c => 
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.number && c.number.includes(q)) ||
      (c.desc && c.desc.toLowerCase().includes(q))
    );

    const totalCount = matchedWorks.length + matchedSchemes.length + matchedFacilities.length + matchedDocs.length + matchedComplaints.length + matchedContacts.length;

    this.lastSearchResults = {
      query: query,
      works: matchedWorks,
      schemes: matchedSchemes,
      facilities: matchedFacilities,
      docs: matchedDocs,
      complaints: matchedComplaints,
      contacts: matchedContacts,
      totalCount: totalCount
    };

    this.openSearchResultsModal(query, this.lastSearchResults, 'ALL');
  },

  openSearchResultsModal(query, results, activeCategory = 'ALL') {
    let container = document.getElementById('search-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'search-modal-container';
      document.body.appendChild(container);
    }

    const { works, schemes, facilities, docs, complaints, contacts, totalCount } = results;

    const categories = [
      { id: 'ALL', label: `सर्व निकाल (${totalCount})`, count: totalCount },
      { id: 'WORKS', label: `🏗️ विकासकामे (${works.length})`, count: works.length },
      { id: 'SCHEMES', label: `📜 शासकीय योजना (${schemes.length})`, count: schemes.length },
      { id: 'FACILITIES', label: `🏥 सुविधा व केंद्रे (${facilities.length})`, count: facilities.length },
      { id: 'DOCS', label: `📑 दस्तऐवज (${docs.length})`, count: docs.length },
      { id: 'COMPLAINTS', label: `📝 तक्रारी (${complaints.length})`, count: complaints.length },
      { id: 'CONTACTS', label: `📞 संपर्क निर्देशिका (${contacts.length})`, count: contacts.length }
    ];

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop" onclick="if(event.target === this) window.components.closeSearchResultsModal()">
        <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col" onclick="event.stopPropagation()">
          
          <!-- Search Header -->
          <div class="p-5 border-b border-emerald-900 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 flex-1">
              <span class="w-10 h-10 rounded-xl bg-emerald-800 text-white border border-emerald-600 flex items-center justify-center text-xl font-black shrink-0">🔍</span>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-emerald-200 uppercase font-bold tracking-wider">सार्वत्रिक शोध निकाल (Universal Search)</span>
                  <span class="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-full font-black border border-emerald-500">
                    ${totalCount} सापडले
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <input 
                    type="text" 
                    id="modal-search-input" 
                    value="${query}" 
                    class="w-full max-w-md px-3 py-1.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-xl text-sm font-semibold border border-white/20 focus:outline-none transition"
                    onkeypress="if(event.key === 'Enter') window.components.handleGlobalSearch(this.value)"
                  />
                  <button 
                    onclick="window.components.handleGlobalSearch(document.getElementById('modal-search-input').value)" 
                    class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shrink-0 border border-emerald-600"
                  >
                    पुन्हा शोधा
                  </button>
                </div>
              </div>
            </div>
            <button onclick="window.components.closeSearchResultsModal()" class="text-emerald-300 hover:text-white p-2 text-2xl font-bold cursor-pointer">✕</button>
          </div>

          <!-- Category Filter Tabs -->
          <div class="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
            ${categories.map(cat => `
              <button 
                onclick="window.components.filterSearchModalCategory('${cat.id}')" 
                class="px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${activeCategory === cat.id ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
              >
                ${cat.label}
              </button>
            `).join('')}
          </div>

          <!-- Results Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
            
            ${totalCount === 0 ? `
              <div class="text-center py-12 px-4 space-y-4">
                <span class="text-5xl block">🔍</span>
                <h3 class="text-lg font-bold text-slate-800">" ${query} " साठी कोणतेही थेट निकाल सापडले नाहीत</h3>
                <p class="text-xs text-slate-500 max-w-md mx-auto">
                  आपण शब्दांचे स्पेलिंग तपासून पाहू शकता किंवा ग्रामसेतू AI मित्राला याबद्दल थेट प्रश्न विचारू शकता.
                </p>
                <div class="pt-2">
                  <button 
                    onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('assistant'); setTimeout(() => { const inp = document.getElementById('ai-chat-input'); if(inp) { inp.value = '${query.replace(/'/g, "\\'")}'; window.components.handleSendAiQuestion(); } }, 300);"
                    class="px-5 py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition inline-flex items-center gap-2"
                  >
                    <span>🤖</span>
                    <span>AI मित्राला "${query}" बद्दल विचारा</span>
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- 1. Development Works Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'WORKS') && works.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏗️</span>
                    <span>विकासकामे (${works.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('works');" class="text-xs text-emerald-800 hover:underline font-bold">
                    सर्व कामे पहा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${works.map(w => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-1">
                          <span class="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-950 px-2 py-0.5 rounded border border-emerald-200">${w.workId}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${w.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-800'}">
                            ${w.status}
                          </span>
                        </div>
                        <h5 class="font-bold text-slate-900 text-sm mb-1">${w.title}</h5>
                        <p class="text-xs text-slate-500 mb-2">📍 ${w.location} | विभाग: ${w.department}</p>
                        <div class="flex items-center gap-3 text-xs bg-slate-50 p-2 rounded-xl mb-3">
                          <div>मंजूर: <strong class="text-slate-900">₹${w.sanctionedAmount.toLocaleString('en-IN')}</strong></div>
                          <div>खर्च: <strong class="text-emerald-700">₹${w.spentAmount.toLocaleString('en-IN')}</strong></div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                        ${w.photos?.before || w.photos?.after ? `
                          <button 
                            onclick="window.components.openPreviewModal('${w.photos?.after || w.photos?.before}', '${w.title.replace(/'/g, "\\'")}')"
                            class="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <span>📸 फोटो पहा</span>
                          </button>
                        ` : `<span class="text-[11px] text-slate-400">फोटो नाही</span>`}
                        <button 
                          onclick="window.components.closeSearchResultsModal(); window.components.openWorkModal('${w.id}')"
                          class="px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          सविस्तर तपशील →
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 2. Schemes Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'SCHEMES') && schemes.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>📜</span>
                    <span>शासकीय योजना (${schemes.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('schemes');" class="text-xs text-emerald-800 hover:underline font-bold">
                    सर्व योजना पहा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${schemes.map(s => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-1">
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-950 border border-emerald-200">${s.categoryMr || s.category}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${s.status === 'DONE' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'}">
                            ${s.status === 'DONE' ? '🏁 पूर्ण / संपलेली' : '🟢 चालू योजना'}
                          </span>
                        </div>
                        <h5 class="font-bold text-slate-900 text-sm mb-1">${s.name}</h5>
                        <p class="text-xs text-slate-600 line-clamp-2 mb-2">${s.benefits}</p>
                      </div>
                      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span class="text-[10px] text-slate-500">${s.department}</span>
                        <a 
                          href="${s.officialUrl}" 
                          target="_blank" 
                          class="px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition"
                        >
                          अर्ज व माहिती ↗
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 3. Facilities Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'FACILITIES') && facilities.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏥</span>
                    <span>गाव सुविधा व केंद्रे (${facilities.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('facilities');" class="text-xs text-emerald-800 hover:underline font-bold">
                    सर्व सुविधा पहा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${facilities.map(f => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-100">${f.category}</span>
                        <h5 class="font-bold text-slate-900 text-sm mt-1">${f.name}</h5>
                        <p class="text-xs text-slate-500">📍 ${f.address} • वेळ: ${f.openingHours}</p>
                        <span class="text-xs font-bold text-emerald-950 mt-1 block">📞 ${f.phone}</span>
                      </div>
                      <a href="tel:${f.phone}" class="px-3 py-2 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap">
                        कॉल करा 📞
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 4. Documents Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'DOCS') && docs.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>📑</span>
                    <span>शासकीय कागदपत्रे व बिले (${docs.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('documents');" class="text-xs text-emerald-800 hover:underline font-bold">
                    भांडार पहा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${docs.map(d => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div class="truncate pr-2">
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-900">${d.docType || 'दस्तऐवज'}</span>
                        <h5 class="font-bold text-slate-900 text-sm mt-1 truncate">${d.name}</h5>
                        <p class="text-[11px] text-slate-500">दिनांक: ${d.date} • ${d.fileSize || 'PDF'}</p>
                      </div>
                      <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('documents');" class="px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold rounded-lg shrink-0">
                        पहा 👁️
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 5. Complaints Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'COMPLAINTS') && complaints.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>📝</span>
                    <span>नागरिक तक्रारी (${complaints.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('complaints');" class="text-xs text-emerald-800 hover:underline font-bold">
                    सर्व तक्रारी पहा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${complaints.map(c => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-1">
                          <span class="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-950 px-2 py-0.5 rounded border border-emerald-200">${c.trackingId}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}">
                            ${c.statusMr || c.status}
                          </span>
                        </div>
                        <h5 class="font-bold text-slate-900 text-sm">${c.title || c.description}</h5>
                        <p class="text-xs text-slate-500 mt-0.5">📍 ${c.location} • ${c.submittedDate}</p>
                      </div>
                      <div class="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                        ${c.photoUrl ? `
                          <button onclick="window.components.openComplaintMediaModal('${c.id}')" class="text-xs text-emerald-800 font-bold flex items-center gap-1">
                            <span>📸 फोटो पहा</span>
                          </button>
                        ` : `<span></span>`}
                        <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('complaints');" class="text-xs text-emerald-800 font-bold hover:underline">
                          तपासा →
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 6. Contacts Directory Matches -->
            ${(activeCategory === 'ALL' || activeCategory === 'CONTACTS') && contacts.length > 0 ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>📞</span>
                    <span>संपर्क निर्देशिका क्रमांक (${contacts.length})</span>
                  </h4>
                  <button onclick="window.components.closeSearchResultsModal(); window.appState.setRoute('emergency');" class="text-xs text-emerald-800 hover:underline font-bold">
                    निर्देशिका उघडा →
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${contacts.map(ct => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="text-xl">${ct.icon || '📞'}</span>
                          <h5 class="font-bold text-slate-900 text-sm">${ct.name}</h5>
                        </div>
                        <p class="text-[11px] text-slate-500 mt-0.5">${ct.desc || ''}</p>
                        <span class="text-base font-black text-emerald-950 mt-1 block">${ct.number}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <button onclick="window.components.openEditContactModal('${ct.id}')" class="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-lg text-xs font-bold" title="नंबर बदला">
                          ✏️
                        </button>
                        <a href="tel:${ct.number}" class="px-3 py-2 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap">
                          कॉल करा 📞
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
            <span class="text-slate-500">शोध संज्ञा: <strong>"${query}"</strong></span>
            <button onclick="window.components.closeSearchResultsModal()" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer">
              बंद करा
            </button>
          </div>

        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  closeSearchResultsModal() {
    const container = document.getElementById('search-modal-container');
    if (container) container.innerHTML = '';
  },

  filterSearchModalCategory(cat) {
    if (this.lastSearchResults) {
      this.openSearchResultsModal(this.lastSearchResults.query, this.lastSearchResults, cat);
    }
  },

  // 3. Hero Section & Quick Actions
  renderHero() {
    const t = (k) => window.appState.t(k);
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;

    return `
      <section class="relative bg-gradient-to-b from-[#011a14] via-[#064e3b] to-[#022c22] text-white py-12 px-4 sm:px-6 overflow-hidden">
        <!-- Background subtle decorative pattern -->
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div class="relative max-w-5xl mx-auto text-center">
          
          <!-- Interactive Location Badge -->
          <button 
            onclick="window.components.openLocationModal()" 
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-xs text-emerald-200 font-bold mb-4 transition shadow-sm hover:scale-105 cursor-pointer"
            title="महाराष्ट्र राज्य: स्थान / गाव बदला (Click to Change Village)"
          >
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-indicator"></span>
            <span>📍 गाव: ${v.nameMr} (${v.taluka}, ${v.district})</span>
            <span class="text-white bg-emerald-900/90 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-400/40">गाव बदला 🔄</span>
          </button>

          <!-- Main Hero Heading -->
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            ${t('heroTitle')}
          </h1>
          <p class="text-base sm:text-xl text-emerald-100 max-w-3xl mx-auto font-normal mb-8 leading-relaxed">
            ${t('heroSubtitle')}
          </p>

          <!-- Large Search Form -->
          <div class="max-w-2xl mx-auto mb-10">
            <form onsubmit="event.preventDefault(); window.components.handleGlobalSearch(document.getElementById('hero-search-input').value);" class="flex flex-col sm:flex-row items-center gap-2 bg-white/95 p-2 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm">
              <div class="flex items-center flex-1 w-full px-3">
                <span class="text-xl text-slate-400 mr-2">🔍</span>
                <input 
                  type="text" 
                  id="hero-search-input"
                  placeholder="${t('heroSearchPlaceholder')}"
                  class="w-full py-2.5 text-slate-800 placeholder-slate-400 text-sm sm:text-base bg-transparent focus:outline-none font-medium"
                />
              </div>
              <button type="submit" class="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-sm transition">
                ${t('searchButton')}
              </button>
            </form>

            <!-- Suggested chips -->
            <div class="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-emerald-200">
              <span class="text-emerald-300">उदा:</span>
              <button onclick="window.components.handleGlobalSearch('रस्ता डांबरीकरण')" class="hover:underline bg-white/10 px-2 py-0.5 rounded">रस्ता डांबरीकरण</button>
              <button onclick="window.components.handleGlobalSearch('जल जीवन मिशन')" class="hover:underline bg-white/10 px-2 py-0.5 rounded">जल जीवन मिशन</button>
              <button onclick="window.components.handleGlobalSearch('लाडकी बहीण योजना')" class="hover:underline bg-white/10 px-2 py-0.5 rounded">लाडकी बहीण योजना</button>
              <button onclick="window.components.handleGlobalSearch('आरोग्य उपकेंद्र')" class="hover:underline bg-white/10 px-2 py-0.5 rounded">आरोग्य उपकेंद्र</button>
            </div>
          </div>

          <!-- 6 Quick Action Grid Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-left">
            
            <button onclick="window.appState.setRoute('works')" class="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">🏗️</div>
              <h2 class="font-bold text-sm text-white">${t('qaWorks')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaWorksSub')}</p>
            </button>

            <button onclick="window.appState.setRoute('schemes')" class="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">📜</div>
              <h2 class="font-bold text-sm text-white">${t('qaSchemes')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaSchemesSub')}</p>
            </button>

            <button onclick="window.appState.setRoute('facilities')" class="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">🏥</div>
              <h2 class="font-bold text-sm text-white">${t('qaFacilities')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaFacilitiesSub')}</p>
            </button>

            <button onclick="window.appState.setRoute('complaints')" class="p-4 rounded-xl bg-emerald-800/40 hover:bg-emerald-800/60 border border-emerald-400/40 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <h2 class="font-bold text-sm text-white">${t('qaComplaint')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaComplaintSub')}</p>
            </button>

            <button onclick="window.appState.setRoute('budget')" class="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <h2 class="font-bold text-sm text-white">${t('qaBudget')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaBudgetSub')}</p>
            </button>

            <button onclick="window.appState.setRoute('notifications')" class="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition group">
              <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">🔔</div>
              <h2 class="font-bold text-sm text-white">${t('qaNotices')}</h2>
              <p class="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">${t('qaNoticesSub')}</p>
            </button>

          </div>

        </div>
      </section>
    `;
  },

  // 4. Village Profile & Transparency Metrics
  renderVillageSnapshot() {
    const t = (k) => window.appState.t(k);
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    const m = v.metrics || {
      overallAvailability: 84,
      developmentWorks: 88,
      financialBudget: 80,
      facilities: 92,
      gramSabha: 76
    };

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Village Stats Card -->
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 class="text-xl font-bold text-slate-900">${v.nameMr} — ${t('villageTitle')}</h2>
                <p class="text-xs text-slate-500">${v.gramPanchayat}, ${v.taluka}, ${v.district}</p>
              </div>
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                ● ${t('lastUpdated')}: ${v.lastUpdated || '३० सप्टेंबर २०२६'}
              </span>
            </div>

            <!-- 4 Metrics Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span class="text-xs text-slate-500 font-medium">${t('population')}</span>
                <p class="text-2xl font-extrabold text-emerald-950 mt-1">${v.population.toLocaleString('en-IN')}</p>
                <span class="text-[11px] text-slate-400">नागरिक</span>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span class="text-xs text-slate-500 font-medium">${t('households')}</span>
                <p class="text-2xl font-extrabold text-emerald-950 mt-1">${v.households.toLocaleString('en-IN')}</p>
                <span class="text-[11px] text-slate-400">कुटुंबे</span>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span class="text-xs text-slate-500 font-medium">${t('area')}</span>
                <p class="text-2xl font-extrabold text-emerald-950 mt-1">${v.area.toLocaleString('en-IN')}</p>
                <span class="text-[11px] text-slate-400">${t('hectares')}</span>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span class="text-xs text-slate-500 font-medium">${t('pinCode')}</span>
                <p class="text-2xl font-extrabold text-emerald-950 mt-1">${v.pinCode}</p>
                <span class="text-[11px] text-slate-400">${v.taluka} पोस्टल झोन</span>
              </div>
            </div>

            <!-- Public Contacts Bar -->
            <div class="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-base">🏢</span>
                <span class="font-bold text-emerald-950">ग्रामपंचायत कार्यालय:</span>
                <span class="font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200">${window.appState.getContactNumber('panchayatOffice', v.publicContacts.panchayatOffice)}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-base">👤</span>
                <span class="font-bold text-emerald-950">सरपंच कक्ष:</span>
                <span class="font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200">${window.appState.getContactNumber('sarpanchOffice', v.publicContacts.sarpanchOffice)}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-base">📋</span>
                <span class="font-bold text-emerald-950">ग्रामसेवक कक्ष:</span>
                <span class="font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200">${window.appState.getContactNumber('gramSevakOffice', v.publicContacts.gramSevakOffice)}</span>
              </div>
              <div class="flex items-center gap-2 ml-auto">
                <button onclick="window.appState.setRoute('emergency')" class="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shadow-xs">
                  <span>📞 संपर्क निर्देशिका व नंबर बदला</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Information Availability Metric (Sec 4.17) -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-slate-900 text-sm">${t('transparencyTitle')}</h3>
                <span class="text-xl font-extrabold text-emerald-950">${m.overallAvailability}%</span>
              </div>

              <!-- Main Progress Bar -->
              <div class="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-800 to-emerald-500 h-3 rounded-full" style="width: ${m.overallAvailability}%"></div>
              </div>

              <!-- Breakdown Categories -->
              <div class="space-y-2.5 text-xs text-slate-600 mb-4">
                <div>
                  <div class="flex justify-between mb-1">
                    <span>${t('transparencyWorks')}</span>
                    <span class="font-bold text-slate-800">${m.developmentWorks}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-emerald-700 h-1.5 rounded-full" style="width: ${m.developmentWorks}%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span>${t('transparencyBudget')}</span>
                    <span class="font-bold text-slate-800">${m.financialBudget}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-emerald-700 h-1.5 rounded-full" style="width: ${m.financialBudget}%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span>${t('transparencyFacilities')}</span>
                    <span class="font-bold text-slate-800">${m.facilities}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-emerald-600 h-1.5 rounded-full" style="width: ${m.facilities}%"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span>${t('transparencyGramSabha')}</span>
                    <span class="font-bold text-slate-800">${m.gramSabha}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-emerald-600 h-1.5 rounded-full" style="width: ${m.gramSabha}%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mandatory Non-Judgmental Disclaimer (Sec 4.17) -->
            <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 leading-tight">
              <strong>टीप:</strong> ${m.disclaimer}
            </div>
          </div>

        </div>

      </section>
    `;
  },

  // 5. Development Works Tracker View (Sec 4.5, 4.6, 4.7)
  renderWorksView(filterStatus = 'ALL') {
    const t = (k) => window.appState.t(k);
    const works = window.appState.state.works;
    const isAdmin = window.appState.isAdmin();

    const filtered = filterStatus === 'ALL' 
      ? works 
      : works.filter(w => w.status === filterStatus);

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Header & Filter Tabs -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <span>🏗️</span>
              <span>गावाचा विकास आराखडा</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('worksHeading')}</h1>
            <p class="text-sm text-slate-500 mt-1">${t('worksSubheading')}</p>
          </div>

          <div class="flex items-center gap-2.5 flex-wrap">
            ${isAdmin ? `
              <button 
                onclick="window.components.openAddWorkModal()" 
                class="px-3.5 py-2 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-105"
                title="नवीन विकासकाम प्रविष्ट करा"
              >
                <span>➕</span>
                <span>नवीन काम जोडा</span>
                <span class="bg-white text-emerald-950 text-[9px] px-1.5 py-0.5 rounded font-black">Admin</span>
              </button>
            ` : `
              <div class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <span>👁️</span>
                <span>केवळ वाचक (Read Only)</span>
              </div>
            `}

            <!-- Status Filters -->
            <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
              <button onclick="window.components.filterWorks('ALL')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${filterStatus === 'ALL' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ${t('filterAll')} (${works.length})
              </button>
              <button onclick="window.components.filterWorks('IN_PROGRESS')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${filterStatus === 'IN_PROGRESS' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ${t('filterInProgress')} (${works.filter(w => w.status === 'IN_PROGRESS').length})
              </button>
              <button onclick="window.components.filterWorks('COMPLETED')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${filterStatus === 'COMPLETED' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ${t('filterCompleted')} (${works.filter(w => w.status === 'COMPLETED').length})
              </button>
              <button onclick="window.components.filterWorks('APPROVED')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${filterStatus === 'APPROVED' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ${t('filterApproved')} (${works.filter(w => w.status === 'APPROVED').length})
              </button>
            </div>
          </div>
        </div>

        <!-- Works Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(work => this.renderWorkCard(work)).join('')}
        </div>

      </section>

      <!-- Work Detail Modal Container -->
      <div id="work-modal-container"></div>
    `;
  },

  renderWorkCard(work) {
    const t = (k) => window.appState.t(k);
    
    // Status badges
    let statusClass = "bg-emerald-50 text-emerald-950 border-emerald-200";
    let statusLabel = t('statusApproved');
    if (work.status === 'COMPLETED') {
      statusClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
      statusLabel = t('statusCompleted');
    } else if (work.status === 'IN_PROGRESS') {
      statusClass = "bg-emerald-100 text-emerald-900 border-emerald-300";
      statusLabel = t('statusInProgress');
    }

    const spentPercent = Math.min(100, Math.round((work.spentAmount / work.sanctionedAmount) * 100));

    return `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
        
        <div>
          <!-- Card Header -->
          <div class="p-5 border-b border-slate-100">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ${work.workId}
              </span>
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusClass}">
                ● ${statusLabel}
              </span>
            </div>
            
            <h2 class="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
              ${work.title}
            </h2>
            <p class="text-xs text-slate-500 mt-1">📍 ${work.location}</p>
          </div>

          <!-- Financial Breakdown Card (Sanctioned, Released, Spent) -->
          <div class="p-5 bg-slate-50/50 space-y-3">
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span class="text-slate-400 block">${t('sanctionedAmount')}</span>
                <span class="font-extrabold text-slate-900 text-sm">₹${work.sanctionedAmount.toLocaleString('en-IN')}</span>
              </div>
              <div class="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span class="text-slate-400 block">${t('spentAmount')}</span>
                <span class="font-extrabold text-emerald-950 text-sm">₹${work.spentAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Spending progress bar -->
            <div>
              <div class="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>खर्च प्रगती</span>
                <span class="font-bold text-slate-800">${spentPercent}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div class="bg-emerald-700 h-2 rounded-full" style="width: ${spentPercent}%"></div>
              </div>
            </div>

            <!-- Department & Scheme -->
            <div class="text-[11px] text-slate-600 pt-1 space-y-1">
              <div><strong>विभाग:</strong> ${work.department}</div>
              <div><strong>योजना:</strong> ${work.scheme || '—'}</div>
              <div><strong>कंत्राटदार:</strong> ${work.contractor || '—'}</div>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
          ${work.photos?.after || work.photos?.before || work.photos?.during ? `
            <button 
              onclick="window.components.openPreviewModal('${work.photos?.after || work.photos?.before || work.photos?.during}', '${work.title.replace(/'/g, "\\'")}')"
              class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
              title="कामाचा फोटो मोठ्या आकारात पहा"
            >
              <span>📸</span>
              <span>फोटो पहा (View Photo)</span>
            </button>
          ` : `
            <div class="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
              <span>🟢</span>
              <span>अधिकृत स्रोत</span>
            </div>
          `}

          <button 
            onclick="window.components.openWorkModal('${work.id}')"
            class="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
          >
            ${t('viewDetails')} →
          </button>
        </div>

      </div>
    `;
  },

  filterWorks(status) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.renderWorksView(status);
      this.applyLanguageToDOM(main);
    }
  },

  openWorkModal(workId) {
    const work = window.appState.state.works.find(w => w.id === workId);
    if (!work) return;

    const t = (k) => window.appState.t(k);
    const container = document.getElementById('work-modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeWorkModal()">
        <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200" onclick="event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-start justify-between gap-4 z-10">
            <div>
              <span class="text-xs font-mono font-bold bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded">
                ${work.workId}
              </span>
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">${work.title}</h2>
              <p class="text-xs text-slate-500 mt-1">📍 ${work.location} | विभाग: ${work.department}</p>
            </div>
            <button onclick="window.components.closeWorkModal()" class="text-slate-400 hover:text-slate-700 p-2 text-xl font-bold">
              ✕
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-6">
            
            <!-- Financial Summary Box -->
            <div class="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
              <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-3">आर्थिक पारदर्शकता तपशील (Financial Breakdown)</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="bg-white p-3 rounded-xl border border-emerald-200/60">
                  <span class="text-xs text-slate-500 block">अंदाजित किंमत</span>
                  <span class="font-extrabold text-slate-900 text-base">₹${work.estimatedCost.toLocaleString('en-IN')}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-emerald-200/60">
                  <span class="text-xs text-slate-500 block">मंजूर निधी</span>
                  <span class="font-extrabold text-emerald-950 text-base">₹${work.sanctionedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-emerald-200/60">
                  <span class="text-xs text-slate-500 block">वितरीत निधी</span>
                  <span class="font-extrabold text-slate-900 text-base">₹${work.releasedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-emerald-200/60">
                  <span class="text-xs text-slate-500 block">झालेला प्रत्यक्ष खर्च</span>
                  <span class="font-extrabold text-emerald-700 text-base">₹${work.spentAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <!-- Timeline of Work (Sec 4.6) -->
            <div>
              <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>⏱️</span>
                <span>${t('timelineHeading')}</span>
              </h3>
              
              <div class="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                ${work.timeline.map((step, idx) => `
                  <div class="relative">
                    <div class="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white ${step.status === 'COMPLETED' ? 'bg-emerald-600' : (step.status === 'IN_PROGRESS' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300')} shadow-sm"></div>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div class="flex items-center justify-between text-xs mb-1">
                        <span class="font-bold text-slate-900">${step.stage}</span>
                        <span class="text-slate-500">${step.date}</span>
                      </div>
                      <p class="text-xs text-slate-600">${step.note}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Project Photos Gallery (Before / During / After) (Sec 4.7) -->
            <div>
              <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>📷</span>
                <span>कामाची छायाचित्रे (Project Photos)</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-center flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-bold py-1 bg-slate-200 text-slate-700">कामापूर्वी (Before)</div>
                    ${work.photos?.before ? `
                      <div class="relative group cursor-pointer overflow-hidden" onclick="window.components.openPreviewModal('${work.photos.before}', '${work.title.replace(/'/g, "\\'")} - कामापूर्वी (Before)')" title="मोठ्या आकारात पाहण्यासाठी क्लिक करा">
                        <img src="${work.photos.before}" alt="Before" class="w-full h-36 object-cover group-hover:scale-105 transition" />
                        <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1">
                          <span>🔍 मोठे करा</span>
                        </div>
                      </div>
                    ` : `
                      <div class="h-36 flex items-center justify-center text-xs text-slate-400">छायाचित्र उपलब्ध नाही</div>
                    `}
                  </div>
                  ${work.photos?.before ? `
                    <div class="p-2 bg-white border-t border-slate-100">
                      <button 
                        type="button"
                        onclick="window.components.openPreviewModal('${work.photos.before}', '${work.title.replace(/'/g, "\\'")} - कामापूर्वी (Before)')"
                        class="w-full py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>👁️</span>
                        <span>फोटो पहा (View Photo)</span>
                      </button>
                    </div>
                  ` : ''}
                </div>

                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-center flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-bold py-1 bg-emerald-100 text-emerald-950 font-bold">काम सुरू असताना (During)</div>
                    ${work.photos?.during ? `
                      <div class="relative group cursor-pointer overflow-hidden" onclick="window.components.openPreviewModal('${work.photos.during}', '${work.title.replace(/'/g, "\\'")} - काम सुरू असताना (During)')" title="मोठ्या आकारात पाहण्यासाठी क्लिक करा">
                        <img src="${work.photos.during}" alt="During" class="w-full h-36 object-cover group-hover:scale-105 transition" />
                        <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1">
                          <span>🔍 मोठे करा</span>
                        </div>
                      </div>
                    ` : `
                      <div class="h-36 flex items-center justify-center text-xs text-slate-400">छायाचित्र उपलब्ध नाही</div>
                    `}
                  </div>
                  ${work.photos?.during ? `
                    <div class="p-2 bg-white border-t border-slate-100">
                      <button 
                        type="button"
                        onclick="window.components.openPreviewModal('${work.photos.during}', '${work.title.replace(/'/g, "\\'")} - काम सुरू असताना (During)')"
                        class="w-full py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>👁️</span>
                        <span>फोटो पहा (View Photo)</span>
                      </button>
                    </div>
                  ` : ''}
                </div>

                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-center flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-bold py-1 bg-emerald-100 text-emerald-800">कामानंतर (After)</div>
                    ${work.photos?.after ? `
                      <div class="relative group cursor-pointer overflow-hidden" onclick="window.components.openPreviewModal('${work.photos.after}', '${work.title.replace(/'/g, "\\'")} - कामानंतर (After)')" title="मोठ्या आकारात पाहण्यासाठी क्लिक करा">
                        <img src="${work.photos.after}" alt="After" class="w-full h-36 object-cover group-hover:scale-105 transition" />
                        <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-1">
                          <span>🔍 मोठे करा</span>
                        </div>
                      </div>
                    ` : `
                      <div class="h-36 flex items-center justify-center text-xs text-slate-400">काम पूर्ण झाल्यावर जोडले जाईल</div>
                    `}
                  </div>
                  ${work.photos?.after ? `
                    <div class="p-2 bg-white border-t border-slate-100">
                      <button 
                        type="button"
                        onclick="window.components.openPreviewModal('${work.photos.after}', '${work.title.replace(/'/g, "\\'")} - कामानंतर (After)')"
                        class="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>👁️</span>
                        <span>फोटो पहा (View Photo)</span>
                      </button>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Source Document & Verification Citation (Sec 4.18) -->
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
              <div class="flex items-center gap-2 text-emerald-900 font-bold mb-1">
                <span>🟢</span>
                <span>पडताळणी झालेली अधिकृत माहिती (Official Source Verified)</span>
              </div>
              <p class="text-emerald-800">
                <strong>अधिकृत स्रोत:</strong> ${work.sourceDocument}
              </p>
              <p class="text-emerald-700 text-[11px] mt-0.5">
                शेवटचे अद्ययावत: ${work.lastUpdated} | नोंदणीकृत कंत्राटदार: ${work.contractor || 'माहिती उपलब्ध नाही'}
              </p>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button onclick="window.components.closeWorkModal()" class="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs">
              ${t('closeModal')}
            </button>
          </div>

        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  closeWorkModal() {
    const container = document.getElementById('work-modal-container');
    if (container) container.innerHTML = '';
  },

  // 6. Budget Transparency View (Sec 4.8)
  renderBudgetView(year = "2025-26") {
    const t = (k) => window.appState.t(k);
    const budgets = window.VILLAGE_DATA.budgets;
    const b = budgets[year] || budgets["2025-26"];

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <span>📊</span>
              <span>पारदर्शक आर्थिक हिशोब</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('budgetHeading')}</h1>
            <p class="text-sm text-slate-500 mt-1">${t('budgetSubheading')}</p>
          </div>

          <!-- FY Selector -->
          <div class="flex items-center gap-2">
            <label for="fy-select" class="text-xs font-bold text-slate-600">${t('fySelector')}:</label>
            <select 
              id="fy-select"
              onchange="window.components.switchBudgetYear(this.value)"
              class="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="2025-26" ${year === '2025-26' ? 'selected' : ''}>२०२५ - २०२६ (चालू)</option>
              <option value="2024-25" ${year === '2024-25' ? 'selected' : ''}>२०२४ - २०२५ (मागील)</option>
            </select>
          </div>
        </div>

        <!-- 4 Top Budget Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-medium">${t('totalSanctioned')}</span>
            <p class="text-2xl font-black text-slate-900 mt-1">₹${b.sanctionedAmount.toLocaleString('en-IN')}</p>
            <span class="text-[11px] text-emerald-700 font-semibold">शासकीय तरतूद</span>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-medium">${t('totalReceived')}</span>
            <p class="text-2xl font-black text-emerald-950 mt-1">₹${b.receivedAmount.toLocaleString('en-IN')}</p>
            <span class="text-[11px] text-emerald-600 font-semibold">बँक खात्यात जमा</span>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-medium">${t('totalSpent')}</span>
            <p class="text-2xl font-black text-emerald-700 mt-1">₹${b.spentAmount.toLocaleString('en-IN')}</p>
            <span class="text-[11px] text-slate-400">देयके अदा</span>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-medium">${t('balanceFund')}</span>
            <p class="text-2xl font-black text-emerald-900 mt-1">₹${b.remainingAmount.toLocaleString('en-IN')}</p>
            <span class="text-[11px] text-emerald-800 font-semibold">शिल्लक उपलब्ध</span>
          </div>
        </div>

        <!-- Category Breakdown Table & Visual Bar -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 class="text-base font-bold text-slate-900 mb-4">खर्च विभागणी (Category-wise Budget Allocation)</h2>
          
          <div class="space-y-4">
            ${b.categories.map(cat => {
              const pct = Math.round((cat.spent / cat.sanctioned) * 100);
              return `
                <div>
                  <div class="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>${cat.name}</span>
                    <span class="font-mono">₹${cat.spent.toLocaleString('en-IN')} / ₹${cat.sanctioned.toLocaleString('en-IN')} (${pct}%)</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div class="h-3 rounded-full" style="width: ${pct}%; background-color: ${cat.color}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Audit & Source Box -->
        <div class="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span class="font-bold text-emerald-950 block">${t('auditStatus')}:</span>
            <span class="text-emerald-900">${b.auditStatus}</span>
            <p class="text-slate-500 mt-0.5">स्रोत: ${b.sourceDocument}</p>
          </div>
          <button onclick="window.appState.setRoute('documents')" class="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm whitespace-nowrap">
            📂 लेखापरीक्षण अहवाल पहा (View Audit Doc)
          </button>
        </div>

      </section>
    `;
  },

  switchBudgetYear(year) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.renderBudgetView(year);
      this.applyLanguageToDOM(main);
    }
  },

  // 7. Government Schemes View (Sec 4.9)
  renderSchemesView(activeCategory = 'ALL', statusFilter = 'ACTIVE') {
    const t = (k) => window.appState.t(k);
    const allSchemes = window.appState.state.schemes || window.VILLAGE_DATA?.schemes || [];

    const activeCount = allSchemes.filter(s => (s.status || 'ACTIVE') === 'ACTIVE').length;
    const doneCount = allSchemes.filter(s => s.status === 'DONE').length;

    const categories = [
      { id: 'ALL', label: 'सर्व वर्गवारी' },
      { id: 'Farmers', label: '🌾 शेतकरी' },
      { id: 'Women', label: '👩 महिला' },
      { id: 'Students', label: '🎓 विद्यार्थी' },
      { id: 'Senior Citizens', label: '👴 ज्येष्ठ नागरिक' },
      { id: 'Housing', label: '🏠 घरकुल' },
      { id: 'Health', label: '🩺 आरोग्य' }
    ];

    // Filter by status first (Default: ONLY ACTIVE schemes shown)
    let filtered = allSchemes;
    if (statusFilter === 'ACTIVE') {
      filtered = allSchemes.filter(s => (s.status || 'ACTIVE') === 'ACTIVE');
    } else if (statusFilter === 'DONE') {
      filtered = allSchemes.filter(s => s.status === 'DONE');
    }

    // Then filter by category
    if (activeCategory !== 'ALL') {
      filtered = filtered.filter(s => s.category === activeCategory);
    }

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Header -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <span>📜</span>
            <span>जनहित कल्याणकारी योजना व सद्यस्थिती</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('schemesHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('schemesSubheading')}</p>
        </div>

        <!-- Real-time Status Filter Tabs (ACTIVE vs DONE / EXPIRED) -->
        <div class="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white p-4 rounded-2xl shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-900">
          <div>
            <div class="text-xs text-emerald-200 font-bold uppercase tracking-wider mb-1">योजना सद्यस्थिती फिल्टर (Real-time Status):</div>
            <div class="inline-flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/20">
              <button 
                onclick="window.components.filterSchemes('${activeCategory}', 'ACTIVE')"
                class="px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${statusFilter === 'ACTIVE' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-200 hover:text-white hover:bg-white/10'}"
              >
                <span>🟢</span>
                <span>सध्या चालू योजना (${activeCount})</span>
              </button>

              <button 
                onclick="window.components.filterSchemes('${activeCategory}', 'DONE')"
                class="px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${statusFilter === 'DONE' ? 'bg-emerald-800 text-white font-black shadow-md border border-emerald-600' : 'text-slate-200 hover:text-white hover:bg-white/10'}"
              >
                <span>🏁</span>
                <span>संपलेल्या / पूर्ण योजना (${doneCount})</span>
              </button>

              <button 
                onclick="window.components.filterSchemes('${activeCategory}', 'ALL')"
                class="px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${statusFilter === 'ALL' ? 'bg-white text-emerald-950 font-black shadow-md' : 'text-slate-200 hover:text-white hover:bg-white/10'}"
              >
                <span>सर्व (${allSchemes.length})</span>
              </button>
            </div>
          </div>

          <div class="text-xs text-emerald-200 sm:text-right">
            <span class="inline-block bg-white/15 px-3 py-1 rounded-full text-[11px] font-semibold border border-white/20">
              ${statusFilter === 'ACTIVE' ? '✅ केवळ सध्या चालू असलेल्या योजना दाखवत आहे' : (statusFilter === 'DONE' ? '⚠️ मुदत संपलेल्या किंवा पूर्ण झालेल्या योजना' : 'सर्व योजनांची एकत्रित यादी')}
            </span>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          ${categories.map(cat => `
            <button 
              onclick="window.components.filterSchemes('${cat.id}', '${statusFilter}')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeCategory === cat.id ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}"
            >
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- Schemes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filtered.length === 0 ? `
            <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <span class="text-4xl block">📜</span>
              <h3 class="text-base font-bold text-slate-800">या वर्गवारीत कोणतीही योजना आढळली नाही</h3>
              <p class="text-xs text-slate-500">कृपया इतर वर्गवारी किंवा 'सर्व योजना' निवडून पहा.</p>
              <button onclick="window.components.filterSchemes('ALL', 'ACTIVE')" class="px-4 py-2 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm">
                चालू योजना पहा
              </button>
            </div>
          ` : ''}

          ${filtered.map(scheme => {
            const isDone = scheme.status === 'DONE';
            return `
              <div class="bg-white rounded-2xl border ${isDone ? 'border-slate-300 bg-slate-50/70 opacity-90' : 'border-slate-200'} shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <!-- Status & Category Bar -->
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${isDone ? 'bg-slate-200 text-slate-700 border border-slate-300' : 'bg-emerald-50 text-emerald-950 border border-emerald-200'}">
                      ${scheme.categoryMr}
                    </span>
                    
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${isDone ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                      ${isDone ? '🏁 मुदत संपली / पूर्ण (Done)' : '🟢 अर्ज सुरू (Active)'}
                    </span>
                  </div>

                  <h2 class="text-lg font-bold text-slate-900 mb-1 leading-snug">${scheme.name}</h2>
                  <p class="text-xs text-emerald-900 font-semibold mb-3">विभाग: ${scheme.department}</p>

                  <!-- Closed / Done Notice if applicable -->
                  ${isDone ? `
                    <div class="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-800 mb-3 flex items-start gap-2">
                      <span class="text-base">⚠️</span>
                      <div>
                        <strong>मुदत संपलेली योजना (Closed Scheme):</strong>
                        <p class="text-[11px] text-slate-600 mt-0.5">या योजनेचा अर्ज कालावधी अथवा उद्दिष्ट पूर्ण झालेले आहे. ${scheme.doneDate ? 'नोंद दिनांक: ' + scheme.doneDate : ''}</p>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Benefits -->
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs mb-3">
                    <strong class="text-slate-900 block mb-1">🎁 ${t('benefits')}:</strong>
                    <p class="text-slate-700">${scheme.benefits}</p>
                  </div>

                  <!-- Eligibility -->
                  <div class="text-xs text-slate-700 mb-3">
                    <strong class="text-slate-900 block mb-1">✅ ${t('eligibility')}:</strong>
                    <p>${scheme.eligibility}</p>
                  </div>

                  <!-- Required Documents -->
                  <div class="text-xs text-slate-700 mb-4">
                    <strong class="text-slate-900 block mb-1">📑 ${t('documentsRequired')}:</strong>
                    <ul class="list-disc pl-4 space-y-0.5 text-slate-600">
                      ${(scheme.requiredDocuments || []).map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <!-- Footer & Action Controls -->
                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <!-- Real-time Admin Status Toggle Button -->
                  <div class="flex items-center gap-2">
                    ${isDone ? `
                      <button 
                        onclick="window.appState.toggleSchemeStatus('${scheme.id}', 'ACTIVE'); window.components.filterSchemes('${activeCategory}', '${statusFilter}')"
                        class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                        title="या योजनेला पुन्हा सक्रिय करा"
                      >
                        <span>🟢</span>
                        <span>पुन्हा सक्रिय करा (Mark Active)</span>
                      </button>
                    ` : `
                      <button 
                        onclick="window.appState.toggleSchemeStatus('${scheme.id}', 'DONE'); window.components.filterSchemes('${activeCategory}', '${statusFilter}')"
                        class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                        title="ही योजना पूर्ण / संपलेली म्हणून चिन्हांकित करा"
                      >
                        <span>🏁</span>
                        <span>पूर्ण झाली म्हणून नोंदवा (Mark as Done)</span>
                      </button>
                    `}
                  </div>

                  <div class="flex items-center justify-end gap-2">
                    <a 
                      href="${scheme.officialUrl}" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="px-4 py-2 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition text-center"
                    >
                      ${t('officialSite')} ↗
                    </a>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </section>
    `;
  },

  filterSchemes(cat, status = 'ACTIVE') {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.renderSchemesView(cat, status);
      this.applyLanguageToDOM(main);
    }
  },

  // 8. Facilities Directory View (Sec 4.10)
  renderFacilitiesView() {
    const t = (k) => window.appState.t(k);
    const facilities = window.VILLAGE_DATA.facilities;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <span>🏥</span>
              <span>नागरिक सुविधा डिरेक्टरी</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('facilitiesHeading')}</h1>
            <p class="text-sm text-slate-500 mt-1">${t('facilitiesSubheading')}</p>
          </div>

          <button onclick="window.appState.setRoute('map')" class="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 self-start md:self-auto">
            <span>🗺️</span>
            <span>${t('locateOnMap')}</span>
          </button>
        </div>

        <!-- Facilities Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${facilities.map(fac => `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200">
                    ${fac.categoryMr}
                  </span>
                  <span class="text-xs text-emerald-700 font-semibold">🟢 पडताळलेले</span>
                </div>

                <h2 class="text-base font-bold text-slate-900 mb-1">${fac.name}</h2>
                <p class="text-xs text-slate-500 mb-3">📍 ${fac.address}</p>

                <!-- Hours -->
                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs mb-3">
                  <strong class="text-slate-800 block">${t('openingHours')}:</strong>
                  <span class="text-slate-600">${fac.openingHours}</span>
                </div>

                <!-- Services -->
                <div class="text-xs mb-4">
                  <strong class="text-slate-800 block mb-1">${t('servicesOffered')}:</strong>
                  <ul class="list-disc pl-4 space-y-0.5 text-slate-600">
                    ${fac.services.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <!-- Contact & Call Button -->
              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs font-bold text-slate-800">${fac.phone}</span>
                <a href="tel:${fac.phone}" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1">
                  <span>📞</span>
                  <span>${t('callNow')}</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

      </section>
    `;
  },

  // 9. Interactive Village Map View (Sec 4.11)
  renderMapView() {
    const t = (k) => window.appState.t(k);
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    const locations = window.MAHARASHTRA_LOCATIONS || [];

    setTimeout(() => {
      this.initLeafletMap();
      this.initMapBarDropdowns();
      if (window.leafletMapInstance) {
        setTimeout(() => window.leafletMapInstance.invalidateSize(), 200);
      }
    }, 100);

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <span>🗺️</span>
              <span>डिजिटल गाव नकाशा व जिओ-टॅगिंग</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('mapHeading')}</h1>
            <p class="text-sm text-slate-500 mt-1">${t('mapSubheading')}</p>
          </div>

          <!-- Direct Location Change Trigger Button -->
          <button 
            onclick="window.components.openLocationModal()" 
            class="px-5 py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-black rounded-xl text-xs shadow-md transition flex items-center gap-2 self-start md:self-auto hover:scale-105"
          >
            <span class="text-base">📍</span>
            <span>स्थान / गाव बदला (Change Village / District)</span>
          </button>
        </div>

        <!-- Maharashtra Location Selector Bar -->
        <div class="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white p-5 rounded-2xl shadow-lg mb-6 space-y-4 border border-emerald-800">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-xl">📍</span>
              <div>
                <span class="text-[11px] text-emerald-200 uppercase font-bold tracking-wider block">सध्याचे निवडलेले गाव (Active Village):</span>
                <span class="text-lg font-black text-emerald-200">
                  ${v.nameMr} (${v.name}), ता. ${v.taluka}, जि. ${v.district}
                </span>
              </div>
            </div>

            <span class="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full border border-white/20 text-slate-200">
              पिन: ${v.pinCode} | लोकसंख्या: ${v.population.toLocaleString('en-IN')}
            </span>
          </div>

          <!-- Quick Dropdowns: District (36 Districts) -> Taluka -> Village -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label class="block text-[11px] font-bold text-emerald-200 mb-1">१. जिल्हा निवडा (36 Districts)</label>
              <select 
                id="mapbar-district" 
                onchange="window.components.onMapBarDistrictChange(this.value)"
                class="w-full px-3 py-2.5 bg-white text-slate-900 font-bold rounded-xl focus:outline-none shadow-sm cursor-pointer"
              >
                ${locations.map(d => `
                  <option value="${d.districtId}" ${d.districtNameMr.includes(v.district) || v.district.includes(d.districtNameMr) ? 'selected' : ''}>
                    ${d.districtNameMr} (${d.districtName})
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-emerald-200 mb-1">२. तालुका निवडा (Taluka)</label>
              <select 
                id="mapbar-taluka" 
                onchange="window.components.onMapBarTalukaChange(this.value)"
                class="w-full px-3 py-2.5 bg-white text-slate-900 font-bold rounded-xl focus:outline-none shadow-sm cursor-pointer"
              >
                <option value="">तालुका निवडा</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-emerald-200 mb-1">३. गाव निवडा (Village)</label>
              <select 
                id="mapbar-village" 
                class="w-full px-3 py-2.5 bg-white text-slate-900 font-bold rounded-xl focus:outline-none shadow-sm cursor-pointer"
              >
                <option value="">गाव निवडा</option>
              </select>
            </div>

            <div class="flex items-end">
              <button 
                onclick="window.components.applyMapBarLocation()" 
                class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>🚀</span>
                <span>गाव लागू करा व जा</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Layers & Base Map Controls -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <!-- Base Map Switcher -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-slate-700">🗺️ नकाशा:</span>
            <div class="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                id="basemap-voyager"
                onclick="window.components.switchBaseMap('voyager')" 
                class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950 text-white shadow-xs transition"
              >
                🗺️ रस्ते (Street)
              </button>
              <button 
                id="basemap-satellite"
                onclick="window.components.switchBaseMap('satellite')" 
                class="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 transition"
              >
                🛰️ सॅटेलाइट (Satellite)
              </button>
              <button 
                id="basemap-topo"
                onclick="window.components.switchBaseMap('topo')" 
                class="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 transition"
              >
                🏔️ भूप्रदेश (Topo)
              </button>
              <button 
                id="basemap-streetview"
                onclick="window.components.openStreetViewModal()" 
                class="px-3 py-1 rounded-lg text-[11px] font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition flex items-center gap-1 cursor-pointer shadow-xs"
                title="थेट ३६०° स्ट्रीट दृश्य (API Key ची आवश्यकता नाही)"
              >
                <span>📷</span>
                <span>स्ट्रीट दृश्य (Street View)</span>
              </button>
            </div>
          </div>

          <!-- Feature Layers -->
          <div class="flex items-center gap-3.5 flex-wrap">
            <span class="font-bold text-slate-700">लेअर्स:</span>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="layer-works" checked onchange="window.components.toggleMapLayer('works', this.checked)" class="rounded text-emerald-700">
              <span class="text-emerald-950 font-semibold">🏗️ विकासकामे</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="layer-health" checked onchange="window.components.toggleMapLayer('health', this.checked)" class="rounded text-emerald-600">
              <span class="text-emerald-900 font-semibold">🏥 आरोग्य</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="layer-schools" checked onchange="window.components.toggleMapLayer('schools', this.checked)" class="rounded text-emerald-600">
              <span class="text-emerald-900 font-semibold">🏫 शाळा</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="layer-water" checked onchange="window.components.toggleMapLayer('water', this.checked)" class="rounded text-teal-600">
              <span class="text-teal-900 font-semibold">💧 पाणी साठा</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="layer-districts" checked onchange="window.components.toggleMapLayer('districts', this.checked)" class="rounded text-emerald-800">
              <span class="text-emerald-950 font-semibold">📍 सर्व ३६ जिल्हे</span>
            </label>
          </div>

          <span class="text-[11px] text-slate-500 font-medium hidden lg:inline">
            💡 नकाशावर कुठेही क्लिक करून स्थान बदला
          </span>
        </div>

        <!-- Leaflet Map Container & Info Side Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div id="village-map-container" class="shadow-md border border-slate-200"></div>
          </div>

          <!-- Side Information Panel (Desktop) / Bottom Sheet (Mobile) -->
          <div id="map-info-panel" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-slate-400">निवडलेले ठिकाण (Location Info)</span>
              <h2 id="panel-title" class="text-lg font-bold text-slate-900 mt-1">📍 ${v.nameMr} ग्रामपंचायत केंद्र</h2>
              <p id="panel-desc" class="text-xs text-slate-500 mt-2">
                नकाशावरील कोणत्याही मार्करवर किंवा जिल्ह्यावर क्लिक करून संबंधित विकासकाम किंवा गावाची माहिती पहा.
              </p>
              
              <div id="panel-details" class="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2">
                <div><strong>अक्षांश / रेखांश:</strong> ${v.latitude.toFixed(4)}° N, ${v.longitude.toFixed(4)}° E</div>
                <div><strong>तालुका:</strong> ${v.taluka} | <strong>जिल्हा:</strong> ${v.district}</div>
                <div><strong>पिन कोड:</strong> ${v.pinCode} | <strong>लोकसंख्या:</strong> ${v.population.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <button 
                id="panel-streetview-btn"
                onclick="window.components.openStreetViewModal(${v.latitude}, ${v.longitude}, '${v.nameMr} ग्रामपंचायत केंद्र')" 
                class="w-full py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-black rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📷</span>
                <span>या स्थानाचे स्ट्रीट दृश्य पहा (Street & Ground View)</span>
              </button>
              <button onclick="window.components.openLocationModal()" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition">
                📍 दुसरे गाव निवडा (Select Another Village)
              </button>
              <button onclick="window.appState.setRoute('works')" class="w-full py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition">
                या गावातील सर्व विकासकामे पहा →
              </button>
            </div>
          </div>
        </div>

      </section>
    `;
  },

  initLeafletMap() {
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    const container = document.getElementById('village-map-container');
    if (!container) return;

    if (typeof L === 'undefined') {
      // Offline / SVG Interactive Fallback Map
      container.innerHTML = `
        <div class="relative w-full h-[520px] bg-slate-900 rounded-xl overflow-hidden p-6 border border-slate-700 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs text-slate-300">
            <span class="font-bold text-emerald-300">🗺️ ${v.nameMr} (${v.district}) डिजिटल नकाशा (Geospatial View)</span>
            <span>अक्षांश: ${v.latitude.toFixed(4)}° N, रेखांश: ${v.longitude.toFixed(4)}° E</span>
          </div>

          <svg class="w-full h-80 my-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 200 Q 250 180 400 200 T 750 210" fill="none" stroke="#64748b" stroke-width="14" stroke-linecap="round"/>
            <path d="M 50 200 Q 250 180 400 200 T 750 210" fill="none" stroke="#f1f5f9" stroke-width="2" stroke-dasharray="8,8"/>
            <path d="M 400 50 L 400 350" fill="none" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>

            <circle cx="400" cy="200" r="45" fill="#064e3b" opacity="0.3"/>
            <circle cx="400" cy="200" r="14" fill="#059669"/>
            <text x="400" y="235" fill="#a7f3d0" font-size="13" font-weight="bold" text-anchor="middle">${v.nameMr} ग्रामपंचायत केंद्र</text>

            <circle cx="220" cy="185" r="10" fill="#047857" class="cursor-pointer" onclick="document.getElementById('panel-title').innerText='🏗️ मुख्य रस्ता विकासकाम'; document.getElementById('panel-desc').innerText='मंजूर: ₹२८,५०,००० | स्थिती: काम सुरू'"/>
            <text x="220" y="165" fill="#a7f3d0" font-size="11" text-anchor="middle">रस्ता विकास</text>

            <circle cx="580" cy="205" r="10" fill="#06b6d4" class="cursor-pointer" onclick="document.getElementById('panel-title').innerText='💧 जल जीवन मिशन पाणी साठा'; document.getElementById('panel-desc').innerText='पाणी साठवण टाकी व नळजोडणी | स्थिती: पूर्ण'"/>
            <text x="580" y="235" fill="#67e8f9" font-size="11" text-anchor="middle">पाण्याची टाकी</text>

            <circle cx="320" cy="110" r="10" fill="#10b981" class="cursor-pointer" onclick="document.getElementById('panel-title').innerText='🏥 प्राथमिक आरोग्य उपकेंद्र'; document.getElementById('panel-desc').innerText='वेळ: ९ ते ५ | मोफत तपासणी व औषधे'"/>
            <text x="320" y="95" fill="#a7f3d0" font-size="11" text-anchor="middle">आरोग्य उपकेंद्र</text>

            <circle cx="470" cy="290" r="10" fill="#ec4899" class="cursor-pointer" onclick="document.getElementById('panel-title').innerText='🏫 प्राथमिक शाळा'; document.getElementById('panel-desc').innerText='डिजिटल स्मार्ट वर्ग | शिक्षण विभाग'"/>
            <text x="470" y="315" fill="#fbcfe8" font-size="11" text-anchor="middle">प्राथमिक शाळा</text>
          </svg>

          <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
            <span>💡 कोणत्याही बिंदूवर क्लिक करून तपशील तपासा</span>
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> विकासकामे</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> पाणीपुरवठा</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> आरोग्य</span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (window.leafletMapInstance) {
      window.leafletMapInstance.remove();
    }

    const map = L.map('village-map-container').setView([v.latitude, v.longitude], 13);
    window.leafletMapInstance = map;

    // Base Layers (CartoDB Voyager default - 100% reliable on file:// and localhost, no 403 blocks)
    const baseLayers = {
      voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        subdomains: 'abcd',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
      topo: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
      })
    };

    baseLayers.voyager.addTo(map);
    window.allBaseLayers = baseLayers;
    window.currentBaseLayer = baseLayers.voyager;

    window.mapLayers = {
      works: L.layerGroup().addTo(map),
      health: L.layerGroup().addTo(map),
      schools: L.layerGroup().addTo(map),
      water: L.layerGroup().addTo(map),
      districts: L.layerGroup().addTo(map)
    };

    // Add Village Center Pin
    L.circleMarker([v.latitude, v.longitude], {
      color: '#022c22',
      fillColor: '#059669',
      fillOpacity: 1,
      radius: 12
    }).addTo(map).bindPopup(`
      <div style="min-width:170px;">
        <strong style="color:#064e3b; font-size:14px; display:block;">📍 ${v.nameMr}</strong>
        <span style="font-size:11px; color:#475569;">ता. ${v.taluka}, जि. ${v.district}</span><br>
        <span style="font-size:11px; color:#059669; font-weight:bold;">पिन: ${v.pinCode} | लोकसंख्या: ${v.population.toLocaleString('en-IN')}</span>
      </div>
    `).openPopup();

    // Add Development Works markers
    const worksList = window.appState.state.works || window.VILLAGE_DATA.developmentWorks;
    worksList.forEach(w => {
      if (w.latitude && w.longitude) {
        const marker = L.circleMarker([w.latitude, w.longitude], {
          color: '#022c22',
          fillColor: '#059669',
          fillOpacity: 0.9,
          radius: 9
        }).bindPopup(`
          <b>${w.title}</b><br>
          स्थिती: ${w.status}<br>
          खर्च: ₹${w.spentAmount.toLocaleString('en-IN')}<br>
          <div style="margin-top:6px; display:flex; gap:4px;">
            <button onclick="window.components.openStreetViewModal(${w.latitude}, ${w.longitude}, '${w.title.replace(/'/g, "\\'")}')" style="padding:3px 8px; background:#047857; color:#fff; border-radius:5px; font-size:10px; font-weight:bold; border:none; cursor:pointer;">
              📷 स्ट्रीट दृश्य (Street View)
            </button>
            <button onclick="window.components.openWorkModal('${w.id}')" style="padding:3px 8px; background:#064e3b; color:#fff; border-radius:5px; font-size:10px; font-weight:bold; border:none; cursor:pointer;">
              तपशील
            </button>
          </div>
        `);
        
        marker.on('click', () => {
          document.getElementById('panel-title').innerText = "🏗️ " + w.title;
          document.getElementById('panel-desc').innerText = `मंजूर निधी: ₹${w.sanctionedAmount.toLocaleString('en-IN')} | झालेला खर्च: ₹${w.spentAmount.toLocaleString('en-IN')} | कंत्राटदार: ${w.contractor || '—'}`;
          const svBtn = document.getElementById('panel-streetview-btn');
          if (svBtn) {
            svBtn.setAttribute('onclick', `window.components.openStreetViewModal(${w.latitude}, ${w.longitude}, '${w.title.replace(/'/g, "\\'")}')`);
          }
        });

        window.mapLayers.works.addLayer(marker);
      }
    });

    // Add Facilities markers
    (window.VILLAGE_DATA.facilities || []).forEach(fac => {
      if (fac.latitude && fac.longitude) {
        let color = '#10B981';
        let targetLayer = window.mapLayers.health;

        if (fac.category === 'School') {
          color = '#EC4899';
          targetLayer = window.mapLayers.schools;
        }

        const marker = L.circleMarker([fac.latitude, fac.longitude], {
          color: color,
          fillColor: color,
          fillOpacity: 0.8,
          radius: 8
        }).bindPopup(`
          <b>${fac.name}</b><br>
          वेळ: ${fac.openingHours}<br>
          फोन: ${fac.phone}<br>
          <button onclick="window.components.openStreetViewModal(${fac.latitude}, ${fac.longitude}, '${fac.name.replace(/'/g, "\\'")}')" style="margin-top:6px; padding:3px 8px; background:#047857; color:#fff; border-radius:5px; font-size:10px; font-weight:bold; border:none; cursor:pointer;">
            📷 स्ट्रीट दृश्य (Street View)
          </button>
        `);

        marker.on('click', () => {
          document.getElementById('panel-title').innerText = "📍 " + fac.name;
          document.getElementById('panel-desc').innerText = `पत्ता: ${fac.address} | वेळ: ${fac.openingHours} | फोन: ${fac.phone}`;
          const svBtn = document.getElementById('panel-streetview-btn');
          if (svBtn) {
            svBtn.setAttribute('onclick', `window.components.openStreetViewModal(${fac.latitude}, ${fac.longitude}, '${fac.name.replace(/'/g, "\\'")}')`);
          }
        });

        targetLayer.addLayer(marker);
      }
    });

    // Add All 36 Districts of Maharashtra as selectable map markers
    (window.MAHARASHTRA_LOCATIONS || []).forEach(dist => {
      const dMarker = L.circleMarker([dist.latitude, dist.longitude], {
        color: '#064e3b',
        fillColor: '#34d399',
        fillOpacity: 0.6,
        radius: 6
      }).bindPopup(`
        <div style="min-width:160px; text-align:center;">
          <b>जि. ${dist.districtNameMr} (${dist.districtName})</b><br>
          <span style="font-size:10px; color:#64748b;">तालुके: ${dist.talukas.length}</span><br>
          <div style="display:flex; gap:4px; justify-content:center; margin-top:6px;">
            <button onclick="window.components.openStreetViewModal(${dist.latitude}, ${dist.longitude}, 'जि. ${dist.districtNameMr}')" style="padding:3px 8px; background:#047857; color:#fff; border-radius:6px; font-size:10px; font-weight:bold; border:none; cursor:pointer;">
              📷 स्ट्रीट दृश्य
            </button>
            <button onclick="window.components.selectQuickVillage('${dist.talukas[0]?.villages[0]?.name || dist.districtNameMr}', '${dist.talukas[0]?.name || dist.districtNameMr}', '${dist.districtNameMr}', ${dist.latitude}, ${dist.longitude}, '${dist.talukas[0]?.villages[0]?.pin || '400001'}')" style="padding:3px 8px; background:#064e3b; color:#fff; border-radius:6px; font-size:10px; font-weight:bold; border:none; cursor:pointer;">
              गाव निवडा ✓
            </button>
          </div>
        </div>
      `);
      window.mapLayers.districts.addLayer(dMarker);
    });

    // Map Click Listener to select custom coordinates
    map.on('click', (e) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;
      const panelTitle = document.getElementById('panel-title');
      const panelDesc = document.getElementById('panel-desc');
      if (panelTitle && panelDesc) {
        panelTitle.innerText = "📍 नकाशावर निवडलेले स्थान";
        panelDesc.innerHTML = `
          अक्षांश: ${clickedLat.toFixed(4)}° N, रेखांश: ${clickedLng.toFixed(4)}° E<br>
          <div class="flex items-center gap-2 mt-2.5 flex-wrap">
            <button onclick="window.components.openStreetViewModal(${clickedLat}, ${clickedLng}, 'नकाशावर निवडलेले स्थान')" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center gap-1 cursor-pointer">
              <span>📷</span>
              <span>येथे स्ट्रीट दृश्य पहा</span>
            </button>
            <button onclick="window.appState.setActiveVillage('स्थानिक गाव', 'स्थानिक तालुका', '${v.district}', ${clickedLat}, ${clickedLng}, '${v.pinCode}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition">
              हे स्थान सक्रिय करा ✓
            </button>
          </div>
        `;
        const svBtn = document.getElementById('panel-streetview-btn');
        if (svBtn) {
          svBtn.setAttribute('onclick', `window.components.openStreetViewModal(${clickedLat}, ${clickedLng}, 'नकाशावर निवडलेले स्थान')`);
        }
      }
    });
  },

  toggleMapLayer(layerName, isChecked) {
    if (!window.leafletMapInstance || !window.mapLayers) return;
    const layer = window.mapLayers[layerName];
    if (!layer) return;

    if (isChecked) {
      window.leafletMapInstance.addLayer(layer);
    } else {
      window.leafletMapInstance.removeLayer(layer);
    }
  },

  switchBaseMap(type) {
    if (!window.leafletMapInstance || !window.allBaseLayers) return;
    const targetLayer = window.allBaseLayers[type];
    if (!targetLayer) return;

    Object.values(window.allBaseLayers).forEach(layer => {
      if (window.leafletMapInstance.hasLayer(layer)) {
        window.leafletMapInstance.removeLayer(layer);
      }
    });

    window.leafletMapInstance.addLayer(targetLayer);
    targetLayer.bringToBack();
    window.currentBaseLayer = targetLayer;

    // Update active button state in the toolbar
    ['voyager', 'satellite', 'topo'].forEach(key => {
      const btn = document.getElementById(`basemap-${key}`);
      if (btn) {
        if (key === type) {
          btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950 text-white shadow-xs transition';
        } else {
          btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 transition';
        }
      }
    });
  },

  openStreetViewModal(lat, lng, title) {
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA?.village;
    const targetLat = Number(lat || v.latitude || 20.0886);
    const targetLng = Number(lng || v.longitude || 74.0416);
    const locTitle = title || `${v.nameMr} (${v.district})`;

    let container = document.getElementById('street-view-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'street-view-modal-container';
      document.body.appendChild(container);
    }

    // Google Maps Open Embed URL (Requires ZERO API Key, runs universally on any origin)
    const embedUrl = `https://maps.google.com/maps?q=${targetLat},${targetLng}&z=17&t=k&output=embed`;
    const googlePanoUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${targetLat},${targetLng}`;
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${targetLng - 0.008}%2C${targetLat - 0.005}%2C${targetLng + 0.008}%2C${targetLat + 0.005}&layer=mapnik&marker=${targetLat}%2C${targetLng}`;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop" onclick="if(event.target === this) window.components.closeStreetViewModal()">
        <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-900 text-white">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-md">📷</span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-black">
                    ● कार्यरत (Zero API Key Required)
                  </span>
                  <span class="text-xs text-slate-300 font-mono">${targetLat.toFixed(4)}° N, ${targetLng.toFixed(4)}° E</span>
                </div>
                <h3 class="font-extrabold text-base sm:text-lg text-white mt-0.5 truncate max-w-md">${locTitle}</h3>
              </div>
            </div>
            <button onclick="window.components.closeStreetViewModal()" class="text-slate-400 hover:text-white p-2 text-2xl font-bold cursor-pointer">✕</button>
          </div>

          <!-- Feature Note -->
          <div class="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 text-xs text-emerald-950 flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-emerald-700 font-bold">ℹ️ भू-माहिती:</span>
              <span>थेट उपग्रह व रस्ते दृश्य लोड झाले आहे. कोणत्याही Google API की ची आवश्यकता नाही.</span>
            </div>
            <a 
              href="${googlePanoUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition"
            >
              <span>🌐</span>
              <span>पूर्ण ३६०° पॅनोरामा उघडा (External 360°) ↗</span>
            </a>
          </div>

          <!-- Embed Container -->
          <div class="relative flex-1 bg-slate-950 min-h-[380px] sm:min-h-[460px] w-full">
            <iframe 
              id="street-view-iframe"
              src="${embedUrl}" 
              class="w-full h-full min-h-[380px] sm:min-h-[460px] border-0" 
              loading="lazy" 
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <!-- Footer Controls -->
          <div class="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between flex-wrap gap-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-slate-500 font-semibold">नकाशा दृश्य बदला:</span>
              <button 
                onclick="document.getElementById('street-view-iframe').src='${embedUrl}'" 
                class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-800 cursor-pointer"
              >
                🛰️ उपग्रह + रस्ता (Hybrid)
              </button>
              <button 
                onclick="document.getElementById('street-view-iframe').src='${osmUrl}'" 
                class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-800 cursor-pointer"
              >
                🗺️ OpenStreetMap
              </button>
            </div>

            <button 
              onclick="window.components.closeStreetViewModal()" 
              class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer"
            >
              बंद करा
            </button>
          </div>

        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  closeStreetViewModal() {
    const container = document.getElementById('street-view-modal-container');
    if (container) container.innerHTML = '';
  },

  initMapBarDropdowns() {
    const distSelect = document.getElementById('mapbar-district');
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    if (!distSelect) return;
    this.onMapBarDistrictChange(distSelect.value);
    const talukaSelect = document.getElementById('mapbar-taluka');
    if (talukaSelect && v) {
      for (let i = 0; i < talukaSelect.options.length; i++) {
        if (talukaSelect.options[i].value.includes(v.taluka) || v.taluka.includes(talukaSelect.options[i].value)) {
          talukaSelect.selectedIndex = i;
          this.onMapBarTalukaChange(talukaSelect.value);
          break;
        }
      }
    }
  },

  onMapBarDistrictChange(districtId) {
    const talukaSelect = document.getElementById('mapbar-taluka');
    const villageSelect = document.getElementById('mapbar-village');
    if (!talukaSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === districtId) || locations[0];

    talukaSelect.innerHTML = (dist?.talukas || []).map(t => `
      <option value="${t.name}">${t.name}</option>
    `).join('');

    this.onMapBarTalukaChange(talukaSelect.value);
  },

  onMapBarTalukaChange(talukaName) {
    const distSelect = document.getElementById('mapbar-district');
    const villageSelect = document.getElementById('mapbar-village');
    if (!distSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === distSelect.value) || locations[0];
    const taluka = (dist?.talukas || []).find(t => t.name === talukaName) || dist?.talukas?.[0];

    villageSelect.innerHTML = (taluka?.villages || []).map(v => `
      <option value="${v.name}">${v.name}</option>
    `).join('');
  },

  applyMapBarLocation() {
    const distSelect = document.getElementById('mapbar-district');
    const talukaSelect = document.getElementById('mapbar-taluka');
    const villageSelect = document.getElementById('mapbar-village');
    if (!distSelect || !talukaSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === distSelect.value) || locations[0];
    const taluka = (dist?.talukas || []).find(t => t.name === talukaSelect.value) || dist?.talukas?.[0];
    const village = (taluka?.villages || []).find(v => v.name === villageSelect.value) || taluka?.villages?.[0];

    if (village && taluka && dist) {
      window.appState.setActiveVillage(
        village.name,
        taluka.name,
        dist.districtNameMr,
        village.lat,
        village.lng,
        village.pin,
        village.pop,
        village.households,
        village.area
      );
      alert(`सक्रिय गाव बदलले: ${village.name}, ता. ${taluka.name}, जि. ${dist.districtNameMr}`);
    }
  },

  openLocationModal() {
    const container = document.getElementById('location-modal-container');
    if (!container) return;

    const curV = window.appState.state.activeVillage || window.VILLAGE_DATA.village;
    const locations = window.MAHARASHTRA_LOCATIONS || [];

    const popularVillages = [
      { name: "सोनवाडी (Sonwadi)", taluka: "निफाड", district: "नाशिक", lat: 20.0835, lng: 74.0210, pin: "422303", pop: 3420 },
      { name: "शिर्डी (Shirdi)", taluka: "राहाता", district: "अहिल्यानगर", lat: 19.7667, lng: 74.4764, pin: "423107", pop: 36000 },
      { name: "राळेगण सिद्धी (Ralegan Siddhi)", taluka: "पारनेर", district: "अहिल्यानगर", lat: 18.9189, lng: 74.4075, pin: "414302", pop: 2850 },
      { name: "हिवरे बाजार (Hiware Bazar)", taluka: "नगर", district: "अहिल्यानगर", lat: 19.1667, lng: 74.6167, pin: "414103", pop: 1450 },
      { name: "माळेगाव (Malegaon)", taluka: "बारामती", district: "पुणे", lat: 18.1500, lng: 74.5200, pin: "413115", pop: 11200 },
      { name: "वाघोली (Wagholi)", taluka: "हवेली", district: "पुणे", lat: 18.5800, lng: 73.9800, pin: "412207", pop: 24000 },
      { name: "उचगाव (Uchgaon)", taluka: "करवीर", district: "कोल्हापूर", lat: 16.6800, lng: 74.2800, pin: "416005", pop: 18200 },
      { name: "कोडोली (Kodoli)", taluka: "पन्हाळा", district: "कोल्हापूर", lat: 16.8800, lng: 74.1900, pin: "416114", pop: 14200 },
      { name: "वाखरी (Wakhari)", taluka: "पंढरपूर", district: "सोलापूर", lat: 17.7100, lng: 75.2900, pin: "413304", pop: 6400 },
      { name: "वडूज (Vaduj)", taluka: "खटाव", district: "सातारा", lat: 17.6000, lng: 74.4500, pin: "415506", pop: 8900 },
      { name: "वरसोली (Varsoli)", taluka: "अलिबाग", district: "रायगड", lat: 18.6600, lng: 72.8800, pin: "402201", pop: 5200 },
      { name: "तारकर्ली (Tarkarli)", taluka: "मालवण", district: "सिंधुदुर्ग", lat: 16.0300, lng: 73.4900, pin: "416606", pop: 3900 },
      { name: "शेगाव (Shegaon)", taluka: "शेगाव", district: "बुलढाणा", lat: 20.7900, lng: 76.6900, pin: "444203", pop: 16500 },
      { name: "सेवाग्राम (Sevagram)", taluka: "वर्धा", district: "वर्धा", lat: 20.7180, lng: 78.6110, pin: "442102", pop: 5800 },
      { name: "अजिंठा (Ajanta)", taluka: "सिल्लोड", district: "छत्रपती संभाजीनगर", lat: 20.5300, lng: 75.7500, pin: "431117", pop: 7800 },
      { name: "मनसर (Mansar)", taluka: "रामटेक", district: "नागपूर", lat: 21.4000, lng: 79.2800, pin: "441106", pop: 6800 }
    ];

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeLocationModal()">
        <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200" onclick="event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-start justify-between gap-4 z-10">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold mb-1">
                <span>📍 महाराष्ट्र राज्य (Maharashtra)</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">स्थान / गाव बदला (Select Village / Location)</h2>
              <p class="text-xs text-slate-500 mt-1">
                सध्याचे गाव: <strong class="text-emerald-950 font-bold">${curV.nameMr} (${curV.taluka}, ${curV.district})</strong>
              </p>
            </div>
            <button onclick="window.components.closeLocationModal()" class="text-slate-400 hover:text-slate-700 p-2 text-xl font-bold">
              ✕
            </button>
          </div>

          <div class="p-6 space-y-6">
            
            <!-- Quick Live Search Bar -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                🔍 महाराष्ट्रातील कोणतेही गाव किंवा तालुका शोधा (Live Search):
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="modal-village-search"
                  placeholder="उदा. शिर्डी, बारामती, हिवरे बाजार, वणी, शेगाव, उचगाव, वाखरी..."
                  class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                  oninput="window.components.handleLiveLocationSearch(this.value)"
                />
                <span class="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
              </div>
              <div id="modal-search-results" class="hidden mt-2 p-2 bg-slate-50 rounded-2xl border border-slate-200 max-h-48 overflow-y-auto space-y-1 text-xs"></div>
            </div>

            <!-- Cascading Dropdowns: District -> Taluka -> Village -->
            <div class="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-4">
              <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <span>🗺️</span>
                <span>जिल्हानिहाय निवड (All 36 Districts of Maharashtra)</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <!-- District Select -->
                <div>
                  <label class="block text-[11px] font-bold text-slate-600 mb-1">१. जिल्हा निवडा (District) *</label>
                  <select 
                    id="loc-select-district" 
                    onchange="window.components.onDistrictSelectChange(this.value)"
                    class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-xs"
                  >
                    <option value="">-- जिल्हा निवडा (36 जिल्हे) --</option>
                    ${locations.map(d => `
                      <option value="${d.districtId}" ${d.districtNameMr.includes(curV.district) || curV.district.includes(d.districtNameMr) ? 'selected' : ''}>
                        ${d.districtNameMr} (${d.districtName})
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- Taluka Select -->
                <div>
                  <label class="block text-[11px] font-bold text-slate-600 mb-1">२. तालुका निवडा (Taluka) *</label>
                  <select 
                    id="loc-select-taluka" 
                    onchange="window.components.onTalukaSelectChange(this.value)"
                    class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-xs"
                  >
                    <option value="">-- तालुका निवडा --</option>
                  </select>
                </div>

                <!-- Village Select -->
                <div>
                  <label class="block text-[11px] font-bold text-slate-600 mb-1">३. गाव निवडा (Village) *</label>
                  <select 
                    id="loc-select-village" 
                    class="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-xs"
                  >
                    <option value="">-- गाव निवडा --</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button 
                  onclick="window.components.applyDropdownLocation()" 
                  class="px-5 py-2.5 bg-gradient-to-r from-emerald-950 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  हे गाव लागू करा (Apply Selected Village) ✓
                </button>
              </div>
            </div>

            <!-- Popular / Model Villages Across Maharashtra -->
            <div>
              <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>⭐</span>
                <span>महाराष्ट्रातील प्रमुख नमुना गावे (Popular Model Villages)</span>
              </h3>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                ${popularVillages.map(pv => `
                  <button 
                    onclick="window.components.selectQuickVillage('${pv.name}', '${pv.taluka}', '${pv.district}', ${pv.lat}, ${pv.lng}, '${pv.pin}', ${pv.pop})"
                    class="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition text-left group"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-extrabold text-xs text-slate-900 group-hover:text-emerald-950">${pv.name.split('(')[0]}</span>
                      <span class="text-[10px] text-emerald-700 opacity-0 group-hover:opacity-100 font-bold">निवडा →</span>
                    </div>
                    <span class="text-[10px] text-slate-500 block mt-0.5">ता. ${pv.taluka}, जि. ${pv.district}</span>
                  </button>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button onclick="window.components.closeLocationModal()" class="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs">
              बंद करा
            </button>
          </div>

        </div>
      </div>
    `;

    setTimeout(() => {
      const distSelect = document.getElementById('loc-select-district');
      if (distSelect && distSelect.value) {
        this.onDistrictSelectChange(distSelect.value);
        const talukaSelect = document.getElementById('loc-select-taluka');
        if (talukaSelect && curV) {
          for (let i = 0; i < talukaSelect.options.length; i++) {
            if (talukaSelect.options[i].value.includes(curV.taluka) || curV.taluka.includes(talukaSelect.options[i].value)) {
              talukaSelect.selectedIndex = i;
              this.onTalukaSelectChange(talukaSelect.value);
              break;
            }
          }
        }
      } else if (distSelect && distSelect.options.length > 1) {
        distSelect.selectedIndex = 1;
        this.onDistrictSelectChange(distSelect.value);
      }
      window.components.applyLanguageToDOM(container);
    }, 50);
  },

  closeLocationModal() {
    const container = document.getElementById('location-modal-container');
    if (container) container.innerHTML = '';
  },

  onDistrictSelectChange(districtId) {
    const talukaSelect = document.getElementById('loc-select-taluka');
    const villageSelect = document.getElementById('loc-select-village');
    if (!talukaSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === districtId) || locations[0];

    talukaSelect.innerHTML = (dist?.talukas || []).map(t => `
      <option value="${t.name}">${t.name}</option>
    `).join('');

    this.onTalukaSelectChange(talukaSelect.value);
  },

  onTalukaSelectChange(talukaName) {
    const distSelect = document.getElementById('loc-select-district');
    const villageSelect = document.getElementById('loc-select-village');
    if (!distSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === distSelect.value) || locations[0];
    const taluka = (dist?.talukas || []).find(t => t.name === talukaName) || dist?.talukas?.[0];

    villageSelect.innerHTML = (taluka?.villages || []).map(v => `
      <option value="${v.name}">${v.name}</option>
    `).join('');
  },

  applyDropdownLocation() {
    const distSelect = document.getElementById('loc-select-district');
    const talukaSelect = document.getElementById('loc-select-taluka');
    const villageSelect = document.getElementById('loc-select-village');
    if (!distSelect || !talukaSelect || !villageSelect) return;

    const locations = window.MAHARASHTRA_LOCATIONS || [];
    const dist = locations.find(d => d.districtId === distSelect.value) || locations[0];
    const taluka = (dist?.talukas || []).find(t => t.name === talukaSelect.value) || dist?.talukas?.[0];
    const village = (taluka?.villages || []).find(v => v.name === villageSelect.value) || taluka?.villages?.[0];

    if (village && taluka && dist) {
      window.appState.setActiveVillage(
        village.name,
        taluka.name,
        dist.districtNameMr,
        village.lat,
        village.lng,
        village.pin,
        village.pop,
        village.households,
        village.area
      );
      this.closeLocationModal();
      alert(`सक्रिय गाव यशस्वीरित्या बदलले:\n\n📍 ${village.name}, ता. ${taluka.name}, जि. ${dist.districtNameMr}`);
    }
  },

  selectQuickVillage(name, taluka, district, lat, lng, pin, pop) {
    window.appState.setActiveVillage(name, taluka, district, lat, lng, pin, pop);
    this.closeLocationModal();
    alert(`सक्रिय गाव बदलले:\n\n📍 ${name}, ता. ${taluka}, जि. ${district}`);
  },

  handleLiveLocationSearch(query) {
    const resultsBox = document.getElementById('modal-search-results');
    if (!resultsBox) return;

    const q = (query || '').toLowerCase().trim();
    if (!q || q.length < 2) {
      resultsBox.classList.add('hidden');
      return;
    }

    const matches = [];
    const locations = window.MAHARASHTRA_LOCATIONS || [];

    for (const dist of locations) {
      for (const tal of dist.talukas) {
        for (const vil of tal.villages) {
          if (
            vil.name.toLowerCase().includes(q) ||
            vil.nameEn.toLowerCase().includes(q) ||
            tal.name.toLowerCase().includes(q) ||
            dist.districtNameMr.toLowerCase().includes(q)
          ) {
            matches.push({
              village: vil,
              taluka: tal,
              district: dist
            });
            if (matches.length >= 8) break;
          }
        }
        if (matches.length >= 8) break;
      }
      if (matches.length >= 8) break;
    }

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div class="p-2 text-slate-500">कोणतेही गाव सापडले नाही. कृपया वेगळा शब्द शोधा.</div>`;
      resultsBox.classList.remove('hidden');
      return;
    }

    resultsBox.innerHTML = matches.map(m => `
      <div 
        onclick="window.components.selectQuickVillage('${m.village.name}', '${m.taluka.name}', '${m.district.districtNameMr}', ${m.village.lat}, ${m.village.lng}, '${m.village.pin}', ${m.village.pop})"
        class="p-2.5 rounded-xl hover:bg-emerald-50 border border-slate-200/60 cursor-pointer flex items-center justify-between text-xs transition bg-white hover:border-emerald-300"
      >
        <div>
          <strong class="font-extrabold text-emerald-950">${m.village.name}</strong>
          <span class="text-slate-500 block text-[11px]">ता. ${m.taluka.name}, जि. ${m.district.districtNameMr} (पिन: ${m.village.pin})</span>
        </div>
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">निवडा ➔</span>
      </div>
    `).join('');
    resultsBox.classList.remove('hidden');
  },

  // 10. Complaints View (Sec 4.12)
  renderComplaintsView() {
    const t = (k) => window.appState.t(k);
    const complaints = window.appState.state.complaints;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <span>📝</span>
            <span>नागरिक समस्या निवारण प्रणाली</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('complaintsHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('complaintsSubheading')}</p>
        </div>

        <!-- 2 Columns: Lodge Form + Track Box -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <!-- Complaint Form -->
          <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>✍️</span>
              <span>${t('lodgeComplaint')}</span>
            </h2>

            <form onsubmit="window.components.handleLodgeComplaint(event)" class="space-y-5">
              
              <!-- Category -->
              <div>
                <label for="cmp-cat" class="block text-xs font-bold text-slate-700 mb-1.5">${t('complaintCategory')} *</label>
                <select id="cmp-cat" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700">
                  <option value="Road">रस्ता व खड्डे (Broken Road / Potholes)</option>
                  <option value="Water">पिण्याचे पाणी पुरवठा (Water Supply Issue)</option>
                  <option value="Electricity">दिवाबत्ती व पथदिवे (Street Light Damaged)</option>
                  <option value="Drainage">सांडपाणी व गटार (Drainage & Sanitation)</option>
                  <option value="Garbage">कचरा व स्वच्छता (Garbage Collection)</option>
                  <option value="School">शाळा पायाभूत सुविधा (School Infra)</option>
                  <option value="Other">इतर सार्वजनिक समस्या (Other Civic Issue)</option>
                </select>
              </div>

              <!-- Location -->
              <div>
                <label for="cmp-loc" class="block text-xs font-bold text-slate-700 mb-1.5">${t('complaintLocation')} *</label>
                <input 
                  type="text" 
                  id="cmp-loc" 
                  required 
                  placeholder="उदा. मारुती मंदिर चौक, शाळा रोड, वार्ड क्र. २" 
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <!-- Description -->
              <div>
                <label for="cmp-desc" class="block text-xs font-bold text-slate-700 mb-1.5">${t('complaintDesc')} *</label>
                <textarea 
                  id="cmp-desc" 
                  rows="4" 
                  required 
                  placeholder="समस्येचे स्पष्ट व सविस्तर वर्णन येथे लिहा..." 
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <!-- Photo or Document Upload Section -->
              <div class="p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label class="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>📸 📄</span>
                      <span>${t('complaintPhoto')}</span>
                      <span class="text-[10px] text-emerald-950 bg-emerald-100 font-bold px-1.5 py-0.5 rounded">ऐच्छिक / Optional</span>
                    </label>
                    <p class="text-[11px] text-slate-500 mt-0.5">${t('complaintPhotoSub')}</p>
                  </div>

                  <button 
                    type="button" 
                    onclick="const el = document.getElementById('cmp-sample-toggle'); el.classList.toggle('hidden');" 
                    class="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                  >
                    ${t('complaintOrUrl')} ▾
                  </button>
                </div>

                <!-- Dropzone Box -->
                <div 
                  id="cmp-dropzone" 
                  onclick="document.getElementById('cmp-file-input').click()" 
                  class="border-2 border-dashed border-slate-300 hover:border-emerald-700 bg-white hover:bg-emerald-50/30 rounded-xl p-4 text-center cursor-pointer transition group"
                >
                  <input 
                    type="file" 
                    id="cmp-file-input" 
                    class="hidden" 
                    accept="image/jpeg,image/png,image/webp,image/jpg,application/pdf"
                    capture="environment"
                    onchange="window.components.handleComplaintFileChosen(this)"
                  />
                  <div class="space-y-1">
                    <div class="text-3xl group-hover:scale-110 transition-transform inline-block">📸 📁</div>
                    <div class="font-bold text-xs text-slate-700">${t('complaintDropzoneTitle')}</div>
                    <div class="text-[10px] text-slate-400">${t('complaintDropzoneHint')}</div>
                  </div>
                </div>

                <!-- Live Upload Preview Container -->
                <div id="cmp-file-preview-area" class="hidden"></div>

                <!-- Optional: Sample Photos or Direct URL Box -->
                <div id="cmp-sample-toggle" class="hidden p-3.5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-xs">
                  <div class="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                    <span>द्रुत नमुना फोटो निवडा (Quick Sample Photo):</span>
                    <span class="text-[10px] text-slate-400">चाचणीसाठी उपयुक्त</span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button type="button" onclick="window.components.setComplaintSamplePhoto('Road')" class="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold text-slate-800 text-left transition flex items-center gap-1.5 cursor-pointer">
                      <span>🚧</span>
                      <span class="truncate">${t('complaintSampleRoad')}</span>
                    </button>
                    <button type="button" onclick="window.components.setComplaintSamplePhoto('Water')" class="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold text-slate-800 text-left transition flex items-center gap-1.5 cursor-pointer">
                      <span>💧</span>
                      <span class="truncate">${t('complaintSampleWater')}</span>
                    </button>
                    <button type="button" onclick="window.components.setComplaintSamplePhoto('Light')" class="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold text-slate-800 text-left transition flex items-center gap-1.5 cursor-pointer">
                      <span>💡</span>
                      <span class="truncate">${t('complaintSampleLight')}</span>
                    </button>
                    <button type="button" onclick="window.components.setComplaintSamplePhoto('Garbage')" class="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] font-semibold text-slate-800 text-left transition flex items-center gap-1.5 cursor-pointer">
                      <span>🗑️</span>
                      <span class="truncate">${t('complaintSampleGarbage')}</span>
                    </button>
                  </div>
                  <div class="pt-1">
                    <label for="cmp-url-input" class="block text-[10px] font-bold text-slate-500 mb-1">किंवा थेट वेब इमेज / डॉक्युमेंट URL टाका:</label>
                    <input 
                      type="url" 
                      id="cmp-url-input" 
                      placeholder="उदा. https://images.unsplash.com/photo-..." 
                      oninput="window.components.handleComplaintUrlInput(this.value)"
                      class="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <!-- Citizen details / Anonymous checkbox -->
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="cmp-anon" onchange="document.getElementById('citizen-fields').classList.toggle('hidden', this.checked)" class="rounded text-emerald-700 focus:ring-emerald-700">
                  <span class="text-xs font-bold text-slate-700">${t('anonymousOption')}</span>
                </label>

                <div id="citizen-fields" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label for="cmp-name" class="block text-[11px] font-semibold text-slate-600 mb-1">${t('yourName')}</label>
                    <input type="text" id="cmp-name" placeholder="आपले पूर्ण नाव" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
                  </div>
                  <div>
                    <label for="cmp-phone" class="block text-[11px] font-semibold text-slate-600 mb-1">${t('yourPhone')}</label>
                    <input type="tel" id="cmp-phone" placeholder="१० अंकी मोबाईल नंबर" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full py-3 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 text-white font-black rounded-xl shadow-md text-sm transition cursor-pointer hover:shadow-lg">
                🚀 ${t('submitComplaint')}
              </button>

            </form>
          </div>

          <!-- Tracking Search Box -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>🔍</span>
                <span>${t('trackComplaint')}</span>
              </h2>
              <p class="text-xs text-slate-500 mb-4">
                आपल्या तक्रारीचा GRM ट्रॅकिंग क्रमांक टाकून निवारणाची सद्यस्थिती तपासा.
              </p>

              <form onsubmit="event.preventDefault(); window.components.trackSpecificComplaint(document.getElementById('track-input').value)" class="space-y-3">
                <input 
                  type="text" 
                  id="track-input"
                  placeholder="उदा. GRM-2026-004821" 
                  class="w-full px-3.5 py-2.5 uppercase font-mono text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button type="submit" class="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition cursor-pointer">
                  ${t('trackButton')}
                </button>
              </form>

              <!-- Track result container -->
              <div id="track-result-box" class="mt-4"></div>
            </div>

            <!-- Notice (Sec 4.12) -->
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 mt-6 leading-relaxed">
              <strong>नियमावली:</strong> दाखल झालेल्या तक्रारीची स्थानिक अधिकाऱ्यांकडून पडताळणी केली जाते. ही प्रणाली पारदर्शक निवारणासाठी असून कोणत्याही व्यक्तीवर थेट आरोप करण्यासाठी नाही.
            </div>
          </div>

        </div>

        <!-- Recent Public Complaints List -->
        <div>
          <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 class="text-lg font-bold text-slate-900">गावातील अलिकडील तक्रारी व निवारण स्थिती (Recent Issues)</h2>
              <p class="text-xs text-slate-500">नागरिकांनी दाखल केलेल्या समस्या व जोडलेले स्थळ छायाचित्रे / पुरावे</p>
            </div>
            <span class="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              एकूण तक्रारी: <strong>${complaints.length}</strong>
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${complaints.map(cmp => {
              const isDoc = cmp.attachmentType === 'document' || (cmp.photoUrl && (cmp.photoUrl.startsWith('data:application/pdf') || cmp.photoUrl.endsWith('.pdf')));
              return `
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <span class="text-xs font-mono font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ${cmp.trackingId}
                      </span>
                      <span class="text-xs font-bold px-2 py-0.5 rounded-full ${cmp.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-100 text-emerald-950 border border-emerald-300'}">
                        ● ${cmp.statusMr || cmp.status}
                      </span>
                    </div>

                    <h3 class="font-bold text-slate-900 text-sm mb-1 line-clamp-2">${cmp.title || cmp.description}</h3>
                    <p class="text-xs text-slate-500 mb-3">📍 ${cmp.location} | दिनांक: ${cmp.submittedDate}</p>

                    <!-- Attached Photo / Document Proof Display -->
                    ${cmp.photoUrl ? `
                      ${isDoc ? `
                        <div 
                          onclick="window.components.openComplaintMediaModal('${cmp.id}')" 
                          class="p-2.5 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-xl mb-3 flex items-center justify-between text-xs cursor-pointer transition group"
                          title="दस्तऐवज पाहण्यासाठी क्लिक करा"
                        >
                          <div class="flex items-center gap-2.5 overflow-hidden">
                            <span class="text-2xl">📄</span>
                            <div class="truncate">
                              <div class="font-bold text-emerald-950 truncate text-[11px]">${cmp.attachmentName || 'तक्रार अर्ज / पुरावा (PDF)'}</div>
                              <div class="text-[10px] text-emerald-800">${cmp.attachmentSize || 'दस्तऐवज'} • पाहण्यासाठी क्लिक करा</div>
                            </div>
                          </div>
                          <span class="text-[10px] bg-white text-emerald-950 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs shrink-0 group-hover:bg-emerald-900 group-hover:text-white transition">
                            पहा 👁️
                          </span>
                        </div>
                      ` : `
                        <div 
                          onclick="window.components.openComplaintMediaModal('${cmp.id}')" 
                          class="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 mb-3 bg-slate-100 shadow-xs" 
                          title="मोठ्या आकारात पाहण्यासाठी क्लिक करा"
                        >
                          <img 
                            src="${cmp.photoUrl}" 
                            alt="${cmp.title}" 
                            class="w-full h-40 object-cover group-hover:scale-105 transition duration-300" 
                            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80';"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition"></div>
                          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-bold">
                            <span class="flex items-center gap-1.5 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                              <span>📸</span>
                              <span>स्थळ पुरावा छायाचित्र</span>
                            </span>
                            <span class="bg-white text-emerald-950 px-2 py-0.5 rounded-md font-black text-[10px] shadow-sm">
                              मोठे करा 🔍
                            </span>
                          </div>
                        </div>
                      `}
                    ` : ''}

                    <div class="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mb-3 leading-relaxed">
                      ${cmp.description}
                    </div>

                    ${cmp.citizenName ? `
                      <div class="text-[11px] text-slate-500 mb-2 flex items-center gap-1">
                        <span>👤 नागरिक:</span>
                        <strong class="text-slate-700">${cmp.citizenName}</strong>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Latest Update Step -->
                  <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <strong>शेवटची नोंद:</strong> ${cmp.updates[cmp.updates.length - 1]?.note || 'छाननी सुरू'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </section>
    `;
  },

  handleComplaintFileChosen(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    
    // Check file size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      alert("फाइल खूप मोठी आहे. कृपया ८ MB पेक्षा कमी आकाराची फाइल निवडा.");
      input.value = '';
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const sizeFormatted = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      this.complaintAttachment = {
        dataUrl: dataUrl,
        fileName: file.name,
        fileType: isPdf ? 'document' : 'image',
        fileSize: sizeFormatted
      };
      this.renderComplaintAttachmentPreview();
    };
    reader.readAsDataURL(file);
  },

  setComplaintSamplePhoto(category) {
    const samples = {
      Road: {
        url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
        name: "खराब_रस्ता_खड्डे_फोटो.jpg"
      },
      Water: {
        url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80",
        name: "पाणी_पुरवठा_गळती_फोटो.jpg"
      },
      Light: {
        url: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&auto=format&fit=crop&q=80",
        name: "बंद_सौर_पथदिवा_फोटो.jpg"
      },
      Garbage: {
        url: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80",
        name: "कचरा_सांडपाणी_समस्या.jpg"
      }
    };

    const s = samples[category] || samples.Road;
    this.complaintAttachment = {
      dataUrl: s.url,
      fileName: s.name,
      fileType: 'image',
      fileSize: '450 KB'
    };
    const urlInput = document.getElementById('cmp-url-input');
    if (urlInput) urlInput.value = s.url;
    this.renderComplaintAttachmentPreview();
  },

  handleComplaintUrlInput(url) {
    const cleanUrl = (url || '').trim();
    if (!cleanUrl) {
      this.removeComplaintAttachment();
      return;
    }
    const isPdf = cleanUrl.toLowerCase().endsWith('.pdf');
    this.complaintAttachment = {
      dataUrl: cleanUrl,
      fileName: cleanUrl.split('/').pop().split('?')[0] || 'photo.jpg',
      fileType: isPdf ? 'document' : 'image',
      fileSize: 'वेब लिंक'
    };
    this.renderComplaintAttachmentPreview();
  },

  removeComplaintAttachment() {
    this.complaintAttachment = null;
    const fileInput = document.getElementById('cmp-file-input');
    if (fileInput) fileInput.value = '';
    const urlInput = document.getElementById('cmp-url-input');
    if (urlInput) urlInput.value = '';
    const preview = document.getElementById('cmp-file-preview-area');
    if (preview) {
      preview.innerHTML = '';
      preview.classList.add('hidden');
    }
  },

  renderComplaintAttachmentPreview() {
    const preview = document.getElementById('cmp-file-preview-area');
    if (!preview || !this.complaintAttachment) return;

    preview.classList.remove('hidden');
    const att = this.complaintAttachment;
    const isDoc = att.fileType === 'document';

    preview.innerHTML = `
      <div class="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 overflow-hidden">
          ${isDoc ? `
            <div class="w-12 h-12 bg-red-100 text-red-800 rounded-lg border border-red-200 flex items-center justify-center text-2xl shrink-0">
              📄
            </div>
          ` : `
            <img src="${att.dataUrl}" alt="Preview" class="w-12 h-12 object-cover rounded-lg border border-emerald-200 shadow-xs shrink-0" onerror="this.src='https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80';" />
          `}
          <div class="truncate">
            <div class="text-xs font-bold text-slate-900 truncate">${att.fileName}</div>
            <div class="text-[10px] text-emerald-700 font-semibold flex items-center gap-1.5">
              <span>✅ ${isDoc ? 'दस्तऐवज जोडला' : 'छायाचित्र जोडले'}</span>
              <span>•</span>
              <span class="text-slate-500">${att.fileSize}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button 
            type="button" 
            onclick="window.components.openPreviewModal('${att.dataUrl}', '${att.fileName.replace(/'/g, "\\'")}', ${isDoc})" 
            class="px-2.5 py-1 text-xs bg-white text-emerald-950 border border-emerald-200 rounded-lg font-bold hover:bg-emerald-50 transition cursor-pointer"
            title="पूर्वावलोकन"
          >
            👁️ पहा
          </button>
          <button 
            type="button" 
            onclick="window.components.removeComplaintAttachment()" 
            class="p-1 text-red-600 hover:text-red-800 text-sm font-bold cursor-pointer rounded-lg hover:bg-red-50 transition" 
            title="काढून टाका"
          >
            ✕
          </button>
        </div>
      </div>
    `;
  },

  handleLodgeComplaint(e) {
    e.preventDefault();
    const cat = document.getElementById('cmp-cat').value;
    const loc = document.getElementById('cmp-loc').value;
    const desc = document.getElementById('cmp-desc').value;
    const isAnon = document.getElementById('cmp-anon').checked;
    const name = document.getElementById('cmp-name')?.value;
    const phone = document.getElementById('cmp-phone')?.value;

    const att = this.complaintAttachment;

    const newC = window.appState.addComplaint({
      category: cat,
      categoryMr: cat,
      location: loc,
      description: desc,
      isAnonymous: isAnon,
      citizenName: name,
      citizenPhone: phone,
      photoUrl: att?.dataUrl || null,
      attachmentName: att?.fileName || null,
      attachmentType: att?.fileType || null,
      attachmentSize: att?.fileSize || null
    });

    // Reset attachment
    this.complaintAttachment = null;

    alert(`आपली तक्रार यशस्वीरित्या नोंदवली गेली आहे!\n\nतक्रार क्रमांक (Tracking ID): ${newC.trackingId}\n${newC.photoUrl ? 'छायाचित्र / पुरावा: जोडला गेला आहे ✅\n' : ''}\nकृपया हा क्रमांक जपून ठेवा.`);
    
    // Refresh page
    window.appState.setRoute('complaints');
  },

  trackSpecificComplaint(trackingId) {
    const box = document.getElementById('track-result-box');
    if (!box) return;

    const cleanId = (trackingId || '').trim().toUpperCase();
    const match = window.appState.state.complaints.find(c => c.trackingId.toUpperCase() === cleanId);

    if (!match) {
      box.innerHTML = `
        <div class="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs">
          तक्रार क्रमांक "${cleanId}" सापडला नाही. कृपया बरोबर क्रमांक टाका.
        </div>
      `;
      return;
    }

    const isDoc = match.attachmentType === 'document' || (match.photoUrl && (match.photoUrl.startsWith('data:application/pdf') || match.photoUrl.endsWith('.pdf')));

    box.innerHTML = `
      <div class="p-4 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 text-xs space-y-2.5">
        <div class="flex justify-between items-center">
          <strong class="font-bold text-sm font-mono">${match.trackingId}</strong>
          <span class="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px]">
            ${match.statusMr}
          </span>
        </div>
        <p class="text-slate-800 font-semibold">${match.title}</p>
        <p class="text-slate-600 text-[11px]">📍 ${match.location} | दिनांक: ${match.submittedDate}</p>

        ${match.photoUrl ? `
          <div class="pt-2 border-t border-emerald-200/80">
            <div class="text-[11px] font-bold text-emerald-900 mb-1.5 flex items-center justify-between">
              <span>${isDoc ? '📄 जोडलेला अर्ज / दस्तऐवज:' : '📸 जोडलेले स्थळ छायाचित्र:'}</span>
              <button 
                type="button" 
                onclick="window.components.openComplaintMediaModal('${match.id}')" 
                class="text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
              >
                मोठ्या आकारात पहा 🔍
              </button>
            </div>
            ${isDoc ? `
              <div 
                onclick="window.components.openComplaintMediaModal('${match.id}')" 
                class="p-2 bg-white rounded-lg border border-emerald-200 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition"
              >
                <span class="truncate font-semibold text-slate-800">📄 ${match.attachmentName || 'दस्तऐवज प्रत'}</span>
                <span class="text-[10px] text-emerald-800 font-bold">उघडा ↗</span>
              </div>
            ` : `
              <div 
                onclick="window.components.openComplaintMediaModal('${match.id}')" 
                class="relative rounded-lg overflow-hidden border border-emerald-300 cursor-pointer group"
              >
                <img src="${match.photoUrl}" alt="${match.title}" class="w-full h-32 object-cover group-hover:scale-105 transition" />
                <div class="absolute bottom-1.5 right-1.5 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-xs">
                  🔍 क्लिक करून पहा
                </div>
              </div>
            `}
          </div>
        ` : ''}

        <div class="pt-2 border-t border-emerald-200 text-[11px] text-slate-700">
          <strong>अद्यतन:</strong> ${match.updates[match.updates.length - 1]?.note}
        </div>
      </div>
    `;
  },

  openPreviewModal(url, title, isDoc = false) {
    let container = document.getElementById('complaint-photo-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'complaint-photo-modal-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop" onclick="if(event.target === this) window.components.closeComplaintMediaModal()">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col" onclick="event.stopPropagation()">
          <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div class="flex items-center gap-2">
              <span class="text-xl">📸</span>
              <h3 class="font-bold text-sm sm:text-base truncate max-w-md">${title || 'फोटो पूर्वावलोकन (Photo Preview)'}</h3>
            </div>
            <button onclick="window.components.closeComplaintMediaModal()" class="text-slate-400 hover:text-white p-1 text-2xl font-bold cursor-pointer">✕</button>
          </div>
          <div class="p-4 bg-slate-950 flex items-center justify-center overflow-auto max-h-[68vh] min-h-[260px]">
            ${isDoc ? `
              <div class="bg-white p-6 rounded-2xl text-center max-w-sm w-full space-y-3 shadow-lg">
                <span class="text-5xl block">📄</span>
                <p class="font-bold text-sm text-slate-800">${title}</p>
                <p class="text-xs text-slate-500">अधिकृत PDF दस्तऐवज / पुरावा</p>
                <div class="pt-2">
                  <a href="${url}" download="${title || 'document.pdf'}" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition">
                    <span>📥</span>
                    <span>दस्तऐवज डाउनलोड करा</span>
                  </a>
                </div>
              </div>
            ` : `
              <img 
                src="${url}" 
                alt="Preview" 
                class="max-h-[62vh] max-w-full rounded-xl object-contain shadow-2xl transition hover:scale-105 duration-200 cursor-zoom-in" 
                onclick="window.open('${url}', '_blank')"
                title="नवीन टॅबमध्ये पूर्ण आकारात उघडण्यासाठी क्लिक करा"
              />
            `}
          </div>
          <div class="p-3 border-t border-slate-200 bg-white flex items-center justify-between">
            <span class="text-xs text-slate-500">
              ${!isDoc ? '💡 फोटोवर क्लिक करून पूर्ण आकारात पाहू शकता' : ''}
            </span>
            <div class="flex items-center gap-2">
              ${!isDoc ? `
                <a 
                  href="${url}" 
                  download="gramsetu-photo.jpg" 
                  target="_blank" 
                  class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>📥</span>
                  <span>फोटो डाउनलोड</span>
                </a>
              ` : ''}
              <button onclick="window.components.closeComplaintMediaModal()" class="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer">
                बंद करा
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  openComplaintMediaModal(complaintId) {
    let container = document.getElementById('complaint-photo-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'complaint-photo-modal-container';
      document.body.appendChild(container);
    }
    const cmp = window.appState.state.complaints.find(c => c.id === complaintId);
    if (!cmp || !cmp.photoUrl) return;

    const isDoc = cmp.attachmentType === 'document' || (cmp.photoUrl && (cmp.photoUrl.startsWith('data:application/pdf') || cmp.photoUrl.endsWith('.pdf')));

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeComplaintMediaModal()">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col" onclick="event.stopPropagation()">
          
          <!-- Header -->
          <div class="p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-mono font-bold text-xs bg-emerald-50 text-emerald-950 px-2 py-0.5 rounded border border-emerald-200">${cmp.trackingId}</span>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full ${cmp.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-100 text-emerald-950 border border-emerald-300'}">
                  ● ${cmp.statusMr || cmp.status}
                </span>
                <span class="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">${cmp.categoryMr || cmp.category}</span>
              </div>
              <h3 class="font-bold text-slate-900 text-base leading-snug">${cmp.title || cmp.description}</h3>
              <p class="text-xs text-slate-500 mt-0.5">📍 ${cmp.location} • दाखल दिनांक: ${cmp.submittedDate}</p>
            </div>
            <button onclick="window.components.closeComplaintMediaModal()" class="text-slate-400 hover:text-slate-700 p-1.5 text-xl font-bold cursor-pointer">✕</button>
          </div>

          <!-- Body / Media Content -->
          <div class="p-4 bg-slate-950 flex items-center justify-center overflow-auto max-h-[60vh] min-h-[240px]">
            ${isDoc ? `
              <div class="bg-white rounded-2xl p-6 text-center max-w-md w-full shadow-lg space-y-3">
                <span class="text-5xl block">📄</span>
                <h4 class="font-bold text-slate-900 text-sm">${cmp.attachmentName || 'तक्रार दस्तऐवज / अर्ज प्रत'}</h4>
                <p class="text-xs text-slate-500">${cmp.attachmentSize || 'PDF दस्तऐवज पुरावा'}</p>
                <div class="pt-2">
                  <a 
                    href="${cmp.photoUrl}" 
                    download="${cmp.attachmentName || 'complaint-' + cmp.trackingId + '.pdf'}" 
                    target="_blank"
                    class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
                  >
                    <span>📥</span>
                    <span>दस्तऐवज उघडा / डाउनलोड करा</span>
                  </a>
                </div>
              </div>
            ` : `
              <img 
                src="${cmp.photoUrl}" 
                alt="${cmp.title}" 
                class="max-h-[55vh] max-w-full rounded-2xl object-contain shadow-2xl" 
                onerror="this.src='https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80';"
              />
            `}
          </div>

          <!-- Description and Audit note -->
          <div class="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 space-y-1">
            <div><strong>समस्या तपशील:</strong> ${cmp.description}</div>
            <div class="text-[11px] text-slate-500"><strong>तक्रारदार:</strong> ${cmp.citizenName} ${cmp.citizenPhone ? ' • फोन: ' + cmp.citizenPhone : ''}</div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
            <span class="text-slate-500 text-[11px]">
              ${cmp.updates && cmp.updates.length ? 'शेवटचे अद्यतन: ' + cmp.updates[cmp.updates.length - 1].note : ''}
            </span>
            <div class="flex items-center gap-2">
              ${!isDoc ? `
                <a 
                  href="${cmp.photoUrl}" 
                  download="complaint-${cmp.trackingId}.jpg" 
                  target="_blank" 
                  class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                >
                  <span>📥</span>
                  <span>फोटो डाउनलोड</span>
                </a>
              ` : ''}
              <button 
                onclick="window.components.closeComplaintMediaModal()" 
                class="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  closeComplaintMediaModal() {
    const container = document.getElementById('complaint-photo-modal-container');
    if (container) container.innerHTML = '';
  },

  // 11. Public Questions View (Sec 4.13)
  renderQuestionsView() {
    const t = (k) => window.appState.t(k);
    const questions = window.appState.state.questions;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <span>❓</span>
            <span>ग्रामपंचायत थेट प्रश्नोत्तर मंच</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('questionsHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('questionsSubheading')}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Ask Question Box -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 class="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>✍️</span>
              <span>${t('askQuestion')}</span>
            </h2>

            <form onsubmit="window.components.handleAskQuestion(event)" class="space-y-4">
              <div>
                <label for="qst-cat" class="block text-xs font-bold text-slate-700 mb-1">प्रकार निवडा</label>
                <select id="qst-cat" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium">
                  <option value="विकासकामे">विकासकामे व रस्ते</option>
                  <option value="पाणी व आरोग्य">पाणी व आरोग्य</option>
                  <option value="शासकीय निधी व बजेट">शासकीय निधी व बजेट</option>
                  <option value="ग्रामसभा व ठराव">ग्रामसभा व ठराव</option>
                </select>
              </div>

              <div>
                <label for="qst-text" class="block text-xs font-bold text-slate-700 mb-1">आपला प्रश्न</label>
                <textarea id="qst-text" rows="4" required placeholder="${t('questionPlaceholder')}" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"></textarea>
              </div>

              <div>
                <label for="qst-name" class="block text-xs font-bold text-slate-700 mb-1">नाव (ऐच्छिक)</label>
                <input type="text" id="qst-name" placeholder="उदा. ग्रामस्थ, वार्ड क्र. ३" class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>

              <button type="submit" class="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition">
                प्रश्न सबमिट करा
              </button>
            </form>
          </div>

          <!-- Answered Questions Feed -->
          <div class="lg:col-span-2 space-y-4">
            ${questions.map(q => `
              <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div class="flex items-center justify-between gap-2 text-xs mb-2">
                  <span class="font-mono font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${q.questionId}</span>
                  <span class="text-slate-400">${q.date} | विचारणारा: ${q.askedBy}</span>
                </div>

                <h3 class="text-base font-bold text-slate-900 mb-3">❓ ${q.question}</h3>

                ${q.officialResponse ? `
                  <div class="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                    <strong class="text-emerald-900 block mb-1">✅ ${t('officialAnswer')}:</strong>
                    <p class="leading-relaxed">${q.officialResponse}</p>
                    <div class="mt-2 pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                      <span>${t('answeredBy')}: ${q.respondedBy}</span>
                      <span>दिनांक: ${q.responseDate}</span>
                    </div>
                  </div>
                ` : `
                  <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                    ⏳ हा प्रश्न सध्या ग्रामपंचायत प्रशासनाच्या छाननी अंतर्गत आहे. लवकरच अधिकृत खुलासा दिला जाईल.
                  </div>
                `}
              </div>
            `).join('')}
          </div>

        </div>

      </section>
    `;
  },

  handleAskQuestion(e) {
    e.preventDefault();
    const cat = document.getElementById('qst-cat').value;
    const text = document.getElementById('qst-text').value;
    const name = document.getElementById('qst-name').value;

    const newQ = window.appState.addPublicQuestion({
      category: cat,
      question: text,
      citizenName: name
    });

    alert(`आपला सार्वजनिक प्रश्न यशस्वीरित्या दाखल झाला!\n\nप्रश्न आयडी: ${newQ.questionId}`);
    window.appState.setRoute('questions');
  },

  // 12. Documents Center View (Sec 4.14)
  currentDocFilter: 'ALL',

  filterDocuments(type) {
    this.currentDocFilter = type;
    const main = document.getElementById('main-content');
    if (main && window.appState.state.currentRoute === 'documents') {
      main.innerHTML = this.renderDocumentsView(type);
      this.applyLanguageToDOM(main);
    } else {
      window.appState.setRoute('documents');
    }
  },

  renderDocumentsView(filterType = null) {
    const t = (k) => window.appState.t(k);
    const isAdmin = window.appState.isAdmin();
    const allDocs = window.appState.state.documents || window.VILLAGE_DATA?.documents || [];
    const activeFilter = filterType || this.currentDocFilter || 'ALL';
    this.currentDocFilter = activeFilter;

    const filteredDocs = activeFilter === 'ALL'
      ? allDocs
      : (activeFilter === 'Document'
          ? allDocs.filter(d => d.docType === 'Document' || !d.docType)
          : allDocs.filter(d => d.docType === activeFilter));

    const invoiceCount = allDocs.filter(d => d.docType === 'Invoice').length;
    const letterCount = allDocs.filter(d => d.docType === 'Letter').length;
    const licenceCount = allDocs.filter(d => d.docType === 'Licence').length;
    const docCount = allDocs.filter(d => d.docType === 'Document' || !d.docType).length;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Header & Admin Action -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              <span>📂</span>
              <span>सार्वजनिक दस्तऐवज, बिले व परवाना भांडार</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('documentsHeading')}</h1>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">ग्रामपंचायत विकासकामांची बिले (Invoices), शासकीय पत्रे (Letters), अधिकृत परवाने (Licences) व ठराव</p>
          </div>

          <!-- SEPARATE DEDICATED BUTTON TO UPLOAD DOCUMENTS ONLY FOR ADMIN -->
          <div>
            ${isAdmin ? `
              <button 
                onclick="window.components.openUploadDocumentModal()" 
                class="px-4 py-3 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-black rounded-2xl text-xs sm:text-sm shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
                title="नवीन देयक (Invoice), शासकीय पत्र (Letter), परवाना (Licence) किंवा दस्तऐवज जोडा"
              >
                <span class="text-base">📤</span>
                <span>नवीन दस्तऐवज / बिल / परवाना अपलोड करा</span>
                <span class="bg-emerald-900 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-700">Admin Only</span>
              </button>
            ` : `
              <div class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>नागरिक खुला वाचन कक्ष (सार्वजनिक प्रत डाउनलोड उपलब्ध)</span>
              </div>
            `}
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          <button 
            onclick="window.components.filterDocuments('ALL')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeFilter === 'ALL' ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}"
          >
            सर्व कागदपत्रे (${allDocs.length})
          </button>
          <button 
            onclick="window.components.filterDocuments('Invoice')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${activeFilter === 'Invoice' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}"
          >
            <span>🧾</span>
            <span>देयके व बिले (Invoices)</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === 'Invoice' ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-100 text-emerald-900'}">${invoiceCount}</span>
          </button>
          <button 
            onclick="window.components.filterDocuments('Letter')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${activeFilter === 'Letter' ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}"
          >
            <span>✉️</span>
            <span>शासकीय पत्रे (Letters)</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === 'Letter' ? 'bg-white text-sky-700' : 'bg-sky-100 text-sky-900'}">${letterCount}</span>
          </button>
          <button 
            onclick="window.components.filterDocuments('Licence')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${activeFilter === 'Licence' ? 'bg-purple-700 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}"
          >
            <span>📜</span>
            <span>परवाने व दाखले (Licences)</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === 'Licence' ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-900'}">${licenceCount}</span>
          </button>
          <button 
            onclick="window.components.filterDocuments('Document')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${activeFilter === 'Document' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}"
          >
            <span>📑</span>
            <span>ठराव व अहवाल (Documents)</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === 'Document' ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-900'}">${docCount}</span>
          </button>
        </div>

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filteredDocs.length === 0 ? `
            <div class="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200">
              <span class="text-4xl block mb-2">📁</span>
              <p class="text-sm font-bold text-slate-700">या प्रवर्गात सध्या कोणतेही दस्तऐवज उपलब्ध नाहीत.</p>
              ${isAdmin ? `
                <button onclick="window.components.openUploadDocumentModal('${activeFilter}')" class="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs">
                  + पहिला दस्तऐवज अपलोड करा
                </button>
              ` : ''}
            </div>
          ` : filteredDocs.map(doc => this.renderDocumentCard(doc)).join('')}
        </div>

      </section>
    `;
  },

  renderDocumentCard(doc) {
    const t = (k) => window.appState.t(k);
    const docType = doc.docType || 'Document';

    let badgeClass = 'bg-emerald-50 text-emerald-950 border-emerald-300';
    let typeIcon = '📑';
    let typeName = doc.categoryMr || 'दस्तऐवज';

    if (docType === 'Invoice') {
      badgeClass = 'bg-emerald-100 text-emerald-950 border-emerald-300';
      typeIcon = '🧾';
      typeName = 'देयक व बिल (Invoice)';
    } else if (docType === 'Letter') {
      badgeClass = 'bg-sky-100 text-sky-900 border-sky-300';
      typeIcon = '✉️';
      typeName = 'शासकीय पत्र (Letter)';
    } else if (docType === 'Licence') {
      badgeClass = 'bg-purple-100 text-purple-900 border-purple-300';
      typeIcon = '📜';
      typeName = 'परवाना / दाखला (Licence)';
    }

    return `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <!-- Type Badge & Official Tag -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${badgeClass}">
              <span>${typeIcon}</span>
              <span>${typeName}</span>
            </span>
            <span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>प्रमाणित प्रत</span>
            </span>
          </div>

          <h2 class="text-base font-bold text-slate-900 mb-2 leading-snug">${doc.name}</h2>
          <p class="text-xs text-slate-500 mb-4 line-clamp-2">${doc.description || ''}</p>

          <!-- Specialized Details Box for Invoices -->
          ${docType === 'Invoice' && doc.invoiceDetails ? `
            <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs mb-4 space-y-1">
              <div class="flex items-center justify-between pb-1 border-b border-emerald-200/60">
                <span class="text-slate-500 text-[11px]">देयक रक्कम (Bill Amount):</span>
                <span class="font-black text-emerald-950 text-sm">₹${Number(doc.invoiceDetails.amount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div class="text-[11px] text-slate-700"><strong>बिल क्र.:</strong> <span class="font-mono">${doc.invoiceDetails.billNo || 'N/A'}</span></div>
              <div class="text-[11px] text-slate-700"><strong>कंत्राटदार:</strong> ${doc.invoiceDetails.vendorName || 'N/A'}</div>
              <div class="text-[11px] text-slate-600"><strong>GSTIN:</strong> <span class="font-mono">${doc.invoiceDetails.gstin || 'N/A'}</span></div>
              ${doc.invoiceDetails.linkedWork ? `
                <div class="text-[10px] text-emerald-950 bg-emerald-100/70 px-2 py-0.5 rounded font-medium mt-1">
                  कामाशी जोडणी: ${doc.invoiceDetails.linkedWork}
                </div>
              ` : ''}
              ${doc.invoiceDetails.paymentStatus ? `
                <div class="pt-1 flex items-center justify-between text-[10px]">
                  <span class="text-slate-500">स्थिती:</span>
                  <span class="px-2 py-0.5 rounded font-black ${doc.invoiceDetails.paymentStatus === 'PAID' ? 'bg-emerald-200 text-emerald-950' : 'bg-slate-200 text-slate-800'}">
                    ${doc.invoiceDetails.paymentStatus === 'PAID' ? '✅ देयक पूर्ण (Paid)' : '⏳ प्रलंबित (Pending)'}
                  </span>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Specialized Details Box for Govt Letters -->
          ${docType === 'Letter' && doc.letterDetails ? `
            <div class="bg-sky-50/70 p-3 rounded-xl border border-sky-200 text-xs mb-4 space-y-1">
              <div class="text-[11px] text-slate-700"><strong>जावक क्र. (Outward):</strong> <span class="font-mono font-bold text-sky-950">${doc.letterDetails.outwardNo || 'N/A'}</span></div>
              <div class="text-[11px] text-slate-600"><strong>विभाग:</strong> ${doc.letterDetails.department || 'ग्रामविकास विभाग'}</div>
              <div class="text-[11px] text-slate-600"><strong>स्वाक्षरीकर्ता:</strong> ${doc.letterDetails.issuingOfficer || 'सक्षम प्राधिकारी'}</div>
            </div>
          ` : ''}

          <!-- Specialized Details Box for Licences -->
          ${docType === 'Licence' && doc.licenceDetails ? `
            <div class="bg-purple-50/70 p-3 rounded-xl border border-purple-200 text-xs mb-4 space-y-1">
              <div class="text-[11px] text-purple-950 font-mono font-bold"><strong>परवाना क्र.:</strong> ${doc.licenceDetails.licenceNo || 'N/A'}</div>
              <div class="text-[11px] text-slate-700"><strong>अर्जदार / धारक:</strong> ${doc.licenceDetails.applicantName || 'N/A'}</div>
              <div class="text-[11px] text-slate-600"><strong>जागा / मालमत्ता:</strong> ${doc.licenceDetails.propertyNo || 'गावात'}</div>
              <div class="text-[11px] text-slate-600"><strong>वैधता मुदत:</strong> ${doc.licenceDetails.validity || 'कायमस्वरूपी'}</div>
            </div>
          ` : ''}
        </div>

        <div>
          <div class="text-[11px] text-slate-400 mb-4 space-y-0.5 border-t border-slate-100 pt-2">
            <div><strong>प्रसिद्धी:</strong> ${doc.date} | <strong>आकार:</strong> ${doc.fileSize || '1.2 MB'}</div>
            <div><strong>स्रोत:</strong> ${doc.source || 'ग्रामपंचायत कार्यालय'}</div>
            ${doc.uploadedBy ? `<div class="text-emerald-950 font-medium"><strong>अपलोडकर्ता:</strong> ${doc.uploadedBy}</div>` : ''}
          </div>

          <button 
            onclick="alert('अधिकृत प्रत डाउनलोड सुरू झाले:\\n${doc.name.replace(/'/g, "\\'")}\\nफाईल: ${doc.fileName}')"
            class="w-full py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow"
          >
            <span>📥</span>
            <span>अधिकृत प्रत डाउनलोड करा (${doc.fileSize || 'PDF'})</span>
          </button>
        </div>
      </div>
    `;
  },

  // ADMIN DEDICATED DOCUMENT UPLOAD MODAL
  openUploadDocumentModal(preselectedType = 'Invoice') {
    if (!window.appState.isAdmin()) {
      alert("केवळ प्रशासकीय खात्याला दस्तऐवज अपलोड करण्याचे अधिकार आहेत.");
      return;
    }

    const container = document.getElementById('upload-doc-modal-container');
    if (!container) return;

    this.currentUploadType = preselectedType || 'Invoice';
    this.uploadedFileMeta = null;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeUploadDocumentModal()">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200" onclick="event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-start justify-between gap-4 z-10">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold mb-1">
                <span>🛡️ प्रशासकीय विशेषाधिकार (Admin Exclusive)</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">नवीन दस्तऐवज, देयक किंवा परवाना अपलोड करा</h2>
              <p class="text-xs text-slate-500 mt-0.5">
                प्रशासक: <strong class="text-emerald-950">${window.appState.state.session?.username || 'Village Admin'}</strong> • सार्वजनिक पारदर्शकतेसाठी थेट प्रसिद्धी
              </p>
            </div>
            <button onclick="window.components.closeUploadDocumentModal()" class="text-slate-400 hover:text-slate-700 p-2 text-xl font-bold cursor-pointer">
              ✕
            </button>
          </div>

          <form onsubmit="window.components.handleUploadDocumentSubmit(event)" class="p-6 space-y-5 text-xs">
            
            <!-- Step 1: Document Type Tabs -->
            <div>
              <label class="block font-bold text-slate-800 mb-2">१. दस्तऐवजाचा प्रकार निवडा (Select Document Category) *</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button 
                  type="button" 
                  onclick="window.components.onUploadDocTypeChanged('Invoice')" 
                  id="tab-btn-Invoice"
                  class="p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${this.currentUploadType === 'Invoice' ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}"
                >
                  <span class="text-lg block mb-0.5">🧾</span>
                  <span>देयक / बिल (Invoice)</span>
                </button>

                <button 
                  type="button" 
                  onclick="window.components.onUploadDocTypeChanged('Letter')" 
                  id="tab-btn-Letter"
                  class="p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${this.currentUploadType === 'Letter' ? 'bg-sky-600 text-white border-sky-700 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}"
                >
                  <span class="text-lg block mb-0.5">✉️</span>
                  <span>शासकीय पत्र (Letter)</span>
                </button>

                <button 
                  type="button" 
                  onclick="window.components.onUploadDocTypeChanged('Licence')" 
                  id="tab-btn-Licence"
                  class="p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${this.currentUploadType === 'Licence' ? 'bg-purple-700 text-white border-purple-800 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}"
                >
                  <span class="text-lg block mb-0.5">📜</span>
                  <span>परवाना / दाखला (Licence)</span>
                </button>

                <button 
                  type="button" 
                  onclick="window.components.onUploadDocTypeChanged('Document')" 
                  id="tab-btn-Document"
                  class="p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${this.currentUploadType === 'Document' ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}"
                >
                  <span class="text-lg block mb-0.5">📑</span>
                  <span>इतर दस्तऐवज (Document)</span>
                </button>
              </div>
            </div>

            <!-- Common Field: Title -->
            <div>
              <label for="doc-upload-title" class="block font-bold text-slate-800 mb-1">
                २. दस्तऐवज / बिल / पत्राचे शीर्षक (Title / Subject) *
              </label>
              <input 
                type="text" 
                id="doc-upload-title" 
                required 
                placeholder="उदा. मुख्य रस्ता खडीकरण व डांबरीकरण काम - देयक क्र. ३" 
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
              />
            </div>

            <!-- Dynamic Specific Fields Container -->
            <div id="dynamic-upload-fields" class="space-y-4">
              <!-- Rendered by onUploadDocTypeChanged -->
            </div>

            <!-- Common Description -->
            <div>
              <label for="doc-upload-desc" class="block font-bold text-slate-800 mb-1">
                संक्षिप्त वर्णन (Description / Note)
              </label>
              <textarea 
                id="doc-upload-desc" 
                rows="2" 
                placeholder="दस्तऐवजाविषयी माहिती किंवा कामाचा संदर्भ..." 
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
              ></textarea>
            </div>

            <!-- File Upload Dropzone -->
            <div>
              <label class="block font-bold text-slate-800 mb-1">
                फाइल निवडा (Attach Document File: PDF, DOCX, JPG, PNG) *
              </label>
              <div 
                onclick="document.getElementById('doc-file-input').click()" 
                class="border-2 border-dashed border-slate-300 hover:border-emerald-700 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-5 text-center cursor-pointer transition"
              >
                <input 
                  type="file" 
                  id="doc-file-input" 
                  class="hidden" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onchange="window.components.handleDocFileChosen(this)"
                />
                <div id="doc-file-preview" class="space-y-1">
                  <span class="text-3xl block">📎</span>
                  <div class="font-bold text-slate-700">फाईल जोडण्यासाठी येथे क्लिक करा किंवा ड्रॉप करा</div>
                  <div class="text-[10px] text-slate-400">PDF, DOCX, JPG, PNG (कमाल मर्यादा २५ MB)</div>
                </div>
              </div>
            </div>

            <!-- Submit Button Bar -->
            <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button 
                type="button" 
                onclick="window.components.closeUploadDocumentModal()" 
                class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition"
              >
                रद्द करा (Cancel)
              </button>
              <button 
                type="submit" 
                class="px-6 py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-black rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <span>📤</span>
                <span>प्रसिद्ध व अपलोड करा (Publish & Upload)</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    this.applyLanguageToDOM(container);
    this.onUploadDocTypeChanged(this.currentUploadType);
  },

  onUploadDocTypeChanged(type) {
    this.currentUploadType = type;
    ['Invoice', 'Letter', 'Licence', 'Document'].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (!btn) return;
      if (t === type) {
        if (t === 'Invoice') btn.className = 'p-2.5 rounded-xl border text-center font-bold transition cursor-pointer bg-emerald-800 text-white border-emerald-900 shadow-sm';
        if (t === 'Letter') btn.className = 'p-2.5 rounded-xl border text-center font-bold transition cursor-pointer bg-sky-600 text-white border-sky-700 shadow-sm';
        if (t === 'Licence') btn.className = 'p-2.5 rounded-xl border text-center font-bold transition cursor-pointer bg-purple-700 text-white border-purple-800 shadow-sm';
        if (t === 'Document') btn.className = 'p-2.5 rounded-xl border text-center font-bold transition cursor-pointer bg-emerald-700 text-white border-emerald-800 shadow-sm';
      } else {
        btn.className = 'p-2.5 rounded-xl border text-center font-bold transition cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';
      }
    });

    const dynContainer = document.getElementById('dynamic-upload-fields');
    if (!dynContainer) return;

    if (type === 'Invoice') {
      dynContainer.innerHTML = `
        <div class="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
          <div class="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <span>🧾</span>
            <span>देयक व बिल तपशील (Invoice Details)</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="inv-bill-no" class="block font-bold text-slate-700 mb-1">बिल / इनव्हॉईस क्रमांक (Bill No) *</label>
              <input type="text" id="inv-bill-no" required placeholder="उदा. BILL/2026/894" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>

            <div>
              <label for="inv-amount" class="block font-bold text-slate-700 mb-1">देयक रक्कम ₹ (Amount in INR) *</label>
              <input type="number" id="inv-amount" required placeholder="उदा. 350000" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="inv-vendor" class="block font-bold text-slate-700 mb-1">कंत्राटदार / पुरवठादार (Vendor Name) *</label>
              <input type="text" id="inv-vendor" required placeholder="उदा. सह्याद्री इन्फ्रा प्रोजेक्ट्स" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>

            <div>
              <label for="inv-gstin" class="block font-bold text-slate-700 mb-1">GSTIN क्रमांक (GST Number)</label>
              <input type="text" id="inv-gstin" placeholder="उदा. 27AAAAA0000A1Z5" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="inv-work" class="block font-bold text-slate-700 mb-1">संबंधित विकासकाम (Linked Project)</label>
              <select id="inv-work" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs">
                ${(window.appState.state.works || []).map(w => `<option value="${w.title}">${w.workId} - ${w.title.substring(0, 35)}...</option>`).join('')}
                <option value="इतर विकासकाम">इतर / सामान्य प्रशासकीय खर्च</option>
              </select>
            </div>

            <div>
              <label for="inv-payment-status" class="block font-bold text-slate-700 mb-1">देयक स्थिती (Payment Status)</label>
              <select id="inv-payment-status" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold">
                <option value="PAID">✅ देयक पूर्ण (Paid / अदा केले)</option>
                <option value="PENDING">⏳ प्रलंबित (Pending / छाननी सुरू)</option>
              </select>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'Letter') {
      dynContainer.innerHTML = `
        <div class="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 space-y-3">
          <div class="text-xs font-bold text-sky-950 flex items-center gap-1.5">
            <span>✉️</span>
            <span>शासकीय पत्र तपशील (Letter Details)</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="ltr-outward-no" class="block font-bold text-slate-700 mb-1">जावक क्रमांक (Outward No.) *</label>
              <input type="text" id="ltr-outward-no" required placeholder="उदा. जा.क्र./जि.प./२०२६/४४२" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono" />
            </div>

            <div>
              <label for="ltr-department" class="block font-bold text-slate-700 mb-1">संबंधित शासकीय विभाग (Department) *</label>
              <input type="text" id="ltr-department" required placeholder="उदा. ग्रामीण पाणीपुरवठा व स्वच्छता विभाग" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>
          </div>

          <div>
            <label for="ltr-officer" class="block font-bold text-slate-700 mb-1">स्वाक्षरीकर्ता अधिकारी / पदनाम (Issuing Authority)</label>
            <input type="text" id="ltr-officer" placeholder="उदा. गटविकास अधिकारी (BDO) / मुख्य कार्यकारी अधिकारी" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
          </div>
        </div>
      `;
    } else if (type === 'Licence') {
      dynContainer.innerHTML = `
        <div class="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-3">
          <div class="text-xs font-bold text-purple-950 flex items-center gap-1.5">
            <span>📜</span>
            <span>परवाना व दाखला तपशील (Licence Details)</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="lic-no" class="block font-bold text-slate-700 mb-1">परवाना क्रमांक (Licence No) *</label>
              <input type="text" id="lic-no" required placeholder="उदा. LIC-MH-2026-8812" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono" />
            </div>

            <div>
              <label for="lic-applicant" class="block font-bold text-slate-700 mb-1">अर्जदाराचे नाव / संस्था (Applicant Name) *</label>
              <input type="text" id="lic-applicant" required placeholder="उदा. रमेश बबन पाटील (कृषी केंद्र)" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="lic-property" class="block font-bold text-slate-700 mb-1">मालमत्ता / घर / सर्व्हे क्र. (Property No)</label>
              <input type="text" id="lic-property" placeholder="उदा. घर क्र. १२२ / गट क्र. ४५" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>

            <div>
              <label for="lic-validity" class="block font-bold text-slate-700 mb-1">वैधता मुदत (Validity Period)</label>
              <input type="text" id="lic-validity" placeholder="उदा. ३१ मार्च २०२७" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>
          </div>
        </div>
      `;
    } else {
      dynContainer.innerHTML = `
        <div class="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
          <div class="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <span>📑</span>
            <span>इतर शासकीय दस्तऐवज / ठराव तपशील</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="doc-cat-select" class="block font-bold text-slate-700 mb-1">दस्तऐवज प्रवर्ग (Category)</label>
              <select id="doc-cat-select" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs">
                <option value="ग्रामसभा ठराव">ग्रामसभा ठराव (Gram Sabha Resolution)</option>
                <option value="लेखापरीक्षण अहवाल">लेखापरीक्षण अहवाल (Audit Report)</option>
                <option value="वार्षिक विकास आराखडा">वार्षिक विकास आराखडा (Annual DP)</option>
                <option value="सार्वजनिक सूचना">सार्वजनिक जाहीर सूचना (Public Notice)</option>
              </select>
            </div>

            <div>
              <label for="doc-issuing-office" class="block font-bold text-slate-700 mb-1">जारी करणारे कार्यालय</label>
              <input type="text" id="doc-issuing-office" value="ग्रामपंचायत कार्यालय" class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs" />
            </div>
          </div>
        </div>
      `;
      this.applyLanguageToDOM(container);
    }
  },

  handleDocFileChosen(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      this.uploadedFileMeta = {
        name: file.name,
        size: `${sizeMb} MB`,
        type: file.type || 'application/pdf'
      };

      const preview = document.getElementById('doc-file-preview');
      if (preview) {
        preview.innerHTML = `
          <span class="text-3xl block">📄</span>
          <div class="font-extrabold text-emerald-950">${file.name}</div>
          <div class="text-[11px] text-emerald-700 font-bold">आकार: ${sizeMb} MB • फाइल तयार आहे ✅</div>
        `;
      }
    }
  },

  handleUploadDocumentSubmit(e) {
    e.preventDefault();
    const type = this.currentUploadType || 'Invoice';
    const title = document.getElementById('doc-upload-title')?.value || '';
    const desc = document.getElementById('doc-upload-desc')?.value || '';

    if (!title) {
      alert("कृपया दस्तऐवजाचे शीर्षक प्रविष्ट करा.");
      return;
    }

    const fileMeta = this.uploadedFileMeta || {
      name: `${title.substring(0, 20)}.pdf`,
      size: '1.4 MB',
      type: 'application/pdf'
    };

    let docPayload = {
      title: title,
      docType: type,
      description: desc,
      fileName: fileMeta.name,
      fileSize: fileMeta.size,
      mimeType: fileMeta.type,
      date: new Date().toLocaleDateString('mr-IN')
    };

    if (type === 'Invoice') {
      docPayload.billNo = document.getElementById('inv-bill-no')?.value;
      docPayload.amount = document.getElementById('inv-amount')?.value;
      docPayload.vendorName = document.getElementById('inv-vendor')?.value;
      docPayload.gstin = document.getElementById('inv-gstin')?.value;
      docPayload.linkedWork = document.getElementById('inv-work')?.value;
      docPayload.paymentStatus = document.getElementById('inv-payment-status')?.value || 'PAID';
      docPayload.categoryMr = 'देयक व बिल (Invoice)';
    } else if (type === 'Letter') {
      docPayload.outwardNo = document.getElementById('ltr-outward-no')?.value;
      docPayload.department = document.getElementById('ltr-department')?.value;
      docPayload.issuingOfficer = document.getElementById('ltr-officer')?.value;
      docPayload.categoryMr = 'शासकीय पत्र (Govt Letter)';
    } else if (type === 'Licence') {
      docPayload.licenceNo = document.getElementById('lic-no')?.value;
      docPayload.applicantName = document.getElementById('lic-applicant')?.value;
      docPayload.propertyNo = document.getElementById('lic-property')?.value;
      docPayload.validity = document.getElementById('lic-validity')?.value;
      docPayload.categoryMr = 'परवाना व दाखला (Licence)';
    } else {
      docPayload.categoryMr = document.getElementById('doc-cat-select')?.value || 'शासकीय दस्तऐवज';
      docPayload.source = document.getElementById('doc-issuing-office')?.value || 'ग्रामपंचायत कार्यालय';
    }

    const created = window.appState.addDocument(docPayload);
    this.closeUploadDocumentModal();

    alert(`✅ नवीन ${docPayload.categoryMr} यशस्वीरित्या अपलोड झाला!\n\nदस्तऐवज आयडी: ${created.id}\nशीर्षक: ${created.name}`);

    // If on documents view, re-render documents
    if (window.appState.state.currentRoute === 'documents') {
      const main = document.getElementById('main-content');
      if (main) {
        main.innerHTML = this.renderDocumentsView(type);
        this.applyLanguageToDOM(main);
      }
    }
  },

  closeUploadDocumentModal() {
    const container = document.getElementById('upload-doc-modal-container');
    if (container) container.innerHTML = '';
  },

  // 13. Gram Sabha View (Sec 4.15)
  renderGramSabhaView() {
    const t = (k) => window.appState.t(k);
    const meetings = window.VILLAGE_DATA.gramSabhaMeetings;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <span>👥</span>
            <span>लोकशाही व नागरिक सहभाग</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('gramSabhaHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('gramSabhaSubheading')}</p>
        </div>

        <div class="space-y-6">
          ${meetings.map(m => `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
                <div>
                  <span class="text-xs font-bold px-3 py-1 rounded-full ${m.status === 'UPCOMING' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                    ● ${m.statusMr}
                  </span>
                  <h2 class="text-xl font-bold text-slate-900 mt-2">दिनांक: ${m.date} | वेळ: ${m.time}</h2>
                  <p class="text-xs text-slate-500">📍 ठिकाण: ${m.venue}</p>
                </div>
                ${m.attendeesCount ? `
                  <div class="text-right">
                    <span class="text-xs text-slate-400 block">उपस्थित नागरिक संख्या</span>
                    <span class="text-2xl font-extrabold text-emerald-950">${m.attendeesCount}</span>
                  </div>
                ` : ''}
              </div>

              <!-- Agenda Items -->
              <div class="mb-4">
                <strong class="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">${t('agenda')}:</strong>
                <ul class="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  ${m.agenda.map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>

              <!-- Resolutions if completed -->
              ${m.resolutions ? `
                <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs">
                  <strong class="text-emerald-950 font-bold block mb-2">${t('resolutionsPassed')}:</strong>
                  <ul class="space-y-1 text-emerald-900 list-disc pl-4">
                    ${m.resolutions.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                  <div class="mt-2 pt-2 border-t border-emerald-200 text-[11px] text-emerald-800">
                    अधिकृत नोंद: ${m.minutesDoc}
                  </div>
                </div>
              ` : ''}

            </div>
          `).join('')}
        </div>

      </section>
    `;
  },

  // 14. Notifications View (Sec 4.16)
  renderNotificationsView() {
    const t = (k) => window.appState.t(k);
    const notices = window.VILLAGE_DATA.notifications;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <span>🔔</span>
            <span>अधिकृत सूचना फलक</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${t('notificationsHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('notificationsSubheading')}</p>
        </div>

        <div class="space-y-4">
          ${notices.map(n => `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${n.urgency === 'HIGH' ? 'border-l-4 border-l-red-500' : ''}">
              <div class="flex items-center justify-between gap-2 text-xs mb-2">
                <span class="font-bold px-2.5 py-0.5 rounded-full ${n.urgency === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-950 border border-emerald-200'}">
                  ${n.categoryMr}
                </span>
                <span class="text-slate-400">दिनांक: ${n.date}</span>
              </div>

              <h2 class="text-base font-bold text-slate-900 mb-2">${n.title}</h2>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">${n.content}</p>

              <div class="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                जारीकर्ता: ${n.publishedBy}
              </div>
            </div>
          `).join('')}
        </div>

      </section>
    `;
  },

  // 15. GramSetu Mitra AI Assistant View (Sec 4.25, 13, 14, 15)
  // 15. GramSetu Mitra AI Assistant View (Sec 4.25, 13, 14, 15)
  renderAssistantView() {
    const t = (k) => window.appState.t(k);
    const s = window.appState.state;
    const history = s.aiChatHistory || [];
    const lang = s.lang || 'mr';

    // Auto-scroll chat log to bottom after render
    setTimeout(() => {
      const logs = document.getElementById('ai-chat-logs');
      if (logs) logs.scrollTop = logs.scrollHeight;
    }, 100);

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Header -->
        <div class="mb-6 text-center">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <span>🤖</span>
            <span>पडताळणी झालेला सरकारी AI मित्र सहाय्यक</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">${t('aiHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1 max-w-2xl mx-auto">${t('aiSubheading')}</p>
          <div class="flex items-center justify-center gap-2 mt-2 flex-wrap">
            <span class="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 inline-block px-3 py-1 rounded-full font-medium">
              🔒 ${t('aiDisclaimer')}
            </span>
            <span class="text-xs text-emerald-950 bg-emerald-50 border border-emerald-200 inline-block px-3 py-1 rounded-full font-bold">
              📜 संभाषण इतिहास जतन (Saved in LocalStorage)
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left Main Column: Active Chat Container (8 Cols) -->
          <div class="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
            
            <!-- Chat Container Header -->
            <div class="p-4 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white flex items-center justify-between border-b border-emerald-900">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-800 text-emerald-100 border border-emerald-600 flex items-center justify-center font-black text-base shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 class="font-extrabold text-sm text-white">ग्रामसेतू मित्र AI (Live Assistant)</h3>
                  <span class="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ऑनलाइन • पडताळलेल्या सरकारी नोंदींवर आधारित</span>
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button 
                  onclick="window.components.clearAiHistory()" 
                  class="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition cursor-pointer"
                  title="नवीन संभाषण सुरू करा व इतिहास साफ करा"
                >
                  🔄 नवीन चॅट
                </button>
              </div>
            </div>

            <!-- Chat Message Log -->
            <div id="ai-chat-logs" class="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/60">
              
              <!-- Bot Initial Greeting -->
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-950 to-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  🤖
                </div>
                <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm max-w-xl text-xs sm:text-sm text-slate-800 space-y-2">
                  <p>
                    नमस्कार! मी <strong>ग्रामसेतू मित्र</strong> आहे. सोनवाडी गावातील विकासकामे, खर्च, शासकीय योजना, सुविधा आणि अधिकृत कागदपत्रांबद्दल आपण मला कोणताही प्रश्न विचारू शकता.
                  </p>
                  <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                    💡 <strong>टीप:</strong> मी केवळ सोनवाडीच्या पडताळलेल्या सरकारी नोंदींवरून उत्तरे देतो. माहिती उपलब्ध नसल्यास मी स्पष्टपणे सांगतो.
                  </div>
                </div>
              </div>

              <!-- Replay Saved Chat History -->
              ${history.map(msg => {
                if (msg.role === 'user') {
                  return `
                    <div class="flex items-start justify-end gap-2.5">
                      <div class="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm max-w-xl text-xs sm:text-sm font-medium">
                        <p>${msg.text}</p>
                        <span class="text-[10px] text-emerald-200 block text-right mt-1 opacity-75">${msg.time || ''}</span>
                      </div>
                      <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        👤
                      </div>
                    </div>
                  `;
                } else {
                  return `
                    <div class="flex items-start gap-3">
                      <div class="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-950 to-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                        🤖
                      </div>
                      <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm max-w-xl text-xs sm:text-sm text-slate-800 space-y-2">
                        <p class="leading-relaxed">${msg.text}</p>
                        
                        ${msg.financial ? `
                          <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs mt-2 grid grid-cols-2 gap-2 text-emerald-950">
                            <div>मंजूर: <strong>₹${msg.financial.sanctioned.toLocaleString('en-IN')}</strong></div>
                            <div>खर्च: <strong>₹${msg.financial.spent.toLocaleString('en-IN')}</strong></div>
                          </div>
                        ` : ''}

                        ${msg.sources && msg.sources.length ? `
                          <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                            <strong>अधिकृत संदर्भ:</strong>
                            ${msg.sources.map(s => `<div>● ${s.title}</div>`).join('')}
                          </div>
                        ` : ''}

                        <div class="flex items-center justify-between pt-1 border-t border-slate-100">
                          <button onclick="window.mitraEngine.speak('${(msg.text || '').replace(/'/g, "\\'")}', '${lang}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                            🔊 ऐका (Listen)
                          </button>
                          <span class="text-[10px] text-slate-400 font-mono">${msg.time || ''}</span>
                        </div>
                      </div>
                    </div>
                  `;
                }
              }).join('')}

            </div>

            <!-- Suggested Prompt Chips -->
            <div class="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
              <span class="text-slate-400 whitespace-nowrap text-[11px] font-bold">सुचवलेले प्रश्न:</span>
              <button onclick="window.components.askAiQuickly('रस्त्याचे काम कधी पूर्ण होणार व खर्च किती आहे?')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer">
                रस्ता काम व खर्च
              </button>
              <button onclick="window.components.askAiQuickly('जल जीवन मिशन अंतर्गत किती नळ जोडणी झाली?')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer">
                जल जीवन मिशन
              </button>
              <button onclick="window.components.askAiQuickly('लाडकी बहीण योजनेची पात्रता काय आहे?')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer">
                लाडकी बहीण योजना
              </button>
              <button onclick="window.components.askAiQuickly('चालू वर्षात एकूण किती बजेट मंजूर आहे?')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer">
                वार्षिक बजेट
              </button>
            </div>

            <!-- Chat Input Bar -->
            <div class="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input 
                type="text" 
                id="ai-chat-input"
                placeholder="${t('askAiPlaceholder')}"
                class="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
                onkeypress="if(event.key === 'Enter') window.components.handleSendAiQuestion()"
              />
              <button 
                onclick="window.components.handleSendAiQuestion()"
                class="px-5 py-3 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                विचारा 🚀
              </button>
            </div>

          </div>

          <!-- Right Column: AI Mitra Friends History Panel (4 Cols) -->
          <div class="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
            
            <!-- History Header -->
            <div class="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">📜</span>
                <div>
                  <h3 class="font-extrabold text-sm text-slate-900">संभाषण इतिहास (Chat History)</h3>
                  <span class="text-[11px] text-slate-500 font-semibold" id="ai-history-count">
                    एकूण प्रश्न: ${history.filter(h => h.role === 'user').length}
                  </span>
                </div>
              </div>

              ${history.length > 0 ? `
                <button 
                  onclick="window.components.clearAiHistory()" 
                  class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="इतिहास साफ करा"
                >
                  <span>🗑️</span>
                  <span>साफ करा</span>
                </button>
              ` : ''}
            </div>

            <!-- History List Container -->
            <div id="ai-history-list" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
              ${history.filter(h => h.role === 'user').length === 0 ? `
                <div class="text-center py-16 px-4 space-y-3">
                  <span class="text-4xl block opacity-60">📜</span>
                  <h4 class="font-bold text-slate-700 text-sm">अद्याप कोणताही इतिहास नाही</h4>
                  <p class="text-xs text-slate-500 leading-relaxed">
                    आपण AI मित्राला विचारलेले प्रश्न व त्यांची पडताळलेली उत्तरे येथे जतन केली जातील.
                  </p>
                </div>
              ` : ''}

              ${history.map((h, idx) => {
                if (h.role !== 'user') return '';
                return `
                  <div 
                    onclick="window.components.replayAiQuestion('${h.text.replace(/'/g, "\\'")}')" 
                    class="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-slate-200 shadow-xs cursor-pointer transition group"
                    title="हा प्रश्न पुन्हा विचारा"
                  >
                    <div class="flex items-start justify-between gap-2 mb-1">
                      <span class="text-[10px] font-bold bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded">
                        प्रश्न #${idx + 1}
                      </span>
                      <span class="text-[10px] text-slate-400 font-mono">${h.time || ''}</span>
                    </div>
                    <p class="font-bold text-slate-800 text-xs group-hover:text-emerald-950 line-clamp-2">
                      💬 ${h.text}
                    </p>
                    <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1 border-t border-slate-100">
                      <span class="text-emerald-700 font-semibold flex items-center gap-1">
                        <span>● उत्तर दिलेले</span>
                      </span>
                      <span class="text-emerald-800 font-bold group-hover:underline">पुन्हा पहा ↗</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- History Panel Footer -->
            <div class="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
              <span>💡 कोणत्याही जुन्या प्रश्नावर क्लिक करून तो पुन्हा तपासू शकता</span>
            </div>

          </div>

        </div>

      </section>
    `;
  },

  askAiQuickly(q) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
      input.value = q;
      this.handleSendAiQuestion();
    }
  },

  replayAiQuestion(q) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
      input.value = q;
      this.handleSendAiQuestion();
    }
  },

  handleSendAiQuestion() {
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;

    const q = input.value.trim();
    input.value = '';

    const logs = document.getElementById('ai-chat-logs');
    if (!logs) return;

    const timeStr = new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' });

    // 1. Save user question in state & localStorage
    window.appState.addAiChatMessage({
      role: 'user',
      text: q,
      time: timeStr
    });

    // 2. Append User Message to UI
    logs.innerHTML += `
      <div class="flex items-start justify-end gap-2.5">
        <div class="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm max-w-xl text-xs sm:text-sm font-medium">
          <p>${q}</p>
          <span class="text-[10px] text-emerald-200 block text-right mt-1 opacity-75">${timeStr}</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
          👤
        </div>
      </div>
    `;
    logs.scrollTop = logs.scrollHeight;

    // 3. Process grounded answer from AI Engine
    const lang = window.appState.state.lang;
    const res = window.mitraEngine.ask(q, lang);

    setTimeout(() => {
      const respTimeStr = new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' });

      // 4. Save AI Response in state & localStorage
      window.appState.addAiChatMessage({
        role: 'assistant',
        text: res.answer,
        financial: res.financial,
        sources: res.sources,
        time: respTimeStr
      });

      let financialBox = '';
      if (res.financial) {
        financialBox = `
          <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs mt-2 grid grid-cols-2 gap-2 text-emerald-950">
            <div>मंजूर: <strong>₹${res.financial.sanctioned.toLocaleString('en-IN')}</strong></div>
            <div>खर्च: <strong>₹${res.financial.spent.toLocaleString('en-IN')}</strong></div>
          </div>
        `;
      }

      let sourcesBox = '';
      if (res.sources && res.sources.length > 0) {
        sourcesBox = `
          <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
            <strong>अधिकृत संदर्भ:</strong>
            ${res.sources.map(s => `<div>● ${s.title}</div>`).join('')}
          </div>
        `;
      }

      logs.innerHTML += `
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-950 to-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            🤖
          </div>
          <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm max-w-xl text-xs sm:text-sm text-slate-800 space-y-2">
            <p class="leading-relaxed">${res.answer}</p>
            ${financialBox}
            ${sourcesBox}
            
            <div class="flex items-center justify-between pt-1 border-t border-slate-100">
              <button onclick="window.mitraEngine.speak('${res.answer.replace(/'/g, "\\'")}', '${lang}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                🔊 ऐका (Listen)
              </button>
              <span class="text-[10px] text-slate-400 font-mono">${respTimeStr}</span>
            </div>
          </div>
        </div>
      `;

      logs.scrollTop = logs.scrollHeight;

      // 5. Update history panel on the right
      const historyList = document.getElementById('ai-history-list');
      const countEl = document.getElementById('ai-history-count');
      const userQuestions = (window.appState.state.aiChatHistory || []).filter(h => h.role === 'user');
      
      if (countEl) countEl.innerText = `एकूण प्रश्न: ${userQuestions.length}`;
      if (historyList) {
        historyList.innerHTML = userQuestions.map((h, idx) => `
          <div 
            onclick="window.components.replayAiQuestion('${h.text.replace(/'/g, "\\'")}')" 
            class="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-slate-200 shadow-xs cursor-pointer transition group"
            title="हा प्रश्न पुन्हा विचारा"
          >
            <div class="flex items-start justify-between gap-2 mb-1">
              <span class="text-[10px] font-bold bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded">
                प्रश्न #${idx + 1}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${h.time || ''}</span>
            </div>
            <p class="font-bold text-slate-800 text-xs group-hover:text-emerald-950 line-clamp-2">
              💬 ${h.text}
            </p>
            <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1 border-t border-slate-100">
              <span class="text-emerald-700 font-semibold flex items-center gap-1">
                <span>● उत्तर दिलेले</span>
              </span>
              <span class="text-emerald-800 font-bold group-hover:underline">पुन्हा पहा ↗</span>
            </div>
          </div>
        `).join('');
      }
    }, 300);
  },

  clearAiHistory() {
    if (confirm("आपणास AI मित्राचा सर्व संभाषण इतिहास साफ करायचा आहे का?")) {
      window.appState.clearAiChatHistory();
      const main = document.querySelector('main');
      if (main) {
        main.innerHTML = this.renderAssistantView();
        this.applyLanguageToDOM(main);
      }
    }
  },

  // 16. Emergency Services & Public Call Directory View (Sec 4.28)
  renderEmergencyView(filterCategory = 'ALL') {
    const t = (k) => window.appState.t(k);
    const directory = window.appState.state.callDirectory || [];

    const categories = [
      { id: 'ALL', label: `सर्व संपर्क (${directory.length})` },
      { id: 'emergency', label: `🚨 आपत्कालीन` },
      { id: 'health', label: `🏥 आरोग्य` },
      { id: 'panchayat', label: `🏛️ ग्रामपंचायत` },
      { id: 'revenue', label: `📜 महसूल` },
      { id: 'utility', label: `⚡ उपयुक्तता` }
    ];

    const filtered = filterCategory === 'ALL'
      ? directory
      : directory.filter(c => c.category === filterCategory);

    return `
      <section class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Header -->
        <div class="mb-8 text-center">
          <div class="inline-flex items-center gap-2 text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200 mb-2">
            <span>🚨</span>
            <span>२४ तास तातडीची मदत व गाव संपर्क निर्देशिका</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">${t('emergencyHeading')}</h1>
          <p class="text-sm text-slate-500 mt-1">${t('emergencySubheading')}</p>
          
          <div class="mt-3 flex items-center justify-center gap-2">
            <span class="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              ● रिअल-टाइम लाइव्ह निर्देशिका (Real-time Updated)
            </span>
          </div>
        </div>

        <!-- Category Filter & Directory Search -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Category Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            ${categories.map(cat => `
              <button 
                onclick="window.components.filterEmergencyCategory('${cat.id}')"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${filterCategory === cat.id ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'}"
              >
                ${cat.label}
              </button>
            `).join('')}
          </div>

          <!-- Quick Directory Search Input -->
          <div class="w-full md:w-64">
            <input 
              type="text" 
              placeholder="🔍 संपर्क किंवा नाव शोधा..." 
              id="directory-search-input"
              oninput="window.components.filterDirectoryList(this.value)"
              class="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        <!-- Contacts Grid -->
        <div id="contacts-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${filtered.map(c => `
            <div class="contact-card p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${c.color || 'bg-slate-50 text-slate-900 border-slate-200'}" data-name="${(c.name || '').toLowerCase()}" data-number="${c.number}">
              <div>
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div class="flex items-center gap-2.5">
                    <span class="text-3xl">${c.icon || '📞'}</span>
                    <div>
                      <h2 class="font-extrabold text-base leading-tight">${c.name}</h2>
                      <span class="text-[10px] uppercase font-bold tracking-wider opacity-75">${c.category || 'सार्वजनिक'}</span>
                    </div>
                  </div>
                  <button 
                    onclick="window.components.openEditContactModal('${c.id}')"
                    class="px-2.5 py-1 bg-white/80 hover:bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs shrink-0"
                    title="हा नंबर अद्ययावत करा (Edit Number)"
                  >
                    <span>✏️</span>
                    <span>नंबर बदला</span>
                  </button>
                </div>

                <p class="text-xs opacity-85 mb-3">${c.desc}</p>
              </div>

              <div class="pt-3 border-t border-black/10 flex items-center justify-between">
                <div>
                  <span class="text-[10px] uppercase font-bold block opacity-70">संपर्क क्रमांक:</span>
                  <span class="text-2xl font-black block tracking-wider font-mono">${c.number}</span>
                </div>

                <a href="tel:${c.number}" class="px-5 py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 whitespace-nowrap">
                  <span>📞</span>
                  <span>कॉल करा</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

      </section>

      <!-- Contact Edit Modal Container -->
      <div id="contact-modal-container"></div>
    `;
  },

  filterEmergencyCategory(cat) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = this.renderEmergencyView(cat);
      this.applyLanguageToDOM(main);
    }
  },

  filterDirectoryList(query) {
    const q = (query || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
      const name = card.getAttribute('data-name') || '';
      const num = card.getAttribute('data-number') || '';
      if (!q || name.includes(q) || num.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  },

  openEditContactModal(contactId) {
    const item = window.appState.state.callDirectory.find(c => c.id === contactId || c.key === contactId);
    if (!item) return;

    let container = document.getElementById('contact-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'contact-modal-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) window.components.closeEditContactModal()">
        <div class="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden" onclick="event.stopPropagation()">
          
          <div class="p-5 border-b border-emerald-900 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">${item.icon || '📞'}</span>
              <div>
                <h3 class="font-extrabold text-base">संपर्क क्रमांक अद्ययावत करा</h3>
                <p class="text-xs text-emerald-200">रिअल-टाइम थेट बदल (Real-time Live Update)</p>
              </div>
            </div>
            <button onclick="window.components.closeEditContactModal()" class="text-emerald-300 hover:text-white text-xl font-bold p-1 cursor-pointer">✕</button>
          </div>

          <form onsubmit="window.components.handleSaveContact(event, '${item.id}')" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">संस्थेचे / पदाचे नाव</label>
              <input 
                type="text" 
                id="edit-contact-name" 
                value="${item.name}" 
                required 
                class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">नवीन फोन / मोबाईल क्रमांक *</label>
              <input 
                type="text" 
                id="edit-contact-number" 
                value="${item.number}" 
                required 
                class="w-full px-3 py-2.5 bg-white border-2 border-emerald-600 rounded-xl text-slate-900 font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-inner"
              />
              <span class="text-[11px] text-slate-500 mt-1 block">हा क्रमांक गाव मुखपृष्ठ, आपत्कालीन कक्ष व सर्वत्र रिअल-टाइम बदलेल.</span>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">विभागीय तपशील / माहिती</label>
              <textarea 
                id="edit-contact-desc" 
                rows="2" 
                class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >${item.desc || ''}</textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onclick="window.components.closeEditContactModal()" 
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                रद्द करा
              </button>
              <button 
                type="submit" 
                class="px-5 py-2 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>नंबर जतन करा</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  handleSaveContact(e, contactId) {
    e.preventDefault();
    const newName = document.getElementById('edit-contact-name')?.value.trim();
    const newNumber = document.getElementById('edit-contact-number')?.value.trim();
    const newDesc = document.getElementById('edit-contact-desc')?.value.trim();

    if (!newNumber) {
      alert("कृपया योग्य फोन नंबर टाका!");
      return;
    }

    const success = window.appState.updateContactNumber(contactId, newNumber, newName, newDesc);
    this.closeEditContactModal();

    if (success) {
      // If currently on emergency route, re-render view
      if (window.appState.state.currentRoute === 'emergency') {
        const main = document.querySelector('main');
        if (main) {
          main.innerHTML = this.renderEmergencyView();
          this.applyLanguageToDOM(main);
        }
      }
      
      // Toast notification
      const toast = document.createElement('div');
      toast.className = "fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce";
      toast.innerHTML = `<span>✅</span><span>संपर्क क्रमांक यशस्वीरीत्या अद्ययावत करण्यात आला!</span>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    }
  },

  closeEditContactModal() {
    const container = document.getElementById('contact-modal-container');
    if (container) container.innerHTML = '';
  },

  // 17. Admin Portal View (Sec 4.20, 4.21, 4.22, 4.23)
  renderAdminView() {
    const t = (k) => window.appState.t(k);
    const s = window.appState.state;
    const isAdmin = window.appState.isAdmin();

    // RESTRICTED VIEW FOR CITIZENS / NON-ADMIN
    if (!isAdmin) {
      return `
        <section class="max-w-2xl mx-auto px-4 py-16 text-center">
          <div class="bg-white rounded-3xl p-8 sm:p-12 border-2 border-red-100 shadow-xl space-y-5">
            <div class="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-3xl mx-auto shadow-xs border border-red-200">
              🔒
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold mb-2 border border-red-200">
                <span>केवळ अधिकृत प्रशासकीय प्रवेश (Admin Restricted Area)</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-black text-slate-900">प्रशासकीय नियंत्रण कक्ष सुरक्षित आहे</h1>
              <p class="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                नागरिक खात्याला केवळ वाचनाचे (View Only) अधिकार आहेत. वेबसाइटवर नवीन विकासकामे, देयके, पत्रे किंवा परवाने जोडण्यासाठी किंवा बदलण्यासाठी कृपया प्रशासकीय खात्यात लॉगिन करा.
              </p>
            </div>
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onclick="window.appState.setRoute('login')" 
                class="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🔐</span>
                <span>प्रशासक लॉगिन पृष्ठावर जा (Go to Admin Login)</span>
              </button>
              <button 
                onclick="window.appState.setRoute('home')" 
                class="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                ← मुख्य पृष्ठावर परत जा
              </button>
            </div>
          </div>
        </section>
      `;
    }

    const auditLogs = s.auditLogs;
    const works = s.works;
    const complaints = s.complaints;
    const docs = s.documents || window.VILLAGE_DATA?.documents || [];
    const curV = s.activeVillage || window.VILLAGE_DATA.village;

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Admin Header & Role Switcher -->
        <div class="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-[#022c22] text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-900">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-900/90 px-3 py-1 rounded-full border border-emerald-700 mb-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>प्रशासकीय नियंत्रण कक्ष (Admin Control Portal)</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">${t('adminPortal')}</h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-1">
              स्थान अधिकार क्षेत्र: <strong class="text-emerald-300 font-black">${curV.nameMr}</strong> (${curV.taluka}, ${curV.district}) • लॉगिन युझर: <code class="bg-emerald-950 px-2 py-0.5 rounded text-emerald-200 font-mono font-bold">${s.session?.username || 'admin'}</code>
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2 flex-wrap">
            <button 
              onclick="window.components.openUploadDocumentModal()" 
              class="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-105 border border-emerald-600"
            >
              <span>📤</span>
              <span>दस्तऐवज / बिल अपलोड</span>
            </button>
            <button 
              onclick="window.components.openAddWorkModal()" 
              class="px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>➕</span>
              <span>नवीन काम जोडा</span>
            </button>
            <button 
              onclick="window.components.openResetPasswordModal('${s.session?.username || 'admin.nashik'}')" 
              class="px-3.5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 font-bold rounded-xl text-xs shadow-sm border border-emerald-800 transition cursor-pointer flex items-center gap-1.5"
              title="पासवर्ड बदला किंवा नवीन पासवर्ड सेट करा"
            >
              <span>🔑</span>
              <span>पासवर्ड बदला</span>
            </button>
            <button 
              onclick="window.appState.logout()" 
              class="px-3.5 py-2.5 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-xl text-xs shadow-sm transition cursor-pointer"
              title="लॉगआउट करा"
            >
              लॉगआउट 🚪
            </button>
          </div>
        </div>

        <!-- 4 Management Boxes: Invoices & Docs, Works CRUD, Complaints, Audit Logs -->
        <div class="space-y-8">
          
          <!-- Box 1: INVOICES, LETTERS & LICENCES MANAGEMENT (Direct Admin Uploads) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <div class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded mb-1 border border-emerald-200">
                  <span>🧾 ✉️ 📜 📑</span>
                  <span>सार्वजनिक वित्त व शासकीय दस्तऐवज</span>
                </div>
                <h2 class="text-base sm:text-lg font-bold text-slate-900">देयके, पत्रे व परवाने व्यवस्थापन (Invoices & Documents)</h2>
                <p class="text-xs text-slate-500">एकूण प्रसिद्ध दस्तऐवज: <strong>${docs.length}</strong> (देयके: ${docs.filter(d=>d.docType==='Invoice').length} | पत्रे: ${docs.filter(d=>d.docType==='Letter').length} | परवाने: ${docs.filter(d=>d.docType==='Licence').length})</p>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <button 
                  onclick="window.components.openUploadDocumentModal('Invoice')" 
                  class="px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
                >
                  + 🧾 बिल जोडा
                </button>
                <button 
                  onclick="window.components.openUploadDocumentModal('Letter')" 
                  class="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
                >
                  + ✉️ पत्र जोडा
                </button>
                <button 
                  onclick="window.components.openUploadDocumentModal('Licence')" 
                  class="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
                >
                  + 📜 परवाना जोडा
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th class="p-3">दस्तऐवज आयडी</th>
                    <th class="p-3">प्रकार</th>
                    <th class="p-3">शीर्षक / विषय</th>
                    <th class="p-3">तपशील / रक्कम</th>
                    <th class="p-3">दिनांक</th>
                    <th class="p-3">कृती</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${docs.slice(0, 6).map(d => `
                    <tr>
                      <td class="p-3 font-mono font-bold text-emerald-950">${d.id}</td>
                      <td class="p-3">
                        <span class="px-2 py-0.5 rounded text-[11px] font-bold ${
                          d.docType === 'Invoice' ? 'bg-emerald-100 text-emerald-950' :
                          (d.docType === 'Letter' ? 'bg-sky-100 text-sky-900' :
                          (d.docType === 'Licence' ? 'bg-purple-100 text-purple-900' : 'bg-emerald-100 text-emerald-900'))
                        }">
                          ${d.docType === 'Invoice' ? '🧾 देयक' : (d.docType === 'Letter' ? '✉️ पत्र' : (d.docType === 'Licence' ? '📜 परवाना' : '📑 दस्तऐवज'))}
                        </span>
                      </td>
                      <td class="p-3 font-semibold text-slate-800 max-w-xs truncate">${d.name}</td>
                      <td class="p-3">
                        ${d.docType === 'Invoice' && d.invoiceDetails ? `<strong class="text-emerald-950 font-mono">₹${Number(d.invoiceDetails.amount || 0).toLocaleString('en-IN')}</strong> (${d.invoiceDetails.billNo || 'बिल'})` : ''}
                        ${d.docType === 'Letter' && d.letterDetails ? `<span class="font-mono text-sky-900">${d.letterDetails.outwardNo || 'जा.क्र.'}</span>` : ''}
                        ${d.docType === 'Licence' && d.licenceDetails ? `<span class="font-mono text-purple-900">${d.licenceDetails.licenceNo || 'परवाना'}</span>` : ''}
                        ${!d.invoiceDetails && !d.letterDetails && !d.licenceDetails ? `<span class="text-slate-500">${d.fileSize || 'PDF'}</span>` : ''}
                      </td>
                      <td class="p-3 text-slate-500">${d.date}</td>
                      <td class="p-3">
                        <button onclick="window.appState.setRoute('documents')" class="text-emerald-800 hover:underline font-bold">
                          भांडारात पहा →
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Box 2: Works Control Box -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-bold text-slate-900">विकासकामे नियंत्रण (Development Works Management)</h2>
              <button onclick="window.components.openAddWorkModal()" class="px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer">
                + नवीन काम जोडा (Add Work)
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th class="p-3">Work ID</th>
                    <th class="p-3">कामाचे नाव</th>
                    <th class="p-3">स्थिती</th>
                    <th class="p-3">मंजूर निधी</th>
                    <th class="p-3">खर्च</th>
                    <th class="p-3">कृती</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${works.map(w => `
                    <tr>
                      <td class="p-3 font-mono font-bold text-emerald-950">${w.workId}</td>
                      <td class="p-3 font-semibold text-slate-800">${w.title}</td>
                      <td class="p-3">
                        <span class="px-2 py-0.5 rounded text-[11px] font-bold ${w.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-800'}">
                          ${w.status}
                        </span>
                      </td>
                      <td class="p-3 font-mono">₹${w.sanctionedAmount.toLocaleString('en-IN')}</td>
                      <td class="p-3 font-mono">₹${w.spentAmount.toLocaleString('en-IN')}</td>
                      <td class="p-3">
                        <button onclick="window.components.openWorkModal('${w.id}')" class="text-emerald-800 hover:underline font-bold">
                          पहा / तपासा
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Box 3: Complaint Status Updater (Moderator / Admin) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 class="text-base font-bold text-slate-900">तक्रार निवारण कार्यप्रवाह (Complaint Status Update)</h2>
              <span class="text-xs text-slate-500">नागरिकांनी जोडलेले पुरावे तपासून स्थिती अद्ययावत करा</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th class="p-3">Tracking ID</th>
                    <th class="p-3">विषय व ठिकाण</th>
                    <th class="p-3">छायाचित्र / पुरावा</th>
                    <th class="p-3">सद्यस्थिती</th>
                    <th class="p-3">स्थिती बदला (Update Status)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${complaints.map(c => `
                    <tr>
                      <td class="p-3 font-mono font-bold text-emerald-950">${c.trackingId}</td>
                      <td class="p-3 text-slate-800">
                        <div class="font-bold">${c.title}</div>
                        <div class="text-[10px] text-slate-500">📍 ${c.location}</div>
                      </td>
                      <td class="p-3">
                        ${c.photoUrl ? `
                          <button 
                            type="button"
                            onclick="window.components.openComplaintMediaModal('${c.id}')" 
                            class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                            title="पुरावा पहा"
                          >
                            <span>${c.attachmentType === 'document' ? '📄' : '📸'}</span>
                            <span>पुरावा पहा</span>
                          </button>
                        ` : `
                          <span class="text-slate-400 text-[11px]">-</span>
                        `}
                      </td>
                      <td class="p-3 font-bold">${c.statusMr || c.status}</td>
                      <td class="p-3">
                        <select 
                          onchange="window.appState.updateComplaintStatus('${c.trackingId}', this.value, 'प्रशासकीय अधिकाऱ्यांकडून स्थिती बदलण्यात आली')"
                          class="px-2 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-bold cursor-pointer"
                        >
                          <option value="SUBMITTED" ${c.status === 'SUBMITTED' ? 'selected' : ''}>नोंदणीकृत (Submitted)</option>
                          <option value="UNDER_REVIEW" ${c.status === 'UNDER_REVIEW' ? 'selected' : ''}>छाननी सुरू (Under Review)</option>
                          <option value="IN_PROGRESS" ${c.status === 'IN_PROGRESS' ? 'selected' : ''}>काम सुरू (In Progress)</option>
                          <option value="RESOLVED" ${c.status === 'RESOLVED' ? 'selected' : ''}>निवारण झाले (Resolved)</option>
                        </select>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Box 3.5: Call Directory Management (Real-time Numbers Update) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>📞</span>
                  <span>संपर्क निर्देशिका व दूरध्वनी क्रमांक नियंत्रण (Call Directory Management)</span>
                </h2>
                <p class="text-xs text-slate-500">येथील बदल त्वरित संपूर्ण प्रणालीत, गाव मुखपृष्ठावर व आपत्कालीन कक्षात रिअल-टाइम लागू होतात.</p>
              </div>
              <button 
                onclick="window.appState.setRoute('emergency')" 
                class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-lg text-xs font-bold transition flex items-center gap-1 border border-emerald-200"
              >
                <span>सर्व निर्देशिका पहा →</span>
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th class="p-3">विभाग / पद</th>
                    <th class="p-3">सध्याचा क्रमांक (Active Number)</th>
                    <th class="p-3">वर्णन / अधिकारी</th>
                    <th class="p-3">कृती (Real-time Action)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${(window.appState.state.callDirectory || []).map(cd => `
                    <tr>
                      <td class="p-3 font-semibold text-slate-800 flex items-center gap-2">
                        <span class="text-lg">${cd.icon || '📞'}</span>
                        <span>${cd.name}</span>
                      </td>
                      <td class="p-3 font-mono font-bold text-emerald-950 text-sm">${cd.number}</td>
                      <td class="p-3 text-slate-500 max-w-xs truncate">${cd.desc || '—'}</td>
                      <td class="p-3">
                        <button 
                          onclick="window.components.openEditContactModal('${cd.id}')"
                          class="px-3 py-1 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold rounded-lg text-xs shadow-xs transition cursor-pointer flex items-center gap-1"
                        >
                          <span>✏️</span>
                          <span>नंबर बदला</span>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Box 4: Audit Logs Table (Sec 4.22) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-bold text-slate-900">${t('auditLogs')}</h2>
                <p class="text-xs text-slate-500">प्रणालीतील सर्व महत्त्वाच्या बदलांची वेळ व कारणासहित अपरिवर्तनीय नोंद</p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th class="p-3">वेळ</th>
                    <th class="p-3">कर्ता (Actor)</th>
                    <th class="p-3">Entity</th>
                    <th class="p-3">कृती (Action)</th>
                    <th class="p-3">कारण (Reason)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${auditLogs.map(log => `
                    <tr>
                      <td class="p-3 text-slate-500 whitespace-nowrap">${log.timestamp}</td>
                      <td class="p-3 font-semibold text-emerald-950">${log.actor}</td>
                      <td class="p-3 font-mono">${log.entity} (${log.entityId})</td>
                      <td class="p-3 font-bold">${log.action}</td>
                      <td class="p-3 text-slate-700">${log.reason}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </section>

      <!-- Add Work Modal Container -->
      <div id="admin-work-modal-container"></div>
    `;
  },

  openAddWorkModal() {
    const container = document.getElementById('admin-work-modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="if(event.target === this) this.parentElement.innerHTML = ''">
        <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 class="font-extrabold text-slate-900 text-lg">नवीन विकासकाम प्रविष्ट करा</h2>
            <button onclick="this.closest('.fixed').parentElement.innerHTML = ''" class="text-slate-400 p-1">✕</button>
          </div>

          <form onsubmit="window.components.handleCreateWork(event)" class="space-y-3 text-xs">
            <div>
              <label for="new-work-title" class="block font-bold text-slate-700 mb-1">कामाचे नाव *</label>
              <input type="text" id="new-work-title" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700" placeholder="उदा. स्मशानभूमी रस्ता खडीकरण" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="new-work-cat" class="block font-bold text-slate-700 mb-1">प्रकार</label>
                <select id="new-work-cat" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700">
                  <option value="Roads">रस्ते व वाहतूक</option>
                  <option value="Water">पिण्याचे पाणी</option>
                  <option value="School">शाळा व शिक्षण</option>
                  <option value="Street Lights">दिवाबत्ती</option>
                </select>
              </div>
              <div>
                <label for="new-work-status" class="block font-bold text-slate-700 mb-1">सद्यस्थिती</label>
                <select id="new-work-status" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700">
                  <option value="APPROVED">मंजूर / प्रस्तावित</option>
                  <option value="IN_PROGRESS">सुरू (In Progress)</option>
                  <option value="COMPLETED">पूर्ण (Completed)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="new-work-cost" class="block font-bold text-slate-700 mb-1">मंजूर रक्कम (₹) *</label>
                <input type="number" id="new-work-cost" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono" placeholder="1500000" />
              </div>
              <div>
                <label for="new-work-spent" class="block font-bold text-slate-700 mb-1">झालेला खर्च (₹)</label>
                <input type="number" id="new-work-spent" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono" placeholder="0" />
              </div>
            </div>

            <div>
              <label for="new-work-loc" class="block font-bold text-slate-700 mb-1">ठिकाण</label>
              <input type="text" id="new-work-loc" required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700" placeholder="वार्ड क्र. ४" />
            </div>

            <button type="submit" class="w-full py-2.5 bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold rounded-xl mt-2 cursor-pointer shadow-md transition">
              काम सेव्ह करा व ऑडिट नोंद तयार करा
            </button>
          </form>
        </div>
      </div>
    `;
    this.applyLanguageToDOM(container);
  },

  handleCreateWork(e) {
    e.preventDefault();
    const title = document.getElementById('new-work-title').value;
    const cat = document.getElementById('new-work-cat').value;
    const status = document.getElementById('new-work-status').value;
    const cost = parseFloat(document.getElementById('new-work-cost').value) || 0;
    const spent = parseFloat(document.getElementById('new-work-spent').value) || 0;
    const loc = document.getElementById('new-work-loc').value;

    const newW = {
      id: `wrk-${Date.now()}`,
      workId: `WRK-2026-0${window.appState.state.works.length + 80}`,
      title: title,
      titleEn: title,
      category: cat,
      categoryMr: cat,
      department: "ग्रामपंचायत स्वनिधी व जिल्हा परिषद",
      scheme: "१५ वा वित्त आयोग",
      location: loc,
      status: status,
      sanctionDate: "सप्टेंबर २०२६",
      expectedCompletion: "मार्च २०२७",
      actualCompletion: null,
      estimatedCost: cost,
      sanctionedAmount: cost,
      releasedAmount: cost,
      spentAmount: spent,
      remainingAmount: cost - spent,
      contractor: "निविदा प्रक्रिया",
      sourceDocument: "ग्रा.पं. ठराव क्र. १२/२०२६",
      verificationStatus: "OFFICIAL_SOURCE",
      lastUpdated: "आज",
      latitude: 20.0835,
      longitude: 74.0210,
      timeline: [
        { stage: "प्रस्ताव व मंजुरी", date: "सप्टेंबर २०२६", status: "COMPLETED", note: "ग्रामपंचायत सभेत ठराव मंजूर" }
      ]
    };

    window.appState.state.works = [newW, ...window.appState.state.works];
    window.appState.recordAuditLog(
      window.appState.getRoleLabel(),
      "DevelopmentWork",
      newW.workId,
      "CREATE_WORK",
      null,
      newW.status,
      `नवीन विकासकाम प्रविष्ट केले: ${newW.title}`
    );

    alert(`नवीन विकासकाम यशस्वीरित्या जोडले गेले!\n\nWork ID: ${newW.workId}`);
    document.getElementById('admin-work-modal-container').innerHTML = '';
    window.appState.setRoute('admin');
  },

  // 18. Footer
  renderFooter() {
    const t = (k) => window.appState.t(k);
    const v = window.appState.state.activeVillage || window.VILLAGE_DATA.village;

    return `
      <footer class="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#022c22] via-[#064e3b] to-emerald-600 border border-emerald-500/50 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                  ग
                </div>
                <span class="text-xl font-extrabold text-white">${t('appName')}</span>
              </div>
              <p class="text-slate-400 leading-relaxed">
                गावातील प्रत्येक नागरिकाला आपल्या गावाबद्दलची सार्वजनिक माहिती सहज समजली पाहिजे. पारदर्शकता, उत्तरदायित्व आणि नागरिक सहभाग.
              </p>
              <div class="text-[11px] text-emerald-400 font-semibold">
                📍 ${v.nameMr} (${v.name}), ता. ${v.taluka}, जि. ${v.district} - ${v.pinCode}
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h2 class="font-bold text-white text-sm uppercase tracking-wider mb-3">महत्त्वाच्या लिंक्स</h2>
              <ul class="space-y-2 text-slate-400">
                <li><button onclick="window.appState.setRoute('works')" class="hover:text-white">गावातील कामे (Works)</button></li>
                <li><button onclick="window.appState.setRoute('budget')" class="hover:text-white">खर्च व बजेट (Budget)</button></li>
                <li><button onclick="window.appState.setRoute('schemes')" class="hover:text-white">सरकारी योजना (Schemes)</button></li>
                <li><button onclick="window.appState.setRoute('facilities')" class="hover:text-white">गावातील सुविधा (Facilities)</button></li>
                <li><button onclick="window.appState.setRoute('complaints')" class="hover:text-white">तक्रार नोंदणी (Complaints)</button></li>
              </ul>
            </div>

            <!-- Transparency & Neutrality -->
            <div>
              <h2 class="font-bold text-white text-sm uppercase tracking-wider mb-3">पारदर्शकता व तत्त्वे</h2>
              <ul class="space-y-2 text-slate-400">
                <li><button onclick="window.appState.setRoute('documents')" class="hover:text-white">कागदपत्र केंद्र (Documents)</button></li>
                <li><button onclick="window.appState.setRoute('gram-sabha')" class="hover:text-white">ग्रामसभा इतिवृत्त (Gram Sabha)</button></li>
                <li><button onclick="window.appState.setRoute('admin')" class="hover:text-white">ऑडिट नोंदी (Audit Logs)</button></li>
                <li><button onclick="window.appState.setRoute('emergency')" class="hover:text-white">आपत्कालीन मदत (Emergency)</button></li>
              </ul>
            </div>

            <!-- Disclaimer Notice -->
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-emerald-400 font-bold block mb-1">सार्वजनिक सूचना (Disclaimer):</span>
              <p class="text-[11px] text-slate-400 leading-relaxed">
                ग्रामसेतू मंच कोणत्याही राजकीय पक्षाशी संबंधित नाही. ही प्रणाली केवळ अधिकृत शासकीय व ग्रामपंचायत दस्तऐवजांच्या आधारे माहिती सादर करते.
              </p>
            </div>

          </div>

          <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © २०२६ ग्रामसेतू (GramSetu Platform). सर्व हक्क राखीव.
            </div>
            <div class="flex items-center gap-4">
              <span>महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५</span>
              <span>•</span>
              <span>माहिती अधिकार २००५ (RTI)</span>
            </div>
          </div>

        </div>
      </footer>
    `;
  },

  renderLoginFooter() {
    return `
      <footer class="bg-slate-950 text-slate-400 text-xs py-5 px-6 text-center border-t border-slate-900">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>महाराष्ट्र शासन • डिजिटल ग्राम पारदर्शकता व नागरिक जागृती मंच</span>
          </div>
          <div class="text-[11px] text-slate-500">
            © २०२६ ग्रामसेतू (GramSetu) • सर्व नागरिकांसाठी विनामूल्य व खुला प्रवेश
          </div>
        </div>
      </footer>
    `;
  },

  // Universal Dynamic DOM Localizer across all pages, modals, and elements
  applyLanguageToDOM(targetEl) {
    const lang = window.appState?.state?.lang || 'mr';
    document.documentElement.lang = lang;
    if (lang === 'mr') return; // Marathi is default source

    const phrases = window.GRAMSETU_PHRASES || {};
    const sortedKeys = window.GRAMSETU_SORTED_KEYS || Object.keys(phrases).sort((a,b) => b.length - a.length);
    if (!sortedKeys.length) return;

    const root = targetEl || document.getElementById('app-root') || document.body;
    if (!root) return;

    // 1. Walk Text Nodes
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
        if (node.nodeValue && node.nodeValue.trim()) {
          textNodes.push(node);
        }
      }
    }

    textNodes.forEach(node => {
      let text = node.nodeValue;
      let trimmed = text.trim();
      if (phrases[trimmed] && phrases[trimmed][lang]) {
        node.nodeValue = text.replace(trimmed, phrases[trimmed][lang]);
        return;
      }
      
      let changed = false;
      for (let i = 0; i < sortedKeys.length; i++) {
        const k = sortedKeys[i];
        if (text.indexOf(k) !== -1 && phrases[k] && phrases[k][lang]) {
          text = text.split(k).join(phrases[k][lang]);
          changed = true;
        }
      }
      if (changed) {
        node.nodeValue = text;
      }
    });

    // 2. Attributes (placeholder, title, aria-label)
    const attrs = ['placeholder', 'title', 'aria-label'];
    const elements = root.querySelectorAll('[placeholder], [title], [aria-label]');
    elements.forEach(el => {
      attrs.forEach(attr => {
        let val = el.getAttribute(attr);
        if (val) {
          let trimmed = val.trim();
          if (phrases[trimmed] && phrases[trimmed][lang]) {
            el.setAttribute(attr, phrases[trimmed][lang]);
          } else {
            let changed = false;
            for (let i = 0; i < sortedKeys.length; i++) {
              const k = sortedKeys[i];
              if (val.indexOf(k) !== -1 && phrases[k] && phrases[k][lang]) {
                val = val.split(k).join(phrases[k][lang]);
                changed = true;
              }
            }
            if (changed) el.setAttribute(attr, val);
          }
        }
      });
    });

    // 3. Option elements inside selects
    root.querySelectorAll('option').forEach(opt => {
      let t = opt.textContent;
      let trimmed = t.trim();
      if (phrases[trimmed] && phrases[trimmed][lang]) {
        opt.textContent = phrases[trimmed][lang];
      } else {
        let changed = false;
        for (let i = 0; i < sortedKeys.length; i++) {
          const k = sortedKeys[i];
          if (t.indexOf(k) !== -1 && phrases[k] && phrases[k][lang]) {
            t = t.split(k).join(phrases[k][lang]);
            changed = true;
          }
        }
        if (changed) opt.textContent = t;
      }
    });
  },

  // Main Root Renderer
  render() {
    const s = window.appState.state;
    const appEl = document.getElementById('app-root');
    if (!appEl) return;

    let viewHtml = '';
    switch (s.currentRoute) {
      case 'login':
        viewHtml = this.renderLoginView();
        break;
      case 'works':
        viewHtml = this.renderWorksView();
        break;
      case 'budget':
        viewHtml = this.renderBudgetView();
        break;
      case 'schemes':
        viewHtml = this.renderSchemesView();
        break;
      case 'facilities':
        viewHtml = this.renderFacilitiesView();
        break;
      case 'map':
        viewHtml = this.renderMapView();
        break;
      case 'complaints':
        viewHtml = this.renderComplaintsView();
        break;
      case 'questions':
        viewHtml = this.renderQuestionsView();
        break;
      case 'documents':
        viewHtml = this.renderDocumentsView();
        break;
      case 'gram-sabha':
        viewHtml = this.renderGramSabhaView();
        break;
      case 'notifications':
        viewHtml = this.renderNotificationsView();
        break;
      case 'assistant':
        viewHtml = this.renderAssistantView();
        break;
      case 'emergency':
        viewHtml = this.renderEmergencyView();
        break;
      case 'admin':
        viewHtml = this.renderAdminView();
        break;
      case 'home':
      default:
        viewHtml = `
          ${this.renderHero()}
          ${this.renderVillageSnapshot()}
          ${this.renderWorksView()}
          ${this.renderBudgetView()}
          ${this.renderSchemesView()}
          ${this.renderFacilitiesView()}
        `;
        break;
    }

    appEl.innerHTML = `
      ${this.renderAccessibilityToolbar()}
      ${this.renderHeader()}
      <main id="main-content">
        ${viewHtml}
      </main>
      ${s.currentRoute === 'login' ? this.renderLoginFooter() : this.renderFooter()}
      <div id="location-modal-container"></div>
      <div id="upload-doc-modal-container"></div>
      <div id="complaint-photo-modal-container"></div>
      <div id="work-modal-container"></div>
      <div id="search-modal-container"></div>
      <div id="street-view-modal-container"></div>
      <div id="contact-modal-container"></div>
    `;

    // Automatically apply language translation to all text nodes, inputs, and elements
    this.applyLanguageToDOM();
  }
};
