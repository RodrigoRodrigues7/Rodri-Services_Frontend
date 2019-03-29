import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
	selector: 'page-produtos',
	templateUrl: 'produtos.html',
})
export class ProdutosPage {

	items: ProdutoDTO[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoService: ProdutoService,
		public loadingCrtl: LoadingController) {
	}

	ionViewDidLoad() {
		let categoriaId = this.navParams.get('categoria_id');
		let loader = this.presentLoading();

		this.produtoService.findByCategoria(categoriaId)
			.subscribe(response => {
				this.items = response['content'];
				loader.dismiss();
				this.loadImageUrl();
			},
				error => {
					loader.dismiss();
				});
	}

	loadImageUrl() {
		for (var i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			this.produtoService.getSmallImageFromBucket(item.id)
				.subscribe(response => {
					item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
				},
					error => { });
		}
	}

	showDetails(produto_id: string) {
		//Esse objeto no final do método, significa que eu estou passando um parâmetro para a próxima página
		this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
	}

	presentLoading() {
		let loader = this.loadingCrtl.create({
			content: "Aguarde um momento ..."
		});
		loader.present();
		return loader;
	}

}
