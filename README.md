# Erin Tjoe — Luxury Artist Portfolio & Content Management System (CMS)

A luxury fashion-and-editorial electronic press kit (EPK), portfolio, and CMS web application built for **Erin Tjoe** — Miss Hong Kong USA, International DJ, Vocalist, Songwriter, and Performer.

---

## 💎 Features & Architecture

### Public Experience
- **Luxury Hero Section**: 80vh layout featuring the crown title (*Miss Hong Kong USA*), high-resolution performance photos, animated typography, and instant booking/audio CTAs. Strictly non-overlapping.
- **Artist Profile & EPK**: High-fashion portrait visuals, biography, intention statement, signature performance elements, performance format cards (DJ Set, DJ + Live Vocals, Host), and an interactive **Technical Rider & Hospitality Specs** drawer.
- **Selected Experience Grid**: Interactive showcase featuring Groove Cruise, Coachella VIP, Lightning in a Bottle, Royal Caribbean, Fresno State, Burning Man, Luxury Resorts, and Charity Galas.
- **Audio Discography**: Built-in interactive audio player with waveform scrubber, volume controls, and direct links to Spotify, Apple Music, SoundCloud, and Mixcloud.
- **Cinematic Video Gallery**: High-definition set captures with full-screen YouTube / Vimeo player modal.
- **Editorial Photo Gallery**: Masonry visual gallery with category filtering (*Live Sets, Editorial, Red Carpet, Behind the Scenes*) and full-screen lightbox preview.
- **Producer Testimonials & Reviews**: Interactive quote slider with a public submission modal for festival directors and event producers.
- **Professional Booking System**: Inquiry form collecting event type, location, budget, guest count, and date. Saves directly to persistent database and triggers **Resend email notifications**.
- **Social & Contact Hub**: Direct management links (`teammisshkusa@gmail.com`, `@MissHongKongUS`).

### CMS Admin Portal
- **Dashboard Sections**:
  1. **Bookings Management**: Real-time inquiry feed, search, filter by status (*New, Contacted, Confirmed, Closed*), and **1-click CSV Export**.
  2. **Hero Banner Editor**: Real-time field edits for titles, image URLs, and CTAs.
  3. **Artist Profile Editor**: Manage bio, quote, signature elements, and technical rider.
  4. **Experiences CMS**: Full CRUD for adding/editing festival & resort appearances.
  5. **Discography CMS**: Add/delete audio tracks, cover artwork, and DSP links.
  6. **Video & Photo CMS**: Manage visual assets and embeds.
  7. **Testimonial Moderation**: Review, approve, reject, or delete visitor reviews.
  8. **Contacts & Site Settings**: Manage Resend notification emails and brand colors.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend / API**: Node.js, Express 4, Vite 6
- **Database / Auth / Storage**: Supabase (PostgreSQL, Row Level Security, Storage Buckets, Auth) + Express REST persistence adapter
- **Email Notifications**: Resend API (`/api/send-email`)

---

## 🚀 Environment Variables setup (`.env`)

Declare the following in `.env` or Vercel Environment Configuration:

```env
# Gemini API Key (Server side)
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# App URL
APP_URL="https://your-domain.vercel.app"

# Supabase Credentials (Optional for local mode, required for Supabase cloud sync)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Resend Email Integration
RESEND_API_KEY="re_123456789"

# Admin CMS Password
ADMIN_PASSWORD="admin123"
```

---

## 📦 Local Development

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in your browser.
3. Access the Admin CMS Portal by clicking **CMS Portal** in the footer or top right shield icon.
   - Default credentials: `teammisshkusa@gmail.com` / `admin123`

---

## 🚢 Deploying to Vercel & Supabase

### 1. Supabase Database Migration
1. Go to your Supabase Project Dashboard.
2. Open **SQL Editor**.
3. Run the SQL script located in `/supabase/migrations/20260803_initial_schema.sql`.

### 2. Vercel Deployment
1. Push your repository to GitHub.
2. Import project into Vercel.
3. Set Node environment variables in Vercel project settings:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_PASSWORD`
4. Deploy! Vercel will automatically build the static assets and serverless functions.
