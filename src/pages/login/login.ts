import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

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
  loader:any;
  
  //auth:Observable;

  constructor(public navCtrl: NavController, public af: AngularFire, public loadingCtrl: LoadingController,) {
    
    //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth));  
  }

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

      this.loader = this.loadingCtrl.create({
         content: "Chargement..."
      });
      this.loader.present();

      this.af.auth.login();

      //login credential a tester
      //this.af.auth.login({ email: 'email', password: 'pass' });

     // if (this.af.auth.getAuth().provider) {
    
    //  if (this.auth) {
    //     console.log("XXX Login auth:" ) //+ this.auth)
         //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth));
    //     this.goTabs();
    //  }

       this.af.auth.subscribe(auth => {
          //this.auth = auth;
          if(auth) {
            console.log('logged in');
            this.goTabs();
          } else {
            console.log('not logged in');
          }
       
       });

       // affichage si connecte -> marche pas
       //var connectedRef = this.firebase.database().ref(".info/connected");
       // connectedRef.on("value", function(snap) {
       //     if (snap.val() === true) {
       //       alert("connected");
       //     } else {
       //       alert("not connected");
       //     }
       // });
    }

   // overrideLogin() {
   //   this.af.auth.login({
   //     provider: AuthProviders.Anonymous,
   //     method: AuthMethods.Anonymous,
   //   }); 
   //   this.goTabs();   
   // }

    goTabs(){
      console.log ("go tabs");
      this.navCtrl.push(Routes.getPage(Routes.TABS));   // ADDPLACES
      
      this.hideLoading();
    }

    private hideLoading(){
       this.loader.dismiss();
    }

}
