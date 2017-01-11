import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Routes } from './app.routes';
//import { Auth } from '../providers/auth';
import { AngularFire } from 'angularfire2';

//import { FB_CONFIG } from '../providers/fb-config';
//const firebaseconfig:Object = FB_CONFIG;
   
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
 // providers: [Places],
 // templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  //firebase.initializeApp(firebaseconfig);
 
  constructor(platform: Platform, af: AngularFire) {  //private auth:Auth  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       StatusBar.styleDefault();
       Splashscreen.hide();
    });
  }

  ngOnInit() {
     console.log ("OnInit " +  this.rootPage)
     this.rootPage = Routes.getRootPage(false);  
    
  }
}
