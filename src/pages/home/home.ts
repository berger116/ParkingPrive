import { Component } from '@angular/core';
import { Routes } from '../../app/app.routes';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  goLogin(){
    console.log ("home");   
    // debugger; 
    this.navCtrl.push(Routes.getPage(Routes.LOGIN))
  }

}
