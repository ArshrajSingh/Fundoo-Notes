import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  events = new EventEmitter();

  @Input('note') note;


  time = new FormControl('', []);
  date = new FormControl('', []);

  constructor(private noteSvc: NoteService ) {
  }

  ngOnInit() {
  }


  showTime() {
    const reminder = this.dateFormat(this.date.value) + 'T' + this.timeFormat(this.time.value);
    console.log(reminder);
    this.addReminder(reminder);
  }

  dateFormat(date: Date) {
    const givenDate = new Date(date);
    const selectedDate = givenDate.getFullYear() + '-' + (1 + givenDate.getMonth()) + '-' +
      (givenDate.getDate().toString().length > 1 ? givenDate.getDate() : '0' + givenDate.getDate());
    return selectedDate;
  }

  timeFormat(time) {
    let hours = time.split(' ')[0].split(':')[0];
    const minutes = time.split(' ')[0].split(':')[1];
    const amPm = time.split(' ')[1];
    if (hours.length < 2) { hours = '0' + hours; }
    if (amPm === 'PM') {
      if (parseInt(hours) < 12) { hours = parseInt(hours) + 12; }
    } else {
      if (parseInt(hours) === 24) { hours = '00'; }
    }
    return (hours + ':' + minutes);
  }

  addReminder(reminder) {
    console.log(this.note);
    this.noteSvc.addReminder({
      noteIdList: [this.note.id],
      reminder: reminder
    });
  }
}
