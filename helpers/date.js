exports.addDays = (days, date = new Date()) => {
  date.setDate(date.getDate() + days);
  return date;
};
