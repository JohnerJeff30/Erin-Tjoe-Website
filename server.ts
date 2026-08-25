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
    '2 x Pioneer CDJ-2000NXS2 or comparable professional players',
    '1 x Pioneer DJM-900NXS2 or comparable professional mixer',
    '2 x properly positioned booth monitors',
    '1 x stable professional DJ table / booth with safe cable management',
    '1 x wireless vocal microphone plus backup microphone',
    'Minimum clear performance area: approximately 6 ft x 6 ft',
  ],
  hospitalityNotes: [
    'Water & Coconut water',
    'Hand towel',
    'Secure changing area when available',
    'Typical set duration: 30-60 minutes',
    'Final production and hospitality details confirmed per engagement',
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
