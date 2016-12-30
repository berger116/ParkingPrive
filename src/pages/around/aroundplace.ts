import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
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
  queryObs: FirebaseListObservable<any>;
  uid: string;

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController, public navparams: NavParams, public modalCtrl: ModalController, public fireSVC: FireService) {
    this.uid = this.navparams.get("uid");
    console.log("addPlaceParking UID: ", this.uid);

    this.uidSubject = new Subject();
    this.queryObs = fireSVC.getQueryPlace(this.uid, this.uidSubject);
    
    // if (this.queryObs) { 
    //    console.log("around queryObs: ", this.queryObs)
    //    this.queryObs.subscribe(snapshots=>{
    //        snapshots.forEach(snapshot => {
    //        console.log("snapshot: ",snapshot.key, snapshot.val());
    //       });  
    //    });
    // } 
  }

  ionViewDidEnter(){
    this.map.initMap();
    //this.map.addMarker(46.2043907, 6.143157699999961, this.addMarkerlistener);

    if (this.queryObs) {
      console.log("Around queryObs: ", this.queryObs)
   
      this.queryObs.subscribe( itms => {
          // console.log("avant for itm.lat: ", itms)
          itms.forEach( itm => {
            console.log("itm.latitude: ", itm.latitude)
            this.map.addMarker(itm.latitude, itm.longitude, this.addMarkerlistener);
          })
      })

      if (this.uid)
        this.uidSubject.next(this.uid); 

      // this.queryObs.forEach( itm => {
      //    console.log("itm.lat: ", itm.latitude )
        //  this.(map.initMarker(itm.latitude, itm.longitude);
      // }).then ( itm => {
      //      console.log("itm.lat: ", itm[0].latitude )
      //      this.map.initMarker(itm[0].latitude, itm[0].longitude);
      //    }).catch ( err => {
      //      console.log("error", err);
      //    })

       }   //end if
   }     

   addMarkerlistener(marker) {
        console.log("listener")
    //    marker.addListener('click', (res => {
      //     let modal = this.modalCtrl.create(Routes.getPage(Routes.DISPOTOBOOK));
      //     // this.nav.present(contactModal)
      //     modal.present();
    //     })
    //);

    //    this.marker.addListener( 'click', ( (res) => {
    //     console.log('emit test', res)
    //     let modal = this.modalCtrl.create(Routes.getPage(Routes.LOGIN));
    //     modal.present();
    //    } ))
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
