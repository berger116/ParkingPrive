import { NgModule } from '@angular/core';  // , ErrorHandler
import { IonicApp, IonicModule } from 'ionic-angular';   //  ViewController, PopoverController
import { MyApp } from './app.component';
import { Routes } from './app.routes';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
//import { DatePickerModule } from 'datepicker-ionic2';
//import { DatePickerModule } from 'ng2-datepicker';
//import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//import { AuthHttp, AuthConfig } from 'angular2-jwt';
//import { Http } from '@angular/http';
//import { Storage } from '@ionic/storage';
//import { Endpoints} from '../providers/endpoints'
//import { Auth} from '../providers/auth'
import { HeaderContentComponent } from '../components/header-content/header-content';
import { Map } from '../components/map/map';
import { FireService } from '../providers/fireservice';
import { LogloginSvc } from '../providers/loglogin-svc';
//import { SortAsc } from '../pipes/sort-asc';
//import { GroupBy } from '../pipes/group-by';
//import { HomePage } from '../pages/home/home';

const app:Array<any>=[MyApp];
const pages:Array<any> = Routes.getPages();
const components:Array<any> = [
  HeaderContentComponent,
  Map,
//  ToastMsg,
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
    AngularFireModule.initializeApp(myFirebaseConfig),  //myFirebaseAuthConfig
  //  DatePickerModule,
    FormsModule,
  ],
  providers: [
  // {
   //  provide: AuthHttp,
   //  useFactory: getAuthHttp,
   //  deps: [Http]
   //},
  // Endpoints, 
    FireService,
    LogloginSvc
  ],

  bootstrap: [IonicApp],
  entryComponents: app.concat(pages),
})
export class AppModule {}
