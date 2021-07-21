export const formatNumber = (number: number | string, precision = 2) => {
  let num = number.toString();
  let index = num.indexOf(".") !== -1 ? num.indexOf(".") : num.indexOf(",");
  return index === -1 ? num : num.slice(0, index + precision + 1);
};

export const roundMultiplyNumber = (number: number | string, precision = 2) => {
  let pow = Math.pow(10, precision);
  return Math.round(+number * pow);
};

export const roundDivisionNumber = (number: number | string, precision = 2) => {
  let pow = Math.pow(10, precision);
  return +number / pow;
};
