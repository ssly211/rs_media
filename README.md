# RS MEDIA CONSULT – Official Business Website

A modern, elegant, responsive, and luxury creative agency website designed and developed for **RS MEDIA CONSULT**.

Built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (no heavy frameworks), ensuring lightning-fast loading speeds, clean architecture, and instant deployment on modern static hosting platforms like **Vercel** and **Netlify**.

---

## 🌟 Key Features

1. **Official Brand Logo & Identity**
   - Integrated official **RS MEDIA CONSULT** brand logo featuring the interlocking orange & ocean-blue emblem.
   - Vector and high-resolution transparency-optimized assets for crisp display on high-DPI and mobile screens.
   - Authentic brand aesthetic tailored to the official RS Media logo: Sunset Orange (`#FF6A00`) and Electric Ocean Blue (`#0284C7`) on a deep Midnight Navy & Obsidian canvas.
   - 100% human-crafted creative agency presentation — **zero AI features, chatbots, or artificial automation**. Real on-site cinematographers, photographers, designers, and developers.
   - **Dynamic Background of Real Works:** Cinematic hero background crossfade slideshow rotating through authentic RS Media Consult wedding photography, bridal portraiture, and corporate brand designs.

2. **Automated WhatsApp Booking System (Core Feature)**
   - Custom dynamic booking form collecting all essential event & project requirements.
   - Dynamic dependent dropdowns: Selecting a service category automatically updates specific service options in real-time.
   - Form validation preventing accidental blank submissions.
   - Automated message encoding with `encodeURIComponent()`.
   - Direct dispatch to RS MEDIA CONSULT's official Ghana WhatsApp number: `+233209792015` (`https://wa.me/233209792015?text=...`).
   - "BOOK THIS SERVICE" quick buttons on every service card auto-fill category and service, smoothly scrolling directly to the form.

3. **Interactive Portfolio & Rotating Gallery Showcases**
   - **About Section Rotating Gallery Slider:** Automatically rotates through authentic RS Media Consult works every 3.5s with manual previous/next arrows, live slide counter, indicator dots, and full-screen lightbox zoom.
   - **Hero Spotlight Card Rotator:** Dynamic real-time project rotator in the hero section.
   - **Curated Portfolio & Gallery:** Filter tabs (*All Works*, *Photography*, *Videography*, *Graphic Design*, *Website Development*, and *Events*) with interactive full-screen modal lightbox.
   - Keyboard accessibility (supports <kbd>Esc</kbd> to close, <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> arrow keys to navigate).
   - Keyboard accessibility (supports <kbd>Esc</kbd> to close, <kbd>←</kbd> / <kbd>→</kbd> arrow keys to navigate).

4. **Performance & SEO Ready**
   - Semantic HTML5 structure.
   - OpenGraph and meta tags for social media previews.
   - Lightweight zero-dependency Vanilla JavaScript.
   - Smooth navigation with sticky blurred header, Scrollspy, and mobile drawer menu.

---

## 📂 Project Folder Structure

```
mywebsite/
│
├── index.html                  # Main semantic HTML5 webpage
├── favicon.svg                 # Vector SVG browser tab favicon
├── favicon.ico                 # Standard browser tab favicon
│
├── css/
│   └── style.css               # Master stylesheet (CSS variables, layouts, responsive design)
│
├── js/
│   └── script.js               # Application logic, WhatsApp generator, lightbox, scrollspy
│
├── images/
│   ├── logo.svg                # Master vector luxury brand logo
│   ├── logo.png                # Fallback brand logo
│   ├── hero.jpg                # Cinema production background image
│   │
│   ├── photography/            # Photography category assets
│   │   ├── wedding.jpg
│   │   ├── portrait.jpg
│   │   ├── corporate.jpg
│   │   └── event.jpg
│   │
│   ├── videography/            # Videography category assets
│   │   ├── production.jpg
│   │   ├── music-video.jpg
│   │   └── corporate-video.jpg
│   │
│   ├── graphic-design/         # Graphic design category assets
│   │   ├── branding.jpg
│   │   ├── logo-design.jpg
│   │   └── social-media.jpg
│   │
│   ├── portfolio/              # Curated portfolio showcase assets
│   │   ├── portfolio-1.jpg
│   │   ├── portfolio-2.jpg
│   │   └── ...
│   │
│   └── events/                 # Event planning category assets
│       ├── luxury-wedding.jpg
│       ├── corporate-summit.jpg
│       └── awards-ceremony.jpg
│
└── README.md                   # Project documentation & deployment manual
```

---

## 📱 WhatsApp Booking Message Template

When a client submits the booking form, the website automatically compiles their details into the exact required format:

```text
NEW SERVICE BOOKING – RS MEDIA CONSULT

Client Name: Kwame Mensah

Phone Number: 0209792015

Email: kwame@example.com

Service Category: Photography

Specific Service: Wedding Photography

Project Date: 2026-12-20

Location: Kumasi Abuakwa, Ghana

Budget: Executive Package (GH₵ 3,000 - GH₵ 7,500)

Project Description: Full day wedding ceremony and reception photography coverage.

Preferred Contact: WhatsApp

Please contact me regarding this booking.
```

---

## 🚀 Deployment Instructions

This website has no server-side build steps or runtime dependencies, making it deployable within seconds:

### Option A: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New Project**.
3. Import your Git repository (GitHub/GitLab/Bitbucket) containing this folder.
   - *Framework Preset:* Select **Other** (Plain HTML/CSS/JS).
   - *Root Directory:* `./`
4. Click **Deploy**. Your site will be live instantly with free SSL and global CDN distribution.

### Option B: Deploy on Netlify (Drag & Drop)
1. Log in to [netlify.com](https://netlify.com).
2. Go to the **Sites** tab and locate the **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"** area.
3. Drag the entire project folder directly into the browser window.
4. Netlify will deploy it in under 10 seconds with a custom URL and free HTTPS.

---

## 🛠️ Customization Guide

### Updating the WhatsApp Number
To change the WhatsApp booking number:
1. Open `js/script.js`.
2. Locate line 22:
   ```javascript
   const RS_BUSINESS_PHONE = '233209792015';
   ```
3. Update it to your new number in international format (without the leading zero or `+` sign).

### Adding or Modifying Services
Services are configured in `js/script.js` under the `SERVICE_CATALOG` object:
```javascript
const SERVICE_CATALOG = {
  'Photography': [
    'Wedding Photography',
    'Birthday Photography',
    ...
  ],
  ...
};
```
Any changes made here automatically propagate to the dynamic dropdowns.

### Replacing Images
Simply swap the files inside the `images/` directory with your actual high-resolution project photos using the same file names, or update the image paths in `index.html`.

---

## 📄 License & Attribution

&copy; 2026 **RS MEDIA CONSULT**. All Rights Reserved.  
Crafted with passion for creative excellence and digital distinction.
