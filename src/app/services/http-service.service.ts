import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "src/app/environments/environment.prod";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router: Router) {
  }

  get(url,token) {
    let obs = this.http.get(environment.domainURL + url, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }

  get1(url) {
    let obs = this.http.get(environment.domainURL + url)
    return obs;
  }

  post(url, data) {
    let obs = this.http.post(environment.domainURL + url, data)
    return obs;
  }

  postWithToken(url, data, token) {
    let obs = this.http.post(environment.domainURL + url, data, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }
  delete(url,token) {
    let obs = this.http.delete(environment.domainURL + url , {
      headers: new HttpHeaders({
        'Authorization': token
      })
    });
    return obs;
  }
}
