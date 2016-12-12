import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Routes } from './app.routes';
//import { Auth } from '../providers/auth';

//import { HomePage } from '../pages/home/home';
//import { AroundPage } from '../pages/around/around';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
//import { FB_CONFIG } from '../providers/fb-config';

const firebaseconfig:Object =   //FB_CONFIG;
    {
      apiKey: "AIzaSyAyi1hy-rHuxWSWm2hOQU0AZ7_sARKcwPo",
      authDomain: "parkingprive-73f09.firebaseapp.com",
      databaseURL: "https://parkingprive-73f09.firebaseio.com",
      storageBucket: "parkingprive-73f09.appspot.com",
      messagingSenderId: "756854799582"
    };

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
 // providers: [Places],
 // templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = HomePage //AroundPage; //HomePage;
  rootPage: any;

  //firebase.initializeApp(firebaseconfig);

  constructor(platform: Platform) {  //private auth:Auth
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       StatusBar.styleDefault();
       Splashscreen.hide();
    });
  }

  ngOnInit() {
   // debugger;
     console.log ("OnInit " +  this.rootPage)
     this.rootPage = Routes.getRootPage(false);  //false
    
  }
}
