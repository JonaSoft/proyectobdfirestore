import { Injectable } from '@angular/core';
import { ClienteInterface } from '../models/clienteinterface' ;
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument  } from '@angular/fire/firestore';
//import { AngularFireModule } from 'angularfire2';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
//import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor( public afs: AngularFirestore) {
      this.clientesCollection=afs.collection<ClienteInterface>('clientes');
      this.clientes=this.clientesCollection.valueChanges();
   }

  public clientesCollection: AngularFirestoreCollection<ClienteInterface>;
  public clientes: Observable <ClienteInterface[]>;
  //para addicionar 
  public clienteDoc: AngularFirestoreDocument<ClienteInterface>;
  public cliente: Observable <ClienteInterface>;
 //--------------------------------------------
 //tipo ClienteInterface
  public selectedCliente:any={};
 //--------------------------------------------
 public botonsave=true;
 public dataFinal=[];
 public clientesNuevo=[]

  enviarData(){
    //this.clientes = this.afs.collection('clientes').valueChanges();
    return this.clientes = this.clientesCollection.snapshotChanges()
    .pipe(map( changes =>{
        return changes.map( action =>{
          const data  = action.payload.doc.data() as ClienteInterface;
          //extraer el id del registro
          data.uid = action.payload.doc.id;
          //--------------------------------
          return data
        
        });
    }))
   }
   getOneCliente(idcliente: string){
    this.clienteDoc =this.afs.doc<ClienteInterface>(`clientes/${idcliente}`);
    //console.log(this.clienteDoc);
    return this.cliente =this.clienteDoc.snapshotChanges().pipe(map(action =>{
        if ((action.payload.exists) == false){
          return null;
        }else{
          const data  = action.payload.data() as ClienteInterface;
          data.uid = action.payload.id;
          //console.log(action.payload.id);
          return data;
        }
    }))   

   }
   addClientes(clienteNuevo:any) {
     this.clientesCollection.add(clienteNuevo);
     this.clientesNuevo.push(clienteNuevo);
     return this.clientesNuevo
     
   }
   updateClientes(cliente:ClienteInterface): void{
     let idCliente = cliente.uid;
     this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idCliente}`);
     this.clienteDoc.update(cliente);
   }
   deleteClientes(idCliente:string): void{
     this.clienteDoc = this.afs.doc<ClienteInterface>(`clientes/${idCliente}`);
     this.clienteDoc.delete();
   }
   activabotonsave(){
    console.log(this.botonsave);
    this.botonsave=true;

   }
   newFicha(dataId:string,cliente:ClienteInterface):void{
    console.log(dataId,cliente);
   }
   solicitaData2(valor:number){
    console.log(valor)
    return this.clientes = this.clientesCollection.snapshotChanges()
    .pipe(map( changes =>{
        return changes.map( action =>{
          const data  = action.payload.doc.data() as ClienteInterface;
          //extraer el id del registro
          data.uid = action.payload.doc.id;
          //--------------------------------
          return data
        
        });
      }))
    }
    solicitaData(valor?:any){
      console.log(valor)
       //this.clientes = this.afs.collection('clientes').valueChanges();
    return this.clientes = this.clientesCollection.snapshotChanges()
    .pipe(map( changes =>{
        return changes.map( action =>{
          const data  = action.payload.doc.data() as ClienteInterface;
          
          //extraer el id del registro
          
          
          //--------------------------------
         return data
        
        });
    }))
    }
}
  
