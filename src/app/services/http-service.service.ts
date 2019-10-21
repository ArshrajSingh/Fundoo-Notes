import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router: Router) {
  }
 //

  // private tokenSource = new BehaviorSubject('');
  // currentToken = this.tokenSource.asObservable();

  // changeToken(newToken: string) {
  //   this.tokenSource.next(newToken);


  // get(url,token) {
  //   let obs = this.http.get(environment.domainURL + url, {
  //     headers: new HttpHeaders({
  //       'Authorization': this.token

  // })
  // return obs;
  //   )}
  get(url, token) {
    return this.http.get(environment.domainURL + url, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
  }

  post(url, data) {
    const obs = this.http.post(environment.domainURL + url, data);
    return obs;
  }

  put(url, data, token) {
    const obs = this.http.put(environment.domainURL + url, data,  {
      headers: new HttpHeaders({
        'Authorization': token
      })});
    return obs;
  }

  postWithToken(url, data, token) {
    const obs = this.http.post(environment.domainURL + url, data, {
      headers: new HttpHeaders({
        'Authorization': token
      })});
    return obs;
  }
}
