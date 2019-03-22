import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

//Esta classe e o controlador da View 'home.html' | O decorator '@Component' e o que torna essa classe um controller
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    //O método 'push' serve para empilha uma página sobre a outra
    //this.navCtrl.push('CategoriasPage');
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
