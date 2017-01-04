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
      console.log("PlaceInfoPopPage UID: ", this.place.userKey);  // != uidAuth

      this.dispo = this.navparams.get("dispo");
      console.log("PlaceInfoPopPage UID: ", this.dispo.userKey);  // != uidAuth

      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);
      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubject );

      //myDate: String = new Date().toISOString();   utile ??
      console.log("XXX Dispotobook queryObs: ", this.queryObs," Null: ", this.queryObs==null )
      if (this.queryObs) {
          this.queryObs.subscribe (itms => { 
          //  if (itms)
         //      this.dispos = itms // as Array<DispoParking>;
          })

         //itms.forEach( itm => {
         //      console.log("XXXX itm.dateDebDispo: ", itm.dateDebDispo)   
         // })

          let max= 0;
       //   this.queryObs   //.subscribe (itms => itms.json()) 
       //   .reduce((previous, current) => {
       //      console.log("XXX math:", previous, current) // previous.dateDebDispo > current.dateDebDispo);
       //      console.log("XXX math:", previous[0].dateDebDispo, current[0].dateDebDispo, previous[0].dateDebDispo > current[0].dateDebDispo);
             //return current.dateDebDispo; // Math.max(previous.dateDebDispo, current.dateDebDispo);   //current;
       //      return (previous.dateDebDispo > current.dateDebDispo) ? previous: current;
       //   }).subscribe (itms => { 
       //      if (itms)
       //        console.log("if max:", itms ) // max = itms;
       //      else
       //        console.log("else max:", itms ) // max = 50;
    
              // console.log("max:", max )
              //    this.dispos.forEach( itm => {
              //       console.log("dispos: ", itm.dateDebDispo)
              //    })

      //  }); 
     // })
      }

      if (this.uidAuth)
          this.uidSubject.next(this.uidAuth)

 //  this.queryObs.subscribe( itms => {
    //      itms.forEach( itm => {
    //      console.log("itm.latitude: ", itm.latitude)   
        // let mark = this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);
       // this.addMarkerlistener(marker);
    //      })
    //  })
 
      //this.items.map( item => { item.userKey == this.uid })
      //?? console.log("MARCHE filter: " ,this.queryObs.filter( item => { return item.userKey == this.uid }))
  }



  close() {
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('Hello PlaceInfoPopPage Page');
  }

}
