import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { PlacesPage } from '../places/places';
import { AroundPage } from '../around/around';
import { AddplaceparkingPage } from '../addplaceparking/addplaceparking';
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
  tab2Root: any = AddplaceparkingPage;
  tab3Root: any = AroundPage;
 // tab4Root: any = FriendsPage;
 // tab5Root: any = SettingsPage;

  email: string;

  constructor(public navCtrl: NavController, public af: AngularFire) {  // ,private auth: Auth
   // this.email = (auth.user) ? auth.user.email : null
  }

  logout() {
    // this.auth.logout();
    console.log("tabs logout")
    this.af.auth.logout();
     this.navCtrl.pop(Routes.getPage(Routes.TABS)); 
  
    this.navCtrl.setRoot(Routes.getRootPage(false));
  }
  
}
