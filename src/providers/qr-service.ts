import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import {GlobalService} from './global-service';import 'rxjs/add/operator/map';

/*
  Generated class for the QrService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QrService {

  constructor(private http: Http, private globService: GlobalService) {
  }

  public sendQr(qr){
    let data = {
      code: qr,
    }
    if (qr === null) {
      return Observable.throw("Please scan the code");
    } else {
      return Observable.create(observer => {
        let allowed = false;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json' );
        headers.append('Authorization', 'Bearer '+this.globService.token);
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.globService.ApiUrl+"api/users/"+this.globService.user.id+"/submitqr", data, options)
          .subscribe(data => {
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
