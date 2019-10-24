import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpServiceService, private snackBar: MatSnackBar, private router: Router) { }

  logIn(data): any {
    const obs = this.http.post('user/login', data);
    obs.subscribe((response: any) => {

        localStorage.setItem('fName', response.firstName);
        localStorage.setItem('lName', response.lastName);
        localStorage.setItem('email', response.email);
      localStorage.setItem('token', response.id);



      this.router.navigateByUrl('/dashboard');
    }, (error) => {
      this.snackBar.open('Invalid LogIn Credentials');
    });
  }

  signUp(data): void {
    const obs = this.http.post('user/userSignUp', data);
    obs.subscribe((response) => {
      if (response['data'].success) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  forgotPassword(data): void {
    const obs = this.http.post('user/reset', data);
    obs.subscribe((response) => this.snackBar.open('Check Mail Inbox'));
  }

  resetPassword(data, token): void {
    const obs = this.http.postWithToken('user/reset-password', data, token);
    obs.subscribe((response) => this.snackBar.open('Password Changed'));
  }
}
