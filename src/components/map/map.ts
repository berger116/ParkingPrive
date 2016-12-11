import { Component } from '@angular/core';
import { } from "@types/google-maps";

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker } from 'ionic-native';

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

  //map:google.maps.Map;

  //init(lat:number, long:number, zoom:number=12) {

  //this.map = new google.maps.Map(document.getElementById("map_canvas"), {
  //      center: new google.maps.LatLng(lat, long),
  //      zoom: zoom,
  //      mapTypeId: google.maps.MapTypeId.ROADMAP
  //  });
  //}

// ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"

  ionic: GoogleMapsLatLng = new GoogleMapsLatLng(46.2043907, 6.143157699999961);
  markerOptions: GoogleMapsMarkerOptions = {
      position: this.ionic,
      title: 'Test'
  };

  loadMap() {
 // make sure to create following structure in your view.html file
 // <ion-content>
 //  <div #map id="map"></div>
 // </ion-content>

 // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map_canvas');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let posi: GoogleMapsLatLng = new GoogleMapsLatLng(46.2043907, 6.143157699999961);

    // create CameraPosition
    let position: CameraPosition = {
      target: posi,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    // map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: posi,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
    .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
    });
 }

}
