import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-show-labels',
  templateUrl: './show-reminder.component.html',
  styleUrls: ['./show-reminder.component.scss']
})
export class ShowReminderComponent implements OnInit {
  array: any;
  events = new EventEmitter();
  noteColor = new FormControl('#FFFFFF');
  notesView: Boolean = true;

  constructor(private usvc: UserServiceService, private route: ActivatedRoute , private svc: NoteService) {
  }

  ngOnInit() {
    this.svc.viewInfo.subscribe((data) => {
      this.notesView = data;
      this.getReminderNotes();
    });

  }
  getReminderNotes() {
    const obs = this.usvc.getReminderNotes();
    obs.subscribe((response: any) => {
      this.array = response.data.data;
      console.log(this.array);
    });
  }
  getBackgroundColor(arg) {
    return !arg ? ' #FFFFFF' : arg;
  }
}
