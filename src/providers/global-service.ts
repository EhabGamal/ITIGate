import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalService {
  ApiUrl = 'http://localhost:8000/';
  token: any;
  constructor(public http: Http, private storage: Storage) {
    this.token = this.storage.get('token');
  }

}
