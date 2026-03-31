function memoized(fnIN, options) {

  const cache = new Map();

  return function (...args) {
    //повертаємо нову функцію при виклику memoized(sum);
    const key = JSON.stringify(args); //створюємо ключ на основі аргументів

    if (cache.has(key)) {
      // якщо є кешоване значення для цього ключа
      const cacheEntry = cache.get(key); // отримуємо кешоване значення

      if (options.ttl && Date.now() - cacheEntry.createdAt > options.ttl) {
        cache.delete(key); //видаляє запис, якщо він перебуває в кеші довше, ніж дозволено. (Time-Based Expiry)
      } else {

        if (options.strategy === "LRU") {
          cache.delete(key); 
          cache.set(key, cacheEntry);
        }

        cacheEntry.lastAccessed = Date.now();
        cacheEntry.accessCount += 1;
        return cacheEntry.value;
      }
    }

    if (options.maxSize && cache.size >= options.maxSize){

      if (options.strategy === 'LRU') {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      else if (options.strategy === 'LFU') {
        let minKey = null;
        let minCount = Infinity;
        for (const [kay, value] of cache) {
          if (value.accessCount < minCount) {
            minCount = value.accessCount;
            minKey = kay;
          }
        }
        cache.delete(minKey);

      } else if (typeof options.strategy === "function") {
        const keyToDelete = options.strategy(cache);
        if (keyToDelete) cache.delete(keyToDelete);
      }

    }

    const result = fnIN(...args);

    cache.set(key, {
      // зберігаємо результат у кеші
      value: result,
      createdAt: Date.now(),
      lastAccessed: Date.now(),
      accessCount: 1,
    });

    return result;
  };
}

function options(strategyType, size, timeToLive) {
  return {
    strategy: strategyType,
    maxSize: size,
    ttl: timeToLive,
  };
}

const myOptions = options("LRU", 3, 5000); // обираємо політику LRU, LFU, TTL

function sum(a, b) {
  return a + b;
}

const memoizedSum = memoized(sum, myOptions);
memoizedSum(1, 2);

/*cache.has(key)      // чи є такий ключ
cache.get(key)      // дістати значення
cache.delete(key)   // видалити*/
