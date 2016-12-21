import { Component } from '@angular/core';
import { NavController,  NavParams, ViewController } from 'ionic-angular';

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

  //constructor(public navCtrl: NavController) {}

  constructor(public navCtrl: NavController,  public navparams: NavParams, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('Hello PlaceInfoPopPage Page');
  }

}
