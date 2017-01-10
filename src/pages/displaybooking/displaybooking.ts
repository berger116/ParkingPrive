import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Validators,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import { DatePicker } from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

import { DispoParking } from '../dispotobook/dispoparking';

//import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

/*
  Generated class for the Addplaceparking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-displaybooking',
  templateUrl: 'displaybooking.html'
})
export class DisplaybookingPage implements OnInit {
  private queryObs: FirebaseListObservable<any>
  //private queryObs: FirebaseListObservable<DispoParking>;
  private uidSubject: Subject<any>;
  private succs:any;
  private loader:any;

  private uidAuth: string;
  private placeKey: string;
  private fireKey:string;
 
  // dispos:Array<FirebaseListObservable<DispoParking>>;
  private displayBooks:Array<DispoParking> = [];
  private toastMsg: ToastMsg;
  private myForm:any;
  private newDebDispo:any;
  private newFinDispo:any;

  constructor(private navCtrl: NavController,
              private navparams: NavParams,
              private af: AngularFire,
              private fireSVC: FireService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid");
     // this.placeKey = this.navparams.get("placeKey"); //clé secondaire 
      console.log("DisplaybookingPage Cstr UID: ", this.uidAuth, " placeKey: ", this.placeKey);

      //tmp  this.dispos = new DispoParking();    
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryBookDispo(this.uidAuth,  this.uidSubject );

          console.log("DisplaybookingPage queryObs: ", this.queryObs," Null: ", this.queryObs==null )
          if (this.queryObs) {
              this.queryObs.subscribe (itms => {
                if (itms)
                  this.displayBooks = itms;
              })
          }

          if (this.uidAuth)
              this.uidSubject.next(this.uidAuth)
      }
   }

   ngOnInit() {
      console.log("DisplaybookingPage OnInit queryObs: ", this.queryObs)
    
      this.myForm = new FormGroup({
           dateDebut: new FormControl('', Validators.required),  // [ Validators.required, Validators.minLength(10)]) si plusieurs validateur
           dateFin : new FormControl('', Validators.required),       
      });

      if (this.loader)
          this.hideLoading();
   }

   onSubmit(): void {
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
     event.preventDefault(); //??
   }

   filterBy(userKey: any) {
     this.uidSubject.next(userKey); 
   }

//   deleteDispo(key){
//     console.log("delete Key:", key);
//     this.queryObs.remove(key) 
//     .then(_=> { this.toastMsg._presentToast("Données effacées")})
//     .catch(err => { this.toastMsg._presentToast('error opération non effectuée' + err)})
     //  event.preventDefault(); 
//   }


  private hideLoading(){
       this.loader.dismiss();
  }

  public ionViewCanLeave() {   //code utile ??
    console.log("DisplaybookingPage CanLeave");
   //  console.log("previous", this.navCtrl.last())

   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
    //    return true;
    //  } else {
        return true;
    //  }
  }

  onClickBack(){
   // this.navCtrl.last()   // marche pas
   // this.navCtrl.push( this.navCtrl.last())
   //  console.log("previous", this.navCtrl.push( this.navCtrl.last())) // getPrevious())

    this.navCtrl.pop() 
   //tmp  this.navCtrl.setRoot(Routes.getPage(Routes.PLACETOBOOK), {uid : this.uidAuth}); 
  }
  
}


