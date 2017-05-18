import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Storage} from "@ionic/storage";
import {GlobalService} from './global-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  id;
  username: string;
  email: string;
 
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
  }
}

@Injectable()
export class AuthService {
  constructor(private http: Http, private globService: GlobalService, private storage: Storage) {
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
        
        this.http.post(this.globService.ApiUrl+"api/login_check", credentials, options)
          .subscribe(data => {
            if(data.status === 200) {
              this.access = true;
              this.globService.token = JSON.parse(data['_body'])['token'];
              this.storage.set('token', this.globService.token);
            }
          }, error => {
            observer.next(this.access);
            observer.complete();
          },() =>{
            this.saveUser();
            observer.next(this.access);
            observer.complete();
          });
      });
    }
  }
  private saveUser() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Bearer '+this.globService.token);
    console.log(headers);
    let options = new RequestOptions({ headers: headers });
    this.http.get(this.globService.ApiUrl+"api/users/me", options)
    .subscribe(data => {
      this.currentUser = new User(JSON.parse(data['_body']).user);
      this.globService.user = this.currentUser;
      this.storage.set('user', this.currentUser);
    },error => {

    });

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
