import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
	selector: 'page-pick-address',
	templateUrl: 'pick-address.html',
})
export class PickAddressPage {

	items: EnderecoDTO[];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.items = [
			{
				id: "1",
				logradouro: "Rua Quinze de Novembro",
				numero: "300",
				complemento: "APTO 2020",
				bairro: "Santa Mônica",
				cep: "50640220",
				cidade: {
					id: "1",
					nome: "Uberlândia",
					estado: {
						id: "1",
						nome: "Minas Gerais"
					}
				}
			},
			{
				id: "2",
				logradouro: "Rua Tijucas",
				numero: "234",
				complemento: "Casa",
				bairro: "Cordeiro",
				cep: "50640444",
				cidade: {
					id: "2",
					nome: "Recife",
					estado: {
						id: "2",
						nome: "Pernambuco"
					}
				}
			}
		]
	}

}
