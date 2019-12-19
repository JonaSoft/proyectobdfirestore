import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule} from  '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import {NgDropFilesDirective} from './directives/ng-drop-files.directive';
import { HttpClientModule} from '@angular/common/http'

//Rutas
import { APP_ROUTING } from './app.routes';


//Servicios
import {AuthService} from './servicios/auth.service';
import { DataService} from 'src/app/servicios/data.service';
import { ExporterService}  from 'src/app/servicios/exporter.service';
import { CargaimagenService} from 'src/app/servicios/cargaimagen.service';

import { AuthGuard} from './guards/auth.guard';
//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AddclienteComponent } from './components/addcliente/addcliente.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { LoginComponent } from './components/login/login.component';

import { ImportarComponent } from './components/importar/importar.component';
import { UpdateclienteComponent } from './components/updatecliente/updatecliente.component';
import { LoadingComponent } from './components/loading/loading.component';
//import { KeysPipe } from './pipes/keys.pipe';
//import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
//Guards

//Animaciones
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientesComponent,
    AddclienteComponent,
    ServicioComponent,
    LoginComponent,
    NgDropFilesDirective,
    ImportarComponent,
    UpdateclienteComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    APP_ROUTING,
    ReactiveFormsModule,
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [
    DataService,
    AuthService,
    CargaimagenService,
    ExporterService,
    AngularFirestore,
    AuthGuard
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
