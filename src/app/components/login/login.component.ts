import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public password:string;
  alerta=false
  constructor(
    private router: Router,
    public _auth: AuthService) { }

  ngOnInit() {
  }
  
  login(){
    this._auth.loginAuth(this.email,this.password)
    .then((res)=>{
          //console.log(this.email);
          console.log(res);
          //console.log(this.password);
          this.router.navigate(['/inicio']);
    }).catch((err)=>{
       console.log(err);
       this.alerta=true;
    })
 }
 usuario(){
   console.log('envio usuario')
 }
}
