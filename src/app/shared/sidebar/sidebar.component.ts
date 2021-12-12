import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltrosService } from '../../consulta/services/filtros.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    cliente: [''],
    referencia: [''],
    usuario: [''],
    fecha1:[''],
    fecha2:[''],
    tipo:['Todos'],
    pendiente:[false],
    recogiendo:[false],
    recogida:[false],
    desconsolidando:[false],
    desconsolidada:[false],
    entregada:[false],
    inidicencia:[false]
  });

  constructor(private fb:FormBuilder,
              private filtrosService:FiltrosService) { }

  ngOnInit(): void {}

  //enviar "filtros" con el servicio
  enviarFiltros(filtros: any){
    this.filtrosService.enviar(filtros);

  }

  
}
