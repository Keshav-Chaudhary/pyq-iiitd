# IIITD PYQs Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)](https://web.dev/progressive-web-apps/)
[![Security](https://img.shields.io/badge/Security-Hardened-emerald.svg)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

Welcome to the **IIITD PYQs Platform** – a modern, student-driven repository and curriculum guide for IIIT-Delhi. 

This platform features a responsive glassmorphic aesthetic designed to make navigating past year papers, academic regulations, and curriculum structures fast, intuitive, and engaging.

---

## 🚀 Key Features

### 1. **Curriculum & Subject Explorer (`/subjects`)**
- **Comprehensive Course Mapping**: Filter courses across B.Tech branches (CSE, ECE, CSAM, CSD, CSSS, CSB, CSAI) and all semesters.
- **Flexible Views**: Switch between Grid and List views.
- **Instant Search**: Client-side filtering by course code (e.g., `CSE102`, `MTH201`), subject name, or branch.

### 2. **B.Tech Journey & Academic Hub (`/resources`)**
- **Interactive 8-Semester Timeline**: Visual progression tracking branch transfer guidelines, internships, SG/CW, and credit requirements.
- **Quick Portals**: Direct, categorized navigation to ERP, AXIS, and internal academic systems.
- **Official Regulations**: Centralized links to current branch syllabi and ordinances.

### 3. **Dynamic Contributors Dashboard (`/contributors`)**
- **GitHub API Integration**: Dynamic contributor recognition honoring both PYQ document uploaders and platform developers.
- **Interactive 3D Podium**: Top contributors spotlighted with ranked podium styling.
- **Live Stats**: Real-time repository metrics (Stars, Forks, Issues).

### 4. **Course Analytics (`/analytics`)**
- **Interactive Visualizations**: Breakdown of available papers, question sets, and branch distributions powered by Recharts.

### 5. **Automated Daily Sync & Live Timestamp**
- **Automated Workflow**: Regularly checks and syncs new academic materials from the upstream PYQ repository.
- **Live Sync Badge**: The website footer displays the exact last updated date and time, reflecting the latest synchronized release.

---

## 📸 Platform Previews

### 1. Home / Landing Page
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/home-web.png" width="600" alt="Home Web" /> | <img src="docs/screenshots/home-mobile.png" width="200" alt="Home Mobile" /> |

### 2. Menu Bar / Navigation
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/menu-web.png" width="600" alt="Menu Web" /> | <img src="docs/screenshots/menu-mobile.png" width="200" alt="Menu Mobile" /> |

### 3. Subjects Explorer (`/subjects`)
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/subjects-web.png" width="600" alt="Subjects Web" /> | <img src="docs/screenshots/subjects-mobile.png" width="200" alt="Subjects Mobile" /> |

### 4. Subject Details (`/subject/:id`)
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/subject-details-web.png" width="600" alt="Subject Details Web" /> | <img src="docs/screenshots/subject-details-mobile.png" width="200" alt="Subject Details Mobile" /> |

### 5. Resources Hub & Timeline (`/resources`)
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/resources-web.png" width="600" alt="Resources Web" /> | <img src="docs/screenshots/resources-mobile.png" width="200" alt="Resources Mobile" /> |

### 6. Contributors Dashboard (`/contributors`)
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/contributors-web.png" width="600" alt="Contributors Web" /> | <img src="docs/screenshots/contributors-mobile.png" width="200" alt="Contributors Mobile" /> |

### 7. Analytics (`/analytics`)
| Web View | Mobile View |
| :---: | :---: |
| <img src="docs/screenshots/analytics-web.png" width="600" alt="Analytics Web" /> | <img src="docs/screenshots/analytics-mobile.png" width="200" alt="Analytics Mobile" /> |

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM
- **Offline / PWA**: Vite PWA (Workbox Service Worker caching)
- **Visuals & Charts**: Recharts, Lucide Icons, Canvas Confetti
- **Styling**: Modern Vanilla CSS Design System with CSS Custom Properties

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Keshav-Chaudhary/pyq-iiitd.git
   cd pyq-iiitd
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment template:
   ```bash
   cp .env.example .env
   ```
   *(Note: The application runs with local fallback configuration out-of-the-box for development).*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🔒 Security & Best Practices

- **Zero Hardcoded Secrets**: All private keys, service accounts, and API tokens are managed via environment variables and GitHub Action Secrets. Never commit `.env` files to source control.
- **Production HTTP Security Headers**: Configured with Strict-Transport-Security (HSTS), X-Content-Type-Options (`nosniff`), X-Frame-Options (`SAMEORIGIN`), and Referrer Policy.
- **Source Code Protection**: Production sourcemaps are disabled (`sourcemap: false`) to safeguard client bundles.
- **Vulnerability Management**: Continuous dependency audits are performed (`npm audit`) to ensure 0 high/critical package vulnerabilities.

---

## 🤝 Contributing

Contributions to both the PYQ archive and the platform code are warmly welcomed!

- **Past Year Papers & Notes**: Contribute course materials to the [NalishJain/IIITD-PYQs](https://github.com/NalishJain/IIITD-PYQs) repository.
- **Platform Development**: Check out our **[Contributing Guidelines](CONTRIBUTING.md)** for branching standards, commit format, and local verification steps.

---

## 📜 License

This project is open-source and student-maintained under the [MIT License](LICENSE).
