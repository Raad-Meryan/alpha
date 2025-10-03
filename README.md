# ALPHA - Creative Studio Portfolio

A modern, responsive, single-page portfolio website built with React and Vite.

## Features

- **Hero/Landing Section**: Eye-catching hero with logo and title
- **About Section**: Introduction to the studio
- **Vision Section**: Core values and mission (Innovation, Excellence, Collaboration)
- **Logo Section**: Showcase of brands
- **Team Section**: Meet the team members
- **Clients Section**: Client logos display
- **Gallery Section**: Project showcase with image grid
- **Contact Section**: Email, phone, Instagram links, and contact form
- **Smooth Navigation**: Smooth scrolling between sections
- **Dark Theme**: Modern, minimalistic design with dark background
- **Responsive Design**: Works on all device sizes
- **Customizable**: Easy to customize colors and typography via CSS variables

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Colors and Typography

Edit the CSS variables in `src/index.css` to customize the design:

```css
:root {
  /* Color Palette */
  --primary-color: #646cff;
  --primary-light: #9ca4ff;
  --background-dark: #1a1a1a;
  --background-darker: #242424;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.87);
  --text-muted: rgba(255, 255, 255, 0.7);
  
  /* Typography */
  --font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
```

### Content

Update the content in each component file located in `src/components/`:
- `Hero.jsx` - Landing section
- `About.jsx` - About section
- `Vision.jsx` - Vision cards
- `LogoSection.jsx` - Brand logos
- `Team.jsx` - Team members
- `Clients.jsx` - Client logos
- `Gallery.jsx` - Project gallery
- `Contact.jsx` - Contact information and form

## Tech Stack

- React 19
- Vite 7
- CSS3 with custom properties
- ESLint for code quality

## License

MIT

