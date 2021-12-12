import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Filtro } from '../interfaces/consulta.interface';


@Injectable({
  providedIn: 'root'
})

export class FiltrosService {

  private filtro: Subject<Filtro> = new Subject<Filtro>();
  
  constructor() { }
  
  getFiltroObservable(){
    return this.filtro.asObservable();
  }

  enviar(filtros:Filtro){
    this.filtro.next(filtros);
  }
}  

