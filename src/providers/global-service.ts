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
  ApiUrl = 'https://symfonict.herokuapp.com/';
  token: any;
  user: any = {
    marks:{}
  };
  constructor(public http: Http, private storage: Storage) {
    this.token = this.storage.get('token')['__zone_symbol__value'];
  }

}
