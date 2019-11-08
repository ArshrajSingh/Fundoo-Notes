import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  events = new EventEmitter();
  productId: any;
  cartId: any;
  name: any;
  userId: any;
  labelArray: any;
  constructor(private http: HttpServiceService, private snackBar: MatSnackBar, private router: Router) { }

  logIn(data): any {
    const obs = this.http.post('user/login', data);
    obs.subscribe((response: any) => {
      // Save the token (user id which is unique)
        // console.log(response.firstName);
        localStorage.setItem('fName', response.firstName);
        localStorage.setItem('lName', response.lastName);
        localStorage.setItem('email', response.email);
      localStorage.setItem('token', response.id);
      localStorage.setItem('userId', response.userId);
      this.userId = response.userId;

      const obs1 = this.http.get1('user/' + response.userId);
      obs1.subscribe((res: any) => {

        if (res.service === 'advance') {
          localStorage.setItem('service', res.service);
          this.events.emit('advance-service');
        }

      if (res.service === 'basic') {
        localStorage.setItem('service', res.service);
        this.events.emit('basic-service');
      }
    });

      // console.log(response);

      this.router.navigateByUrl('/dashboard');
    }, (error) => {
      this.snackBar.open('Invalid LogIn Credentials', 'Dismiss', );
    });
  }
  token: String = localStorage.getItem('token');
  signUp(data): void {
    const obs = this.http.post('user/userSignUp', data);
    obs.subscribe((response) => {
      if (response['data'].success) {
        this.router.navigateByUrl('/login');
      }
      // console.log(response)
    });
  }

  forgotPassword(data): void {
    const obs = this.http.post('user/reset', data);
    obs.subscribe((response) => this.snackBar.open('Check Mail Inbox'));
  }

  resetPassword(data, token): void {
    const obs = this.http.postWithToken('user/reset-password', data, token);
    obs.subscribe((response) => this.snackBar.open('Password Changed', 'Dismiss', ));
  }
  basic() {
    return this.http.get('/user/service', this.token);

  }
  advance() {
    return this.http.get('/user/service', this.token);

  }
  addToCart(data) {
    const obs = this.http.postWithToken('/productcarts/addToCart', data, this.token);
    obs.subscribe((response: any) => {
      console.log(response);
      this.productId = response.data.details.productId;
      this.cartId = response.data.details.id;
      this.name = response.data.details.product.name;
      console.log(this.productId);
      console.log(this.cartId);
      console.log(this.name);
    });
  }
  addLabel(data) {
    const obs = this.http.postWithToken('/noteLabels', data, this.token);
    obs.subscribe((response: any) => {
    // console.log(response)
    this.events.emit('label-added');
  });

  }
  getLabelNotes(label) {
    const obs = this.http.postWithToken('/notes/getNotesListByLabel/' + label, {} , this.token);
    return obs;

  }
  getLabels() {
   const obs =  this.http.get('/noteLabels/getNoteLabelList', this.token);
   return obs;

  }
   addToLabel(note, id) {
    const obs = this.http.postWithToken('/notes/' + note.id + '/addLabelToNotes/' + id + '/add', {}, this.token);
    obs.subscribe((response: any) => {
      // console.log(response)
      console.log('ho gaya add');
      this.events.emit('label-display');


    });

   }
   removeLabel(note, id) {
     const obs = this.http.postWithToken('/notes/' + note.id + '/addLabelToNotes/' + id + '/remove', {}, this.token);
     obs.subscribe((response: any) => {
      // console.log(response)
      console.log('ho gaya remove');
      this.events.emit('label-deleted');


   });
}
removeSideLabel(id) {
  const obs = this.http.delete('/noteLabels/' + id + '/deleteNoteLabel', this.token);
  obs.subscribe((response: any) => {
    console.log('side se remove ho gaya');
    this.events.emit('sideLabelDeleted');
  });
}

removeReminder(data) {
  const obs = this.http.postWithToken('/notes/removeReminderNotes', data, this.token);
  obs.subscribe((response: any) => {
    console.log('reminder remove ho gaya');
      this.events.emit('reminderDeleted');
  });

  }
  getReminderNotes() {
    return this.http.get('/notes/getReminderNotesList ', this.token);

  }
}
