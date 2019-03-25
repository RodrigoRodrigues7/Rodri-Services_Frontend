import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/crecenciais.dto';
import { AuthService } from '../../services/auth.service';

//Esta classe e o controlador da View 'home.html' | O decorator '@Component' e o que torna essa classe um controller
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {}

  login() {
    //O método 'push' serve para empilha uma página sobre a outra
    //this.navCtrl.push('CategoriasPage');
    
    //Fazendo a autenticação
    this.auth.authenticate(this.credentials)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  signUp(){
    this.navCtrl.push('SignupPage');
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
