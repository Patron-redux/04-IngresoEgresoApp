import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth, private router: Router,public afDB:AngularFirestore) { }

  crearUsuario(nombre:string, email:string, password:string){
    this.afAuth
        .auth
        .createUserWithEmailAndPassword(email,password)
        .then( resp =>{
          const user: User = {
            uid:resp.user.uid,
            nombre:nombre,
            email: resp.user.email
          };
          this.afDB.doc(`${user.uid}/usuario`)
              .set(user)
              .then(() => {
                    this.router.navigate(['/']);
              });

        })
        .catch( error =>{
          Swal.fire('Error en la registraciòn',error.message,'error');
        });
  }
  login(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(resp =>{
      this.router.navigate(['/']);
    })
    .catch( error =>{
      Swal.fire('Error en el login','La contraseña no es correcta o el usuario no fue registrado','error');
    });
  }
  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
  initAuthListener(){
    this.afAuth.authState.subscribe( (fbUser:firebase.User) =>{
      console.log(fbUser);
    })
  }
  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser =>{
        if(fbUser == null){
          this.router.navigate(['/login']);
        }
         fbUser != null;
      })
    );
  }
}