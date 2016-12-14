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
  email:string = "t@t.ch";
  password:string = "tttttt";
  error:string;
  loader:any;
  //af2:any
  
  //auth:Observable;

  constructor(public navCtrl: NavController, private af: AngularFire, public loadingCtrl: LoadingController,) {
    //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth)); 

      // log avec google
      // this.af.auth.login(); 
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

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
         content: "Chargement..."
      });
      // tmp this.loader.present();

      // login credential 
      this.af.auth.login({ email: this.email, password: this.password });

      console.log("XXXX login.ts af.auth: " + this.af.auth )
      if (this.af.auth) {
          this.goTabs();
      }
    
     // if (this.af.auth.getAuth().provider) {  //méthode dépréciée
    
    //  if (this.auth) {
    //     console.log("XXX Login auth:" ) //+ this.auth)
         //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth));
    //     this.goTabs();
    //  }

      

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

   ionViewDidLoad(){
      console.info('before subscribe viewDidload');
        this.af.auth.subscribe(auth => {
          //debugger;
          //this.auth = auth;
          console.info('subscribe in viewDidload');
          if(auth) {
            console.log('logged in ' + auth.auth.email);
            console.log('logged in ' + auth.auth.uid);

           // this.goTabs();
          } else {
            console.log('not logged in');
          }  
       });
   }

   goTabs(){
      console.log ("go tabs");
      this.navCtrl.push(Routes.getPage(Routes.TABS));   // ADDPLACES
      
      // tmp this.hideLoading();
   }

    private hideLoading(){
       this.loader.dismiss();
    }

}
