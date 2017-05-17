import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  username: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.username = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  constructor(private http: Http, private storage: Storage) {
  }
  currentUser: User;
  access = false;

  public login(credentials) {
    if (credentials._username === null || credentials._password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
        
        this.http.post("http://localhost:8000/api/login_check", credentials, options)
          .subscribe(data => {
            if(data.status === 200) {
              this.access = true;
              this.currentUser = new User(credentials._username, credentials._username);
              this.storage.set('token', JSON.parse(data['_body'])['token']);
              this.storage.set('user', this.currentUser);
            }
          }, error => {
            console.log(error);
          },() =>{
            observer.next(this.access);
            observer.complete();
          });
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.remove('token');
      this.storage.remove('user');
      observer.next(true);
      observer.complete();
    });
  }

}
