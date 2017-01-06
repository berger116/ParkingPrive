import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, ModalController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
//import { PlaceParking } from './../placetobook/placeparking';
import { DispoParking } from './../dispotobook/dispoparking';
import 'rxjs/Rx';

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
  private uidSubject: Subject<any>;
  private queryObs: FirebaseListObservable<any>;
  private uidSubjectRechDispo: Subject<any>;
  private queryRechDispoObs: FirebaseListObservable<any>;  // <DispoParking>;

  private uidAuth: string;
  private loader:any;
  private dispo:any[];
  private place:any[];
  //place = new PlaceParking();

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public fireSVC: FireService,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid");
      // console.log("AroundplacePage UID: ", this.uid);

      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryPlace(this.uidAuth, this.uidSubject);  //   this.uidAuth -> ctrl de l'authentification
      this.uidSubjectRechDispo = new Subject();
      this.queryRechDispoObs = fireSVC.getQueryRechDispo(this.uidAuth, this.uidSubjectRechDispo);

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

    //  if (this.uidAuth)
    //      this.uidSubjectRechDispo.next(null); 

      this.queryRechDispoObs
      .debounceTime(1000)
      .distinctUntilChanged()
      .map(res =>{         
          let filter= []
          res.forEach( resx => {
             console.log ("userKey: ", resx.userKey, " Deb: ",resx.dateDebDispo,"2017-01-03T06:00:00Z"," inside: ",  (resx.dateDebDispo <= "2017-01-03T06:00:00Z"
                                                                                                                      && resx.dateFinDispo >= "2017-01-03T06:00:00Z"));          
             let obj = (resx.dateDebDispo <= "2017-01-03T06:00:00Z"
                        && resx.dateFinDispo >= "2017-01-03T06:00:00Z") ? resx: null;
             if (obj)
                 filter.push (obj) ;              

           }) 
           console.log("filter: ", filter)
           return filter        
            // return res.json()  //json not a function !!
          })
      .subscribe( disp => {
            console.log("Success Response", disp);

            this.dispo = disp;
            for (let i=0; i < this.dispo.length; i++) { //each (obj in disp )  {}
                 //for (let dsp in this.dispo) {
                //console.log(" ionViewDidEnter dsp: ", this.dispo[i])
                 this.completeAddMarker(this.dispo[i]);
            } // end for
       })
       //   function(disp) {
       //      console.log("Success Response", disp);
       //      this.completeAddMarker(disp);
       //      },
       //   function(error) { console.log("Error happened" + error)},
       //   function() { console.log("the subscription is completed")}

       if (this.loader)
          this.hideLoading();
    }

   } // end ionViewDidEnter

   completeAddMarker (dispo) { 
      //console.log("completeAddMarker dispo:", dispo )

        if (this.queryObs) {
          //(console.log("Around completeAddmarker QueryObs: ", this.queryObs)
          console.log("completeAddmarker disp: ", dispo)
      
          this.queryObs   //.toPromise().then ( places =>{
          .debounceTime(1000)
          .distinctUntilChanged()
          .subscribe( places => {
              console.log("completeAddMarker subscribe places", places)
              this.place = places;

          //     places.forEach( place => {
          //     console.log("itm.latitude: ", place.latitude)

                // this.map.addMarker(itm.latitude, itm.longitude, this.addMarkerlistener);
          //     let marker = this.map.addMarker(place.latitude, place.longitude);
          //     this.addMarkerlistener(marker, place, dispo);
          //     })
         
              let marker = this.map.addMarker(this.place[0].latitude, this.place[0].longitude);  
              this.addMarkerlistener(marker, this.place[0], dispo);
          }) 

          if (this.uidAuth)
              this.uidSubject.next(dispo.userKey);   // null pour avoir tout les marker sinon this.uid

       }  //end if 
   }   // end completeAddMarker

   addMarkerlistener(marker, place, dsp) {
       console.log("In addMarkerlistener dsp: ", dsp);
       marker.addListener('click', (res => {
            console.log( 'AroundPlace addlistener: ', res," place: ", place);
            console.log( 'AroundPlace addlistener: ', res," disp: ", dsp);
        
            let popover = this.popoverCtrl.create(Routes.getPage(Routes.PLACEINFOPOP), {place : place, dispo: dsp }); 
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

  private hideLoading(){
       this.loader.dismiss();
  }

   onClickBack(){
    // this.navCtrl.pop()
  }

}
