import { Component, OnInit , inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../notes/notes.component';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private svc: NoteService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  updateNote(data): void {

    this.svc.updateNote(data);
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
