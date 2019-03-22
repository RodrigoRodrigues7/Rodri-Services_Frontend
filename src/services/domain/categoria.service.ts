import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaDTO[]> {
        //A crase serve para inserir uma variavel sem precisar concatenando com o '+'
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);

        //É possivel tambem utilizar da maneira abaixo
        //return this.http.get<CategoriaDTO[]>(API_CONFIG.baseUrl + "/categorias");
    }

}