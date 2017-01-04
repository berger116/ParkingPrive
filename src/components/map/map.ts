import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { } from "@types/google-maps";
import { Routes } from '../../app/app.routes';

//import {
 //GoogleMap,
 //GoogleMapsEvent,
 //GoogleMapsLatLng,
 //CameraPosition,
 //GoogleMapsMarkerOptions,
 //GoogleMapsMarker } from 'ionic-native';

// "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLrm5bE2FunvVF4cXFLGuorEl8UCRQtPc"

/*
  Generated class for the Maps component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  template: "<div id='map_canvas'></div>"
})
export class Map {
  map:google.maps.Map;  

 //() @Output() select:EventEmitter<any> = new EventEmitter();  //??

  constructor(public navCtrl: NavController,
              public navparams: NavParams) {} 

  //var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  initMap( zoom:number=12) {
     //position de la Map
     let myLatLng = { lat:  46.2043907, lng: 6.143157699999961 }; // 46.2043907, 6.143157699999961

     this.map = new google.maps.Map(document.getElementById("map_canvas"), {
       //center: new google.maps.LatLng(lat, long),
       center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng),
       zoom: zoom,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
  }

  addMarker(lat: number, lng:number) {  // , callbck) {     //callbck(this.marker);  //this.modalCtrl undefined dans le callback
     //let myLatLng = { lat, lng }; // 46.2043907, 6.143157699999961
     let marker:any = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng), //myLatLng,
        title:"Hello World!"
     });
       
     // this.marker.addListener( 'click', ( () => { this.select.emit("console.log('emit test');" )} )) //next("I was a map click")
     // google.maps.event.addListener(this.marker, 'click', ( () => this.select.emit("console.log('emit test');" ) ))  //next("I was a map click")
     // To add the marker to the map, call setMap();
     marker.setMap(this.map); 
     return  marker;
  }


// ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"

  //pos: GoogleMapsLatLng = new GoogleMapsLatLng(46.2043907, 6.143157699999961);
  //markerOptions: GoogleMapsMarkerOptions = {
  //    position: this.pos,
  //    title: 'Test'
  //};

 // loadMap() {
 // make sure to create following structure in your view.html file
 // <ion-content>
 //  <div #map id="map"></div>
 // </ion-content>

 // create a new map by passing HTMLElement
 //    let element: HTMLElement = document.getElementById('map_canvas');
 //    let map = new GoogleMap(element);

  // listen to MAP_READY event
  //    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

   // create LatLng object
   //let posi: GoogleMapsLatLng = new GoogleMapsLatLng(46.2043907, 6.143157699999961);

   // create CameraPosition
   //let position: CameraPosition = {
   //  target: posi,
   //  zoom: 18,
   //  tilt: 30
   //};

    // move the map's camera to position
    // map.moveCamera(position);

    // create new marker
    //let markerOptions: GoogleMapsMarkerOptions = {
    //  position: posi,
    //  title: 'test'
    //};

   // map.addMarker(markerOptions)
   // .then((marker: GoogleMapsMarker) => {
   //     marker.showInfoWindow();
   // });
   
//});


}
