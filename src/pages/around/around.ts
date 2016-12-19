import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { Subject } from 'rxjs/Subject';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker } from 'ionic-native';
/*
  Generated class for the Around page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-around',
  templateUrl: 'around.html',
})
export class AroundPage {
  uidSubject: Subject<any>;
  queryObs: FirebaseListObservable<any>;
  uid: string;

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController, public navparams: NavParams, public authSVC: AuthService) {
    this.uid = this.navparams.get("uid");
    console.log("addPlaceParking UID: ", this.uid);
    //if (this.uid)
    //     this.uidSubject.next(this.uid)   => plante si ici

    this.uidSubject = new Subject();
    this.queryObs = authSVC.getQueryPkgPlace(this.uid,  this.uidSubject );

    if (this.uid)
        this.uidSubject.next(this.uid)

     if (this.queryObs) { 
        console.log("around queryObs: ", this.queryObs)
        this.queryObs.subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
            console.log("snapshot: ",snapshot.key, snapshot.val());
           });  
        });
     }

  }

  ionViewDidEnter(){
    this.map.initMap();

    if (this.queryObs) { 
    //   console.log("around queryObs: ", this.queryObs)
   ////   this.queryObs.forEach( (itm) => {
   //    this.queryObs.subscribe( (itms) => {
   //      itms.forEach( itm => {
   //        console.log("itm.lat: ", itm.latitude )
   //        this.map.initMarker(itm.latitude, itm.longitude);

   //    this.queryObs.subscribe(snapshots=>{
   //         snapshots.forEach(snapshot => {
   //         console.log("snapshot: ",snapshot.key, snapshot.val());
   //    });  
   // });
  }
       
  //     this.af.database.list('/users', { preserveSnapshot: true})
  //  .subscribe(snapshots=>{
  //      snapshots.forEach(snapshot => {
  //        console.log(snapshot.key, snapshot.val());
  //      });
  //  })

   //this.map.loadMap();
  }
  

}
