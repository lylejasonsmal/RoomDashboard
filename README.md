# Vue Template

A stripped Vue 3 + Vite starter: header, footer, base page template, router and the shared
Material Symbols icon component. No business content — copy the folder and build on it.

## Starting a new project from this template

1. Copy the whole folder to a new location.
2. `web_configuration.js` — set `appName`. It drives the `<title>` on every page via `BasePageTemplate`.
3. `package.json` — set `name`. `version` is what the footer displays.
4. `index.html` — set the fallback `<title>`.
5. `vite.config.js` — set `base` if deploying to a sub-path (e.g. GitHub Pages: `/my-repo/`).
6. `src/assets/logo.svg` — replace with your logo.
7. `src/assets/base.css` — set `--primary-black`, `--accent` etc.

## What's in here

| Piece | File |
|---|---|
| App shell (header / router-view / footer) | `src/App.vue` |
| Site header, route-driven nav, mobile hamburger menu | `src/components/HeaderComponent.vue` |
| Site footer, route-driven nav, version number | `src/components/FooterComponent.vue` |
| Material Symbols icon wrapper | `src/components/Commonly Used/MaterialDesignIcon.vue` |
| Page wrapper that sets `document.title` | `src/views/Base/BasePageTemplate.vue` |
| Routes | `src/router/index.js` |
| 404 page | `src/views/PageNotFound.vue` |
| CSS variables, typography, base element styles | `src/assets/base.css` |
| Layout (`main`, `.page`) | `src/assets/main.css` |

### Adding a page

Add the view under `src/views/`, wrap it in `BasePageTemplate`, then register it in
`src/router/index.js`. The `meta` block is what the nav components read:

```js
{
  path: '/about-us',
  name: 'About Us',
  component: AboutUsPage,
  meta: {
    icon: 'diversity_1',   // Material Symbols name, used by the mobile menu
    category: 'basic'      // 'basic' -> shown in header + footer nav, anything else -> hidden
  }
}
```

Nothing else needs touching — both nav bars are built by filtering `router.getRoutes()` on
`meta.category === 'basic'`.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Deploy to GitHub Pages

Set `base` in `vite.config.js` to `/<repo-name>/` first, then:

```sh
npm run deploy
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
