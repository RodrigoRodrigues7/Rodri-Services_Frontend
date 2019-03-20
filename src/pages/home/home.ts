import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//Esta classe e o controlador da View 'home.html' | O decorator '@Component' e o que torna essa classe um controller
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
