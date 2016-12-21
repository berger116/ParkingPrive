import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';
//import {AddPage} from '../pages/add/add';
//import {FriendsPage} from '../pages/friends/friends';
import { AroundplacePage } from '../pages/around/aroundplace';
import { PlacetobookPage } from '../pages/placetobook/placetobook';
import { DispotobookPage } from '../pages/dispotobook/dispotobook';
import { PlaceInfoPopPage } from '../pages/place-info-pop/place-info-pop';
//import {LoginPage} from '../login/login';
//import {PlacesPage} from '../pages/places/places';
//import {SignupPage} from '../pages/signup/signup';
//import {PlacePage} from '../pages/place/place';
//import {SettingsPage} from '../pages/settings/settings';

export class Routes {

  static HOME:string="home";
  static LOGIN:string="login";
  static TABS:string="tabs";  
  static PLACETOBOOK:string="placetobook";
  static DISPOTOBOOK:string="dispotobook";
  static AROUNDPLACE:string="aroundplace";
  static PLACEINFOPOP:string="placeinfopop";
 // static SIGNUP:string="signup";

  static pages = {
    [Routes.LOGIN]: LoginPage,
    [Routes.HOME]: HomePage,
    [Routes.TABS]: TabsPage,
    [Routes.PLACETOBOOK]: PlacetobookPage,
    [Routes.DISPOTOBOOK]: DispotobookPage,
    [Routes.AROUNDPLACE]: AroundplacePage,
    [Routes.PLACEINFOPOP]: PlaceInfoPopPage,
 //   [Routes.PLACES]: PlacesPage,
 //   [Routes.FRIENDS]: FriendsPage,
 //   [Routes.SIGNUP]: SignupPage,
 //   [Routes.PLACE]: PlacePage,
 //   [Routes.SETTINGS]: SettingsPage,
  };

  static getPage(id){
    console.log ("getPage " + id);
    const route = Routes.pages[id];
   // alert ("page " + route);
    return route;
  }

  static getRootPage(authenticated){
    console.log ("getRoutePage " + authenticated );
    let root = (authenticated) ? Routes.getPage(Routes.TABS) : Routes.getPage(Routes.HOME);
    return root;
  }

  static getPages(){
    const pages = []
    for (var key in Routes.pages) {
      pages.push(Routes.pages[key]);
    }
    return pages;
  }

  static getDeepLinkerConfig(){
    const config = {links:[]}
    for (var key in Routes.pages) {
      config.links.push({ component: Routes.pages[key], name: key});
    }
    return config;
  }
}
