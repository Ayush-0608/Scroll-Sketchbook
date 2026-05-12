# Scroll Sketchbook

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=fff)
![Status](https://img.shields.io/badge/status-learning_project-brightgreen)

Scroll Sketchbook is a React mini project built with Vite. It creates an animated 3D sketchbook where pages flip as the user scrolls, using React state, scroll listeners, CSS transforms, and Tailwind CSS setup through Vite.

https://github.com/user-attachments/assets/be954525-d0b3-4de3-a4ad-9e21345b0b9b

## Prerequisites

Before starting, install:

- [Node.js](https://nodejs.org/) version 20 or newer
- npm, which comes with Node.js
- A code editor such as VS Code

Check that Node and npm are installed:

```bash
node -v
npm -v
```

## Create The Project

Use the official Vite setup guide:

https://vite.dev/guide/

Create a new React project:

```bash
npm create vite@latest mini-project
```

When Vite asks for options, choose:

```text
Framework: React
Variant: JavaScript
```

Move into the project folder:

```bash
cd mini-project
```

Install the default dependencies:

```bash
npm install
```

## Install Tailwind CSS

Use the official Tailwind CSS with Vite guide:

https://tailwindcss.com/docs/installation/using-vite

Install Tailwind CSS and the Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Clean The Starter Files

After creating the Vite app, remove the default demo content so the project stays clean.

Delete the default starter CSS content from:

```text
src/App.css
src/index.css
```

Then keep `src/index.css` minimal with only the Tailwind import:

```css
@import "tailwindcss";
```

For this project, `src/App.css` is used for the custom book layout, scroll animation, page styling, and 3D transforms.

## Project Structure

```text
mini-project/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── bookImages.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Main Files

- `src/App.jsx` contains the React components, scroll tracking, page flip calculations, and book rendering.
- `src/App.css` contains the custom 3D book styles and animation behavior.
- `src/bookImages.js` stores the sketch page image links and back cover logo data.
- `src/index.css` imports Tailwind CSS.
- `vite.config.js` enables React and Tailwind CSS in Vite.

## Run The Project

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Available Scripts

Run the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Build Notes

The scroll animation is handled with:

- `useState` for scroll and viewport values
- `useEffect` for scroll and resize listeners
- `requestAnimationFrame` and `cancelAnimationFrame` for smoother scroll updates
- CSS custom properties for page rotation, depth, opacity, and book scale

## Installed packages

The project includes the following installed packages (from `package.json`):

- Dependencies:
  - `@tailwindcss/vite` ^4.3.0
  - `react` ^19.2.6
  - `react-dom` ^19.2.6
  - `tailwindcss` ^4.3.0

- DevDependencies:
  - `@eslint/js` ^10.0.1
  - `@types/react` ^19.2.14
  - `@types/react-dom` ^19.2.3
  - `@vitejs/plugin-react` ^6.0.1
  - `eslint` ^10.3.0
  - `eslint-plugin-react-hooks` ^7.1.1
  - `eslint-plugin-react-refresh` ^0.5.2
  - `globals` ^17.6.0
  - `vite` ^8.0.12

If you add animation libraries such as GSAP or data-visualization libraries such as D3, add them to `package.json` and list them here so the README stays accurate.

## Maintenance Checklist

- Keep image data in `src/bookImages.js` instead of hardcoding every image in JSX.
- Keep layout and animation styles in `src/App.css`.
- Keep global setup in `src/index.css`.
- Run `npm run build` before sharing or deploying the project.
- Avoid editing generated files inside `dist/`.
