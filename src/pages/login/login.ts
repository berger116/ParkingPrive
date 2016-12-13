import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

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

  constructor(public navCtrl: NavController, public af: AngularFire) {}

    //login(){
        //this.auth.login({email:this.email,password:this.password })
        //   .then((success)=>{
    //        this.goTabs();
        //    },(error)=>{
        //      this.error = error._body;
        //    })
    //}

    //  openSignup(){
    //     let modal = this.modalCtrl.create(Routes.getPage(Routes.SIGNUP));
    //     modal.present();
    //  }

    login() {
      console.log('login Page')
      this.af.auth.login();

      if (this.af.auth.getAuth()) {
        console.log("login " + this.af.auth.login() )
        this.goTabs();
      }
    }

    //logout() {
    // this.af.auth.logout();
    //}

    goTabs(){
      console.log ("login");
      this.navCtrl.push(Routes.getPage(Routes.TABS));   // ADDPLACES
    }


}
