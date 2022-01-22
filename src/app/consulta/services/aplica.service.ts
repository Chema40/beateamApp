import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { Datos, Filtro, Respuesta } from '../interfaces/consulta.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Consulta } from '../interfaces/consulta.interface';


@Injectable({
  providedIn: 'root'
})
export class AplicaService {

  private filtros: Subject<Filtro> = new Subject<Filtro>();
 
  private consulta:Consulta = {};

  constructor(private http:HttpClient) { }
  
  getFiltroObservable(){
    return this.filtros.asObservable();
  }

  enviar(filtros:Filtro){
    this.filtros.next(filtros);
  }

  filtrar(filtros:Filtro): Observable<Datos[]>{
    const date:Date = new Date();
    const fecha:string = date.toISOString().split('T')[0].replace(/-/g, '');
    const nombre: string = 'JOSEMARI'
    const tok:string = nombre + fecha;
    const encrip: string = CryptoJS.SHA384(tok).toString()
    

    const headers = new HttpHeaders()
        .set('funcion','getTareas')
        .set('X-Auth', encrip);
    
    if(filtros.fecha1 == null)
    {
      filtros.fecha1 = "";
    }

    if(filtros.fecha2 == null)
    {
      filtros.fecha2 = "";
    }

    if(filtros.referencia == null)
    {
      this.consulta.referencia = '';
    }else{
      this.consulta.referencia = filtros.referencia;
    }

    if(filtros.cliente == null)
    {
      this.consulta.cliente = '';
    }else{
      this.consulta.cliente = filtros.cliente;
    }

    if(filtros.usuario == null)
    {
      this.consulta.usuario= "";
    }else{
      this.consulta.usuario = filtros.usuario;
    }

    if(filtros.tipo === null){
      filtros.tipo = "Todos";
    }

    if(filtros.estado === null){
      this.consulta.estado = [];
    }else{
      this.consulta.estado= filtros.estado;
    }
    
    if(filtros.tipo == 'Todos')
       {
           filtros.tipo = "";
           this.consulta.tipo = [filtros.tipo, "", ""];
       }else{
           this.consulta.tipo = [filtros.tipo, "", ""];
       }
    
    //Filtrado de datos
    let params = new HttpParams()
        .set("referencia", this.consulta.referencia)
        .set("cliente", this.consulta.cliente)
        .set("usuario", this.consulta.usuario);

        if(filtros.fecha1 ==""){
          params = params.set("fecha[inicio]", "")
        }else{
          params = params.set("fecha[inicio]", filtros.fecha1)
        }

        if(filtros.fecha2 ==""){
          params = params.set("fecha[fin]", "")
        }else{
          params = params.set("fecha[fin]", filtros.fecha2)
        }

        if(filtros.estado == [])
        {
          params = params.set("estado","");
        }else{
          this.consulta.estado.forEach((estado:string)=>{
            params = params.append("estado[]", estado)
          })
        }

        if(filtros.tipo == ""){
          params = params.set("tipo","");
        }else{
          params = params.set("tipo[]", this.consulta.tipo[0] );
        }
        
    const url = 'https://www.azurglobal.es/intranet/apiTest/';

    return this.http.get<Respuesta>(`${url}?`,{headers:headers, params: params})
              .pipe(
                map(resp =>resp.data) 
              );
  }
}
