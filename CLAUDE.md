# CLAUDE.md — ws-redmine-opale-theme

## Project
WS Opale — Linear.app-inspired Redmine theme based on Opale.
Fork of https://github.com/gagnieray/opale (AGPL-3.0), modified for Linear.app look.
https://github.com/wsagency/ws-redmine-opale-theme

## How It Works
This is a FORK of Opale — a well-maintained Redmine theme with SCSS source.
We modify the SCSS variables and compiled CSS to achieve Linear.app look.

## Key Files
- `src/sass/_variables.scss` — ALL color/font variables (THIS IS THE MAIN FILE TO MODIFY)
- `src/sass/application.scss` — main SCSS entry point
- `src/sass/components/` — component-specific styles
- `stylesheets/application.css` — compiled output (what Redmine actually loads)
- `javascripts/theme.js` — dark mode toggle (WE ADD THIS)

## Approach: Variables-First
Opale is built with SCSS variables and `!default` flags.
The FASTEST approach: modify `_variables.scss` to Linear.app values, then recompile.

If npm/sass is not available, directly edit the compiled `stylesheets/application.css`.

## Linear.app Design Language

### Colors (Light Mode)
- Primary accent: #5E6AD2 (Linear's purple/indigo) — replaces Opale's #628db6
- Text primary: #1B1B1F
- Text secondary: #6B6F76
- Background: #FFFFFF
- Secondary bg: #F9F9FB
- Borders: #E8E8EC
- Links: #5E6AD2
- Link hover: #4E5BBD (NOT red like Opale's default)

### Colors (Dark Mode)
- Background: #1C1C1E
- Secondary bg: #151517
- Text primary: #EDEDEF
- Text secondary: #8A8F98
- Borders: #2E2E32
- Accent: #5E6AD2

### Typography
- Font: Inter (import from Google Fonts)
- Base size: 13px (Linear uses 13px)
- Letter-spacing: -0.01em
- Font weights: 400, 500, 600

### Key Opale Variables to Change
```scss
$brand-primary: #5E6AD2;       // was #628db6
$brand-text: #FFFFFF;
$brand-accent: #7B85E0;        // lighter purple
// Link hover should NOT be red — change to darker purple
// Font should be Inter
```

## Important
- Do NOT break Opale's layout — it works perfectly (left sidebar, etc.)
- Only change colors, fonts, and add dark mode
- Opale already handles responsive, icons, admin pages, etc.
- The compiled CSS is one long line — it's minified
