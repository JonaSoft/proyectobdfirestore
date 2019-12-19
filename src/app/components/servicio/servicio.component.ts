import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../servicios/data.service';
import {CargaimagenService} from '../../servicios/cargaimagen.service';
//import { Dato } from "../../interface/data.interface";
import { ClienteInterface } from '../../models/clienteinterface';
import { FileItem } from "../../models/file-item";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//import { subscribeOn } from 'rxjs/operators';
//import { map } from 'rxjs-compat/operator/map';
//import { map } from 'rxjs/operators'

export interface Item{nombre:string;url:string;}

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  datos=[];
  flightExport=[];
  estaSobreElemento=false;
  //loading= true;
  archivos: FileItem[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
   //flightnodo:string;
  constructor(private router:Router,
              //public http:HttpClient,
              private _dataService1:DataService,
              public _DataFicha: DataService,
              private adicionakey:DataService,
              private _cargaImagenes:CargaimagenService,
              private afs: AngularFirestore,
              private http:HttpClient,
              private dataCliente : DataService) {

               this.itemsCollection = afs.collection<Item>('img');
               this.items = this.itemsCollection.valueChanges();
               //this.http.get
               }
   mostrarservicio=true;
   mostrarfichaadd:boolean=false;
   mostrarimportar:boolean=false;
   mostrartablaimportar=false;
   ir=true;
   close=false;
   irImportar=true;
   closeImportar=false;
   public nuevos:any=[];
   loading=false;

               //public urllink=this.items[0].url;
  ngOnInit() {
    //this.http.get('/v0/b/proyectobd-85f2c.appspot.com/o/img%2Fimport.json?alt=media&token=d82bd17d-a011-47e2-8bae-5903b543e128')
    //  .subscribe(data=>{
    //  console.log(data)})
  }
   
  newFicha(){
   //this.mostrarimportar=false;
   //this.mostrartablaimportar=false;
   //console.log(dataId)
   //this.mostrarservicio=true;
   //this.mostrarfichaadd=!(this.mostrarfichaadd);
   //this.ir=false;
   //this.close=true;
   //console.log(this.mostrarfichaadd);
   this.router.navigate(['/nuevo']);
   this._DataFicha.selectedCliente = ({});
  
 }
 closeFicha(){
   this.close=false;
   this.ir=true;
   this.mostrarfichaadd=false
 }
 closeTabla(){
   this.closeImportar=false;
   this.irImportar=true;
   //this.mostrartablaimportar=false
 }
 cargajson(){
  
   this.mostrarimportar=false;
   this.mostrarfichaadd=false;
   console.log(this.mostrartablaimportar)
   if(this.mostrartablaimportar===false){
  
      console.log('LLamar archivo');
     // this.irImportar=false;
      //this.closeImportar=true;
      this.http.get('/v0/b/proyectobd-85f2c.appspot.com/o/img%2Fimport.json?alt=media&token=ccbf45a7-8af9-48e7-bf01-6a26b009ff36')
      //this.http.get('../../../assets/import.json')
      .subscribe(data=>{
         console.log(data);
      

         const importardata= confirm('Seguro de iniciar exportación de '+(Object.values(data).length)+' registros del archivo subido?')
         if(importardata){
          this.loading=true;
           for(let item in data ){
              setTimeout(() => {
                 this.nuevos=this.dataCliente.addClientes(data[item]);
              }, 1000);
           }
           
           //window.alert('Exportación Culminada...!!!');
           this.mostrartablaimportar=true;
           this.loading= false

          }
             
        
      })
     
     

    }
    if (this.mostrartablaimportar===true){
        this.mostrartablaimportar=false;
        this.loading = false
      
    }

      
  // } 
   //if(this.irImportar=false){
     //    console.log('cerrar importar')
       //  this.mostrartablaimportar=false;
        // this.irImportar=true;
        // this.closeImportar=false
       
        this.mostrartablaimportar=false;            
   }
   
 //}

  
   cargarImagenes(){
     this.mostrarimportar=!this.mostrarimportar;
     this.mostrarfichaadd=false;
     this.mostrartablaimportar=false;
     this._cargaImagenes.cargarImagenesFirebase(this.archivos);
     console.log(this.items)
     //console.log("si lee")
   }
   limpiarContenido(){
      this.archivos = []
   }
   pruebaSobreElemento(event){
      console.log(event);
      console.log(this.items);
   }
   buscaUrl(){
      let http:HttpClient;
      http.get('https://firebasestorage.googleapis.com/v0/b/proyectobd-85f2c.appspot.com/o/img%2Fimport.json?alt=media&token=0e99e2d8-ae5d-47aa-acb3-bb643233ca96')
      .subscribe(data=>{
         console.log(data)
      })


   }
  }