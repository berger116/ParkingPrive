import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const fbConfig:Object = {
      apiKey: "AIzaSyAyi1hy-rHuxWSWm2hOQU0AZ7_sARKcwPo",
      authDomain: "parkingprive-73f09.firebaseapp.com",
      databaseURL: "https://parkingprive-73f09.firebaseio.com",
      storageBucket: "parkingprive-73f09.appspot.com",
      messagingSenderId: "756854799582"
    }
/*
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FbConfig {

  constructor(public http: Http) {
    console.log('Hello FbConfig Provider');
  }

}
