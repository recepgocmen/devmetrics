<p align="center">
  <h1 align="center">⚡ DevMetrics</h1>
  <p align="center">
    <strong>Free, high-performance GitHub profile stats generator.</strong><br />
    Generate dynamic, beautiful SVG cards for your GitHub profile README in seconds.
  </p>
  <p align="center">
    <a href="https://devmetricsforgithub.vercel.app"><strong>Explore Live App »</strong></a>
  </p>
  <p align="center">
    <a href="https://github.com/recepgocmen/devmetrics/stargazers"><img src="https://img.shields.io/github/stars/recepgocmen/devmetrics?style=flat-square&color=3178c6" alt="Stars" /></a>
    <a href="https://github.com/recepgocmen/devmetrics/network/members"><img src="https://img.shields.io/github/forks/recepgocmen/devmetrics?style=flat-square&color=3178c6" alt="Forks" /></a>
    <a href="https://devmetricsforgithub.vercel.app"><img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status" /></a>
    <a href="https://github.com/recepgocmen/devmetrics/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  </p>
</p>

---

## 🌟 Highlights

- **Dynamic Stats Card** — Total stars, commits, PRs, issues, contributions, and algorithmic percentile rank.
- **Top Languages** — Visualize your coding breakdown with 4 distinct layout styles (`compact`, `normal`, `donut`, `pie`).
- **Repository Pin** — Showcase key repositories with live stars, forks, and language markers.
- **20+ Built-in Themes** — Tokyonight, Dracula, Nord, Catppuccin, Radical, Gruvbox, and more.
- **Deep Customization** — Custom hex colors, linear gradients, rounded corners, animation toggles, and line heights.
- **Edge Caching** — High-speed delivery with HTTP `stale-while-revalidate` and `Cache-Control` headers.
- **Zero Configuration Web UI** — Configure cards visually at [devmetricsforgithub.vercel.app](https://devmetricsforgithub.vercel.app).

---

## 📸 Live Previews

<p align="center">
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/stats?username=recepgocmen&theme=tokyonight&show_icons=true&hide_border=true" alt="DevMetrics Stats Card" />
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/top-langs?username=recepgocmen&theme=tokyonight&layout=compact&hide_border=true" alt="DevMetrics Top Languages" />
</p>

<p align="center">
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/pin?username=recepgocmen&repo=devmetrics&theme=tokyonight&hide_border=true" alt="DevMetrics Repo Pin" />
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/top-langs?username=recepgocmen&theme=tokyonight&layout=donut&hide_border=true" alt="DevMetrics Donut Languages" />
</p>

---

## 🚀 Quick Start

Copy and paste any of the snippets below into your profile `README.md`. Replace `YOUR_USERNAME` with your GitHub username:

### 1. Stats Card

```markdown
![GitHub Stats](https://devmetricsforgithub.vercel.app/api/stats?username=YOUR_USERNAME&theme=tokyonight&show_icons=true&hide_border=true)
```

### 2. Top Languages

```markdown
![Top Languages](https://devmetricsforgithub.vercel.app/api/top-langs?username=YOUR_USERNAME&theme=tokyonight&layout=compact&hide_border=true)
```

### 3. Repository Pin

```markdown
![Repo Pin](https://devmetricsforgithub.vercel.app/api/pin?username=YOUR_USERNAME&repo=REPO_NAME&theme=tokyonight&hide_border=true)
```

### 4. Side-by-Side Responsive Layout

```html
<p align="center">
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/stats?username=YOUR_USERNAME&theme=tokyonight&show_icons=true&hide_border=true" alt="GitHub Stats" />
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/top-langs?username=YOUR_USERNAME&theme=tokyonight&layout=compact&hide_border=true" alt="Top Languages" />
</p>
```

---

## 🎨 Available Themes

Choose from 20 curated themes out of the box:

| Theme Name | Theme Name | Theme Name | Theme Name |
| :--- | :--- | :--- | :--- |
| `tokyonight` *(default)* | `dracula` | `nord` | `radical` |
| `dark` | `monokai` | `gruvbox` | `cobalt` |
| `synthwave` | `catppuccin` | `midnight` | `ocean` |
| `sunset` | `forest` | `rose` | `ember` |
| `arctic` | `highcontrast` | `transparent` | `default` |

> Custom colors can also be provided directly via `bg_color`, `title_color`, `text_color`, `icon_color`, and `border_color` query parameters.

---

## ⚙️ API Reference

### 📊 `/api/stats`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | Your GitHub username |
| `theme` | `string` | `tokyonight` | One of the 20 built-in theme names |
| `show_icons` | `boolean` | `false` | Display icons beside each stat row |
| `hide_border` | `boolean` | `false` | Hide the outer card border |
| `hide_rank` | `boolean` | `false` | Hide the circular percentile rank score |
| `hide` | `string` | — | Comma-separated stats to hide: `stars,commits,prs,issues,contribs` |
| `custom_title` | `string` | — | Override default header title |
| `border_radius` | `number` | `4.5` | Corner radius of the card container |
| `line_height` | `number` | `30` | Vertical space between stat entries |
| `disable_animations` | `boolean` | `false` | Disable SVG CSS keyframe animations |
| `cache_seconds` | `number` | `14400` | CDN cache duration in seconds (min: `1800`) |

---

### 💻 `/api/top-langs`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | Your GitHub username |
| `theme` | `string` | `tokyonight` | One of the 20 built-in theme names |
| `layout` | `string` | `normal` | Layout mode: `compact`, `normal`, `donut`, `pie` |
| `langs_count` | `number` | `5` | Maximum number of languages to display |
| `hide` | `string` | — | Comma-separated language names to hide |
| `exclude_repo` | `string` | — | Comma-separated repository names to exclude |
| `hide_border` | `boolean` | `false` | Hide card border |
| `hide_title` | `boolean` | `false` | Hide card title |
| `custom_title` | `string` | — | Override default title |
| `cache_seconds` | `number` | `28800` | CDN cache duration in seconds (min: `1800`) |

---

### 📌 `/api/pin`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | Repository owner / organization |
| `repo` | `string` | **Required** | Repository name |
| `theme` | `string` | `tokyonight` | One of the 20 built-in theme names |
| `show_owner` | `boolean` | `false` | Display `owner/repo` instead of just `repo` |
| `hide_border` | `boolean` | `false` | Hide card border |
| `description_lines`| `number` | `2` | Maximum description lines before truncation |
| `cache_seconds` | `number` | `43200` | CDN cache duration in seconds (min: `1800`) |

---

## 🛠️ Self-Hosting & Local Development

### Deploy to Vercel

You can deploy your own instance of DevMetrics to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/recepgocmen/devmetrics)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/recepgocmen/devmetrics.git
   cd devmetrics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Generate a [GitHub Personal Access Token (classic)](https://github.com/settings/tokens/new?scopes=read:user) with the `read:user` scope and add it to `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere
   ```
   *(Multiple comma-separated tokens can be supplied for automatic load balancing and rate limit failover).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the interactive visual configurator.

---

## 🧰 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Source**: GitHub GraphQL API v4
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
