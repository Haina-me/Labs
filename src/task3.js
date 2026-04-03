function sum(a, b) {
  console.log(`${a}+${b}`);
  return a + b;
}

function options(strategyType, size, timeToLive) {
  return {
    strategy: strategyType,
    maxSize: size,
    ttl: timeToLive,
  };
}

function memoized(fnIN, options) {

  const cache = new Map();

  return function (...args) {

    const key = JSON.stringify(args);

    if (cache.has(key)) {

      const cacheEntry = cache.get(key);

      if (options.ttl && Date.now() - cacheEntry.createdAt > options.ttl) {
        cache.delete(key);
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

    if (options.maxSize && cache.size >= options.maxSize) {

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

      value: result,
      createdAt: Date.now(),
      lastAccessed: Date.now(),
      accessCount: 1,
    });

    return result;
  };
}

const myOptions = options("LRU", 3, 5000);
const memoizedSum = memoized(sum, myOptions);

console.log(memoizedSum(1, 2));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(6, 7));
console.log(memoizedSum(8, 9));

const lfuOpts = options("LFU", 2, 10000);
const memoLFU = memoized(sum, lfuOpts);

memoLFU(10, 10);
memoLFU(10, 10);
memoLFU(20, 20);
memoLFU(10, 10);
memoLFU(30, 30);
memoLFU(40, 40);
memoLFU(40, 40);