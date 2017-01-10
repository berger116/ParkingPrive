import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AroundplacePage } from '../around/aroundplace';
import { PlacetobookPage } from '../placetobook/placetobook';
import { RecherchePage } from '../recherche/recherche';
import { DisplaybookingPage } from '../displaybooking/displaybooking';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Tabs tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = RecherchePage;
  tab2Root: any = PlacetobookPage;
  tab3Root: any = AroundplacePage;
  tab4Root: any = DisplaybookingPage

  uidAuth: string;
  chatParams: any;

   constructor(public navCtrl: NavController,
               public navparams: NavParams,
               public af: AngularFire) {  
     
       this.uidAuth = this.navparams.get("uid");
       console.log ("Tabs Cstr uid: ", this.uidAuth);
  }

  ngOnInit() {
      this.chatParams = {
        uid: this.uidAuth 
      }; //this.navParams.get("uid")
  }

  logout() {
    // this.auth.logout();
    console.log("tabs logout")
    this.af.auth.logout();
    this.navCtrl.pop(Routes.getPage(Routes.TABS)); 
  
    this.navCtrl.setRoot(Routes.getRootPage(false));
  }
  
}
