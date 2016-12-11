import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:string;
  password:string;
  error:string;

  constructor(public navCtrl: NavController) {}

    login(){
       // this.auth.login({email:this.email,password:this.password })
       //   .then((success)=>{

            this.goTabs();
      //    },(error)=>{
      //      this.error = error._body;
      //    })
    }

    goTabs(){
      console.log ("login");
      this.navCtrl.push(Routes.getPage(Routes.TABS));   // ADDPLACES
    }

 //   openSignup(){
 //     let modal = this.modalCtrl.create(Routes.getPage(Routes.SIGNUP));
 //     modal.present();
 //   }


}
