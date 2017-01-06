import { Component } from '@angular/core';
import { NavController,  NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { PlaceParking } from '../../placetobook/placeparking';
import { ToastMsg } from '../../components/toast-msg/toast-msg';

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

  private uidAuth: string;
  private place:any;  //<PlaceParking>;
  private dispo:any;  //<DispoParking>;
  private toastMsg: ToastMsg;

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

      //myDate: String = new Date().toISOString();   utile ??
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

   //   this.uidSubject = new Subject();
   //   this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubject );

   //   console.log("placeInfoPopPage queryObs: ", this.queryObs," Null: ", this.queryObs==null )
   //   if (this.queryObs) {
   //       this.queryObs.subscribe (itms => { 
          //  if (itms)
         //      this.dispos = itms // as Array<DispoParking>;
   //       })
      
   
  }




  close() {
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('Hello PlaceInfoPopPage Page');
  }

}
