<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/banner-light.svg">
  <img alt="Abdulkareem Alzriqat — Full-stack engineer, TypeScript, multi-tenant SaaS" src="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/banner-light.svg">
</picture>

I build production SaaS end to end — schema and access control, backend functions, web app, and the mobile client that talks to the same API. Most of my current work is TypeScript: Next.js on the web, React Native on mobile, and reactive or REST backends behind both.

I care about the parts that are hard to retrofit: tenant isolation enforced server-side, money handled with double-entry rather than a `balance` column, and tests that fail before the fix.

**Open to full-stack engineering roles.**

---

### Stack

<!-- Each row must stay on ONE line: GitHub turns a newline between badges into a
     <br>, which stacks them into a vertical column instead of a flowing row. -->

**Languages & clients** &nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-1f2328?style=flat-square&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-1f2328?style=flat-square&logo=javascript&logoColor=white) ![React](https://img.shields.io/badge/React-1f2328?style=flat-square&logo=react&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-1f2328?style=flat-square&logo=nextdotjs&logoColor=white) ![React Native](https://img.shields.io/badge/React_Native-1f2328?style=flat-square&logo=react&logoColor=white) ![Expo](https://img.shields.io/badge/Expo-1f2328?style=flat-square&logo=expo&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-1f2328?style=flat-square&logo=tailwindcss&logoColor=white)

**Backend & data** &nbsp;
![Node.js](https://img.shields.io/badge/Node.js-1f2328?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-1f2328?style=flat-square&logo=express&logoColor=white) ![Convex](https://img.shields.io/badge/Convex-1f2328?style=flat-square&logo=convex&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-1f2328?style=flat-square&logo=mongodb&logoColor=white) ![Clerk](https://img.shields.io/badge/Clerk-1f2328?style=flat-square&logo=clerk&logoColor=white)

**Testing & delivery** &nbsp;
![Vitest](https://img.shields.io/badge/Vitest-1f2328?style=flat-square&logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-1f2328?style=flat-square&logo=playwright&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-1f2328?style=flat-square&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-1f2328?style=flat-square&logo=vercel&logoColor=white)

---

## Selected work

### AutoFlow — an operating system for car dealerships

A multi-tenant platform that runs a dealership end to end: inventory, sales and financing, double-entry accounting, staff and permissions, and a cross-dealer marketplace. Bilingual English/Arabic with full RTL, on web and mobile.

- **Tenancy is enforced in the backend, not the client.** Every row is org-scoped and every mutation re-derives the caller's org and re-checks the row it is about to write — the client's idea of "current org" is a convenience, never the control.
- **Real accounting.** A general ledger with double-entry postings and subledgers, not a running total on a record.
- **Approval workflows** for vehicle edits, status changes, and below-minimum-profit sales.
- **One API, three clients** — Next.js web, an Expo/React Native app, and edge routes sharing a type-safe schema.

`Next.js 16` · `Convex` · `Clerk` · `React Native / Expo` · `Tailwind` · `TypeScript` · `Vitest` · `Playwright`

[**→ Repository**](https://github.com/aalzriqat/Auto)

### SmartSwap — shift swapping with multi-hop chains

A scheduling platform for shift-based workplaces. Employees request to swap shifts and the engine ranks the best partners by skills, availability, and preferences — and when no direct 1:1 swap exists, it finds **circular chains** (A → B → C → A) that satisfy everyone at once. Managers get oversight, approvals, and analytics.

`React` · `TypeScript` · `Node.js` · `Express` · `MongoDB` · `JWT` · `Vercel`

[**→ Live demo**](https://smartswap-web.vercel.app) · [**Web repo**](https://github.com/aalzriqat/smartswap-scheduler) · [**API repo**](https://github.com/aalzriqat/backend) · [**Live API**](https://smartswap-api.vercel.app)

> Demo login — `employee@smartswap.app` or `manager@smartswap.app`, password `password123`

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/stats-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/stats-light.svg">
  <img alt="Contribution and language statistics" src="https://raw.githubusercontent.com/aalzriqat/aalzriqat/main/assets/stats-light.svg">
</picture>

<sub>Generated from the GitHub API by <a href="scripts/build-stats.mjs"><code>scripts/build-stats.mjs</code></a> and refreshed daily by <a href=".github/workflows/stats.yml">a scheduled workflow</a> — no third-party card service, so it cannot break when someone else's free tier goes down.</sub>

---

### Elsewhere

[![LinkedIn](https://img.shields.io/badge/LinkedIn-1f2328?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aalzriqat/) [![Email](https://img.shields.io/badge/aalzriqat@gmail.com-1f2328?style=flat-square&logo=gmail&logoColor=white)](mailto:aalzriqat@gmail.com)
