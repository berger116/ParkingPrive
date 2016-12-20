import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { PlacesPage } from '../places/places';
import { AroundplacePage } from '../around/aroundplace';
import { PlacetobookPage } from '../placetobook/placetobook';
import { Routes } from '../../app/app.routes';
//import { Auth } from '../../providers/auth';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

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

 // tab1Root: any = HomePage;
 // tab2Root: any = AddPage;
  tab2Root: any = PlacetobookPage;
  tab3Root: any = AroundplacePage;
 // tab4Root: any = FriendsPage;
 // tab5Root: any = SettingsPage;

  email: string;
  chatParams = {
    uid: this.navParams.get("uid")
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {  
   //// this.email = (auth.user) ? auth.user.email : null
   //console.log ("Tabs: ",  this.navParams.get("uid")) 
  }

  logout() {
    // this.auth.logout();
    console.log("tabs logout")
    this.af.auth.logout();
    this.navCtrl.pop(Routes.getPage(Routes.TABS)); 
  
    this.navCtrl.setRoot(Routes.getRootPage(false));
  }
  
}
