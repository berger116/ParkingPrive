import { Component, ViewChild } from '@angular/core';  //ViewChild
import { NavController, NavParams, ViewController } from 'ionic-angular'; 
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
//import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
//import { FireService } from '../../providers/fireservice';
//import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'page-locateplacetobook',
  templateUrl: 'locateplacetobook.html'
})
export class LocateplacetobookPage {
  //uidSubject: Subject<any>;
  //queryObs: FirebaseListObservable<any>;
  uidAuth: string;
  myLatLng:any;

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public viewCtrl: ViewController) {

      this.uidAuth = this.navparams.get("uid");
      this.myLatLng = this.navparams.get("latLng");
      this.map = this.navparams.get("map");
      console.log("LocateplacetobookPage UID: ", this.uidAuth, " myLatLng: ", this.myLatLng );
  }

  ngOnInit(){
    console.log("-----initmap")
    setTimeout (_ =>{ 
      console.log("-----initmap 3 s");
      this.map.initMap();
      let mark = this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);  
    }, 4000);

  }
  //ionViewDidEnter(){
  ionViewDidEnter(){
    console.log("LocateplacetobookPage ionViewDidEnter avant");
    console.log("LocateplacetobookPage ionViewDidEnter apr");
      this.map.initMap();
      let mark = this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);  

    //if (this.queryObs) {
    //  console.log("LocateplacetobookPage queryObs: ", this.queryObs)
   
    //  this.queryObs.subscribe( itms => {
    //      itms.forEach( itm => {
    //      console.log("itm.latitude: ", itm.latitude)   
  // t       let mark = this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);
       // this.addMarkerlistener(marker);
    //      })
    //  })
   }     

   addMarkerlistener(marker) {
        console.log("listener");
       // marker.addListener('click', (res => {
       //  console.log('add listener: ', res);
    
   //     let popover = this.popoverCtrl.create(Routes.getPage(Routes.PLACEINFOPOP)); 
   //     popover.present(); //{ param: myEvent });
   //   } ));  
   }

   close() {
      this.viewCtrl.dismiss();
   }
  
 //  onClickBack(){
    // this.navCtrl.pop()
 // }

}

