# Sufify Technologies - MERN Stack Website

A full-stack digital agency website built with the MERN stack (MongoDB, Express, React, Node.js), inspired by Sufify Technologies.

## Features

- **Home** - Animated hero with rotating taglines, stats counters, services preview
- **About** - Company mission, values, team members
- **Services** - Full service catalog including Web Dev, SEO, AI Automation, E-commerce
- **Contact** - Contact form with MongoDB persistence, newsletter signup
- Dark luxury theme with gold accents
- Fully responsive design
- Framer Motion animations
- Preloader with progress animation

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, React Router, Framer Motion |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB with Mongoose               |
| Styling  | Custom CSS (dark theme + gold accents) |

## Project Structure

```
Sufify/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── data/           # Site content data
│   │   └── index.css       # Global styles
│   └── package.json
├── server/                 # Express API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Route handlers
│   └── index.js            # Server entry
└── package.json            # Root scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Install all dependencies
npm run install:all

# Copy environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI
```

### Development

```bash
# Run both server and client concurrently
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/health        | Health check             |
| POST   | /api/contact       | Submit contact form      |
| GET    | /api/contact       | List contact submissions |
| POST   | /api/newsletter    | Newsletter subscription  |

### Production Build

```bash
npm run build
```

## Customization

- **Content**: Edit `client/src/data/siteData.js` for all text, team, services
- **Images**: Replace Unsplash placeholder URLs with your own assets in `siteData.js`
- **Colors**: Modify CSS variables in `client/src/index.css`
- **Branding**: Update logo text in `Navbar.jsx` and `Preloader.jsx`

## License

Private - Sufify Technologies © 2026
