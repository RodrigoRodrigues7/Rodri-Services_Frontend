import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";

import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no Interceptor");
        return next.handle(req)
            .catch((error, caught) => {

                //Verificando se no 'error' da resposta ele tem o campo 'error'
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                //Verificando se a responta vem no formato de texto e convertendo ele para un 'JSON'
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro Detectado pelo Interceptor.");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle_401();
                        break;

                    case 403:
                        this.handle_403();
                        break;

                    default:
                        this.handleDefaultError(errorObj);
                        break;

                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle_403() {
        this.storage.setLocalUser(null);
    }

    handle_401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'Email ou Senha Incorretos',
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
