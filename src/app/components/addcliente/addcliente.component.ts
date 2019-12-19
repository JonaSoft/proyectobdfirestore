import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from '../../models/clienteinterface';
import { Router } from  '@angular/router';
import { DataService } from '../../servicios/data.service';
//import { NgForm } from '@angular/forms';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { messaging } from 'firebase';


@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css']
})
export class AddclienteComponent implements OnInit {
  forma:FormGroup;
  constructor(public dataCliente : DataService, public router:Router) {
   // this.forma =new FormGroup({
   //   'ruc':new FormControl(''),
   //   'rsocial':new FormControl(''),
   //   'nombre':new FormControl('')
      
   // })
   }
  mostrarbuscar=false;
  mostrarficha=true;
  botonsave=false;
  botonnew=true;
  mostrarfecha=false;
  avisoruc=false

  

  ngOnInit() {
  

   
  }
  cerrarFicha():void{
    this.router.navigate(['/servicios']);
  }
  
  saveCliente(clienteForm:any){
    
       
    console.log(clienteForm)
    if(clienteForm.uid == undefined ){
      console.log(clienteForm.uid)
      const confirmaradd = confirm('Adicionaras Cliente?')  
      if (confirmaradd){
        if(clienteForm.ruc==undefined){
          alert('Es necesario ingresar el número del RUC...');
          
          //if(validar){
          
          //}
        }else{
          this.dataCliente.addClientes(clienteForm);
          alert ('Adición satifactoria');
          this.router.navigate(['/servicios'])  
        }
      }
     
    }else{
      const confirmarupdate = confirm('CONFIRMAR CAMBIOS?... en Cliente '+clienteForm.rsocial)
      if (confirmarupdate){
          this.dataCliente.updateClientes(clienteForm); 
          this.router.navigate(['/inicio'])  
    
      }
    }
    //this.mostrarficha=false;
    //this.mostrarbuscar=true;
    //this.router.navigate(['/inicio'])  
   
  }
  nuevocliente(){
    this.botonnew=false;
    this.botonsave=true
  }
  activaFecha(){
    this.mostrarfecha=!this.mostrarfecha;
  }

//Validaciones

  controlRuc(event:any){
      //console.log(valor);
      let valor=event.target.value;
      console.log(valor)
      if (valor>99999999999){
        console.log('error');
        this.avisoruc=true;
        //document.getElementById("ruc").onreset
      }else{
        this.avisoruc=false
      }
  }

  
}
