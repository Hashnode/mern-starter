/**
 * Throw an array to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
export function sequence(items, consumer) {
  const results = [];
  const runner = () => {
    const item = items.pop();
    if (item) {
      return consumer(item)
        .then(result =>
          results.unshift(result))
        .then(runner);
    }

    return Promise.resolve(results);
  };

  return runner();
}
