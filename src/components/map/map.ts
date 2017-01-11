import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { } from "@types/google-maps";

// "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLrm5bE2FunvVF4cXFLGuorEl8UCRQtPc"

@Component({
  selector: 'map',
  template: "<div id='map_canvas'></div>"
})
export class Map {
  map:google.maps.Map;  

  constructor(public navCtrl: NavController,
              public navparams: NavParams) {} 

  initMap( zoom:number=12) {
     //position de la Map
     let myLatLng = { lat: 46.2043907, lng: 6.143157699999961 }; 

     this.map = new google.maps.Map(document.getElementById("map_canvas"), {
       center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng),
       zoom: zoom,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
  }

  addMarker(lat: number, lng:number) {     //callbck(this.marker);  //this.modalCtrl undefined dans le callback
     let marker:any = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        title:"My positioon !"
     });
       
     // this.marker.addListener( 'click', ( () => { this.select.emit("console.log('emit test');" )} )) //next("I was a map click")
     // google.maps.event.addListener(this.marker, 'click', ( () => this.select.emit("console.log('emit test');" ) ))  //next("I was a map click")
     // To add the marker to the map, call setMap();
     marker.setMap(this.map); 
     return  marker;
  }


}
