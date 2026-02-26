<div align="center">
  <img src="https://via.placeholder.com/150?text=Sanjeevani+AI" alt="Project Logo" width="120" height="120" style="border-radius: 20px;">
  
  # 🚀 Sanjeevani AI Frontend

  <p align="center">
    <strong>A highly scalable, performant, and visually stunning AI-powered Web Application.</strong>
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture-overview">Architecture</a> •
    <a href="#installation--local-setup">Installation</a> •
    <a href="#deployment-guide">Deployment</a>
  </p>

  <p align="center">
    <!-- Shields for the actual tech stack -->
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

## 📖 Overview

**Sanjeevani AI Frontend** is a cutting-edge web interface that allows users to interact seamlessly with AI models and personalized data. Built with an optimized Next.js 16 environment and sleek Tailwind CSS design, it guarantees an intuitive layout for comprehensive AI insights and weather telemetry.

Engineered to deliver an exceptionally fast, responsive, and accessible user experience, the system is designed with clean modular architecture and fully translated internationalization (`i18n`) built right in.

---

## 🌐 Live Demo

🎯 **Check out the live application on Vercel:** (https://sanjeevani-ai-frontend.vercel.app/)
---

## 💻 Tech Stack

| Category | Technology |
|---|---|
| **Core Framework** | Next.js 16 (App Router) & React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, `clsx`, `tailwind-merge` |
| **Animations** | Framer Motion |
| **State Management** | React Context API |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🏗 Architecture Overview

This frontend incorporates a robust, modern Next.js folder architecture for maximum scalability and reusability. 
- **Next.js App Router:** Employs advanced Server React Components (RSC), enabling optimized server-side rendering while keeping client-side JavaScript minimal.
- **Component Pattern:** Maintains a clean separation between Page components and Reusable UI elements (`/components`).
- **Internationalization (i18n):** Native support for dynamic language switching.
- **Lib & Utils:** Modular structure ensuring business logic stays detached from the rendered UI components.

---

## ✨ Key Features

- **⚡ Blazing Fast Performance:** Utilizing Next.js Server Components and advanced caching for instant load times.
- **🎨 Premium UI/UX:** Built with Tailwind CSS and enhanced with buttery smooth micro-interactions via Framer Motion.
- **🌍 Built-in i18n:** Multi-language capabilities out of the box to accommodate a global user base.
- **🌤 Live Weather Integration:** Securely aggregates forecasting metrics directly from the OpenWeather API.
- **Responsive by Design:** Adapts effortlessly across all device breakpoints (Mobile, Tablet, Desktop).

---

## 📂 Folder Structure

```text
📦 sanjeevani-frontend/
 ┣ 📂 public/              # Static assets (images, icons, manifest files)
 ┣ 📂 src/
 ┃ ┣ 📂 app/               # Next.js App Router endpoints, layouts, and pages
 ┃ ┣ 📂 components/        # Reusable UI components (Buttons, Cards, Modals)
 ┃ ┣ 📂 context/           # React Context API providers for global state
 ┃ ┣ 📂 hooks/             # Custom React hooks (e.g., UI interactions, data fetching)
 ┃ ┣ 📂 i18n/              # Internationalization configurations and translation dictionaries
 ┃ ┗ 📂 lib/               # Utility functions, third-party integrations, and formatters
 ┣ 📜 .env.local           # Environment variables (Ignored by Git)
 ┣ 📜 package.json         # Project metadata and locked dependencies
 ┣ 📜 next.config.ts       # Next.js compiler and build configurations
 ┗ 📜 tailwind config      # Integrated through modern Tailwind v4 postcss configuration
```

---

## 🚀 Installation & Local Setup

**1. Clone the repository**
```bash
git clone https://github.com/<your-username>/sanjeevani-ai.git
```

**2. Navigate to the frontend workspace**
```bash
cd sanjeevani-ai/sanjeevani-frontend
```

**3. Install dependencies**
```bash
npm install
# or yarn / pnpm install
```

---

## 🔐 Environment Variables Setup

Create a `.env.local` file in the root of the frontend directory and insert the required properties:

```env
# OpenWeather Integration
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```
*(Important: Never commit your actual `.env.local` file. It is safely ignored by Git)*

---

## 🏃 Running the Project

Spin up the local development server:

```bash
npm run dev
# or yarn dev
```
Navigate to `http://localhost:3000` in your web browser.

---

## 🛠 Build Instructions

To build a heavily optimized, minified bundle for production testing locally:

```bash
npm run build
npm run start
```

---

## ☁️ Deployment Guide

This project is deployed effortlessly onto **Vercel** with zero-configuration required.

**Pushed Deployment (Automated):**
1. The repository is connected directly to Vercel.
2. Every push to the `main` branch automatically triggers a production build.
3. Vercel automatically detects the Next.js framework and configures the build settings (`npm run build`).

**Environment Variables handling in Production:**
- Ensure the `NEXT_PUBLIC_OPENWEATHER_API_KEY` is added under the environment variables section inside the project settings on the Vercel Dashboard.

---

## 📸 Screenshots

![Screenshot_26-2-2026_85420_sanjeevani-ai-frontend vercel app](https://github.com/user-attachments/assets/a0f05117-e6a9-4787-96d8-accde1624ccd)
![Screenshot_26-2-2026_85449_sanjeevani-ai-frontend vercel app](https://github.com/user-attachments/assets/92def247-e160-4126-9314-04a66f5104ef)
![Screenshot_26-2-2026_85512_sanjeevani-ai-frontend vercel app](https://github.com/user-attachments/assets/0bc033bb-c642-40a4-978a-d669951d79d8)



---

## ⚡ Performance Optimizations

- **Next.js Caching Strategies:** Heavy use of Next.js data cache and full route cache to decrease server execution times.
- **Dynamic Code Chunking:** Route-level code splitting ensures clients download only necessary payload data.
- **Font & Image Optimization:** Handled flawlessly utilizing Next.js `<Image />` and native next/font mechanisms to deter layout shifts (CLS).

---

## 🤝 Contributing Guide

Technical contributions are appreciated! To contribute:
1. **Fork** the repository.
2. **Create your feature branch:** `git checkout -b feature/IncredibleFeature`
3. **Commit your changes:** `git commit -m 'Add IncredibleFeature'`
4. **Push to the branch:** `git push origin feature/IncredibleFeature`
5. Open a **Pull Request**.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center"><i>Crafted with passion and clean code architecture.</i></p>
