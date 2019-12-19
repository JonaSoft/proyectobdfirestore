import {RouterModule, Routes} from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {ServicioComponent} from './components/servicio/servicio.component';
import {LoginComponent} from './components/login/login.component';
import{UpdateclienteComponent} from './components/updatecliente/updatecliente.component';
import{AddclienteComponent} from './components/addcliente/addcliente.component'
import { AuthGuard } from './guards/auth.guard'

const APP_ROUTES: Routes = [

    //{path:'inicio', component:ClientesComponent, canActivate: [AuthGuard]},

    {path:'inicio', component:ClientesComponent,  canActivate: [AuthGuard]},
       
    {path:'update', component:UpdateclienteComponent,  canActivate: [AuthGuard]},

    {path:'nuevo', component:AddclienteComponent,  canActivate: [AuthGuard]},
    
    {path:'servicios', component:ServicioComponent,  canActivate: [AuthGuard]},
    
    {path:'login', component:LoginComponent},
    
    //{path:'', component:LoginComponent, canActivate: [AuthGuard]},
    //{path:'flight/:id', component:NotfoundComponent},

    {path:'**', pathMatch:'full', redirectTo:'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
