---
layout: ../layouts/MainLayout.astro
title: Configuration
---

# Configuration

Learn how to configure your VitePress site.

## Site Config

The main configuration file is `vitepress.config.js`:

```js
export default {
  // Site title
  title: 'My Site',
  
  // Site description for SEO
  description: 'A VitePress site',
  
  // Theme configuration
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],
    sidebar: [
      { text: 'Getting Started', link: '/guide' }
    ]
  }
}
```

## Theme Config

Customize the appearance of your site:

```js
themeConfig: {
  logo: '/logo.svg',
  search: {
    provider: 'local'
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com' }
  ]
}
```

## Frontmatter

Configure individual pages with frontmatter:

```yaml
---
title: Page Title
description: Page description
sidebar: false
---
```

## Markdown Options

Configure markdown parsing:

```js
markdown: {
  theme: 'github-dark',
  lineNumbers: true
}
```
