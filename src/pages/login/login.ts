import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

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
  
  constructor(public navCtrl: NavController, private af: AngularFire, public loadingCtrl: LoadingController,) {
    //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth)); 
      //console.log(this.af.auth )

      // this.af.auth.subscribe(auth => {   //(this.af.auth.getAuth().provider) {  //méthode dépréciée
      //     console.log("QQQQQQ  avant if af.auth: " + auth )
      //     if(auth) {
      //       //this.goTabs();
      //     }
      //     else {
      //       console.log("QQQQQQ  NOT loged af.auth: " + auth )       
      //       //this.navCtrl.setRoot(Routes.getRootPage(false));
      //     }
      // },
      // err =>{ 
      //   console.log("ERROR  NOT loged af.auth: ", err )      
      //   //this.navCtrl.setRoot(Routes.getRootPage(false));
      // });
  }

    //login(){
        //this.auth.login({email:this.email,password:this.password })
        //   .then((success)=>{
    //        this.goTabs();
        //    },(error)=>{
        //      this.error = error._body;
        //    })
    //}

    login() {
      console.log('login Page')

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
         content: "Chargement..."
      });
      this.loader.present();

      // this.af.auth.login();  // log avec google
      // login credential 
      this.af.auth.login({ email: this.email, password: this.password },
        { provider: AuthProviders.Password,
          method: AuthMethods.Password
        }).then ((res) => {
           console.log("RRRRR res", res.uid)
           this.goTabs(res.uid);
        }).catch(err =>{
            console.log("FFFFFFF CATCH")
            this.navCtrl.setRoot(Routes.getRootPage(false));
        });

       // this.af.auth.subscribe(auth => {   //(this.af.auth.getAuth().provider) {  //méthode dépréciée
       //    console.log("Subscribe af.auth: " + auth )
       // });

        if (this.loader)
            this.hideLoading();

      //console.log("XXXX login.ts af.auth: ")
      
    
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

   //ionViewDidLoad(){
   //}

   goTabs(uid){
      console.log ("go tabs",uid);
      this.navCtrl.push(Routes.getPage(Routes.TABS), {uid: uid});   // ADDPLACES
      
      //this.hideLoading();
   }

   private hideLoading(){
       this.loader.dismiss();
   }

    //  openSignup(){
    //     let modal = this.modalCtrl.create(Routes.getPage(Routes.SIGNUP));
    //     modal.present();
    //  }

}
