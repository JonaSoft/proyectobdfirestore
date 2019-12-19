import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from '../../models/clienteinterface';
import { DataService } from '../../servicios/data.service';
import { ExporterService } from 'src/app/servicios/exporter.service';
import { Router } from  '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
//import { NgForm } from '@angular/forms';
//import { ConsoleReporter } from 'jasmine';
//import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  forma:FormGroup;
  constructor(public _DataService: DataService,
              public _DataFicha: DataService,
              private router: Router,
              private aExcel: ExporterService,
              public importaData: ExporterService
              ) {
                this.forma = new FormGroup({
                  'ruc':new FormControl(''),
                  'rsocial':new FormControl('')
                })
 
  }
  mostrarbuscar=true;
  mostrarficha=false;
  public clientes = [];
  public dataFinal=[];
  public dataFiltro=[];
  public cliente='';
  public matriz=[];
  public result=false;
  public cantidad:number=0;
  public loading=false;
  public contador=false;
  //filtros status y responsable
  banderafiltros:boolean=false;
  seleccionfiltro:string = "itemfondoini";
  seleccionfiltro2:string = "itemfondoini2";
  seleccionfiltro3:string = "itemfondoini3";
  seleccionfiltro4:string = "itemfondoini4";
  seleccionfiltro5:string = "itemfondoini5";
  seleccionfiltro6:string = "itemfondoini6";
  seleccionfiltro7:string = "itemfondoini7";
  seleccionfiltro8:string = "itemfondoini8";
  estadoactivo: boolean = true;

  //*************************/


  
  //soloimpresion=false
 
  public ficha:ClienteInterface;
  ngOnInit() {
    this.getAllData()
  }
  getAllData(){
    //this.seleccionfiltro="itemfondoini";
    //resetea inputs del formulario
    this.forma.reset({
      ruc:"",
      rsocial:""
    })
    //
    this.banderafiltros=false
    this.result=false;
    this.contador=false;
    this.loading=true;
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3";
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6";
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8";

    this._DataService.enviarData().subscribe(clientes => {
    
      //console.log(clientes);
      this.clientes=clientes;
      this.cantidad=this.clientes.length
      this.contador=true;
      this.clientes=this.clientes.sort((prev,next)=>{
      return prev.ruc-next.ruc;
      });
      this.loading=false;
      this.contador=true;
      this.matriz=clientes;
      //this.dataFiltro=this.
      //console.log(this.clientes.length) 
     //this.importaData.exportarBd(this.matriz)
    })
    
    
  }
  getFicha(dataId:string, cliente:ClienteInterface) : void{
    let idcliente=dataId;
    console.log(idcliente)
    console.log(cliente)
    //this._DataFicha.getOneCliente(idcliente).subscribe(ficha =>{
      //console.log(ficha);
      //this.mostrarbuscar=false;
      //this.mostrarficha=true;

    //})
  //console.log(idcliente)
  this.router.navigate(['/update']);
  this._DataFicha.selectedCliente = Object.assign({},cliente);
   //this.mostrarbuscar=false;
   //this.mostrarficha=true;
  }



  deleteCliente(idcliente:string,rsocial:string){
    
    const confirmar= confirm('ESTAS SEGURO(A)?... No podrás recuperar al cliente '+ rsocial ); 
    if (confirmar){
      //console.log('borrado', idcliente, rsocial);
      this._DataFicha.deleteClientes(idcliente);
    }
  }
  newFicha(dataId:string,cliente:ClienteInterface):void{
    console.log(dataId)
    //this.mostrarbuscar=false;
    //this.mostrarficha=true;
    this.router.navigate(['/nuevo']);
    this._DataFicha.selectedCliente = ({});
    this._DataFicha.newFicha(dataId,cliente);

   
  }
  /*buscaRuc(event:any):void{
    
    this.result=false;
    this.dataFinal=[];
    let valor = event.target.value;  
    console.log(valor);
    this.loading=true;
    this._DataService.solicitaData(valor).subscribe(data=>{
      for(let z in data){
        console.log(data[z].ruc)
        if (((data[z].ruc).toString()).includes(valor)){
          this.dataFinal.push(data[z])
          //console.log(data.ruc);
          console.log( this.dataFinal);
          this.clientes=this.dataFinal.sort((prev,next)=>{
            return prev.ruc-next.ruc;
          });
          //this.dataFinal=[];
        }
        if (valor==data[z].ruc){
          this.dataFinal=[];  
          this.dataFinal.push(data[z]);
          this.clientes=this.dataFinal.sort((prev,next)=>{
              return prev.ruc-next.ruc;
          });
        
        }
      }
      if (this.clientes.length==0){
        console.log('Sin registros ');
        this.result=true
        //document.getElementById('result').textContent="SIN COINCIDENCIAS PARA SU BUSQUEDA"
      }
      console.log(data);
      this.contador=false;
      this.dataFinal=[]
    })
  }*/
  buscaRuc1(event:any){
    //this.clientes=[];
    this.loading=true
    this.result=false;
    this.dataFinal=[];
    let valor = event.target.value;  
    console.log(valor);
    //his._DataService.solicitaData(valor).subscribe(data=>{
    let data=[];
    data=this.matriz
    if(valor.length>3){
      
      for(let z in data){
          console.log(data[z].ruc)
        
          if (((data[z].ruc).toString()).includes(valor)){
            this.dataFinal.push(data[z])
            //console.log(data.ruc);
            //console.log( this.dataFinal);
            this.loading=false;
            this.clientes=this.dataFinal.reverse();
            //this.dataFinal=[];
          }
          if (valor==data[z].ruc){
            this.dataFinal=[];  
            this.dataFinal.push(data[z]);
            this.loading=false;
            this.clientes=this.dataFinal.reverse();
          
          }
         
      }
      if (this.clientes.length==0){
        console.log('Sin registros ');
        this.result=true;
        this.contador=false;
        document.getElementById('result').textContent="SIN COINCIDENCIAS PARA SU BUSQUEDA"
      }
    }
      //console.log(data);
      this.contador=false;
      this.dataFinal=[]
    //})
  }
  buscaRsocial(valor:string){
    this.loading=true
    //this.clientes=[];
    this.result=false;
    this.dataFinal=[];
    //valor = event.target.value;  
    console.log(valor);
    //this._DataService.solicitaData(valor).subscribe(data=>{
    let data=[];  
    //console.log(data)
    data=this.matriz;
    if(valor.length>4){
      valor=valor.toUpperCase();
      for(let z in data){
        //this.dataFinal=[]
        console.log(data[z].rsocial)
        if ((data[z].rsocial).includes(valor)){
          this.dataFinal.push(data[z])
          //console.log(data.ruc);
          console.log( this.dataFinal);
          this.loading=false;
          this.clientes=this.dataFinal.reverse();
          this.contador=false;
          //this.dataFinal=[];
        }
        if (valor==data[z].rsocial){
          this.dataFinal=[];  
          this.dataFinal.push(data[z]);
          this.loading=false;
          this.clientes=this.dataFinal.reverse();
          this.contador=false
          //this.dataFinal=[];
        }
       
      }
      if (this.clientes.length==0){
        console.log('Sin registros ');
        this.contador=false;
        this.result=true
        //document.getElementById('result').textContent="SIN COINCIDENCIAS PARA SU BUSQUEDA"
      }
    }
      console.log(data);
      //this.dataFinal=[]
      //this.clientes=this.dataFinal;
    //})
  }
 
