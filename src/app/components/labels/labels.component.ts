import { Component, OnInit, Inject } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  name:string

  constructor(private usvc : UserServiceService,
    public dialogRef: MatDialogRef<LabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabelsComponent) {


     }

  ngOnInit() {
  }

  addLabel(){
    let data = {
      label:this.name,
      isDeleted:false,
      userId:localStorage.getItem('userId')
    }
    this.usvc.addLabel(data)
  }
  removeSideLabel(id){
    this.usvc.removeSideLabel(id)
    this.dialogRef.close()
  }

}
