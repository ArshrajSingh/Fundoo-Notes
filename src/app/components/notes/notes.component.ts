import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CollaboratorComponent } from 'src/app/components/collaborator/collaborator.component';

export interface DialogData {
  noteId: string;
  title: string;
  description: string;
  color: string;
  user: string;
  collaborator: string[];
}



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteColor = new FormControl('#FFFFFF');
  notesList: Array<any> = [];
  public icon = ' star_border';

  @Input() search;

  constructor(private noteSvc: NoteService, private dialog: MatDialog) {

    this.noteSvc.events.addListener('note-saved-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-updated-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-deleted-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-archived-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-color-changed-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('collaborator-removed', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('collaborator-added', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-saved-again', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });

    this.noteSvc.events.addListener('note-unarchived', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });
    this.noteSvc.events.addListener('note-pinned/unpinned-in-database', () => {
      // Fetch all notes from database
      this.fetchAllNotes();
    });
  }

  // Fetch all notes
  fetchAllNotes() {
    const obs = this.noteSvc.fetchAllNotes();

    obs.subscribe((response) => {
      this.notesList = response.data.data;
    }, (error) => {
      console.log(error);
    });
  }

  // Fetch all the existing notes from database
  ngOnInit() {
    this.fetchAllNotes();

    this.noteSvc.currentDataSearch.subscribe((search: any) => {
      this.search = search;
    });
  }

  // Delete a Note
  deleteNote(note) {
    const data = {
      noteIdList: [note.id],
      isDeleted: true
    };
    this.noteSvc.deleteNote(data);
  }

  // archive a note
  archiveNote(note) {
    const data = {
      noteIdList: [note.id],
      isArchived: true
    };
    this.noteSvc.archiveNote(data);
  }

  getBackgroundColor(arg) {
    return !arg ? ' #FFFFFF' : arg;
  }

  changeColor(card) {
    const data = {
      noteIdList: [card.id],
      color: this.noteColor.value
    };
    this.noteSvc.changeNoteColor(data);
  }
  openDialog(note) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        noteId: note.id,
        title: note.title,
        description: note.description,
        color: note.color
      }
    });
    console.log(note.title);
  }
  PinNote(note) {

    const data = {noteIdList: [note.id], isPined: true};
    this.noteSvc.PinNote(data);
  }
  unPinNote(note) {

    const data = {noteIdList: [note.id], isPined: false};
    this.noteSvc.PinNote(data);
  }
  addCollab(note) {
    this.dialog.open(CollaboratorComponent, {width: '500px',
    data: {
        noteId: note.id,
        title: note.title,
        description: note.description,
        color: note.color,
        user: note.user.email,
        collaborator: note.collaborators
      }
    });
  }
}
