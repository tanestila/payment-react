import moment from "moment";

export const formatDateForTable = (date: string) => {
  return moment(date).utcOffset(0).format("DD.MM.YYYY  |  HH:mm");
};

export const formatDate = (date: string) => {
  return moment(date).utcOffset(0).format("D MMM YYYY");
};

const daysBetweenTwoDates = (date1: number, date2: number) => {
  return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
};

export const formatDateForLabels = (date: Date) => {
  return moment(date).format("DD.MM");
};

export const daysForLabels = (since: Date, to: Date) => {
  let result = [moment(to).format("DD.MM")];
  let N = daysBetweenTwoDates(since.setHours(0), to.setHours(0));
  let d = to;
  for (let i = 0; i < Math.floor(N); i++) {
    d.setDate(d.getDate() - 1);
    result.unshift(formatDateForLabels(d));
  }
  return result;
};
