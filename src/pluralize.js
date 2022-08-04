const ruPluralize = (count) => {
  const countStr = count.toString();
  const countLength = countStr.length;
  const teenCheck = countLength >= 2
    ? Number(countStr[countLength - 2] + countStr[countLength - 1])
    : count;
  console.log(teenCheck);
  const teen = teenCheck > 10 && teenCheck < 20;
  const endsWithOne = count % 10 === 1;
  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && count % 10 >= 2 && count % 10 <= 4) {
    return 2;
  }
  return 3;
};

export default ruPluralize;
