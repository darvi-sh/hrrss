// custom map
Array.prototype.map = function (fn) {
  // todo: check if `this` is enumerable / array
  if (!fn || typeof fn !== "function") {
    throw new TypeError("function is not provided");
  }

  const o = Object(this);

  const Arr = [];

  for (const item of o) {
    Arr.push(fn(item));
  }

  return Arr;
};

const mapped = [1, 2, 3].map((item) => item + item); // [2, 4, 6]

// custom filter
Array.prototype.filter = function (fn) {
  // todo: check if `this` is enumerable / array
  if (!fn || typeof fn !== "function") {
    throw new TypeError("function is not provided");
  }

  const o = Object(this);

  const Arr = [];

  for (const item of o) {
    fn(item) && Arr.push(item);
  }

  return Arr;
};

const filtered = [1, 2, 2, 3].filter((item) => item === 2); // [2, 2]

// custom reduce
Object.defineProperty(Array.prototype, "reduce2", {
  value: function (callbackFn, initialValue) {
    if (!callbackFn || typeof callbackFn !== "function") {
      throw new TypeError("function is not provided");
    }

    const o = Object(this);

    // throw error if gathered arguments are less than 2
    if (o.length < (1 + initialValue ? 1 : 0)) {
      throw new TypeError("cannot reduce a single item further");
    }

    let value;
    let nextCursor = 0;

    // todo: max length boundary control; o.length

    if (initialValue) {
      value = initialValue;
    } else {
      value = o[0];
      nextCursor++;
    }

    while (nextCursor < o.length) {
      value = callbackFn(value, o[nextCursor], nextCursor, o);
      nextCursor++;
    }

    return value;
  },
});

const reduced = [1, 2, 2, 3].reduce2(
  (accumulator, currentValue, currentIndex, source) =>
    accumulator + currentValue,
  7
); // 15
