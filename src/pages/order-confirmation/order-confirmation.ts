import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';


@IonicPage()
@Component({
	selector: 'page-order-confirmation',
	templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

	pedido: PedidoDTO;
	cartItems: CartItem[];
	cliente: ClienteDTO;
	endereco: EnderecoDTO;
	codPedido: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public cartService: CartService,
		public clienteService: ClienteService,
		public pedidoService: PedidoService) {

		this.pedido = this.navParams.get('pedido');
	}

	ionViewDidLoad() {
		this.cartItems = this.cartService.getCart().items;
		this.clienteService.findById(this.pedido.cliente.id)
			.subscribe(response => {
				this.cliente = response as ClienteDTO; //Aqui está sendo feito um 'casting', do cliente recebido pelo 'back' para o clienteDTO do 'front'
				this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
			},
				error => {
					this.navCtrl.setRoot('HomePage');
				});
	}

	private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
		let position = list.findIndex(x => x.id == id);
		return list[position];
	}

	checkout() {
		this.pedidoService.insert(this.pedido)
		.subscribe(response => {
			this.cartService.createOrClearCart();
			console.log(response.headers.get('location'));
			this.codPedido = this.extractPedidoId(response.headers.get('location'));
		},
		error => {
			if(error.status == 403) {
				this.navCtrl.setRoot('HomePage');
			}
		});
	}

	back() {
		this.navCtrl.setRoot('CartPage');
	}

	home() {
		this.navCtrl.setRoot('CategoriasPage');
	}

	total() {
		return this.cartService.totalCartValue();
	}

	//Função criada para resgatar o 'Id' que vem do header 'location'
	private extractPedidoId(location: string) : string {
		let position = location.lastIndexOf('/');
		return location.substring(position + 1, location.length);
	}

}
