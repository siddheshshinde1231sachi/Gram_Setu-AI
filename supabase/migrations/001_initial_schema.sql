-- ==============================================================================
-- GramSetu Platform — Supabase Cloud PostgreSQL Schema
-- Migration: 001_initial_schema.sql
-- Description: Core tables, enums, Row Level Security (RLS) policies, & seed data
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
  CREATE TYPE role_enum AS ENUM ('CITIZEN', 'MODERATOR', 'VILLAGE_ADMIN', 'SUPER_ADMIN');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE verification_status_enum AS ENUM ('OFFICIAL_SOURCE', 'GOVERNMENT_DOCUMENT', 'COMMUNITY_PENDING', 'UNAVAILABLE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE work_status_enum AS ENUM ('PROPOSED', 'APPROVED', 'SANCTIONED', 'WORK_STARTED', 'IN_PROGRESS', 'INSPECTION', 'COMPLETED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE complaint_status_enum AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE question_status_enum AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ANSWERED', 'CLOSED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE notification_category_enum AS ENUM ('GRAM_SABHA', 'WATER', 'DEVELOPMENT', 'HEALTH', 'GOVERNMENT', 'EMERGENCY', 'PANCHAYAT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TABLES CREATION

-- Villages
CREATE TABLE IF NOT EXISTS villages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_mr VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255) DEFAULT '',
  state VARCHAR(100) DEFAULT 'Maharashtra',
  district VARCHAR(100) NOT NULL,
  taluka VARCHAR(100) NOT NULL,
  pin_code VARCHAR(20) NOT NULL,
  population INTEGER DEFAULT 0,
  households INTEGER DEFAULT 0,
  area NUMERIC(10, 2) DEFAULT 0.0,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gram Panchayats
CREATE TABLE IF NOT EXISTS gram_panchayats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  public_phone VARCHAR(50),
  sarpanch_name VARCHAR(255),
  gram_sevak_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users Profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50) UNIQUE,
  password_hash TEXT,
  role role_enum DEFAULT 'CITIZEN',
  village_id VARCHAR(100) REFERENCES villages(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Development Works
CREATE TABLE IF NOT EXISTS development_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  work_id VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_mr VARCHAR(255),
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  department VARCHAR(150) NOT NULL,
  scheme VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status work_status_enum DEFAULT 'PROPOSED',
  sanction_date DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  estimated_cost NUMERIC(14, 2) DEFAULT 0.0,
  sanctioned_amount NUMERIC(14, 2) DEFAULT 0.0,
  released_amount NUMERIC(14, 2) DEFAULT 0.0,
  spent_amount NUMERIC(14, 2) DEFAULT 0.0,
  contractor_name VARCHAR(255),
  source_document_id VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Work Updates
CREATE TABLE IF NOT EXISTS work_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES development_works(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status work_status_enum NOT NULL,
  event_date DATE NOT NULL,
  source_document_id VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Work Photos
CREATE TABLE IF NOT EXISTS work_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES development_works(id) ON DELETE CASCADE,
  photo_type VARCHAR(50) NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  photo_date DATE DEFAULT CURRENT_DATE,
  location VARCHAR(255),
  uploaded_by VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budgets
CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  financial_year VARCHAR(50) NOT NULL,
  sanctioned_amount NUMERIC(16, 2) DEFAULT 0.0,
  received_amount NUMERIC(16, 2) DEFAULT 0.0,
  spent_amount NUMERIC(16, 2) DEFAULT 0.0,
  remaining_amount NUMERIC(16, 2) DEFAULT 0.0,
  source_document_id VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_village_financial_year UNIQUE (village_id, financial_year)
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  category VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(14, 2) DEFAULT 0.0,
  expense_date DATE NOT NULL,
  source_document_id VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  mime_type VARCHAR(100) DEFAULT 'application/pdf',
  file_size INTEGER DEFAULT 0,
  document_date DATE DEFAULT CURRENT_DATE,
  source VARCHAR(255),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  uploaded_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_mr VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  public_phone VARCHAR(50),
  opening_hours VARCHAR(100),
  services TEXT[] DEFAULT '{}',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Government Schemes
CREATE TABLE IF NOT EXISTS government_schemes (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_mr VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255) DEFAULT '',
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  eligibility TEXT,
  benefits TEXT,
  required_documents TEXT[] DEFAULT '{}',
  application_process TEXT,
  official_url TEXT,
  department VARCHAR(200),
  deadline VARCHAR(100),
  last_verified TIMESTAMPTZ DEFAULT NOW(),
  verification_status verification_status_enum DEFAULT 'OFFICIAL_SOURCE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaints
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id VARCHAR(50) UNIQUE NOT NULL,
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_url TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  citizen_name VARCHAR(255),
  citizen_phone VARCHAR(50),
  status complaint_status_enum DEFAULT 'SUBMITTED',
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaint Updates
CREATE TABLE IF NOT EXISTS complaint_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  status complaint_status_enum NOT NULL,
  message TEXT NOT NULL,
  created_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Public Questions
CREATE TABLE IF NOT EXISTS public_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id VARCHAR(50) UNIQUE NOT NULL,
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  status question_status_enum DEFAULT 'SUBMITTED',
  official_response TEXT,
  response_date TIMESTAMPTZ,
  supporting_document_id VARCHAR(255),
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gram Sabha Meetings
CREATE TABLE IF NOT EXISTS gram_sabha_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  meeting_date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  agenda TEXT[] DEFAULT '{}',
  minutes_document_id VARCHAR(255),
  resolutions TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'UPCOMING',
  attendees_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  title_mr VARCHAR(255),
  content TEXT NOT NULL,
  category notification_category_enum DEFAULT 'PANCHAYAT',
  status VARCHAR(50) DEFAULT 'PUBLISHED',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Map Locations
CREATE TABLE IF NOT EXISTS map_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  reference_id VARCHAR(100),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Submissions
CREATE TABLE IF NOT EXISTS community_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  evidence_url TEXT,
  status verification_status_enum DEFAULT 'COMMUNITY_PENDING',
  submitted_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_by VARCHAR(255),
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Information Metrics
CREATE TABLE IF NOT EXISTS information_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id VARCHAR(100) NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  required_fields INTEGER NOT NULL,
  available_fields INTEGER NOT NULL,
  availability_percentage NUMERIC(5, 2) NOT NULL,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  actor_name VARCHAR(255),
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  previous_value JSONB,
  new_value JSONB,
  reason TEXT,
  ip_hash VARCHAR(128),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_panchayats ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_sabha_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE information_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if rerun to ensure idempotency
DO $$ 
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- Public read access policies for Civic Transparency (Everyone can view public records)
CREATE POLICY "Public can view villages" ON villages FOR SELECT USING (true);
CREATE POLICY "Public can view gram_panchayats" ON gram_panchayats FOR SELECT USING (true);
CREATE POLICY "Public can view development_works" ON development_works FOR SELECT USING (true);
CREATE POLICY "Public can view work_updates" ON work_updates FOR SELECT USING (true);
CREATE POLICY "Public can view work_photos" ON work_photos FOR SELECT USING (true);
CREATE POLICY "Public can view budgets" ON budgets FOR SELECT USING (true);
CREATE POLICY "Public can view expenses" ON expenses FOR SELECT USING (true);
CREATE POLICY "Public can view documents" ON documents FOR SELECT USING (true);
CREATE POLICY "Public can view facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public can view government_schemes" ON government_schemes FOR SELECT USING (true);
CREATE POLICY "Public can view gram_sabha_meetings" ON gram_sabha_meetings FOR SELECT USING (true);
CREATE POLICY "Public can view notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Public can view map_locations" ON map_locations FOR SELECT USING (true);
CREATE POLICY "Public can view information_metrics" ON information_metrics FOR SELECT USING (true);
CREATE POLICY "Public can view complaints" ON complaints FOR SELECT USING (true);
CREATE POLICY "Public can view complaint_updates" ON complaint_updates FOR SELECT USING (true);
CREATE POLICY "Public can view public_questions" ON public_questions FOR SELECT USING (true);

-- Citizen insert policies (Citizens can lodge complaints and ask questions anonymously or signed in)
CREATE POLICY "Citizens can file complaints" ON complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Citizens can add complaint updates" ON complaint_updates FOR INSERT WITH CHECK (true);
CREATE POLICY "Citizens can submit questions" ON public_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Citizens can submit community data" ON community_submissions FOR INSERT WITH CHECK (true);

-- Service role & Admin full access (Allows backend operations & admin dashboard updates)
CREATE POLICY "Service role full access villages" ON villages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access gram_panchayats" ON gram_panchayats FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access development_works" ON development_works FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access work_updates" ON work_updates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access work_photos" ON work_photos FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access budgets" ON budgets FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access expenses" ON expenses FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access documents" ON documents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access facilities" ON facilities FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access government_schemes" ON government_schemes FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access complaints" ON complaints FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access complaint_updates" ON complaint_updates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access public_questions" ON public_questions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access gram_sabha_meetings" ON gram_sabha_meetings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access notifications" ON notifications FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access map_locations" ON map_locations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access community_submissions" ON community_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access information_metrics" ON information_metrics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access audit_logs" ON audit_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access users" ON users FOR ALL USING (auth.role() = 'service_role');

-- 5. INITIAL SEED DATA

-- Primary Village: Sonwadi
INSERT INTO villages (id, name, name_mr, name_hi, state, district, taluka, pin_code, population, households, area, latitude, longitude)
VALUES (
  'sonwadi-nashik',
  'Sonwadi',
  'सोनवाडी (नाशिक)',
  'सोनवाड़ी',
  'Maharashtra',
  'नाशिक',
  'सिन्नर',
  '422103',
  3420,
  680,
  1240.50,
  19.8456,
  74.0125
) ON CONFLICT (id) DO UPDATE SET
  population = EXCLUDED.population,
  households = EXCLUDED.households;

-- Gram Panchayat Sonwadi
INSERT INTO gram_panchayats (village_id, name, address, public_phone, sarpanch_name, gram_sevak_name)
SELECT 
  'sonwadi-nashik',
  'ग्रामपंचायत कार्यालय सोनवाडी',
  'ग्रामपंचायत भवन, मुख्य चौक, मु. पो. सोनवाडी, ता. सिन्नर, जि. नाशिक - ४२२१०३',
  '02551-248102',
  'श्रीमती सुवर्णाताई रामदास शिंदे',
  'श्री. विकास विठ्ठल सानप'
WHERE NOT EXISTS (SELECT 1 FROM gram_panchayats WHERE village_id = 'sonwadi-nashik');

-- Development Works
INSERT INTO development_works (
  village_id, work_id, title, title_mr, description, category, department, scheme, 
  location, latitude, longitude, status, sanction_date, expected_completion_date, actual_completion_date,
  estimated_cost, sanctioned_amount, released_amount, spent_amount, contractor_name, verification_status
)
VALUES
(
  'sonwadi-nashik',
  'WRK-2025-089',
  'Jal Jeevan Mission Har Ghar Nal Pipeline Phase-2',
  'जलजीवन मिशन अंतर्गत हर घर नल योजना टप्पा-२',
  'गावातील उर्वरित १५० कुटुंबांना शुद्ध पिण्याच्या पाण्याचे नळ संयोजन देणे व ५०,००० लिटर क्षमतेची नवीन पाण्याची टाकी उभारणे.',
  'पाणीपुरवठा',
  'ग्रामीण पाणीपुरवठा विभाग (JJM)',
  'जल जीवन मिशन (केंद्र व राज्य शासन)',
  'पाटील गल्ली व धनगर वस्ती',
  19.8462,
  74.0138,
  'COMPLETED',
  '2024-04-15',
  '2025-02-28',
  '2025-02-20',
  3400000.00,
  3400000.00,
  3400000.00,
  3380000.00,
  'श्री साई कन्स्ट्रक्शन्स, नाशिक',
  'OFFICIAL_SOURCE'
),
(
  'sonwadi-nashik',
  'WRK-2025-092',
  'Internal Village Concrete Road and Underground Drainage',
  'गाव अंतर्गत सिमेंट काँक्रीट रस्ता व बंद गटार बांधकाम',
  'हनुमान मंदिर चौक ते जिल्हा परिषद शाळा दरम्यान ८०० मीटर लांबीचा कॉंक्रिट रस्ता व दोन्ही बाजूस भूमिगत सांडपाणी गटार.',
  'रस्ते',
  'सार्वजनिक बांधकाम विभाग (PWD)',
  '२५-१५ ग्रामीण विकास योजना',
  'मुख्य गावठाण रस्ता',
  19.8445,
  74.0112,
  'IN_PROGRESS',
  '2024-08-10',
  '2025-05-31',
  NULL,
  3800000.00,
  3800000.00,
  3000000.00,
  2550000.00,
  'ओम इन्फ्रास्ट्रक्चर प्रा. लि., सिन्नर',
  'OFFICIAL_SOURCE'
),
(
  'sonwadi-nashik',
  'WRK-2025-095',
  'Primary Health Sub-centre Solar Power System',
  'प्राथमिक आरोग्य उपकेंद्र सौर ऊर्जा विद्युतीकरण',
  'आरोग्य उपकेंद्रास अखंड वीजपुरवठ्यासाठी ५ किलोवॅट ऑन-ग्रीड सोलर पॅनेल व बॅटरी इन्व्हर्टर सिस्टीम बसविणे.',
  'आरोग्य',
  'जिल्हा परिषद आरोग्य विभाग',
  '१५ वा वित्त आयोग (अनटाईड निधी)',
  'आरोग्य उपकेंद्र परिसर',
  19.8471,
  74.0145,
  'COMPLETED',
  '2024-11-01',
  '2025-01-15',
  '2025-01-10',
  850000.00,
  850000.00,
  600000.00,
  520000.00,
  'महाऊर्जा मान्यताप्राप्त मे. सूर्योदय सोलर',
  'OFFICIAL_SOURCE'
)
ON CONFLICT (work_id) DO NOTHING;

-- Budgets
INSERT INTO budgets (village_id, financial_year, sanctioned_amount, received_amount, spent_amount, remaining_amount, verification_status)
VALUES
(
  'sonwadi-nashik',
  '2025-26',
  11880000.00,
  9730000.00,
  8335000.00,
  3545000.00,
  'OFFICIAL_SOURCE'
),
(
  'sonwadi-nashik',
  '2024-25',
  9450000.00,
  9450000.00,
  9280000.00,
  170000.00,
  'OFFICIAL_SOURCE'
)
ON CONFLICT (village_id, financial_year) DO NOTHING;

-- Government Schemes
INSERT INTO government_schemes (id, name, name_mr, name_hi, category, description, eligibility, benefits, required_documents, application_process, official_url, department)
VALUES
(
  'sch-01',
  'Namo Shetkari Maha Samman Nidhi',
  'नमो शेतकरी महासन्मान निधी योजना',
  'नमो शेतकरी महा सम्मान निधि',
  'शेतकरी (Farmers)',
  'महाराष्ट्र शासनाची अल्प व अत्यल्प भूधारक शेतकऱ्यांना वर्षाला ₹६,००० अतिरिक्त आर्थिक साहाय्य देणारी योजना.',
  'शेतकरी पीएम किसान योजनेचा लाभार्थी असावा, शेती जमीन स्वतःच्या नावावर असावी.',
  'वर्षाला ₹६,००० थेट बँक खात्यात (दर ४ महिन्यांनी ₹२,००० हप्ता).',
  ARRAY['आधार कार्ड', '७/१२ उतारा व ८-अ', 'बँक पासबूक (आधार लिंक)', 'पीएम किसान नोंदणी क्रमांक'],
  'pmkisan.gov.in किंवा महाडीबीटी पोर्टलद्वारे थेट पडताळणी.',
  'https://mahadbt.maharashtra.gov.in',
  'कृषी विभाग, महाराष्ट्र शासन'
),
(
  'sch-02',
  'Mukhyamantri Majhi Ladki Bahin Yojana',
  'मुख्यमंत्री माझी लाडकी बहीण योजना',
  'मुख्यमंत्री मेरी प्यारी बहना योजना',
  'महिला (Women)',
  '२१ ते ६५ वयोगटातील पात्र महिलांच्या सक्षमीकरणासाठी दरमहा ₹१,५०० थेट खात्यात वर्ग करणारी योजना.',
  'महाराष्ट्र राज्याची रहिवासी, वय २१ ते ६५ वर्षे, वार्षिक कौटुंबिक उत्पन्न ₹२.५० लाखांपेक्षा कमी.',
  'दरमहा ₹१,५०० थेट डीबीटी द्वारे आधार लिंक बँक खात्यात.',
  ARRAY['आधार कार्ड', 'उत्पन्नाचा दाखला / पिवळे-केशरी रेशन कार्ड', 'बँक पासबूक', 'हमीपत्र'],
  'नारीशक्ती दूत ॲप किंवा अंगणवाडी केंद्र / ग्रामपंचायत सुविधा केंद्र.',
  'https://ladakibahin.maharashtra.gov.in',
  'महिला व बालविकास विभाग'
),
(
  'sch-03',
  'Sanjay Gandhi Niradhar Anudan Yojana',
  'संजय गांधी निराधार अनुदान योजना',
  'संजय गांधी निराधार योजना',
  'ज्येष्ठ नागरिक / दिव्यांग',
  'निराधार वृद्ध, दिव्यांग व्यक्ती, विधवा व दुर्धर आजाराने ग्रस्त व्यक्तींना नियमित पेन्शन साहाय्य.',
  'वय ६५ वर्षे किंवा त्याहून अधिक (किंवा ४०% दिव्यांग/विधवा), वार्षिक उत्पन्न ₹५०,००० पेक्षा कमी.',
  'दरमहा ₹१,५०० थेट पेन्शन खात्यात.',
  ARRAY['वय दाखला', 'उत्पन्नाचा दाखला', 'वैद्यकीय प्रमाणपत्र (दिव्यांगांसाठी)', 'तहसीलदार शिफारस पत्र'],
  'सिन्नर तहसील कार्यालय किंवा आपले सरकार सेवा केंद्र.',
  'https://aaplesarkar.mahaonline.gov.in',
  'सामाजिक न्याय विभाग'
)
ON CONFLICT (id) DO NOTHING;

-- Public Facilities
INSERT INTO facilities (village_id, name, name_mr, category, address, public_phone, opening_hours, services, latitude, longitude)
SELECT 
  'sonwadi-nashik',
  'Primary Health Sub-centre',
  'प्राथमिक आरोग्य उपकेंद्र सोनवाडी',
  'आरोग्य (Health)',
  'मुख्य रस्ता, पाझर तलावाजवळ, सोनवाडी',
  '02551-248110',
  'सकाळी ९:०० ते संध्याकाळी ५:०० (आपत्कालीन २४ तास)',
  ARRAY['मोफत लसीकरण', 'मातृ-बाल आरोग्य तपासणी', 'ताप व संसर्गजन्य रोग तपासणी', 'मोफत औषध पुरवठा'],
  19.8471,
  74.0145
WHERE NOT EXISTS (SELECT 1 FROM facilities WHERE village_id = 'sonwadi-nashik' AND name = 'Primary Health Sub-centre');

INSERT INTO facilities (village_id, name, name_mr, category, address, public_phone, opening_hours, services, latitude, longitude)
SELECT 
  'sonwadi-nashik',
  'Zilla Parishad Primary School',
  'जि. प. प्राथमिक शाळा सोनवाडी',
  'शिक्षण (School)',
  'मारुती मंदिर परिसर, सोनवाडी',
  '02551-248115',
  'सकाळी १०:०० ते संध्याकाळी ५:००',
  ARRAY['इयत्ता १ ली ते ७ वी शिक्षण', 'डिजिटल वर्गखोल्या', 'मोफत पाठ्यपुस्तके व गणवेश', 'माध्यान्ह भोजन योजना'],
  19.8450,
  74.0120
WHERE NOT EXISTS (SELECT 1 FROM facilities WHERE village_id = 'sonwadi-nashik' AND name = 'Zilla Parishad Primary School');

-- Notifications
INSERT INTO notifications (village_id, title, title_mr, content, category, status, published_at)
SELECT 
  'sonwadi-nashik',
  'Special Gram Sabha Meeting Notice',
  'विशेष ग्रामसभा व विकास आराखडा मंजुरी बैठक',
  'सर्व ग्रामस्थांना कळविण्यात येते की, चालू आर्थिक वर्षाच्या विकास कामांचे नियोजन व सामाजिक अंकेक्षण (Social Audit) यावर चर्चा करण्यासाठी २६ ऑक्टोबर रोजी सकाळी १०:०० वाजता ग्रामपंचायत प्रांगणात विशेष ग्रामसभेचे आयोजन करण्यात आले आहे. सर्व नागरिकांनी वेळेवर उपस्थित राहावे.',
  'GRAM_SABHA',
  'PUBLISHED',
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM notifications WHERE village_id = 'sonwadi-nashik' AND title = 'Special Gram Sabha Meeting Notice');

-- Sample Complaint
INSERT INTO complaints (tracking_id, village_id, category, description, location, latitude, longitude, citizen_name, status)
VALUES (
  'GRM-2026-004821',
  'sonwadi-nashik',
  'दिवाबत्ती (Electricity)',
  'पाटील गल्लीतील मुख्य खांबावरील स्ट्रीट लाईट बंद असल्याने रात्रीच्या वेळी अंधार असतो. लवकरात लवकर दुरुस्ती करावी.',
  'पाटील गल्ली, घर क्र. १२ जवळ',
  19.8458,
  74.0132,
  'सुरेश भास्कर शिंदे',
  'RESOLVED'
) ON CONFLICT (tracking_id) DO NOTHING;
