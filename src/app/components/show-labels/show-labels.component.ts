import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-show-labels',
  templateUrl: './show-labels.component.html',
  styleUrls: ['./show-labels.component.scss']
})
export class ShowLabelsComponent implements OnInit {
  label: any
  array: any
  events = new EventEmitter()
  noteColor = new FormControl('#FFFFFF');
  notesView: Boolean = true;

  constructor(private usvc: UserServiceService, private route: ActivatedRoute , private svc: NoteService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.label = params.get("label");
      this.getLabelNotes();
    });

    this.svc.viewInfo.subscribe((data) => {
      // console.log("data", data);
      this.notesView = data;
    });

  }
  getLabelNotes() {
    let obs = this.usvc.getLabelNotes(this.label)
    obs.subscribe((response: any) => {
      //console.log(response)
      this.array = response.data.data
      console.log(this.array);
      //this.events.emit('label-aa-gaya');

    })
  }
  getBackgroundColor(arg) {
    return !arg ? '	#FFFFFF' : arg;
  }
}
