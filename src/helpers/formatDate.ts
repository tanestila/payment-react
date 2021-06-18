import moment from "moment";

export const formatDateForTable = (date: string) => {
  return moment(date).utcOffset(0).format("DD.MM.YYYY  |  HH:mm");
};

export const formatDate = (date: string) => {
  return moment(date).utcOffset(0).format("D MMM YYYY");
};
