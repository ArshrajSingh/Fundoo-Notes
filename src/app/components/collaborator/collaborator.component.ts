import { Component, OnInit, Inject } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  firstName: string = localStorage.getItem('fName');
  obj: any = JSON.parse(localStorage.getItem('string'));
  noteId: any;
  collaborator: any;

  constructor(private svc: NoteService,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CollaboratorComponent) {

  }

  ngOnInit() {
   // this.array = JSON.parse(localStorage.getItem(this.data.noteId));
  }

  getUser() {
    this.svc.getUser();
  }

  searchUserList(user) {

    this.svc.searchUserList({ 'searchWord': user }, this.data.noteId);
    this.dialogRef.close();
  }
  removeCollaborator(user) {

    this.svc.removeCollaborator({ 'searchWord': user }, this.data.noteId);
    this.dialogRef.close();
  }

}
