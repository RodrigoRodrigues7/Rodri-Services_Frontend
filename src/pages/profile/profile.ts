import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
	picture: string;
	cameraOn: boolean = false;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public storage: StorageService,
		public cliService: ClienteService,
		public camera: Camera) {
	}

	ionViewDidLoad() {
		this.loadData();
	}

	loadData() {
		let localUser = this.storage.getLocalUser();
		if (localUser && localUser.email) {
			this.cliService.findByEmail(localUser.email)
				.subscribe(response => {
					this.cliente = response as ClienteDTO;
					this.getProfileImage_If_Exists();
				}, error => {
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

	getCameraPicture() {
		this.cameraOn = true;
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			this.picture = 'data:image/png;base64,' + imageData;
			this.cameraOn = false;
		}, (error) => {
			console.log(error);
		});
	}

	getGalleryPicture() {
		this.cameraOn = true;
		const options: CameraOptions = {
			quality: 100,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			this.picture = 'data:image/png;base64,' + imageData;
			this.cameraOn = false;
		}, (error) => {
			console.log(error);
		});
	}

	sendPhoto() {
		this.cliService.uploadPhoto(this.picture)
			.subscribe(response => {
				this.picture = null;
				this.loadData();
			}, error => {
				console.log(error);
			});
	}

	cancel() {
		this.picture = null;
	}

}
