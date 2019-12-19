import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any={};
  constructor( public afAuth: AngularFireAuth) { }
  registerUser(email: string, pass:string){
    return new Promise((resolve,reject) => {
       this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
       .then( userData => resolve(userData),
        err => reject (err));
    });
 }

 loginAuth(email: string, pass:string){
    return new Promise((resolve,reject) => {
       this.afAuth.auth.signInWithEmailAndPassword(email,pass)
       .then( userData => {resolve(userData);
                           console.log(userData.user.email)
                          },
        err => reject (err));
    });
 }
 logoutAuth(){
   console.log('Salio')
    return this.afAuth.auth.signOut();
 }

}
