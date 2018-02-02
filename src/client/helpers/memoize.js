const defaultEqualityCheck = (a, b) => a === b;

const areArgumentsShallowlyEqual = (equalityCheck, prev, next) => {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
};

/**
 * Memoizes the last function call result. If all arguments match, the previous
 * result will be returned instead of calling the memoized function again.
 *
 * Should only be used for pure functions.
 *
 * @param {function} func The function to be memoized
 * @param {function} [equalityCheck] A custom equality checker
 * @return {function} The memoized function
 */
const memoize = (func, equalityCheck = defaultEqualityCheck) => {
  let lastArgs = null;
  let lastResult = null;

  return function() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
};
export default memoize;
