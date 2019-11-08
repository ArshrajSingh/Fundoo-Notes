import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDatePipe'
})

export class MyDatePipePipe implements PipeTransform {
  hours: any;

  transform(value: any): any {
    const givenDate = new Date(value);
    const today = new Date();

    if (isSameDay(givenDate, today)) { return "today" + formatTime(givenDate); }
    else if (isTomorrow(givenDate, today)) { return "tomorrow" + formatTime(givenDate); }

    return value;
  }
}



function isSameDay(d1, d2) {
  return (d1.getDay() == d2.getDay() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getYear() == d2.getYear());
}

function isTomorrow(d1, d2) {
  d1.setDate(d1.getDate() - 1);
  return (d1.getDay() == d2.getDay() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getYear() == d2.getYear());
}



function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutess = minutes < 10 ? '0' + minutes : minutes;
  const strTime = '\n' + (parseInt(this.hours) - 5).toString() + ':' + minutess + ' ' + ampm;
  return strTime;
}
