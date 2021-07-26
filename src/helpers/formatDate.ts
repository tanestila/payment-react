import moment from "moment";

export const formatDateForTable = (date: string) => {
  return moment(date).format("DD.MM.YYYY  |  HH:mm");
};

export const formatDate = (date: string) => {
  return moment(date).format("D MMM YYYY");
};

export const formatDateForLabels = (date: Date) => {
  return moment(date).format("DD.MM");
};

export const daysForLabels = (since: moment.Moment, to: moment.Moment) => {
  let result = [moment(to).format("DD.MM")];
  let N = to.diff(since, "days");
  let d = to;
  for (let i = 0; i < Math.floor(N); i++) {
    d = moment(d).subtract(1, "days");
    result.unshift(moment(d).format("DD.MM"));
  }
  return result;
};
