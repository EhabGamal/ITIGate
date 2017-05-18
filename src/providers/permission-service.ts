import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {GlobalService} from './global-service';import 'rxjs/add/operator/map';

/*
  Generated class for the PermissionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PermissionService {

  constructor(private http: Http, private globService: GlobalService) {
  }

  public sendPermission(date){
    let data = {
      user: this.globService.user.id,
      date: date.getDate().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getFullYear().toString()
    }
    if (date === null) {
      return Observable.throw("Please choose date");
    } else {
      return Observable.create(observer => {
        let allowed = false;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' );
        headers.append('Authorization', 'Bearer '+this.globService.token);
        let options = new RequestOptions({ headers: headers });
        console.log(headers);
        this.http.post(this.globService.ApiUrl+"api/permissions/", data, options)
          .subscribe(data => {
            console.log(data);
            allowed = true
          }, error => {
            console.log(error);
            allowed = false
            observer.next(allowed);
            observer.complete();
          },() =>{
            observer.next(allowed);
            observer.complete();
          });
      });
    }
  }
}
