import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';    //IonicErrorHandler
import { MyApp } from './app.component';
import { HeaderContentComponent } from '../components/header-content/header-content';
import { Routes } from './app.routes';
//import { FirebaseSVC } from '../providers/firebase-svc';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//import { AuthHttp, AuthConfig } from 'angular2-jwt';
//import { Http } from '@angular/http';
//import { Storage } from '@ionic/storage';
//import { Endpoints} from '../providers/endpoints'
//import { Auth} from '../providers/auth'
//import { Settings} from '../providers/Settings';
import {Map} from '../components/map/map';
//import {SortAsc} from '../pipes/sort-asc';
//import {GroupBy} from '../pipes/group-by';
//import { HomePage } from '../pages/home/home';

import { AuthService } from '../providers/auth-service';

const app:Array<any>=[MyApp];
const pages:Array<any> = Routes.getPages();
const components:Array<any> = [
  HeaderContentComponent,
  Map
];
//const pipes:Array<any> = [SortAsc, GroupBy];

const appIonicConfig = {
  mode: 'md',
  platforms: {
    ios: {
      tabsPlacement: 'bottom',
    }
//    android: {
//      tabsPlacement: 'top',
//    }
  }
};

export const myFirebaseConfig = {
  apiKey: "AIzaSyAyi1hy-rHuxWSWm2hOQU0AZ7_sARKcwPo",
  authDomain: "parkingprive-73f09.firebaseapp.com",
  databaseURL: "https://parkingprive-73f09.firebaseio.com",
  storageBucket: "parkingprive-73f09.appspot.com",
  messagingSenderId: "756854799582"
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
  //provider: AuthProviders.Google,
  //method: AuthMethods.Redirect  // ou popup ??
}
 

//let storage = new Storage();

//export function getAuthHttp(http) {
//  return new AuthHttp(new AuthConfig({
//    // headerPrefix: YOUR_HEADER_PREFIX,
//    noJwtError: true,
//    globalHeaders: [{'Accept': 'application/json'}],
//    tokenGetter: (() => storage.get('id_token')),
//  }), http);
//}

@NgModule({
  declarations: app.concat(pages).concat(components), // .concat(pipes),
  imports: [
    IonicModule.forRoot(MyApp, appIonicConfig, Routes.getDeepLinkerConfig()),
    AngularFireModule.initializeApp(myFirebaseConfig)  //myFirebaseAuthConfig
  ],
  providers: [
  // {
   //  provide: AuthHttp,
   //  useFactory: getAuthHttp,
   //  deps: [Http]
   //},
  // Endpoints,
  // Auth,
  // Settings,
  //FirebaseSVC

    AuthService
  ],

  bootstrap: [IonicApp],
  entryComponents: app.concat(pages),
})
export class AppModule {}
