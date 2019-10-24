import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token: String = localStorage.getItem('user');
  events = new EventEmitter();
  string: Array<string> = [];
  array: Array<string> = [];

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
    const obs = this.http.postWithToken('notes/deleteForeverNotes', data, this.token);
    obs.subscribe((response) => {
      this.events.emit('deleted forever');
    }, error => {
      console.log('syapa');
    });

  }

  saveRetrivedNote(data) {
    const obs = this.http.postWithToken('notes/trashNotes', data, this.token);
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
    const obs = this.http.postWithToken('notes/archiveNotes', data, this.token);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-unarchived');
    }, error => {
      // Some error in archiving note
    });

  }

  saveNote(data) {
    const obs = this.http.postWithToken('notes/addNotes', data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-in-database');
    }, error => {
      // Some error came in saving notes
    });
  }

  updateNote(data) {
    const obs = this.http.postWithToken('notes/updateNotes', data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-updated-in-database');
    }, error => {
      // Some error came in saving notes
    });
  }


  deleteNote(data) {
    const obs = this.http.postWithToken('notes/trashNotes', data, this.token);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-database');
    }, error => {
      // Some error in deleting Note
    });
  }

  deleteArchiveNote(data) {
    const obs = this.http.postWithToken('notes/trashNotes', data, this.token);
    obs.subscribe(response => {
      // Note Deleted Successfully
      this.events.emit('note-deleted-in-archive');
    }, error => {
      // Some error in deleting Note
    });
  }

  changeNoteColor(data) {
    const obs = this.http.postWithToken('notes/changesColorNotes', data, this.token);
    obs.subscribe(response => {
      // Color of note changed
      this.events.emit('note-color-changed-in-database');
    }, error => {
      // Some error in changing color of note
    });
  }

  archiveNote(data) {
    const obs = this.http.postWithToken('notes/archiveNotes', data, this.token);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-archived-in-database');
    }, error => {
      // Some error in archiving note
    });
  }

  PinNote(data) {
    const obs = this.http.postWithToken('/notes/pinUnpinNotes', data, this.token);
    obs.subscribe(response => {
      // Note Archived
      this.events.emit('note-pinned/unpinned-in-database');
    }, error => {
      // Some error in archiving note
    });
  }

  getUser() {
    const obs = this.http.get('user', this.token);
    obs.subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        this.array.push(response[i].email);
      }
      localStorage.setItem('string', JSON.stringify(this.array));
      // console.log(localStorage.getItem('string'));
      // for(let i=0;i<response.length;i++){
      //   console.log(response[i].email)
      // }

    });
  }

  searchUserList(user, noteId) {
    const obs = this.http.postWithToken('user/searchUserList', user, this.token);
    obs.subscribe((response: any) => {
      const obs1 = this.http.postWithToken('notes/' + noteId + '/AddcollaboratorsNotes', response.data.details[0], this.token);
      obs1.subscribe((response: any) => {
        this.events.emit('collaborator-added');
      });
    });
  }

  removeCollaborator(user, noteId) {

    const obs = this.http.postWithToken('user/searchUserList', user, this.token);
    obs.subscribe((response: any) => {

      const obs1 = this.http.delete('notes/' + noteId + '/removeCollaboratorsNotes/' + response.data.details[0].userId, this.token);
      obs1.subscribe((response: any) => {
        this.events.emit('collaborator-removed');
      });

    });
  }
}
