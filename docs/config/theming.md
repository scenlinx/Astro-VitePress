---
title: 主题配置
description: Astro-VitePress 主题配置指南，包括 CSS 变量、暗色模式和品牌定制
keywords: Astro-VitePress, 主题, CSS, 暗色模式, 定制
date: '2026-06-02'
order: 2
---

# 主题配置

自定义网站外观和风格。

## CSS 变量

所有颜色和尺寸通过 CSS 变量控制，编辑 `src/styles/global.css`：

```css
:root {
  /* 品牌色 */
  --primary-color: #646cff;
  --gradient-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* 背景 */
  --bg-color: #ffffff;
  --sidebar-bg: #f8fafc;

  /* 文字 */
  --text-color: #213547;
  --text-color-light: #64748b;

  /* 边框 */
  --border-color: #e2e8f0;
}
```

### 暗色模式

在 `.dark` 选择器中覆盖对应变量：

```css
.dark {
  --bg-color: #11151c;
  --sidebar-bg: #0d101a;
  --text-color: #e2e8f0;
  --border-color: #232a33;
}
```

### 品牌渐变

首页 Hero 标题使用渐变色，修改 `--gradient-brand` 即可：

```css
--gradient-brand: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 主题切换

主题模式自动遵循 `prefers-color-scheme` 系统设置，并持久化到 `localStorage`。用户手动切换后，设置会覆盖系统偏好。`ThemeInit.astro` 中的内联脚本确保页面加载时无闪烁。

## 响应式布局

网站在三个断点表现不同：

| 断点 | 布局 |
|------|------|
| > 1024px | 三栏布局（侧边栏 + 内容 + TOC） |
| 768px - 1024px | 两栏布局（侧边栏 + 内容） |
| < 768px | 单栏布局，抽屉式导航，浮动搜索按钮 |

## 打印样式

打印页面时自动隐藏导航栏、侧边栏、TOC 和浮动按钮，只保留内容主体。
