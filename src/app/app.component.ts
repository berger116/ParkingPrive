import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Routes } from './app.routes';
//import { Auth } from '../providers/auth';

import { HomePage } from '../pages/home/home';
import { AroundPage } from '../pages/around/around';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
 // providers: [Places],
 // templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = HomePage //AroundPage; //HomePage;
  rootPage: any;

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
