import { Component } from '@angular/core';
import { NavController,  NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { PlaceParking } from '../../placetobook/placeparking';
import { ToastMsg } from '../../components/toast-msg/toast-msg';

import { DispoParking } from '../dispotobook/dispoparking';

/*
  Generated class for the PlaceInfoPop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-place-info-pop',
  templateUrl: 'place-info-pop.html'
})
export class PlaceInfoPopPage {
  private queryObs: FirebaseListObservable<any>
  //private queryObs: FirebaseListObservable<DispoParking>;
  private uidSubject: Subject<any>;
  private succs:any;
  private toastMsg: ToastMsg;

  private uidAuth: string;
  private place:any;  //PlaceParking;
  private dispo:any;  //DispoParking; inutile 
  private plaqueMin: string;
  
  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public viewCtrl: ViewController,
              public fireSVC: FireService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      this.place = this.navparams.get("place");
      console.log("PlaceInfoPopPage place.userKey: ", this.place.userKey);  // != uidAuth

      this.dispo = this.navparams.get("dispo");
      console.log("PlaceInfoPopPage dispo.userKey: ", this.dispo.userKey);  // != uidAuth
      console.log("PlaceInfoPopPage dispo: ", this.dispo);

      this.uidAuth = this.navparams.get("uid");
      console.log("PlaceInfoPopPage dispo.userKey: ", this.uidAuth);

      //myDate: String = new Date().toISOString();   utile ??
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubject );

          console.log("PlaceInfoPopPage queryObs: ", this.queryObs," Null: ", this.queryObs==null )
          if (this.queryObs) {
          //    this.queryObs.subscribe (itms => { 
          //      if (itms)
          //        this.dispos = itms;
          //    }) 
          }

      //   if (this.uidAuth)    // inutile
      //       this.uidSubject.next(this.uidAuth)
      }
    
  }  //end Cstr 

  placeReserve(){
     console.log("authenticated key: ", this.fireSVC.authenticated) 
     if (this.fireSVC.authenticated && this.uidAuth)  {  
       console.log("placeInfopop update authUID: ", this.uidAuth);

     //if (this.myForm.valid ){
          if (this.ctrlPlaqueOk(this.plaqueMin)) {
         
            //affectation de tous les champs
            let item = this.updateField (this.plaqueMin)  
            console.log("placeInfopop item:", item)
       //     if (this.fireKey) {    //fireKey est null -> que ajout pour l'instant 
                console.log("placeInfopop update Dispo");
                // item UPDATE
                this.succs = this.queryObs.update(this.dispo.$key, item);   //this.fireKey

            this.succs  //promise
            .then(_ => { 
                console.log("success update plaqueMin key: ", this.dispo.$key)  //this.fireKey
                this.toastMsg._presentToast("Réservation effectuée"); 
           //   this.myForm.reset();
          
            }).catch(
                err => console.log(err, 'placeInfopop error in succs promisse!'));
          }  // end if CtrlDateOk 
   //    } else 
   //          this.toastMsg._presentToast("Données non sauvegardées (Plaque non saisie)");  // end if this.uid
    } 
  }

  updateField (plaqueMin) { //(uid, dispo){
    return {
       userKey: this.dispo.userKey,
       placeKey: this.dispo.placeKey,
       dateDebDispo: this.dispo.dateDebDispo,
       dateFinDispo: this.dispo.dateFinDispo, 
       resNoplaque: plaqueMin,
       userbookKey: this.uidAuth
    } 
  }

  ctrlPlaqueOk(plaqueMin) {
   //  if (plaqueMin...) {
          return true;
   //   } else {
   //       this.toastMsg._presentToast("Date de début supérieur ou égal à date de fin");
   //       return false;
   //   }
  }


  close() {
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('Hello PlaceInfoPopPage Page');
  }

}
