import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastMsg component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
 //selector: 'toast-msg',
 //templateUrl: 'toast-msg.html'
  template: '{{text}}'
})
export class ToastMsg {

  //text: string;

  constructor(private toastCtrl: ToastController) {
   //console.log('Hello ToastMsg Component');
   // this.text = 'Hello World';
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Element was added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
