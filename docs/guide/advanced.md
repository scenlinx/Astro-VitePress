---
title: 高级用法
description: VitePress 高级功能和自定义配置技巧
keywords: VitePress, 高级, 自定义, 主题, 插件
date: '2026-05-31'
order: 2
---

# 高级用法

深入了解 VitePress 的高级功能。

## 自定义主题

创建自定义主题来改变网站外观：

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
  }
}
```

## 使用 Vue 组件

在 markdown 中直接使用 Vue 组件：

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
```

## 构建优化

配置构建选项以优化输出：

```js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {}
      }
    }
  }
}
```
