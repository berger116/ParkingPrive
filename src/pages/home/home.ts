import { Component } from '@angular/core';
import { Routes } from '../../app/app.routes';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   //  if(!this.auth.isInit){
   //   this.auth.init()
   //     .then((token)=>{
   //    this.navCtrl.setRoot(Routes.getRootPage(false));  //token!=null
       
   //     });
   // };
  }

  goLogin(){
    console.log ("home");   
    // debugger; 
    this.navCtrl.push(Routes.getPage(Routes.LOGIN))
  }

}
