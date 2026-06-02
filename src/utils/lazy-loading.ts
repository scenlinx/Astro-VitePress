// 图片懒加载增强
export function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    if (import.meta.env.DEV) console.log('✅ 浏览器支持原生懒加载');
    return;
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.add('loaded');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
  
  if (import.meta.env.DEV) console.log('🔄 使用IntersectionObserver实现懒加载');
}

// 客户端初始化 - 使用 typeof window 检查避免SSR问题
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
  } else {
    initLazyLoading();
  }
}