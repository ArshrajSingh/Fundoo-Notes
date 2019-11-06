import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  id:any

  constructor( private svc: UserServiceService,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data:CartComponent,private router:Router) { }
remove(){
  this.dialogRef.close();
}
addToCart(){
  this.svc.addToCart({ "productId": this.data.id });
  this.router.navigateByUrl('/register');
  this.dialogRef.close();
  console.log(this.data.id)

}

  ngOnInit() {
  }


}
