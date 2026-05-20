# A Taste of India — React App

A single-page restaurant website for **A Taste of India**, Halifax NS, built with
React + Vite.

## Quick start

You need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
# 1. Install dependencies (run once)
npm install

# 2. Start the dev server (hot-reloads as you edit)
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs static files into dist/
npm run preview    # preview the production build locally
```

Upload the contents of the `dist/` folder to any static host
(Netlify, Vercel, GitHub Pages, your own server, etc.).

## Project structure

```
a-taste-of-india/
├── index.html              # HTML entry point
├── package.json            # dependencies & scripts
├── vite.config.js          # Vite config
├── public/
│   └── images/             # the 4 food photos (served as-is)
│       ├── curry-spread.jpg
│       ├── tandoori-chicken.jpg
│       ├── buffet-trays.jpg
│       └── combo-plate.jpg
└── src/
    ├── main.jsx            # React bootstrap
    ├── App.jsx             # the whole site (all components + content data)
    └── styles.css          # all styling
```

## Editing content

All text content lives in **data objects at the top of `src/App.jsx`** —
`MENU`, `FAVORITES`, `HOURS`, `CONTACT`, etc. Change a price or a phone number
there and it updates everywhere on the page. No need to dig through markup.

To swap a photo, just replace the matching file in `public/images/`
(keep the same filename) or update the `IMG` object in `App.jsx`.

## Notes

- The "Today" row in the Hours section highlights automatically based on the
  visitor's current day.
- All contact links work: phone dials, email opens a compose window, the
  address opens Google Maps.
