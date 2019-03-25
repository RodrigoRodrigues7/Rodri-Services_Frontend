import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	cliente: ClienteDTO;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public storage: StorageService,
		public cliService: ClienteService) {
	}

	ionViewDidLoad() {
		let localUser = this.storage.getLocalUser();
		if (localUser && localUser.email) {
			this.cliService.findByEmail(localUser.email)
				.subscribe(response => {
					this.cliente = response;
					this.getProfileImage_If_Exists();
				},
				error => {
					if (error.status == 403) {
						this.navCtrl.setRoot('HomePage');
					}
				});
		} else {
			this.navCtrl.setRoot('HomePage');
		}
	}

	getProfileImage_If_Exists() {
		this.cliService.getImageFromBucket(this.cliente.id)
			.subscribe(response => {
				this.cliente.imgUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
			},
				error => { });
	}

}
