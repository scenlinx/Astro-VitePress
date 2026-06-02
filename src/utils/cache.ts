export class DocsCache {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static readonly TTL = 5 * 60 * 1000;
  
  static async getOrCompute(key: string, compute: () => Promise<any>) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      if (import.meta.env.DEV) console.log(`✅ 缓存命中: ${key}`);
      return cached.data;
    }
    
    if (import.meta.env.DEV) console.log(`🔄 缓存未命中，计算中: ${key}`);
    const result = await compute();
    this.cache.set(key, { data: result, timestamp: Date.now() });
    return result;
  }
  
  static clear() {
    this.cache.clear();
    if (import.meta.env.DEV) console.log('🗑️ 缓存已清除');
  }
  
  static has(key: string): boolean {
    return this.cache.has(key);
  }
  
  static clearExpired() {
    const now = Date.now();
    let cleared = 0;
    this.cache.forEach((value, key) => {
      if (now - value.timestamp >= this.TTL) {
        this.cache.delete(key);
        cleared++;
      }
    });
    if (cleared > 0 && import.meta.env.DEV) {
      console.log(`🗑️ 清除了 ${cleared} 个过期缓存`);
    }
  }
}
