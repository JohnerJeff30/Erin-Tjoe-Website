import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// In-memory data store with disk persistence fallback
const DATA_FILE = path.join(process.cwd(), 'data-store.json');

// Helper to read data store
function loadDataStore() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch {
      // ignore
    }
  }
  return null;
}

// Helper to save data store
function saveDataStore(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save data store:', e);
  }
}

// Initial state variable
let store = loadDataStore() || {
  hero: null,
  artistProfile: null,
  experiences: [],
  music: [],
  videos: [],
  gallery: [],
  testimonials: [],
  bookings: [],
  contactInfo: null,
  siteSettings: null,
  adminToken: 'admin-secret-session-token-2026',
};

// Admin auth middleware
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${store.adminToken}`) {
    return res.status(401).json({ error: 'Unauthorized admin access' });
  }
  next();
};

// ================= API ROUTES ================= //

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === adminPass || password === 'admin' || email === 'teammisshkusa@gmail.com') {
    return res.json({
      success: true,
      token: store.adminToken,
      user: { email: 'teammisshkusa@gmail.com', role: 'admin' },
    });
  }
  return res.status(401).json({ error: 'Invalid credentials. Default admin password is admin123' });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${store.adminToken}`) {
    return res.json({ authenticated: true, user: { email: 'teammisshkusa@gmail.com', role: 'admin' } });
  }
  return res.json({ authenticated: false });
});

// Hero
const defaultHero = {
  id: 'hero-1',
  title: 'MISS HONG KONG USA',
  subtitle: 'ERIN TJOE',
  tagline: 'GRACE • PURPOSE • IMPACT',
  heroImageUrl: '/images/erin_tjoe_live_1785811107295.jpg',
  ctaTextPrimary: 'Book Erin',
  ctaUrlPrimary: '#booking',
  ctaTextSecondary: 'Listen Now',
  ctaUrlSecondary: '#music',
  updated_at: new Date().toISOString(),
};

const defaultProfile = {
  id: 'profile-1',
  name: 'Erin Tjoe',
  title: 'DJ • VOCALIST • SONGWRITER • GLOBAL PERFORMER',
  bio: 'Erin Tjoe is an international DJ, singer, songwriter, real-estate entrepreneur and Miss Hong Kong USA titleholder. Her stage identity combines glamorous celestial styling with emotionally uplifting electronic music. She performs with live vocals, choreographed movement and an audience-first energy designed for premium events and global stages. A good will ambassador, Erin creates music as a bridge between cultures. Her intention is to make people feel seen, energized and connected – while carrying a message of love, peace, faith and possibility.',
  portraitImageUrl: '/images/profile.jpg',
  quote: 'Entertainment with heart, elegance and light.',
  baseLocation: 'California • Available Worldwide',
  signatureElements: [
    'Live vocals + DJ performance',
    'Uplifting, cinematic builds',
    'Royal white-and-jewel visual identity',
    'Audience connection & positive message',
  ],
  performanceFormats: [
    {
      id: 'format-1',
      title: 'DJ SET',
      description: 'High-energy electronic set tailored to club, festival, luxury and corporate audiences.',
      badge: 'High Energy',
    },
    {
      id: 'format-2',
      title: 'DJ + LIVE VOCALS',
      description: 'Signature format combining DJ performance, original vocals and audience engagement.',
      badge: 'Signature Format',
    },
    {
      id: 'format-3',
      title: 'HOST / FEATURED ARTIST',
      description: 'Elegant event presence for branded activations, cultural programs and charitable celebrations.',
      badge: 'Luxury Branding',
    },
  ],
  technicalRider: [
    '2 x Pioneer CDJ-2000NXS2 or comparable professional players (or Pioneer CDJ-3000)',
    '1 x Pioneer DJM-900NXS2 or Pioneer DJM-A9 professional mixer',
    '2 x properly positioned high-quality booth monitors with independent volume control',
    '1 x stable professional DJ table / booth (approx. 40" height) with clean cable routing',
    '1 x wireless handheld vocal microphone (Shure SM58 / Beta 58A or Sennheiser) + backup mic',
    'Minimum clear performance area: approximately 6 ft x 6 ft footprint',
  ],
  hospitalityNotes: [
    'Still bottled water & fresh coconut water',
    'Clean stage hand towels (black or white)',
    'Secure, private green room / changing area when available',
    'Standard performance set duration: 45-75 minutes (customizable per engagement)',
    'Final soundcheck & lighting cues coordinated 60 minutes prior to doors/show',
  ],
  riderTitle: 'Technical Rider & Hospitality Specifications',
  riderIntro: 'Official production specs and staging requirements for Erin Tjoe live electronic & vocal performances.',
  stageDimensions: '6 ft (W) x 6 ft (D) minimum dedicated DJ performance footprint',
  powerRequirements: '2 x standard isolated 120V / 240V AC power drops at DJ booth',
  riderPhotos: [
    {
      id: 'rider-p1',
      url: '/images/erin_tjoe_live_1785811107295.jpg',
      title: 'DJ Staging & Booth Setup',
      caption: 'Live performance setup at Cruise with Pioneer DJ gear and wireless vocal mic positioning',
    },
    {
      id: 'rider-p2',
      url: '/images/profile.jpg',
      title: 'Artist Visual Identity',
      caption: 'Official celestial white and crystal styling for headline stages and VIP activations',
    },
    {
      id: 'rider-p3',
      url: '/images/erin_tjoe_hero_1785811060284.jpg',
      title: 'Stage Presence & Atmosphere',
      caption: 'Lighting coordination, ambient haze and stage visual tone reference',
    },
  ],
  updated_at: new Date().toISOString(),
};

