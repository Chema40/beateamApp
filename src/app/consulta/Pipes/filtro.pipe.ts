import { Pipe, PipeTransform } from '@angular/core';
import { Datos } from '../interfaces/consulta.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(datos: Datos[], filtros: any[]):any{
    
    
    // const tablaFiltrada: Datos[] =[];
    
    // for(const dato of datos){
    //   if(dato.usuario?.toLowerCase.indexOf(arg) > -1){

    //   };
    // };

    // return tablaFiltrada;

    
    // if(!filtros) return [];
    
    // const datosFiltrados = datos.filter()
    
    // return filtros.filter(singleItem => 
    //     singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
    //   );
  }
}
