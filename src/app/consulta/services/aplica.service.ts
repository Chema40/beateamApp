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
    

    console.log(filtros);
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

    console.log(filtros);
    
    let pendiente:string = "";
    let recogiendo:string = "";
    let recogida:string = "";
    let desconsolidando:string = "";
    let desconsolidada :string = "";
    let entregada :string = "";
    let incidencia: string = "";

    let check: string[] = [];
        if(filtros.pendiente){
          pendiente = "Pendiente";
          check.push(pendiente);
        }else{
          pendiente;
        }

        if(filtros.recogiendo){
          recogiendo = "Recogiendo";
          check.push(recogiendo);
        }else{
          recogiendo;
        }
        
        if(filtros.recogida){
          recogida = "Recogida";
          check.push(recogiendo);
        }else{
          recogida;
        }

        if(filtros.desconsolidando){
          desconsolidando = "Desconsolidando";
          check.push(desconsolidando);
        }else{
          desconsolidando;
        }

        if(filtros.desconsolidada){
          desconsolidada = "Desconsolidada";
          check.push(desconsolidada);
        }else{
          desconsolidada;
        }
        
        if(filtros.entregada){
          entregada = "Entregada";
          check.push(entregada);
        }else{
          entregada;
        }
        
        if(filtros.incidencia){
          incidencia = "Incidencia";
          check.push(incidencia);
        }else{
          incidencia;
        }

        this.consulta.estado = check; 
    
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

        if(check.length == 0)
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
        

    const u = (params.toString());  
    console.log(u);
    const url = 'https://www.azurglobal.es/intranet/apiTest/';

    return this.http.get<Respuesta>(`${url}?`,{headers:headers, params: params})
              .pipe(
                map(resp =>resp.data) 
              );
  }
}
