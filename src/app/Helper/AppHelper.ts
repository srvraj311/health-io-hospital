export default class AppHelper {

  static getCurrentFormattedDate() {
    let today: Date = new Date();
    let dd: number = today.getDate();
    let mm: number = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let date = dd.toString();
    if (dd < 10) {
      date = '0' + dd;
    }
    let month: string = mm.toString();
    if (mm < 10) {
      month = '0' + mm;
    }

    return dd + '-' + month + '-' + yyyy;
  }

  // Compare two formatted date strings
  static compareFormattedDates(date1: string, date2: string) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return d1.getTime() - d2.getTime();
  }

  // Check if first date is less than second date
  static isDate1LessThanDate2(date1: string, date2: string) {
    return AppHelper.compareFormattedDates(date1, date2) < 0;
  }

  // Check if first date is greater than second date
  static isDate1GreaterThanDate2(date1: string, date2: string) {
    return AppHelper.compareFormattedDates(date1, date2) > 0;
  }
  // Check if first date is equal to second date
  static isDate1EqualToDate2(date1: string, date2: string) {
    return AppHelper.compareFormattedDates(date1, date2) == 0;
  }

  // get formatted time and date in HH:mm:ss dd-MM-yyyy format
  static getCurrentFormattedTimeAndDate() {
    let today: Date = new Date();
    let hh: number = today.getHours();
    let mm: number = today.getMinutes();
    let ss: number = today.getSeconds();
    let dd: number = today.getDate();
    let mm1: number = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let date = dd.toString();
    if (dd < 10) {
      date = '0' + dd;
    }
    let month: string = mm1.toString();
    if (mm1 < 10) {
      month = '0' + mm1;
    }
    let hour: string = hh.toString();
    if (hh < 10) {
      hour = '0' + hh;
    }
    let minute: string = mm.toString();
    if (mm < 10) {
      minute = '0' + mm;
    }
    let second: string = ss.toString();
    if (ss < 10) {
      second = '0' + ss;
    }
    return hour + ':' + minute + ':' + second + ' ' + date + '-' + month + '-' + yyyy;
  }

  // Compare formatted date and time
  static compareFormattedDateAndTime(date1: string, date2: string) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return d1.getTime() - d2.getTime();
  }

}
