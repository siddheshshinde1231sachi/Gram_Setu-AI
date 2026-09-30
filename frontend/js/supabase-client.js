/**
 * GramSetu — Supabase Cloud Client Integration
 * Handles live synchronization for complaints, documents, and public data
 */

const SUPABASE_CONFIG = {
  url: 'https://kyxzrczmrcebqkvvgaha.supabase.co',
  publishableKey: 'sb_publishable_bRIQw8F-UWZEK2rOXWuUOQ_kf-HGF8D'
};

class GramSetuSupabase {
  constructor() {
    this.client = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (typeof window !== 'undefined' && window.supabase) {
      try {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey);
        this.isInitialized = true;
        console.log('✅ GramSetu: Supabase Cloud Client Initialized successfully.');
      } catch (err) {
        console.warn('⚠️ GramSetu: Could not initialize Supabase Client:', err);
      }
    }
  }

  // Fetch all development works from Supabase Cloud
  async getDevelopmentWorks(villageId = 'sonwadi-nashik') {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('development_works')
        .select('*')
        .eq('village_id', villageId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('⚠️ Supabase fetch error (development_works):', err.message);
      return null;
    }
  }

  // Submit a citizen complaint directly to Supabase Cloud
  async submitComplaint(complaintData) {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('complaints')
        .insert([{
          tracking_id: complaintData.trackingId || ('GRM-' + Date.now().toString().slice(-6)),
          village_id: complaintData.villageId || 'sonwadi-nashik',
          category: complaintData.category || 'इतर',
          description: complaintData.description,
          location: complaintData.location,
          latitude: complaintData.latitude || null,
          longitude: complaintData.longitude || null,
          photo_url: complaintData.photoUrl || null,
          is_anonymous: !!complaintData.isAnonymous,
          citizen_name: complaintData.citizenName || 'नागरिक',
          citizen_phone: complaintData.citizenPhone || null,
          status: 'SUBMITTED'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('⚠️ Supabase insert error (complaints):', err.message);
      return null;
    }
  }

  // Fetch public government schemes
  async getSchemes() {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('government_schemes')
        .select('*')
        .order('id');
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('⚠️ Supabase fetch error (government_schemes):', err.message);
      return null;
    }
  }
}

// Global Supabase singleton
window.gramsetuSupabase = new GramSetuSupabase();
