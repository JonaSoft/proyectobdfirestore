import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../servicios/auth.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(  private router: Router,
                private _auth1:AuthService) { }

  ngOnInit() {
    
  }
  logout(){
    //this.router.navigate(['/login'])
    this._auth1.logoutAuth()
    .then((res)=>{
          console.log('Usuario logout');
          //console.log(this.password);
          this.router.navigate(['/login']);
    }).catch((err)=>{
       console.log(err);
       
    })
 }
}
