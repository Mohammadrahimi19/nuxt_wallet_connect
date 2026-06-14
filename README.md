# Nuxt 4 Web3 Best Practices

A production-ready Nuxt 4 boilerplate demonstrating modern frontend architecture, Web3 wallet integration, state management patterns, internationalization, data fetching strategies, and scalable project organization.

## 🚀 Live Demo

https://rahimi-nuxt-wallet-connect-beta.vercel.app/

---

## 📖 Overview

This project serves as a reference implementation for building scalable Web3 applications with Nuxt 4.

It showcases modern development practices including:

- Wallet connection with Reown AppKit
- Multi-chain support
- Internationalization (i18n)
- Reusable composables and components
- Modern UI development with Nuxt UI and Tailwind CSS
- Type-safe development using TypeScript

---

## ✨ Features

### Web3

- WalletConnect integration
- MetaMask support
- Multi-chain architecture
- Ethers.js integration
- Viem integration
- Wagmi integration
- Account and network management

### Nuxt

- Nuxt 4 architecture
- Server-side rendering
- Auto-imports
- Runtime configuration

### Developer Experience

- TypeScript support
- Clean folder structure
- Reusable composables
- Environment-based configuration
- Scalable architecture

### UI & UX

- Nuxt UI
- Tailwind CSS v4
- Responsive layouts
- Toast notifications with IziToast

### Data Management

- TanStack Query
- Query caching
- API abstraction patterns
- Request lifecycle management

### Internationalization

- Multi-language support
- Localized routes
- Translation management

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Nuxt 4 |
| Language | TypeScript |
| UI | Nuxt UI |
| Styling | Tailwind CSS v4 |
| State & Queries | TanStack Query |
| Web3 | Wagmi |
| Wallet Connection | Reown AppKit |
| Blockchain | Ethers.js |
| Blockchain | Viem |
| Routing | Vue Router |
| SEO | Unhead |
| i18n | Nuxt i18n |
| Notifications | IziToast |
| Database | Better SQLite3 |

---

## 📂 Project Structure

```txt
app/
├── assets/
├── components/
├── composables/
├── pages/
├── plugins/
├── config/
├── stores/
├── utils/
├── locales/


public/


types/
## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
