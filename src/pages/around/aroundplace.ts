import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { PlaceParking } from '../../placetobook/placeparking';
//import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';

//import {
// GoogleMap,
// GoogleMapsEvent,
// GoogleMapsLatLng,
// CameraPosition,
// GoogleMapsMarkerOptions,
// GoogleMapsMarker } from 'ionic-native';
/*
  Generated class for the Around page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-around',
  templateUrl: 'aroundplace.html',
})

//@Component({
// selector: 'my-map-cmp',
// directives: [SebmGoogleMap, SebmGoogleMapMarker],
// styles: [`
//   .sebm-google-map-container {
//     height: 300px;
//   }
//`],
// template: `
//   <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
//     <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
//     </sebm-google-map-marker>
//   </sebm-google-map>
// `
//})

export class AroundplacePage {
  uidSubject: Subject<any>;
  uidSubjectRechDispo: Subject<any>;
  queryObs: FirebaseListObservable<any>;
  queryRechDispoObs: FirebaseListObservable<any>;
  uidAuth: string;

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public fireSVC: FireService,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {

      this.uidAuth = this.navparams.get("uid");
      // console.log("AroundplacePage UID: ", this.uid);

      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryPlace(this.uidAuth, this.uidSubject);  //   this.uidAuth -> ctrl de l'authentification
      this.uidSubjectRechDispo = new Subject();
      this.queryRechDispoObs = fireSVC.getQueryRechDispo(this.uidAuth, this.uidSubject);

      // if (this.queryObs) { 
      //    console.log("around queryObs: ", this.queryObs)
      //    this.queryObs.subscribe(snapshots=>{
      //        snapshots.forEach(snapshot => {
      //        console.log("snapshot: ",snapshot.key, snapshot.val());
      //       });  
      //    });
      // } 
  }

  ionViewDidEnter() {
    this.map.initMap();

    if (this.queryRechDispoObs) {
      console.log("Around queryRechDispoObs: ", this.queryRechDispoObs)

      this.queryRechDispoObs
      .map(res =>{
               //console.log ("map: res: ",  res[0].dateDebDispo,  res[0].dateFinDispo)
              // console.log ("map: deb < fin: ",  new Date(res[].dateDebDispo), new Date(res[].dateFinDispo)," date jour: ", new Date( res.dateDebDispo))
             res.forEach( resx => {
               console.log (resx.dateDebDispo,"2017-01-03T06:00:00Z"," >: ", (resx.dateDebDispo >= "2017-01-03T06:00:00Z"));
               return (resx.dateDebDispo >= "2017-01-03T06:00:00Z") ? resx: null;
             } )          
             // return {res.dateDebDispo, res.userKey};
             // return res.json()  //json not a function !! 
            // return res;   //flux continu !!      
          })
      .subscribe( disp => {
         disp.forEach ( dis =>{
              this.completeAddMarker (disp) 
         })
           
      
      //t .subscribe( itms => {
          // console.log("avant for itm.lat: ", itms)
      //t     itms.forEach( disp => {
            //console.log("itm.dateDebDispo: ", disp.dateDebDispo)
      //t    this.completeAddMarker (disp) 
            //let marker = this.map.addMarker(itm.latitude, itm.longitude);
            //this.addMarkerlistener(marker, itm);
      //t    })
      })

      if (this.uidAuth)
          this.uidSubject.next(null); //("2017-01-03T06:00:00Z");   // recherche sur une date de debut en dur
    }

      // this.queryObs.forEach( itm => {
      //    console.log("itm.lat: ", itm.latitude )
        //  this.(map.initMarker(itm.latitude, itm.longitude);
      // }).then ( itm => {
      //      console.log("itm.lat: ", itm[0].latitude )
      //      this.map.initMarker(itm[0].latitude, itm[0].longitude);
      //    }).catch ( err => {
      //      console.log("error", err);
      //    })

   } // end ionViewDidEnter

   completeAddMarker (disp) {
      if (this.queryObs) {
          console.log("Around queryObs: ", this.queryObs)
      
          this.queryObs
          .subscribe( itms => {
              // console.log("avant for itm.lat: ", itms)
              itms.forEach( place => {
                // console.log("itm.latitude: ", itm.latitude)

                // this.map.addMarker(itm.latitude, itm.longitude, this.addMarkerlistener);
                let marker = this.map.addMarker(place.latitude, place.longitude);
                this.addMarkerlistener(marker, place, disp);
              })
          })

          if (this.uidAuth)
            this.uidSubject.next(disp.userKey);   // null pour tout les marker sinon this.uid
      }  //end if
   } 

   addMarkerlistener(marker, place, disp) {
       marker.addListener('click', (res => {
            console.log('add listener: ', res," plc: ", place);
        
            let popover = this.popoverCtrl.create(Routes.getPage(Routes.PLACEINFOPOP), {place : place, dispo: disp }); 
            popover.present(); //{ param: myEvent });

          //  let modal = this.modalCtrl.create(Routes.getPage(Routes.PLACEINFOPOP)); 
          //  modal.present(); //{ param: myEvent });
       } ));
   }

  //     this.af.database.list('/users', { preserveSnapshot: true})
  //  .subscribe(snapshots=>{
  //      snapshots.forEach(snapshot => {
  //        console.log(snapshot.key, snapshot.val());
  //      });
  //  })

  
   onClickBack(){
    // this.navCtrl.pop()
  }

}
