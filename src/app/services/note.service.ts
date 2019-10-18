import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  events = new EventEmitter();

  constructor(private http: HttpServiceService) { }

  fetchAllNotes(): any {
    return this.http.get('notes/getNotesList');
  }
  fetchDeletedNotes() {
    console.log('from service');
    return this.http.get('notes/getTrashNotesList');
  }
  deleteForever(data) {
    console.log('from note.service');
    const obs = this.http.post('notes/deleteForeverNotes', data);
    obs.subscribe((response) => {
      this.events.emit('deleted forever');
    }, error => {
    });

  }

  saveRetrivedNote(data) {
    const obs = this.http.post('notes/trashNotes', data);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-again');
    }, error => {
      // Some error came in saving notes
    });
  }

  fetchArchiveNotes() {
    console.log('from service');
    return this.http.get('notes/getArchiveNotesList');
  }
  unarchive(data) {
    const obs = this.http.post('notes/archiveNotes', data);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-unarchived');
    }, error => {
      // Some error in archiving note
    });

  }

  saveNote(data) {
    const obs = this.http.post('notes/addNotes', data);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-in-database');
    }, error => {
      // Some error came in saving notes
    });
  }

  deleteNote(data) {
    const obs = this.http.post('notes/trashNotes', data);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-database');
    }, error => {
      // Some error in deleting Note
    });
  }
  deleteArchiveNote(data) {
    const obs = this.http.post('notes/trashNotes', data);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-archive');
    }, error => {
      // Some error in deleting Note
    });
  }

  changeNoteColor(data) {
    const obs = this.http.post('notes/changesColorNotes', data);
    obs.subscribe(response => {
      // Color of note changed
      this.events.emit('note-color-changed-in-database');
    }, error => {
      // Some error in changing color of note
    });
  }

  archiveNote(data) {
    const obs = this.http.post('notes/archiveNotes', data);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-archived-in-database');
    }, error => {
      // Some error in archiving note
    });
  }
}
