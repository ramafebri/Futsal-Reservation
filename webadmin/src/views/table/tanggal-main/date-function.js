import moment from 'moment-timezone';

const convertTimeZone = (date) => {
  const format = 'YYYY-MM-DD';
  return moment.tz(date, 'Asia/Jakarta').format(format);
};

export const DifferenceDay = (dateStart, dateEnd) => {
  var date1 = new Date(dateStart);
  var date2 = new Date(dateEnd);
   
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
   
  // To calculate the no. of days between two dates
  return Difference_In_Time / (1000 * 3600 * 24);
};

export default convertTimeZone;
