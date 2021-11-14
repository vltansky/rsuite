export const precisionMath = value => parseFloat(value.toFixed(10));

export const checkValue = (value: number | undefined, min: number, max: number) => {
  if (typeof value === 'undefined') {
    return value;
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};
