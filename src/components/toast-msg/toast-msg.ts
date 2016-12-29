//import { Component } from '@angular/core';
import { ToastController,  AlertController } from 'ionic-angular';

/*
  Generated class for the ToastMsg component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

//@Component({
 ////selector: 'toast-msg',
 ////templateUrl: 'toast-msg.html'
 // template: '{{text}}'
//})
export class ToastMsg {

  constructor( private toastCtrl: ToastController,
               private alertCtrl: AlertController) {  }

 //Affichage de messages 
  _presentToast(msg):void {
    let toast = this.toastCtrl.create({
      message:  msg, 
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
     //console.log('Dismissed toast');
    });

    toast.present();
  }

  _showAlert(msg):void {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: msg,
 //     subTitle: `
 //       Cet additif n'est pas encore répértorié dans la base de donnée.
 //     `,
      buttons: ['OK']
    });

    alert.present();
  }

}
