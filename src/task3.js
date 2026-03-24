function memoized(fnIN) {

    const cache = new Map();

    return function (...args) { //повертаємо нову функцію при виклику memoized(sum);

        const key = JSON.stringify(args); //створюємо ключ на основі аргументів

        if (cache.has(key)) { // якщо є кешоване значення для цього ключа

            const cacheEntry = cache.get(key); // отримуємо кешоване значення
            cacheEntry.lastAccessed = Date.now();
            cacheEntry.accessCount += 1;
            return cacheEntry.value;

        }

        const result = fnIN(...args);

        cache.set(key, { // зберігаємо результат у кеші

            value: result,
            createdAt: Date.now(),
            lastAccessed: Date.now(),
            accessCount: 1

        });

        return result;



    }
}


function sum(a, b) {
    return a + b;
}

const memoizedSum = memoized(sum);
memoizedSum(1, 2);

/*cache.has(key)      // чи є такий ключ
cache.get(key)      // дістати значення
cache.delete(key)   // видалити*/