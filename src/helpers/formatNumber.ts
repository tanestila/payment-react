export const formatNumber = (number, precision = 2) => {
  let num = number.toString();
  let index = num.indexOf(".") !== -1 ? num.indexOf(".") : num.indexOf(",");
  return index === -1 ? num : num.slice(0, index + precision + 1);
};

export const roundMultiplyNumber = (number) => {
  return Math.round(+number * 100);
};

export const roundDivisionNumber = (number) => {
  return Math.round(+number / 100);
};
