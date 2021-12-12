import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datos, Respuesta } from '../interfaces/consulta.interface';
import * as CryptoJS from "crypto-js";
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient) { }

  consulta():Observable<Datos[]> {


    const date:Date = new Date();
    const fecha:string = date.toISOString().split('T')[0].replace(/-/g, '');
    const nombre: string = 'JOSEMARI'
    const tok:string = nombre + fecha;
    const encrip: string = CryptoJS.SHA384(tok).toString()
    

    const headers = new HttpHeaders()
        .set('funcion','getTareas')
        .set('X-Auth', encrip);
                   
    const url = 'https://www.azurglobal.es/intranet/apiTest/';
    return this.http.get<Respuesta>(url,{headers})
              .pipe(
                map(resp => resp.data)
              )
  }
}