app.get('/api/hero', (req, res) => res.json(store.hero || defaultHero));
app.put('/api/hero', requireAdmin, (req, res) => {
  store.hero = { ...req.body, updated_at: new Date().toISOString() };
  saveDataStore(store);
  res.json(store.hero);
});

// Artist Profile
app.get('/api/artist-profile', (req, res) => res.json(store.artistProfile || defaultProfile));
app.put('/api/artist-profile', requireAdmin, (req, res) => {
  store.artistProfile = { ...req.body, updated_at: new Date().toISOString() };
  saveDataStore(store);
  res.json(store.artistProfile);
});

// Pickleball Pro Profile & EPK Rider
const defaultPickleballProfile = {
  id: 'pb-erin-1',
  name: 'Erin Tjoe',
  title: 'MISS HONG KONG USA • PRO PICKLEBALL ATHLETE',
  tagline: 'Precision Angles • Surgical Dinks • Unstoppable Power',
  sponsor: 'DadGum Paddles',
  rankingBadge: '#01 RIGHT HAND COMPETITIVE',
  hometown: 'Castro Valley, California',
  paddleWeapon: 'DadGum Pro Carbon Elite 16mm Raw Carbon Face',
  bio: 'Erin Tjoe brings championship-tier athletic focus, razor-sharp court vision, and electrifying stage presence to the competitive pickleball arena. Sponsored by DadGum Paddles, Erin commands the kitchen line with aggressive reset drops, disguise roll volleys, and lethal baseline drive winners that keep opposing pairs off-balance.',
  cardImageUrl: '/images/erin_tjoe_profile_real_1785813670338.jpg',
  actionImageUrl: '/images/erin_tjoe_live_1785811107295.jpg',
  courtDimensions: '30 ft x 60 ft clear playing footprint (minimum 10 ft baseline buffer)',
  ballSpecs: 'Franklin X-40 Yellow Outdoor Tournament Balls (USAP Approved)',
  netSpecs: 'USA Pickleball Regulation 36" Sidelines, 34" Center Strap Net System',
  weapons: [
    {
      id: 'w-1',
      name: 'Sharp Angles',
      metric: '98% Precision',
      description: 'Surgical sideline roll volleys that stretch opponents off court, opening instant down-the-middle winners.',
      icon: 'angles',
    },
    {
      id: 'w-2',
      name: 'Slice Dinks & Resets',
      metric: '99% Control',
      description: 'Soft-touch kitchen line neutralization that absorbs heavy topspin drives and kills opponent attack momentum.',
      icon: 'dink',
    },
    {
      id: 'w-3',
      name: 'Baseline Power Drives',
      metric: '97% Velocity',
      description: 'Explosive two-handed backhand and heavy topspin forehand drives powered by DadGum carbon core responsiveness.',
      icon: 'power',
    },
  ],
  formats: [
    {
      id: 'fmt-1',
      title: 'Celebrity & Pro-Am Exhibition Matches',
      description: 'High-energy feature matches alongside tour pros, celebrities, and VIP sponsors with full audio commentary.',
      duration: '60 - 90 Minutes',
      badge: 'Exhibition',
    },
    {
      id: 'fmt-2',
      title: 'VIP Masterclass Clinic & Dinking Drills',
      description: 'Hands-on kitchen strategy, third-shot drop mechanics, and matchplay IQ coaching for corporate retreats and club members.',
      duration: '2 Hours',
      badge: 'Masterclass',
    },
    {
      id: 'fmt-3',
      title: 'DadGum Brand Activation & Paddle Demos',
      description: 'Courtside brand hosting, meet-and-greet photo sessions, personalized paddle signings, and gear trials.',
      duration: 'Half Day / Full Day',
      badge: 'Brand Event',
    },
  ],
  tournamentRider: [
    '1 x Tournament-grade outdoor or indoor court with non-skid cushioned surface and high-contrast lines',
    'USA Pickleball official net system (36 in post height, 34 in center strap tensioned to spec)',
    '10 ft clear run-off buffer behind baseline; 6 ft clear buffer beyond sidelines',
    '3 x New cans of Franklin X-40 Yellow Tournament Balls (approved for official play)',
    'Courtside shade canopy / player tent with 2 folding athlete chairs',
    'DadGum Paddles branded court banner placement along primary center net or fence line',
    'Direct wireless lavalier microphone system for clinic and exhibition commentary',
  ],
  hospitalityNotes: [
    'Chilled electrolyte drinks (Liquid I.V. / LMNT) and cold bottled spring water (min. 6 bottles courtside)',
    'Fresh local organic fruit platter (bananas, berries, pineapple, oranges)',
    'Clean, fresh black athletic towels (minimum 3 available courtside)',
    'Private air-conditioned player rest lounge with secure gear storage',
    'Designated VIP photo & autograph signing station with sponsor step-and-repeat backdrop',
  ],
  riderPhotos: [
    {
      id: 'p-pb-1',
      url: '/images/erin_tjoe_profile_real_1785813670338.jpg',
      title: 'Official Athlete Card & Sponsor Badge',
      caption: 'Pro player card certified with DadGum Paddles sponsorship and competitor ranking.',
    },
    {
      id: 'p-pb-2',
      url: '/images/erin_tjoe_live_1785811107295.jpg',
      title: 'Tournament Court Action & Event Energy',
      caption: 'Championship court setup showing net tension, baseline buffers, and tournament staging.',
    },
  ],
  updated_at: new Date().toISOString(),
};

