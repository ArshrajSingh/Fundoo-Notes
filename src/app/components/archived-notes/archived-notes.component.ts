import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.scss']
})
export class ArchivedNotesComponent implements OnInit {

  noteColor = new FormControl('#FFFFFF');
  archiveNotesList: Array<any> = [];

  constructor(private svc : NoteService) {
    this.svc.events.addListener('note-unarchived', () => {
      // Fetch all notes from database
      this.fetchArchiveNotes();
    });

      this.svc.events.addListener('note-deleted-in-archive', () => {
        // Fetch all notes from database
        this.fetchArchiveNotes();
  });
  }

  ngOnInit() {
    this.fetchArchiveNotes();
  }

  fetchArchiveNotes() {
    let obs = this.svc.fetchArchiveNotes();
    obs.subscribe((response: any) => {
      this.archiveNotesList = response.data.data;
    }, (error) => {
      console.log(error);
    })
  }
  unarchive(note) {
    let data = {
      noteIdList: [note.id],
      isArchived: false
    }
    this.svc.unarchive(data);
  }

  getBackgroundColor(arg) {
    return !arg ? '	#FFFFFF' : arg;
  }

  deleteArchiveNote(note) {
    let data = {
      noteIdList: [note.id],
      isDeleted: true,
      isArchived: false
    }
    this.svc.deleteArchiveNote(data);

  }


}
