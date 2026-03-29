# DevMetrics

Free GitHub profile stats generator. Generate beautiful, dynamic SVG cards for your GitHub profile README.

**Live at [devmetricsforgithub.vercel.app](https://devmetricsforgithub.vercel.app)**

## Usage

Add these to your GitHub profile `README.md` — just replace `YOUR_USERNAME` with your GitHub username:

### Stats Card

```markdown
![GitHub Stats](https://devmetricsforgithub.vercel.app/api/stats?username=YOUR_USERNAME&theme=tokyonight&show_icons=true&hide_border=true)
```

### Top Languages

```markdown
![Top Languages](https://devmetricsforgithub.vercel.app/api/top-langs?username=YOUR_USERNAME&theme=tokyonight&layout=compact&hide_border=true)
```

### Repo Pin

```markdown
![Repo Card](https://devmetricsforgithub.vercel.app/api/pin?username=YOUR_USERNAME&repo=REPO_NAME&theme=tokyonight&hide_border=true)
```

### Side by Side Layout

```markdown
<p>
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/stats?username=YOUR_USERNAME&theme=tokyonight&show_icons=true&hide_border=true" />
  <img width="48%" src="https://devmetricsforgithub.vercel.app/api/top-langs?username=YOUR_USERNAME&theme=tokyonight&layout=compact&hide_border=true" />
</p>
```

## Live Examples

![Stats](https://devmetricsforgithub.vercel.app/api/stats?username=recepgocmen&theme=tokyonight&show_icons=true&hide_border=true)

![Top Languages](https://devmetricsforgithub.vercel.app/api/top-langs?username=recepgocmen&theme=tokyonight&layout=compact&hide_border=true)

## Features

- **Stats Card** — Total stars, commits, PRs, issues, rank
- **Top Languages** — Most used programming languages with 4 layout options (normal, compact, donut, pie)
- **Repo Pin** — Showcase specific repositories
- **20 Built-in Themes** — tokyonight, dracula, nord, radical, and more
- **Fully Customizable** — Colors, borders, animations, titles
- **Edge Cached** — Fast responses with configurable cache

## Available Themes

`default` `dark` `radical` `tokyonight` `dracula` `nord` `gruvbox` `monokai` `cobalt` `synthwave` `midnight` `ocean` `sunset` `forest` `rose` `highcontrast` `transparent` `catppuccin` `ember` `arctic`

## API Reference

### `/api/stats`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `username` | Yes | GitHub username |
| `theme` | No | Theme name (default: `default`) |
| `show_icons` | No | Show icons (default: `false`) |
| `hide_border` | No | Hide border (default: `false`) |
| `hide_rank` | No | Hide rank circle (default: `false`) |
| `hide` | No | Comma-separated stats to hide: `stars,commits,prs,issues,contribs` |
| `custom_title` | No | Custom card title |
| `title_color` | No | Title hex color (without `#`) |
| `text_color` | No | Text hex color |
| `icon_color` | No | Icon hex color |
| `bg_color` | No | Background hex or gradient: `angle,color1,color2` |
| `border_color` | No | Border hex color |
| `ring_color` | No | Rank ring hex color |
| `border_radius` | No | Border radius in px |
| `line_height` | No | Line height between stat rows |
| `cache_seconds` | No | Cache duration (min: 1800, default: 14400) |
| `disable_animations` | No | Disable animations |

### `/api/top-langs`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `username` | Yes | GitHub username |
| `theme` | No | Theme name |
| `layout` | No | `normal`, `compact`, `donut`, or `pie` |
| `langs_count` | No | Languages to show (default: 5) |
| `hide` | No | Comma-separated languages to hide |
| `exclude_repo` | No | Comma-separated repos to exclude |
| `hide_border` | No | Hide border |
| `cache_seconds` | No | Cache duration (min: 1800, default: 28800) |

### `/api/pin`

| Parameter | Required | Description |
|-----------|----------|-------------|
| `username` | Yes | Repository owner |
| `repo` | Yes | Repository name |
| `theme` | No | Theme name |
| `show_owner` | No | Show owner prefix |
| `hide_border` | No | Hide border |
| `description_lines` | No | Description lines (default: 2) |
| `cache_seconds` | No | Cache duration (min: 1800, default: 43200) |

## Self-Hosting

Want to run your own instance? Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/recepgocmen/devmetrics)

Or run locally:

```bash
git clone https://github.com/recepgocmen/devmetrics.git
cd devmetrics
npm install
cp .env.example .env.local
# Add your GITHUB_TOKEN to .env.local
npm run dev
```

Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new?scopes=read:user) with `read:user` scope and add it as `GITHUB_TOKEN`.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS** for landing page
- **GitHub GraphQL API** for data
- **Vercel** for deployment

## License

MIT
