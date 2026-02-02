# DriveLux - Static Website Code Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [HTML Structure (index.html)](#html-structure)
4. [CSS Architecture (styles.css)](#css-architecture)
5. [JavaScript Functionality (script.js)](#javascript-functionality)
6. [Theming & Design System](#theming--design-system)
7. [Icons](#icons)
8. [Responsive Design](#responsive-design)
9. [How to Customize](#how-to-customize)

---

## Project Overview

DriveLux is a static car rental website built with plain HTML, CSS, and vanilla JavaScript. It requires no build tools, frameworks, or dependencies — just open `index.html` in a browser.

**Key characteristics:**
- Zero dependencies (no npm, no Node.js)
- Dark theme with gold accent color scheme
- Fully responsive (mobile, tablet, desktop)
- All icons are inline SVGs (no icon library required)
- Google Fonts loaded via CDN (Space Grotesk + Inter)

---

## File Structure

```
drive-easy-now-main/
├── index.html        # Main HTML page (structure & content)
├── styles.css        # All CSS styles
├── script.js         # All JavaScript functionality
├── guide.md          # This documentation
├── favicon.ico       # Browser tab icon
├── robots.txt        # Search engine crawler rules
└── assets/
    ├── hero-car.jpg      # Hero banner background image
    ├── car-economy.jpg   # Economy vehicle card image
    ├── car-mpv.jpg       # MPV vehicle card image
    └── car-premium.jpg   # Premium vehicle card image
```

---

## HTML Structure

The page is divided into 10 main sections, each wrapped in a `<section>` tag with a unique `id` for anchor navigation.

### Section Map

| # | Section ID     | Element    | Description                                  |
|---|----------------|------------|----------------------------------------------|
| 1 | (navbar)       | `<nav>`    | Fixed navigation bar with mobile hamburger   |
| 2 | `#hero`        | `<section>`| Full-viewport hero banner with CTAs          |
| 3 | `#why-us`      | `<section>`| 6-card grid of service advantages             |
| 4 | `#about`       | `<section>`| Company info with stats + Vision/Mission     |
| 5 | `#fleet`       | `<section>`| 3 vehicle category cards with image carousel |
| 6 | `#testimonials`| `<section>`| 3 customer testimonial cards with ratings    |
| 7 | `#booking`     | `<section>`| 5 booking method cards                       |
| 8 | `#faq`         | `<section>`| 6-item accordion (expand/collapse)           |
| 9 | `#contact`     | `<section>`| Booking request form                         |
| 10| (footer)       | `<footer>` | 4-column footer with links & contact info    |

Additionally, there is a **lightbox overlay** (`#lightbox`) at the end of the body for viewing vehicle images fullscreen.

### Navbar

The navbar is position-fixed at the top with a frosted glass effect (`backdrop-filter: blur`). It contains:
- **Brand logo**: Inline SVG car icon + "DRIVELUX" text
- **Desktop links**: Hidden on mobile (`display: none`), shown at 768px+ (`display: flex`)
- **Mobile toggle**: A hamburger button that toggles the `.navbar-mobile` panel via JavaScript
- **Book Now CTA**: Gold primary button linking to the contact form

The mobile menu is controlled by toggling the `.open` class on `#navMobile`.

### Hero

A full-viewport section with:
- **Background image**: `assets/hero-car.jpg` with 60% opacity
- **Gradient overlay**: Three-stop gradient from solid dark at bottom to transparent at top
- **Content**: Subtitle, headline (with gold gradient text), description, two CTA buttons
- **Scroll indicator**: Animated bouncing chevron-down arrow linking to `#why-us`

### Why Choose Us

A responsive grid of 6 cards. Each card uses the `.card-glass` base class and contains:
- An icon wrapper (`.reason-icon-wrap`) with an inline SVG
- A title (`.reason-title`)
- A description (`.reason-desc`)

Grid columns: 1 (mobile) → 2 (768px) → 3 (1024px)

### About Us

A two-column grid:
- **Left column**: Section label, title, two paragraphs of text, and 3 stat counters (500+, 50+, 9+)
- **Right column**: Two glass cards for "Our Vision" and "Our Mission", each with an icon and description

### Vehicle Collection

Three vehicle category cards (Economy, MPV, Premium). Each card includes:
- **Image carousel**: Multiple `<img>` tags stacked absolutely. Only one is visible at a time (`.visible` / `.hidden`). Navigation via prev/next buttons and dot indicators.
- **Price badge**: Positioned absolutely at bottom-left of the image area
- **Vehicle info**: Title, description, feature icons (passengers, fuel, transmission), model tags
- **Book button**: Links to the contact form

### Testimonials

Three testimonial cards with:
- A quote icon (positioned top-right, decorative)
- Five star SVGs (gold filled)
- Quote text
- Author info: avatar circle with initials, name, and role

### Booking Process

Five cards showing different booking methods:
1. Call Us (phone)
2. WhatsApp (chat)
3. Online Form (web)
4. Email (mail)
5. Walk-In (location)

Each card has a numbered badge, a color-coded icon box, title, description, and action text.

### FAQ

An accordion component with 6 questions. Each FAQ item is a `.card-glass` containing:
- A `<button>` with class `.faq-question` (toggles `.active` class)
- A chevron icon that rotates 180° when active
- A `.faq-answer` div that expands via `max-height` transition

Only one item can be open at a time — clicking a new one closes the previous.

### Booking Form

A glass card containing a form with:
- **Row 1** (3 cols): Full Name, Email, Phone
- **Row 2** (2 cols): Pickup Location, Drop-off Location
- **Row 3** (3 cols): Pickup Date, Return Date, Vehicle Type (select)
- **Submit button**: Shows a confirmation alert and resets the form

Each input has an SVG icon positioned inside via absolute positioning.

### Footer

A 4-column grid:
1. **Brand**: Logo, description, social media icon links (Facebook, Instagram, Twitter, LinkedIn)
2. **Quick Links**: Home, About Us, Our Fleet, How to Book, FAQ
3. **Services**: Economy Cars, Family MPVs, Premium Vehicles, Airport Pickup, Corporate Rental
4. **Contact Us**: Address, phone, email with icons

Bottom bar: Copyright notice + Privacy/Terms/Cookie links.

---

## CSS Architecture

### Design Tokens (CSS Custom Properties)

All colors are defined as HSL values (without the `hsl()` wrapper) in `:root`. This allows flexible usage:

```css
:root {
  --background: 220 20% 7%;       /* Dark navy-black */
  --foreground: 0 0% 98%;         /* Near-white */
  --card: 220 18% 10%;            /* Slightly lighter dark */
  --primary: 38 92% 50%;          /* Gold */
  --primary-foreground: 220 20% 7%; /* Dark text on gold */
  --secondary: 220 15% 15%;       /* Section alternate bg */
  --muted: 220 15% 18%;           /* Input backgrounds */
  --muted-foreground: 220 10% 60%;/* Subdued text */
  --border: 220 15% 20%;          /* Border color */
}
```

Usage pattern: `hsl(var(--primary))` or `hsla(var(--primary), 0.5)` for alpha.

### Gradient Tokens

```css
--gradient-gold: linear-gradient(135deg, hsl(38,92%,50%) 0%, hsl(45,93%,60%) 100%);
--gradient-card: linear-gradient(145deg, hsl(220,18%,12%) 0%, hsl(220,18%,8%) 100%);
```

### Shadow Tokens

```css
--shadow-gold: 0 4px 30px -5px hsl(38, 92%, 50%, 0.3);
--shadow-card: 0 10px 40px -10px hsl(0, 0%, 0%, 0.5);
```

### Utility Classes

| Class              | Purpose                                          |
|--------------------|--------------------------------------------------|
| `.container-custom`| Max-width container with horizontal padding      |
| `.section-padding` | Vertical padding for sections                    |
| `.text-gradient`   | Applies gold gradient to text                    |
| `.card-glass`      | Glass-card base: gradient bg, border, rounded, shadow |
| `.btn-primary`     | Gold filled button with hover scale effect       |
| `.btn-outline`     | Gold bordered button with hover fill effect      |
| `.icon` / `.icon-*`| SVG icon sizing classes (sm, lg, xl, 2xl)        |
| `.animate-fade-up` | Entry animation (opacity + translateY)           |

### Animations

```css
@keyframes fadeUp   /* Slide up + fade in */
@keyframes bounce   /* Bouncing scroll indicator */
```

### Component CSS Naming

Each section has its own namespaced prefix:
- **Navbar**: `.navbar-*`
- **Hero**: `.hero-*`
- **Sections**: `.section-header`, `.section-label`, `.section-title`, `.section-desc`
- **Why Choose Us**: `.reasons-grid`, `.reason-card`, `.reason-icon-wrap`, `.reason-title`, `.reason-desc`
- **About**: `.about-grid`, `.about-text`, `.about-stats`, `.about-stat-num`, `.about-cards`, `.about-card-*`
- **Vehicles**: `.vehicles-grid`, `.vehicle-card`, `.vehicle-image-*`, `.vehicle-nav-*`, `.vehicle-dot`, `.vehicle-price`, `.vehicle-title`, `.vehicle-desc`, `.vehicle-features`, `.vehicle-tag`
- **Testimonials**: `.testimonials-grid`, `.testimonial-card`, `.testimonial-quote`, `.testimonial-stars`, `.testimonial-text`, `.testimonial-author`, `.testimonial-avatar`, `.testimonial-name`, `.testimonial-role`
- **Booking**: `.booking-grid`, `.booking-card`, `.booking-icon-*`, `.booking-number`, `.booking-title`, `.booking-desc`, `.booking-action`, `.booking-green/emerald/blue/amber/rose`
- **FAQ**: `.faq-list`, `.faq-question`, `.faq-chevron`, `.faq-answer`, `.faq-answer-inner`
- **Form**: `.form-decoration`, `.form-inner`, `.form-grid`, `.form-group`, `.form-input`, `.form-select`, `.form-submit`
- **Lightbox**: `.lightbox`, `.lightbox-close`
- **Footer**: `.footer-grid`, `.footer-brand-desc`, `.footer-socials`, `.footer-social`, `.footer-heading`, `.footer-links`, `.footer-contact-item`, `.footer-bottom`, `.footer-bottom-links`

---

## JavaScript Functionality

All JavaScript is in `script.js` and uses **IIFEs** (Immediately Invoked Function Expressions) to avoid polluting the global scope. The file handles 5 features:

### 1. Mobile Menu Toggle

Targets `#navToggle`, `#navMobile`, `#menuIcon`, `#closeIcon`.

- Click hamburger → toggle `.open` on mobile menu, swap between menu/close icons
- Click any mobile link → close menu and restore hamburger icon

### 2. FAQ Accordion

Targets all `.faq-question` buttons.

- Click a question → close all others (remove `.active`, set `aria-expanded="false"`, remove `.open` from answers)
- Toggle the clicked question (add `.active`, set `aria-expanded="true"`, add `.open` to answer)
- The `.faq-answer` expands via CSS `max-height` transition (0 → 300px)
- The chevron icon rotates via CSS `transform: rotate(180deg)` when `.active`

### 3. Vehicle Image Carousel

Targets each `.vehicle-card` independently.

- Finds all images, dots, prev/next buttons within the card
- `show(index)` function: wraps around using modular arithmetic `((n % total) + total) % total`
- Sets current image to `.visible` class, all others to `.hidden`
- Updates dot active states
- Prev/Next buttons decrement/increment the index
- Dot clicks jump to specific index
- Image clicks open the lightbox

### 4. Lightbox

Targets `#lightbox`, `#lightboxClose`, `#lightboxImg`.

- Opening: Image click (in carousel) sets the lightbox `<img>` src and adds `.open` class
- Closing: Click the X button or click the backdrop (checks `e.target === lightbox`)
- CSS toggles between `display: none` and `display: flex`

### 5. Booking Form Submit

Targets `#bookingForm`.

- Prevents default form submission
- Shows a confirmation alert
- Resets the form fields

---

## Theming & Design System

### Color Palette

| Token                | HSL Value         | Usage                          |
|----------------------|-------------------|--------------------------------|
| `--background`       | 220 20% 7%       | Page background (dark navy)    |
| `--foreground`       | 0 0% 98%         | Primary text (near white)      |
| `--card`             | 220 18% 10%      | Card backgrounds               |
| `--primary`          | 38 92% 50%       | Gold accent color              |
| `--primary-foreground`| 220 20% 7%      | Text on gold backgrounds       |
| `--secondary`        | 220 15% 15%      | Alternating section backgrounds|
| `--muted`            | 220 15% 18%      | Input & tag backgrounds        |
| `--muted-foreground` | 220 10% 60%      | Subdued/secondary text         |
| `--border`           | 220 15% 20%      | Border lines                   |

### Typography

- **Headings**: `Space Grotesk` (weights: 400, 500, 600, 700)
- **Body text**: `Inter` (weights: 300, 400, 500, 600)
- Loaded via Google Fonts CDN

### Visual Effects

- **Glass card**: Gradient background + border + shadow (`card-glass` class)
- **Frosted navbar**: `backdrop-filter: blur(12px)` with semi-transparent background
- **Gold text gradient**: Applied via `background-clip: text` on `.text-gradient`
- **Hover effects**: Border color change on cards, scale on primary buttons, color transitions on links
- **Transitions**: All interactive elements use `transition: all 0.3s` or specific property transitions

---

## Icons

All icons are **inline SVGs** sourced from the [Lucide](https://lucide.dev/) icon library. They use `stroke` rather than `fill` (with the exception of testimonial stars which use both).

Common SVG attributes:
```html
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

The `stroke="currentColor"` attribute makes icons inherit their parent's text color, which enables easy recoloring via CSS `color` property.

### Icon Size Classes

| Class      | Size      |
|------------|-----------|
| `.icon-sm` | 1rem      |
| `.icon`    | 1.25rem   |
| `.icon-lg` | 1.5rem    |
| `.icon-xl` | 1.75rem   |
| `.icon-2xl`| 2rem      |

---

## Responsive Design

Three breakpoints are used:

### Mobile (< 640px)
- Single-column grids everywhere
- Hamburger menu visible, desktop nav hidden
- Hero title: 3rem
- Stacked hero buttons
- Section padding: 5rem 1rem

### Tablet (640px - 767px)
- Hero buttons become horizontal
- Booking grid becomes 2 columns

### Tablet/Desktop (768px+)
- Desktop nav links visible, hamburger hidden
- Container padding increases to 2rem
- Section padding: 7rem 2rem
- Hero title: 4.5rem
- Section titles: 3rem
- Most grids become 2 columns
- Form grids: 2 or 3 columns
- Footer: 2 columns
- Footer bottom: horizontal layout

### Desktop (1024px+)
- Reasons grid: 3 columns
- Vehicles grid: 3 columns
- Testimonials grid: 3 columns
- Booking grid: 5 columns (one per method)
- Footer: 4 columns

---

## How to Customize

### Change the Color Scheme

Edit the CSS custom properties in `:root` at the top of `styles.css`. All values are HSL without the `hsl()` wrapper:

```css
/* Example: Change gold to blue */
--primary: 217 91% 60%;
```

All components referencing `var(--primary)` will update automatically.

### Change Fonts

Replace the Google Fonts `<link>` in `index.html` and update `font-family` declarations in `styles.css` for `body` and headings.

### Add/Remove Sections

Each section is self-contained in the HTML. To remove a section, delete the corresponding `<section>` block. To add one, copy a similar section's structure and add matching CSS classes.

### Update Images

Replace files in the `assets/` directory. Vehicle cards reference images in `<img>` tags within `.vehicle-image-inner`. The hero references `assets/hero-car.jpg`.

### Modify Form Behavior

Edit the submit handler at the bottom of `script.js`. Currently it shows an `alert()` and resets. You could replace this with a `fetch()` call to submit data to a backend API.

### Add New FAQ Items

Copy an existing `.faq-item` block inside the `.faq-list` container. The JavaScript automatically binds click handlers to all `.faq-question` elements.

### Add New Vehicle Cards

Copy an existing `.vehicle-card` block inside `.vehicles-grid`. The carousel JavaScript automatically initializes for every `.vehicle-card` found on the page.
