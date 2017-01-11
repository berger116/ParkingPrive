/*
  Generated class for the Userprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';  //AuthProviders, AuthMethods
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { ToastMsg } from '../../components/toast-msg/toast-msg'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { User } from './user';

@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html'
})
export class UserprofilePage implements OnInit { 
  private queryObs: FirebaseListObservable<any>;
  private uidSubject: Subject<any>;
  private succs:any;
  private loader:any;

  private uidAuth: string;
  private fireKey:string;

  private user: User; 
  private toastMsg: ToastMsg;
  private myForm:any;


  constructor(private navCtrl: NavController,
              private navparams: NavParams,
              private af: AngularFire,
              private fireSVC: FireService,
              private loadingCtrl: LoadingController,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid") 
      console.log("UserprofilePage Cstr UID: ", this.uidAuth);

      this.user = new User();     
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryUser(this.uidAuth, this.uidSubject);

          console.log("UserprofilePage queryObs: ", this.queryObs)
          if (this.queryObs)
             this.queryObs.subscribe (itm => {
                if (itm[0]) {
                  console.log("itm: ", itm[0].$key)
                //  console.log("itm: ", itm[0].adresse)
                  this.fireKey = itm[0].$key       // clé de l'enregistrement
                  this.user = itm[0]
                //  this.user.userKey = itm[0].userkey 
                }
             }); 

          if (this.uidAuth)
              this.uidSubject.next(this.uidAuth)      
      } // end if
  }

  ngOnInit() {
      console.log("UserprofilePage OnInit UID: ", this.uidAuth);
      
      this.myForm = new FormGroup({
        nom : new FormControl('', Validators.required),   // [ Validators.required, validateEmail]) plusieurs validateur
        prenom: new FormControl('', Validators.required),   // , Validators.minLength(10)),   
        adresse : new FormControl('', Validators.required),
        noPostal : new FormControl('', Validators.required), 
        ville : new FormControl('', Validators.required),      
        notel : new FormControl('', Validators.required),
        email : new FormControl('', Validators.required),                
      });

      if (this.loader)
          this.hideLoading();
  }

  onSubmit(): void {
   //console.log(this.myForm.value, "inval adresse: ", this.myForm.controls.adresse.invalid );  
    console.log(this.myForm.value, "inval postal: ", this.myForm.valid);  
    event.preventDefault(); //??

    // get adresse(): any { return this.myForm.get('adresse'); }
  }

  filterBy(userKey: any) {
    this.uidSubject.next(userKey); 
  }
 
  userUpdate() { 
    if (this.fireSVC.authenticated && this.uidAuth) {

       if (this.myForm.valid){
          if (this.uidAuth != this.user.userKey && this.user.userKey != null) 
             console.log("UserprofilePage userid error !!!!", this.uidAuth ," / ", this.user.userKey)

          //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
          //console.log("fireKey: " + this.fireKey)

          //affectation de tous les champs
          let item = this.updateField () 
      
          if (this.fireKey) { 
              console.log("update test");
              // item UPDATE
              this.succs = this.queryObs.update(this.fireKey, item); 
          } else  
              //item INSERT
              this.succs = this.queryObs.push(item);

          this.succs  //promisse
          .then(_ => { 
             console.log("success insert/update key: ",  this.fireKey)
             this.toastMsg._presentToast("Données sauvegardées");  
             //this.presentToast("Données sauvegardées")  
          }).catch(
             err => console.log(err, 'UserprofilePage error in succs promisse!'));
      } else 
          this.toastMsg._presentToast("Données non sauvegardées (incomplètes)"); 
    }  // end if this.myForm.valid
  }

  updateField () { 
     return {
       userKey: this.uidAuth,
       nom: this.user.nom,
       prenom: this.user.prenom,
       adresse: this.user.adresse, 
       ville: this.user.ville,
       noPostal: this.user.noPostal,
       noTel: this.user.noTel,
       email: this.user.email
      }
  }

  ionViewDidLoad() {
     console.log("UserprofilePage DidLoad authUID: ", this.uidAuth)
  }

  public ionViewCanLeave() {   //code utile ??
    console.log("UserprofilePage CanLeave");  
   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
        return true;
  }

  private hideLoading(){
       this.loader.dismiss();
  }

  onClickBack(){
    // this.navCtrl.pop()
  }

}

