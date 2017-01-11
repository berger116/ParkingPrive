import { Component, ViewChild } from '@angular/core';  //ViewChild
import { NavController, NavParams, ViewController } from 'ionic-angular'; 
import { Map } from '../../components/map/map';

@Component({
  selector: 'page-locateplacetobook',
  templateUrl: 'locateplacetobook.html'
})
export class LocateplacetobookPage {
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
      console.log("LocateplacetobookPage Cstr UID: ", this.uidAuth, " myLatLng: ", this.myLatLng );
  }

  ionViewDidEnter(){
    console.log("LocateplacetobookPage ionViewDidEnter avant");
    console.log("LocateplacetobookPage ionViewDidEnter apr");
      this.map.initMap();
      this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);  
   }     

   close() {
      this.viewCtrl.dismiss();
   }
  
}

