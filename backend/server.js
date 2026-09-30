require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'GramSetu Backend API',
    timestamp: new Date().toISOString(),
    aiProvider: process.env.AI_PROVIDER || 'gemini',
    mapProvider: process.env.MAP_PROVIDER || 'osm'
  });
});

// AI Chat Gateway (Fallback / Grounded Gemini)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { prompt, villageContext, language = 'mr' } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      return res.json({
        success: true,
        source: 'local-grounded-rules',
        reply: `नमस्कार! ग्रामसेतू AI मित्र सेवेत आहे. विचारलेला प्रश्न: "${prompt}". ग्राम माहिती व योजना तपशील उपलब्ध आहेत.`
      });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `Village Context: ${JSON.stringify(villageContext)}\nQuestion: ${prompt}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Civic Complaints API
app.post('/api/complaints', (req, res) => {
  const { title, description, category, citizenName, mobile, photo, villageId } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'शीर्षक आणि तक्रार तपशील आवश्यक आहेत.' });
  }
  
  const newComplaint = {
    id: 'CMP-' + Math.floor(100000 + Math.random() * 900000),
    title,
    description,
    category: category || 'इतर',
    citizenName: citizenName || 'नागरिक',
    mobile: mobile || '',
    photo: photo || null,
    villageId: villageId || 'sonwadi-nashik',
    status: 'SUBMITTED',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({ success: true, complaint: newComplaint });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`GramSetu Backend Server running on port ${PORT}`);
  });
}

module.exports = app;
