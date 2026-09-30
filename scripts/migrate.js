/**
 * GramSetu — Supabase Cloud Database Migration Runner (Node.js)
 * Executes SQL migrations, verifies tables, and ensures RLS & seed data
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env or backend/.env
function loadEnv() {
  const envPaths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../backend/.env'),
    path.resolve(process.cwd(), '.env')
  ];

  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const key = trimmed.slice(0, idx).trim();
          let val = trimmed.slice(idx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
      break;
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

async function run() {
  console.log('====================================================');
  console.log('🚀 GramSetu Supabase Migration Runner');
  console.log('====================================================');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  console.log(`🔑 Service Role Key: ${SUPABASE_SECRET_KEY ? SUPABASE_SECRET_KEY.slice(0, 15) + '...' : 'NOT SET'}`);

  const migrationFilePath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');
  if (!fs.existsSync(migrationFilePath)) {
    console.error(`❌ Migration file not found at: ${migrationFilePath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(migrationFilePath, 'utf8');
  console.log(`📄 Loaded migration file: 001_initial_schema.sql (${sqlContent.length} bytes)`);

  // Try direct Postgres connection if pg is installed and DATABASE_URL is configured
  let pg;
  try {
    pg = require('pg');
  } catch (e) {
    // pg not installed in this environment
  }

  if (pg && DATABASE_URL && !DATABASE_URL.includes('password@localhost')) {
    console.log('\n🔌 Connecting directly to PostgreSQL via DATABASE_URL...');
    const client = new pg.Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log('✅ Connected to PostgreSQL successfully.');
      console.log('⏳ Executing schema migration, RLS policies, and seed data...');
      await client.query(sqlContent);
      console.log('✨ Migration applied successfully!');
      
      const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
      `);
      console.log('\n📊 Created Public Tables:');
      res.rows.forEach(r => console.log(`   - ${r.table_name}`));
      await client.end();
      return;
    } catch (err) {
      console.error('❌ Error executing SQL via pg client:', err.message);
      await client.end().catch(() => {});
    }
  }

  // Verification check via Supabase REST API using the service role key
  console.log('\n🔍 Verifying Supabase Project API with Service Role Key...');
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SECRET_KEY,
      'Authorization': `Bearer ${SUPABASE_SECRET_KEY}`
    }
  };

  const req = https.request(`${SUPABASE_URL}/rest/v1/`, options, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Supabase REST API is ONLINE and authenticated with Service Role Key.');
        const projectRef = SUPABASE_URL ? SUPABASE_URL.replace('https://', '').split('.')[0] : 'your-project-ref';
        console.log(`1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/${projectRef}`);
        console.log('2. Click on "SQL Editor" in the left sidebar.');
        console.log('3. Open or paste the contents of: supabase/migrations/001_initial_schema.sql');
        console.log('4. Click "Run" (Ctrl+Enter / Cmd+Enter).');
        console.log('\n💡 Alternatively, configure DATABASE_URL in .env with your Supabase database password:');
        console.log(`   DATABASE_URL="postgresql://postgres.${projectRef}:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"`);
        console.log('   and rerun: node scripts/migrate.js (or python scripts/migrate.py)');
      } else {
        console.warn(`⚠️ Supabase returned HTTP ${res.statusCode}:`, data);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
  });
  req.end();
}

run().catch(console.error);
