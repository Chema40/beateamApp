import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Datos, Filtro } from '../../interfaces/consulta.interface';
import { FiltrosService } from '../../services/filtros.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit{

  aux: Datos [] = [];
  datos: Datos[] = [];
  linea: number = 0;
  config: any;
  tooltip: string =''
  filtro: Filtro = {
    cliente: "",
    referencia: '',
    usuario: '',
    fecha1: new Date(),
    fecha2: new Date(),
    tipo: "",
    pendiente:false,
    recogiendo:false,
    recogida:false,
    desconsolidando:false,
    desconsolidada:false,
    entregada:false,
    inidicencia:false
  };

  pendiente:string = "";
  recogiendo:string = "";
  recogida:string = "";
  desconsolidando:string = "";
  desconsolidada :string = "";
  entregada :string = "";
  incidencia: string = "";



  constructor(private consultaService:ConsultaService,
              private filtrosServices:FiltrosService) {
      this.config = {
      itemsPerPage: 14,
      currentPage: 1,
      totalItems: this.datos.length,
      
    };

      this.tooltip = '<strong>test</strong>';
   }

  ngOnInit(): void {
  
      this.consultaService.consulta()
          .subscribe((datos) =>{
            this.aux = datos; 
            
            this.datos = this.aux;
            this.linea=this.aux.length,
            console.log(this.linea);
          });

      this.filtrosServices.getFiltroObservable()
          .subscribe((filtro) => this.AplicarFiltros(filtro));

    }

    AplicarFiltros(filtros:Filtro): Datos[]{

      this.datos = this.aux;

      //Reseteo filtro
      if(filtros.cliente == null){
        filtros.cliente = '';
      }
      if(filtros.referencia == null){
        filtros.referencia = '';
      }
      if(filtros.usuario == null){
        filtros.usuario = '';
      }

      if(filtros.tipo === null){
        filtros.tipo = "Todos";
      }

      if(filtros.pendiente === null){
        filtros.pendiente = false;
      }

      if(filtros.recogiendo === null){
        filtros.recogiendo = false;
      }

      if(filtros.recogida === null){
        filtros.recogida = false;
      }

      if(filtros.desconsolidando === null){
        filtros.desconsolidando = false;
      }

      if(filtros.desconsolidada === null){
        filtros.desconsolidada = false;
      }

      if(filtros.entregada === null){
        filtros.entregada = false;
      }

      if(filtros.inidicencia === null){
        filtros.inidicencia = false;
      }

      //Filtros cliente, referencia, usuario y tipo

      if(filtros.cliente.length == 0){
          console.log("no ha código cliente");
      }else{
        this.datos = this.datos.filter(dato => dato.alias_cliente!.toLowerCase().includes(filtros.cliente.toLowerCase()));
      }
    
      if(filtros.referencia.length == 0){
          console.log("no hay referencia");
      }else{
          this.datos = this.datos.filter(dato => dato.referencia!.toLowerCase().includes(filtros.referencia.toLowerCase()));
      }

      if(filtros.usuario.length === 0){
          console.log("no hay usuario");
      }else{
        this.datos = this.datos.filter(dato => dato.usuario!.toLowerCase().includes(filtros.usuario.toLowerCase()));
      }

      if(filtros.tipo == 'Todos')
      {
          console.log("No aplica el filtro");
      }else{
        this.datos = this.datos.filter(dato => dato.tipo!.includes(filtros.tipo));
      }

      //Datos Fechas
      if(!filtros.fecha1 && !filtros.fecha2){
         console.log("No se han incluido fechas")
      }else if(filtros.fecha1 > filtros.fecha2){
          console.log("Fecha 2 no puede ser menor que fecha 1");
      }else if(!filtros.fecha1 && filtros.fecha2){
          console.log("No se ha incluido fecha inicial");
      }else if(filtros.fecha1 && !filtros.fecha2){
          console.log("No se ha incluido fecha final");
      }else if(filtros.fecha1 === null && filtros.fecha2 === null){
          console.log("Sin fecha");
      }else {
        console.log(filtros.fecha1);
        console.log(filtros.fecha2);
        this.datos = this.datos.filter(dato => dato.fecha! < filtros.fecha2 && 
                                               dato.fecha! > filtros.fecha1);
      }
        
      //Datos checkbox
      let check: string[] = [];

      if(filtros.pendiente){
        this.pendiente = "Pendiente";
        check.push("Pendiente");
      }
      if(filtros.recogiendo){
        this.recogiendo = "Recogiendo";
        check.push("Recogiendo");
      }

      if(filtros.recogida){
        this.recogida = "Recogida";
        check.push("Recogida");
      }
      
      if(filtros.desconsolidando){
        this.desconsolidando = "Desconsolidando";
        check.push("Desconsolidando");
      }

      if(filtros.desconsolidada){
        this.desconsolidada = "Desconsolidada";
        check.push("Desconsolidada");
      }

      if(filtros.entregada){
        this.entregada = "Entregada";
        check.push("Entregada");
      }
      
      if(filtros.inidicencia){
        this.incidencia = "Incidencia";
        check.push("Incidencia");
      }

      if(check.length === 0){
        console.log("No se ha hecho click en ningún checkbox");
      }else{
        this.datos = this.datos.filter(dato => dato.estado! === this.pendiente || 
                                               dato.estado! === this.recogiendo ||  
                                               dato.estado! === this.recogida || 
                                               dato.estado! === this.desconsolidando ||
                                               dato.estado! === this.desconsolidada || 
                                               dato.estado! === this.entregada || 
                                               dato.estado! === this.incidencia);
      }

      //Reseteo checkbox
      this.pendiente = "";
      this.recogiendo = "";
      this.recogiendo = "";
      this.desconsolidando = "";
      this.desconsolidada ="";
      this.entregada ="";
      this.incidencia="";

      this.linea= this.datos.length;
      return this.datos;

    }
  }




