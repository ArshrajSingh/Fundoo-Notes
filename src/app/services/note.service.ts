import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token: String = localStorage.getItem('user');
  events = new EventEmitter();

  constructor(private http: HttpServiceService) { }

  fetchAllNotes(): any {
    return this.http.get('notes/getNotesList', this.token);
  }
  fetchDeletedNotes() {
    console.log('from service');
    return this.http.get('notes/getTrashNotesList', this.token);
  }
  deleteForever(data) {
    console.log('from note.service');
    let obs = this.http.postWithToken('notes/deleteForeverNotes', data, this.token);
    obs.subscribe((response) => {
      this.events.emit('deleted forever');
    }, error => {
      console.log('syapa');
    });

  }

  saveRetrivedNote(data) {
    let obs = this.http.postWithToken('notes/trashNotes', data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-again');
    }, error => {
      // Some error came in saving notes
    });
  }


  fetchArchiveNotes() {
    console.log('from service');
    return this.http.get('notes/getArchiveNotesList', this.token);

  }
  unarchive(data) {
    let obs = this.http.postWithToken('notes/archiveNotes', data, this.token);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-unarchived');
    }, error => {
      // Some error in archiving note
    });

  }

  saveNote(data) {
    let obs = this.http.postWithToken('notes/addNotes', data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-in-database');
    }, error => {
      // Some error came in saving notes
    });
  }

  updateNote(data) {
    let obs = this.http.postWithToken('notes/updateNotes', data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-updated-in-database');
    }, error => {
      // Some error came in saving notes
    });
  }


  deleteNote(data) {
    let obs = this.http.postWithToken('notes/trashNotes', data, this.token);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-database');
    }, error => {
      // Some error in deleting Note
    });
  }

  deleteArchiveNote(data) {
    let obs = this.http.postWithToken('notes/trashNotes', data, this.token);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-archive');
    }, error => {
      // Some error in deleting Note
    });
  }

  changeNoteColor(data) {
    let obs = this.http.postWithToken('notes/changesColorNotes', data, this.token);
    obs.subscribe(response => {
      // Color of note changed
      this.events.emit('note-color-changed-in-database');
    }, error => {
      // Some error in changing color of note
    });
  }

  archiveNote(data) {
    let obs = this.http.postWithToken('notes/archiveNotes', data, this.token);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-archived-in-database');
    }, error => {
      // Some error in archiving note
    });
  }
}
