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

	items: ProdutoDTO[] = [];
	page: number = 0;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public produtoService: ProdutoService,
		public loadingCrtl: LoadingController) {
	}

	ionViewDidLoad() {
		this.loadData();
	}

	loadData() {
		let categoriaId = this.navParams.get('categoria_id');
		let loader = this.presentLoading();

		this.produtoService.findByCategoria(categoriaId, this.page, 10)
			.subscribe(response => {
				let start = this.items.length;
				this.items = this.items.concat(response['content']); //Aqui está sendo concatenado a lista de 'items'(vazia) com o conteudo da resposta
				let end = this.items.length - 1;

				loader.dismiss();
				console.log(this.page);
				console.log(this.items);
				this.loadImageUrl(start, end);
			},
				error => {
					loader.dismiss();
				});
	}

	loadImageUrl(start: number, end: number) {
		for (var i=start; i<=end; i++) {
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

	doRefresh(refresher) {
		this.page = 0;
		this.items = [];
		this.loadData();
		setTimeout(() => {
			refresher.complete();
		}, 800);
	}

	doInfinite(infiniteScroll) {
		this.page++;
		this.loadData();
		setTimeout(() => {
			infiniteScroll.complete();
		}, 800);
	}
}