buscaStatus1(valor?:any){
    if (this.seleccionfiltro == "itemfondoini"){
        this.seleccionfiltro = "itemfondo"
        this.seleccionfiltro2 = "itemfondoini2";
        this.seleccionfiltro3 = "itemfondoini3"
        this.seleccionfiltro4 = "itemfondoini4";
        this.seleccionfiltro5 = "itemfondoini5";
        this.seleccionfiltro6 = "itemfondoini6"
        this.seleccionfiltro7 = "itemfondoini7";
        this.seleccionfiltro8 = "itemfondoini8"
    }
   
    this.estadoactivo = !this.estadoactivo; 
    this.banderafiltros=true;
    this.loading=true
    this.result=false;
    this.dataFinal=[];
    this.dataFiltro=[];
    console.log(valor);
    let data=[];  
      data=this.matriz;
      for(let item in data){
        if(valor.includes(data[item].status)){
            this.dataFinal.push(data[item]);
          
            this.clientes=this.dataFinal.sort();
            this.dataFiltro=this.clientes;
            this.contador=true;
        }
      }
      console.log(this.dataFinal.length)
      if (this.dataFinal.length==0){
        this.clientes=[];
        this.contador=false;
        this.loading=false;
        this.result=true
      } 
    this.cantidad = this.clientes.length
    console.log(this.cantidad)
    this.loading=false;
}

