import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AplicaService } from '../../consulta/services/aplica.service';
import { TipoService } from '../../consulta/services/tipo.service';
import { EstadosService } from '../../consulta/services/estados.service';

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
    estado:new FormArray([]),
  });

   tipos:string[]=[];
   estados:string[]=[];

  constructor(private fb:FormBuilder,
              private aplicaService:AplicaService,
              private tipoService:TipoService,
              private estadoService:EstadosService) {}


  ngOnInit(): void {

    this.tipoService.tipo()
      .subscribe((tipos) => {
          this.tipos = tipos;
        });
    
    this.estadoService.tipo()
      .subscribe((estados) => {
            this.estados = estados;
          });

  }

  marcado(event:any){
    const estado:FormArray = this.formulario.get('estado') as FormArray;
  
    if(event.target.checked){
      estado.push(new FormControl(event.target.value));
    }else{
      const index = estado.controls.findIndex(x => x.value === event.target.value);
      estado.removeAt(index);
    }
  }

  //enviar filtros con el servicio
  enviarFiltros(filtros: any){
    this.aplicaService.enviar(filtros);
  }

  
}