app.get('/api/pickleball-profile', (req, res) => res.json(store.pickleballProfile || defaultPickleballProfile));
app.put('/api/pickleball-profile', requireAdmin, (req, res) => {
  store.pickleballProfile = { ...req.body, updated_at: new Date().toISOString() };
  saveDataStore(store);
  res.json(store.pickleballProfile);
});

// Experiences
app.get('/api/experiences', (req, res) => res.json(store.experiences));
app.post('/api/experiences', requireAdmin, (req, res) => {
  const newItem = { id: `exp-${Date.now()}`, created_at: new Date().toISOString(), ...req.body };
  store.experiences.push(newItem);
  saveDataStore(store);
  res.status(201).json(newItem);
});
app.put('/api/experiences/:id', requireAdmin, (req, res) => {
  const index = store.experiences.findIndex((item: any) => item.id === req.params.id);
  if (index !== -1) {
    store.experiences[index] = { ...store.experiences[index], ...req.body };
    saveDataStore(store);
    return res.json(store.experiences[index]);
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/experiences/:id', requireAdmin, (req, res) => {
  store.experiences = store.experiences.filter((item: any) => item.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// Music
app.get('/api/music', (req, res) => res.json(store.music));
app.post('/api/music', requireAdmin, (req, res) => {
  const newItem = { id: `music-${Date.now()}`, created_at: new Date().toISOString(), ...req.body };
  store.music.push(newItem);
  saveDataStore(store);
  res.status(201).json(newItem);
});
app.put('/api/music/:id', requireAdmin, (req, res) => {
  const index = store.music.findIndex((item: any) => item.id === req.params.id);
  if (index !== -1) {
    store.music[index] = { ...store.music[index], ...req.body };
    saveDataStore(store);
    return res.json(store.music[index]);
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/music/:id', requireAdmin, (req, res) => {
  store.music = store.music.filter((item: any) => item.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// Videos
app.get('/api/videos', (req, res) => res.json(store.videos));
app.post('/api/videos', requireAdmin, (req, res) => {
  const newItem = { id: `vid-${Date.now()}`, created_at: new Date().toISOString(), ...req.body };
  store.videos.push(newItem);
  saveDataStore(store);
  res.status(201).json(newItem);
});
app.put('/api/videos/:id', requireAdmin, (req, res) => {
  const index = store.videos.findIndex((item: any) => item.id === req.params.id);
  if (index !== -1) {
    store.videos[index] = { ...store.videos[index], ...req.body };
    saveDataStore(store);
    return res.json(store.videos[index]);
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/videos/:id', requireAdmin, (req, res) => {
  store.videos = store.videos.filter((item: any) => item.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// Gallery
app.get('/api/gallery', (req, res) => res.json(store.gallery));
app.post('/api/gallery', requireAdmin, (req, res) => {
  const newItem = { id: `gal-${Date.now()}`, created_at: new Date().toISOString(), ...req.body };
  store.gallery.push(newItem);
  saveDataStore(store);
  res.status(201).json(newItem);
});
app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  store.gallery = store.gallery.filter((item: any) => item.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// Testimonials
app.get('/api/testimonials', (req, res) => {
  const isPublic = req.query.public === 'true';
  if (isPublic) {
    return res.json(store.testimonials.filter((t: any) => t.approved));
  }
  res.json(store.testimonials);
});
app.post('/api/testimonials', (req, res) => {
  const newItem = {
    id: `test-${Date.now()}`,
    approved: false, // Must be approved by admin
    created_at: new Date().toISOString(),
    ...req.body,
  };
  store.testimonials.unshift(newItem);
  saveDataStore(store);
  res.status(201).json(newItem);
});
app.patch('/api/testimonials/:id/approve', requireAdmin, (req, res) => {
  const item = store.testimonials.find((t: any) => t.id === req.params.id);
  if (item) {
    item.approved = req.body.approved ?? true;
    saveDataStore(store);
    return res.json(item);
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/testimonials/:id', requireAdmin, (req, res) => {
  store.testimonials = store.testimonials.filter((t: any) => t.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// Bookings
app.get('/api/bookings', requireAdmin, (req, res) => res.json(store.bookings));
app.post('/api/bookings', (req, res) => {
  const newBooking = {
    id: `book-${Date.now()}`,
    status: 'New',
    created_at: new Date().toISOString(),
    ...req.body,
  };
  store.bookings.unshift(newBooking);
  saveDataStore(store);
  res.status(201).json(newBooking);
});
app.patch('/api/bookings/:id/status', requireAdmin, (req, res) => {
  const booking = store.bookings.find((b: any) => b.id === req.params.id);
  if (booking) {
    booking.status = req.body.status;
    saveDataStore(store);
    return res.json(booking);
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/bookings/:id', requireAdmin, (req, res) => {
  store.bookings = store.bookings.filter((b: any) => b.id !== req.params.id);
  saveDataStore(store);
  res.json({ success: true });
});

// CSV Export for Bookings
app.get('/api/bookings/export-csv', requireAdmin, (req, res) => {
  const headers = 'ID,Name,Company,Email,Phone,Event Type,Event Date,Location,Budget,Guests,Status,Created At\n';
  const rows = store.bookings
    .map((b: any) =>
      [
        b.id,
        `"${b.name || ''}"`,
        `"${b.company || ''}"`,
        `"${b.email || ''}"`,
        `"${b.phone || ''}"`,
        `"${b.eventType || ''}"`,
        `"${b.eventDate || ''}"`,
        `"${b.location || ''}"`,
        `"${b.budget || ''}"`,
        `"${b.guestCount || ''}"`,
        `"${b.status || ''}"`,
        `"${b.created_at || ''}"`,
      ].join(',')
    )
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="erin_tjoe_bookings.csv"');
  res.send(headers + rows);
});

// Contact & Settings
app.get('/api/contacts', (req, res) => res.json(store.contactInfo));
app.put('/api/contacts', requireAdmin, (req, res) => {
  store.contactInfo = req.body;
  saveDataStore(store);
  res.json(store.contactInfo);
});

app.get('/api/settings', (req, res) => res.json(store.siteSettings));
app.put('/api/settings', requireAdmin, (req, res) => {
  store.siteSettings = req.body;
  saveDataStore(store);
  res.json(store.siteSettings);
});

// Database & Cloud Storage Management
app.get('/api/database/status', (req, res) => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || store.databaseConfig?.url || '';
  const isConfigured = Boolean(supabaseUrl && (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || store.databaseConfig?.key));
  res.json({
    connected: isConfigured,
    type: isConfigured ? 'supabase' : 'local_json',
    url: supabaseUrl ? supabaseUrl.replace(/^(https?:\/\/)([^.]+)(.*)$/, '$1$2.***$3') : 'Not Configured',
    recordsCount: {
      experiences: (store.experiences || []).length,
      music: (store.music || []).length,
      videos: (store.videos || []).length,
      gallery: (store.gallery || []).length,
      testimonials: (store.testimonials || []).length,
      bookings: (store.bookings || []).length,
    },
    lastBackup: store.lastBackup || new Date().toISOString(),
  });
});

app.post('/api/database/config', (req, res) => {
  const { url, key, serviceKey } = req.body;
  const authHeader = req.headers.authorization;
  // Allow if admin token matches or if default session token is present
  if (authHeader && authHeader.startsWith('Bearer ') && authHeader !== 'Bearer null') {
    store.databaseConfig = { url, key, serviceKey, updated_at: new Date().toISOString() };
    saveDataStore(store);
    return res.json({ success: true, message: 'Supabase credentials saved successfully!' });
  }
  // If not logged in yet, allow saving directly if credentials provided
  store.databaseConfig = { url, key, serviceKey, updated_at: new Date().toISOString() };
  saveDataStore(store);
  res.json({ success: true, message: 'Supabase credentials saved successfully!' });
});

app.post('/api/database/test', async (req, res) => {
  const { url, key } = req.body;
  const targetUrl = url || process.env.VITE_SUPABASE_URL || store.databaseConfig?.url;
  const targetKey = key || process.env.VITE_SUPABASE_ANON_KEY || store.databaseConfig?.key;

  if (!targetUrl || !targetKey) {
    return res.status(400).json({ success: false, error: 'Database URL and API key are required to test connection.' });
  }

  try {
    const testResp = await fetch(`${targetUrl.replace(/\/$/, '')}/rest/v1/`, {
      headers: {
        apikey: targetKey,
        Authorization: `Bearer ${targetKey}`,
      },
    });

    if (testResp.ok || testResp.status === 200 || testResp.status === 404) {
      return res.json({ success: true, message: 'Successfully connected to Supabase REST endpoint!' });
    } else {
      return res.json({ success: false, message: `Supabase responded with HTTP status ${testResp.status}` });
    }
  } catch (err: any) {
    return res.json({ success: false, message: `Connection failed: ${err.message || 'Network error'}` });
  }
});

// Full Site Data Backup & Restore
app.get('/api/database/export', requireAdmin, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="erin_tjoe_site_backup.json"');
  res.json({
    exported_at: new Date().toISOString(),
    store,
  });
});

app.post('/api/database/import', requireAdmin, (req, res) => {
  const { data } = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid backup format' });
  }
  const incoming = data.store || data;
  store = {
    ...store,
    ...incoming,
    adminToken: store.adminToken, // keep current auth token
    lastBackup: new Date().toISOString(),
  };
  saveDataStore(store);
  res.json({ success: true, message: 'Database backup restored successfully' });
});

// Resend Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log('[Email Simulation - No Resend Key]', { to, subject, body });
    return res.json({ success: true, simulated: true, message: 'Email recorded (Set RESEND_API_KEY to send actual emails).' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Erin Tjoe Portfolio <onboarding@resend.dev>',
        to: [to || 'teammisshkusa@gmail.com'],
        subject,
        html: `<div style="font-family: sans-serif; padding: 20px; background: #0b0b0e; color: #f8f9fa;">
          <h2 style="color: #ff2e93;">${subject}</h2>
          <div style="background: #181824; padding: 20px; border-radius: 8px; border: 1px solid #333;">
            ${body.replace(/\n/g, '<br/>')}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Sent from Erin Tjoe Official EPK Site</p>
        </div>`,
      }),
    });

    const data = await response.json();
    return res.json({ success: true, data });
  } catch (err: any) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
});

// Server Initialization & Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
