# faith-connect-frontend
This is FaithConnect Frontend Project

# FaithConnect Website - Frontend Developer Guide

Welcome to the **FaithConnect Website** project! This guide explains the project structure, dependencies, and development workflow so you can start contributing efficiently.

Repository: https://github.com/<YourOrg>/faithconnect-frontend

---

## 1️⃣ Setup Instructions

### Clone the repository
```bash
git clone https://github.com/<YourOrg>/faithconnect-frontend.git
cd faithconnect-frontend

Install pnpm
pnpm --version  # check if installed
npm install -g pnpm  # if not installed

Install project dependencies
pnpm install

Run the development server
pnpm dev


Open http://localhost:3000
 in your browser.

2️⃣ Project Structure
frontend/
├─ app/                          # Next.js App Router pages & layouts
│  ├─ layout.tsx                 # Root layout
│  ├─ page.tsx                   # Home page
│  ├─ sign-up/page.tsx           # Sign-up page
│  ├─ outstation/[slug]/page.tsx # Dynamic outstation pages
│  ├─ groups/[slug]/page.tsx     # Dynamic group pages
│  └─ announcements/page.tsx     # Announcements page
├─ components/                   # Reusable UI components
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ GroupCard.tsx
│  ├─ OutstationCard.tsx
│  └─ AnnouncementCard.tsx
├─ public/                        # Static assets (images, fonts, favicon)
├─ styles/                        # Global CSS / Tailwind setup
├─ utils/                          # Helper functions and API utils
├─ package.json
├─ pnpm-lock.yaml                  # Project lock file (do not remove)
├─ tsconfig.json                   # TypeScript configuration
├─ next.config.js
└─ README.md


Notes:

Shared components go in components/.

Each route has its own folder in app/.

node_modules/ is managed by pnpm and should not be committed.

3️⃣ Branching Workflow

Create a feature branch locally from your department branch:

git checkout -b <feature-name> frontend


(Replace frontend with backend if needed)

Push the branch:

git push origin <feature-name>


Open a Pull Request (PR) targeting your department branch (frontend or backend).

Do not PR directly to devs or main.

Keep PRs focused on a single feature.

After approval, your feature branch merges into the department branch.

Department branches later merge into devs → main.

4️⃣ Best Practices

Always pull the latest changes before starting a new feature:

git checkout frontend
git pull origin frontend
git checkout -b new-feature


Use pnpm commands exclusively:

pnpm install → install dependencies

pnpm dev → run development server

pnpm add <package> → install new package

Follow TypeScript and Next.js coding standards.

Use App Router layouts (layout.tsx) for consistent Navbar/Footer.

Dynamic routing: [slug] pages fetch data from backend APIs.

Keep components reusable and modular.