buscaStatus2(valor?:any){
  
  if (this.seleccionfiltro2 == "itemfondoini2"){
    console.log('2 btn')
    this.seleccionfiltro2 = "itemfondo2";
    this.seleccionfiltro = "itemfondoini";
    //this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3"
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6"
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8"
  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}
buscaStatus3(valor?:any){
  
  if (this.seleccionfiltro3 == "itemfondoini3"){
    this.seleccionfiltro3 = "itemfondo";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    //this.seleccionfiltro3 = "itemfondoini3"
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6"
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8"
  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}

buscaStatus4(valor?:any){
  
  if (this.seleccionfiltro4 == "itemfondoini4"){
    this.seleccionfiltro4 = "itemfondo4";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3"
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6"
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8"
  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}
buscaStatus5(valor?:any){
  
  if (this.seleccionfiltro5 == "itemfondoini5"){
    this.seleccionfiltro5 = "itemfondo5";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3";
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro6 = "itemfondoini6"
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8"
  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}

buscaStatus6(valor?:any){
  
  if (this.seleccionfiltro6 == "itemfondoini6"){
    this.seleccionfiltro6 = "itemfondo6";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3";
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8";
    

  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}

buscaStatus7(valor?:any){
  
  if (this.seleccionfiltro7 == "itemfondoini7"){
    this.seleccionfiltro7 = "itemfondo7";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3";
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6";
    //this.seleccionfiltro7 = "itemfondoini7";
    this.seleccionfiltro8 = "itemfondoini8";
  
  }
 
  this.estadoactivo = !this.estadoactivo; 
  this.banderafiltros=true;
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
}

buscaStatus8(valor?:any){
  
  if (this.seleccionfiltro8 == "itemfondoini8"){
    this.seleccionfiltro8 = "itemfondo8";
    this.seleccionfiltro = "itemfondoini";
    this.seleccionfiltro2 = "itemfondoini2";
    this.seleccionfiltro3 = "itemfondoini3";
    this.seleccionfiltro4 = "itemfondoini4";
    this.seleccionfiltro5 = "itemfondoini5";
    this.seleccionfiltro6 = "itemfondoini6";
    this.seleccionfiltro7 = "itemfondoini7";
    
  }
 

  this.banderafiltros=true;
  
  this.loading=true
  this.result=false;
  this.dataFinal=[];
  this.dataFiltro=[];
  console.log(valor);
  let data=[];  
    data=this.matriz;
    for(let item in data){
      if(valor.includes(data[item].status)){
          this.dataFinal.push(data[item]);
        
          this.clientes=this.dataFinal.sort();
          this.dataFiltro=this.clientes;
          this.contador=true;
      }
    }
    console.log(this.dataFinal.length)
    if (this.dataFinal.length==0){
      this.clientes=[];
      this.contador=false;
      this.loading=false;
      this.result=true
    } 
  this.cantidad = this.clientes.length
  console.log(this.cantidad)
  this.loading=false;
  this.banderafiltros=true
}

buscaResponsable(valor?:any){
  this.loading=true;
  this.result=false;
  if (this.banderafiltros===true){
    valor = valor.toUpperCase();
    //let datafiltro=[]; 
    this.dataFinal=[] 
    //this.dataFiltro=this.dataFinal;
    console.log('banderafiltros es '+ this.banderafiltros)
    //this.dataFiltro=this.clientes;
    console.log(valor);
    for(let item in this.dataFiltro){
        //console.log(this.dataFiltro[item])
          if(valor==this.dataFiltro[item].responsable){
             console.log('paso filtro responsable')
              this.dataFinal.push(this.dataFiltro[item]);
              console.log(this.dataFinal.length)
              //this.clientes=this.dataFinal;
             this.cantidad = this.dataFinal.length
              console.log(this.cantidad)
              this.loading=false;
              this.contador=true;
              this.result=false  
             
          }
          if(this.dataFinal.length==0){
            //console.log('paso')
            this.contador=false;
            this.loading=false;
            this.result=true 
            //return  
            
          }
      
    }
    this.clientes=this.dataFinal;
    this.loading=false;
    console.log(this.clientes.length);
    //sin resultados
    if (this.clientes.length==0){
        console.log('Sin registros ');
        this.loading=false;
        this.contador=false;
        this.result=true
    }
  }else{

    this.clientes=[];
    //this.dataFinal=[];
    //let valor:null = event.target.value;  
    valor = valor.toUpperCase();
    //console.log(valor);
    let data=[];  
    data=this.matriz;
    //this._DataService.solicitaData().subscribe(data=>{
    for(let item in data){
        //((data[z].rsocial).includes(valor))
        if(valor.includes(data[item].responsable)){
            this.dataFinal.push(data[item]);
            this.loading=false;
            this.clientes=this.dataFinal.sort();
            this.cantidad = this.clientes.length
            this.contador=true;
            //console.log(this.cantidad)
        }
          
    }
    console.log(this.clientes.length);
    this.cantidad = this.clientes.length
    if (this.clientes.length==0){
        console.log('Sin registros ');
        this.loading=false;
        this.contador=false;
        this.result=true
    }
  }
  //this.banderafiltros=false
}
  enviarPrinter(){
    console.log("window.print");
    window.print()
  }
  crearExcel():void{
   this.aExcel.exportarExcel(this.clientes,'descarga excel')
  }
  
}




