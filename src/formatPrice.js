export default (price) => {
  const [int, fr] = price.toString().split(".");
  let result = "";
  const maxIndex = int.length - 1;
  for (let i = maxIndex; i >= 0; i -= 1) {
    if (i !== maxIndex && (maxIndex - i) % 3 === 0) {
      result = int[i] + " " + result;
    } else {
      result = int[i] + result;
    }
  }
  if (fr) {
    return [result, fr].join(".");
  }
  return result;
};
