import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { ClienteInterface } from '../../models/clienteinterface';
import { DataService } from '../../servicios/data.service';
//import { NgForm } from '@angular/forms';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-updatecliente',
  templateUrl: './updatecliente.component.html',
  styleUrls: ['./updatecliente.component.css']
})
export class UpdateclienteComponent implements OnInit {
  forma:FormGroup;
  constructor(public dataCliente : DataService,
              public router: Router) {}
    mostrarficha:boolean;
    //mostrarbuscar:boolean=false;
  

  ngOnInit() {
    this.mostrarficha=true;
  }
  cerrarFicha():void{
    //this.mostrarficha=false;
    this.router.navigate(['/inicio']);
    //this.mostrarbuscar=true;
    //this.mostrarservicio

  }
  updateCliente(clienteForm:any){
    
    //clienteForm.otcargo=clienteForm.otcargo.toUpperCase()
   
      const confirmarupdate = confirm('CONFIRMAR CAMBIOS?... en Cliente '+clienteForm.rsocial)
      if (confirmarupdate){
        //convierte a mayusculas los valores
          //clienteForm.rsocial=clienteForm.rsocial.toUpperCase();
          //clienteForm.accion=clienteForm.accion.toUpperCase();
          //clienteForm.administrador=clienteForm.administrador.toUpperCase();
          //clienteForm.apoderada=clienteForm.apoderada.toUpperCase();
          //clienteForm.direccion=clienteForm.direccion.toUpperCase();
          //clienteForm.directort=clienteForm.directort.toUpperCase();
          //clienteForm.distrito=clienteForm.distrito.toUpperCase();
          //clienteForm.dpto=clienteForm.dpto.toUpperCase();
          //clienteForm.gcomercial=clienteForm.gcomercial.toUpperCase();
          //clienteForm.gproduccion=clienteForm.gproduccion.toUpperCase();
          //clienteForm.jlogistica=clienteForm.jlogistica.toUpperCase();
          //clienteForm.ncomercial=clienteForm.ncomercial.toUpperCase();
          //clienteForm.nombre=clienteForm.ncomercial.toUpperCase();

          this.dataCliente.updateClientes(clienteForm); 
          //window.history.back()
          this.router.navigate(['/inicio'])  
    
      }
    //this.mostrarficha=false;
    //this.mostrarbuscar=true;
    //this.router.navigate(['/inicio'])  
  }

}
