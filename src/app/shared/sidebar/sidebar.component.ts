import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AplicaService } from '../../consulta/services/aplica.service';
import { TipoService } from '../../consulta/services/tipo.service';

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

   tipos:string[]=[];

  constructor(private fb:FormBuilder,
              private aplicaService:AplicaService,
              private tipoService:TipoService) { }

  ngOnInit(): void {

    this.tipoService.tipo()
      .subscribe((tipos) => {
          this.tipos = tipos;
          console.log(this.tipos);
        })

  }

  //enviar filtros con el servicio
  enviarFiltros(filtros: any){
    this.aplicaService.enviar(filtros);
  }

  
}
