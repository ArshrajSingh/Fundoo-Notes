import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';
import { UserServiceService } from 'src/app/services/user-service.service';

export interface data {
  id: string;
  price: string;
  type: string;
}
@Component({
  selector: 'app-service-purchase',
  templateUrl: './service-purchase.component.html',
  styleUrls: ['./service-purchase.component.scss']
})

export class ServicePurchaseComponent implements OnInit {

  constructor(private router: Router, private svc: UserServiceService, private dialog: MatDialog) { }
  signIn(): void {


    this.router.navigateByUrl('/login');
  }
  basic(): void {
    const obs = this.svc.basic();
    obs.subscribe((response: any) => {
      this.dialog.open(CartComponent, {
        width: '450px',
        height: '175px',
        data: {
          id: response.data.data[1].id,
          price: '$49/month',
          type: 'Basic'
        }

      });
    }, (error) => {
      console.log(error);
    });
  }
  advance(): void {
    const obs = this.svc.advance();
    obs.subscribe((response: any) => {
      this.dialog.open(CartComponent, {
        width: '450px',
        height: '175px',
        data: {
          id: response.data.data[0].id,
          price: '$99/month',
          type: 'Advance'

        }

      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
