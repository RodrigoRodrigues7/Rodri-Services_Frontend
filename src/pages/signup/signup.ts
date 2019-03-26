import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myFormGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public estadoService: EstadoService) {

        this.myFormGroup = this.formBuilder.group({
          nome       : ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email      : ['joaquim.V@gmail.com', [Validators.required, Validators.email]],
          tipo       : ['1', [Validators.required]],
          cpfOuCnpj  : ['', [Validators.required], Validators.minLength(11), Validators.maxLength(14)],
          senha      : ['12344321', [Validators.required]],
          logradouro : ['Rua Vai', [Validators.required]],
          numero     : ['25', [Validators.required]],
          complemento: ['Apto 3', []],
          bairro     : ['', []],
          cep        : ['', [Validators.required]],
          telefone1  : ['', [Validators.required]],
          telefone2  : ['', []],
          telefone3  : ['', []],
          estadoId   : [null, [Validators.required]],
          cidadeId   : [null, [Validators.required]]
        });

  }

  signUpUser(){
    console.log("Enviou o Formulário");
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe( response => {
      this.estados = response;
      this.myFormGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  updateCidades() {
    let estadoId = this.myFormGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(response => {
      this.cidades = response;
      this.myFormGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

}
