import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estados } from '../interfaces/consulta.interface';
import * as CryptoJS from "crypto-js";
import { map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http:HttpClient) { }

  tipo():Observable<string[]> {


    const date:Date = new Date();
    const fecha:string = date.toISOString().split('T')[0].replace(/-/g, '');
    const nombre: string = 'JOSEMARI'
    const tok:string = nombre + fecha;
    const encrip: string = CryptoJS.SHA384(tok).toString()
    

    const headers = new HttpHeaders()
        .set('funcion','getEstados')
        .set('X-Auth', encrip);
                   
    const url = 'https://www.azurglobal.es/intranet/apiTest/';
    return this.http.get<Estados>(url,{headers})
              .pipe(
                map(respuesta => respuesta.data)
              )
  }


}
