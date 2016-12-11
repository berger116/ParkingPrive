import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Addplaceparking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addplaceparking',
  templateUrl: 'addplaceparking.html'
})
export class AddplaceparkingPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddplaceparkingPage Page');
  }

}
