import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent} from 'src/app/components/dialog/dialog.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { UserServiceService } from 'src/app/services/user-service.service';

export interface DialogData {
  noteId: string;
  title: string;
  description: string;
  color: string;
  user: string;
  service: string;
  collaborator: string[];
  labelId: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit  {

  //events = new EventEmitter();
  service: any;
  collaboratorList: Array<any> = [];
  noteColor = new FormControl('#FFFFFF');
  notesList: Array<any> = [];
  @Input() search;
  notesView: Boolean = true;
  labelArray: any[];

  constructor(private noteSvc: NoteService , private dialog: MatDialog , private usvc: UserServiceService) {

    this.noteSvc.events.addListener('note-saved-in-database', () => {
      //Fetch all notes from database
      this.fetchAllNotes();
    });
    this.getService();

    this.usvc.events.addListener('basic-service', () => {
      //Fetch all notes from database
      this.getService();
      this.fetchAllNotes();
    });
    this.usvc.events.addListener('advance-service', () => {
      //Fetch all notes from database
      this.getService();
      this.fetchAllNotes();
    });

    this.usvc.events.addListener('label-display', () => {
      this.fetchAllNotes();
    });
    this.usvc.events.addListener('label-deleted', () => {
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

    this.noteSvc.events.addListener('note-pined/unpined', () => {
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

    this.noteSvc.events.addListener('note-saved-again', () => {
      // Fetch all notes from database
      this.fetchAllNotes(); });

      this.noteSvc.events.addListener('note-unarchived', () => {
        // Fetch all notes from database
        this.fetchAllNotes();
    });
  }

  // Fetch all notes
  getService() {
    this.service = localStorage.getItem('service');
    console.log('apki service ka nam hai :'+ this.service);
  }

  fetchAllNotes() {
    const obs = this.noteSvc.fetchAllNotes();

    obs.subscribe((response) => {
      this.notesList = response.data.data;
      console.log(response.data.data[0].user.email);
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
    this.noteSvc.viewInfo.subscribe((data) => {
      // console.log("data", data);
      this.notesView = data;
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
    return !arg ? '	#FFFFFF' : arg;
  }

  changeColor(card) {
    const data = {
      noteIdList: [card.id],
      color: this.noteColor.value
    };
    this.noteSvc.changeNoteColor(data);
  }
  openDialog(note) {

    this.dialog.open(DialogComponent , {
      width:'250px',
      data: {
        noteId: note.id,
        title: note.title,
        description: note.description,
        color: note.color,
        user: note.user.email


      }
    });
  }
  pinNote(note) {
    const data = {
      noteIdList: [note.id],
      isPined: true
    };
    this.noteSvc.pinNote(data);
  }

unPinNote(note) {
  const data = {
    noteIdList: [note.id],
    isPined: false
  };
  this.noteSvc.pinNote(data);

}

addCollab(note) {
  this.dialog.open(CollaboratorComponent, {
    width: "450px",
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

  getLabels() {
    const obs = this.usvc.getLabels();
    obs.subscribe((response: any) => {
     console.log(response);
    if (this.labelArray == null) {
      this.labelArray = [];
    }
      this.labelArray = response.data.details;
    });
  }

  addToLabel(note, id) {
  this.usvc.addToLabel(note, id );

  }
  removeLabel(note, id) {
    this.usvc.removeLabel(note, id);

  }

}
