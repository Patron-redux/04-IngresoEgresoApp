import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnSetUserAction } from './auth.action';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscription:Subscription = new Subscription();
  private usuario:User;
  constructor(private afAuth:AngularFireAuth,
              private router: Router,
              public afDB:AngularFirestore,
              private store:Store<AppState>) { }

  crearUsuario(nombre:string, email:string, password:string){
    this.store.dispatch(new ActivarLoadingAction());
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
                    this.store.dispatch(new DesactivarLoadingAction());
              });

        })
        .catch( error =>{
          Swal.fire('Error en la registraciòn',error.message,'error');
          this.store.dispatch(new DesactivarLoadingAction());
        });
  }
  login(email:string, password:string){
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(resp =>{
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction());
    })
    .catch( error =>{
      Swal.fire('Error en el login','La contraseña no es correcta o el usuario no fue registrado','error');
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }
  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    
  }
  initAuthListener(){
    this.afAuth.authState.subscribe( (fbUser:firebase.User) =>{
      if(fbUser){
        this.subscription = this.afDB.doc(`${ fbUser.uid}/usuario`)
        .valueChanges().subscribe( (usuarioObj:any) => {
          const newUser = new User(usuarioObj);
          this.store.dispatch(new SetUserAction(newUser));
          this.usuario = newUser;
        });
      }else{
        this.usuario = null;
        this.subscription.unsubscribe();
        this.store.dispatch(new UnSetUserAction());
      }
    })
  }
  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser =>{
        if(fbUser == null){
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }
  getUsuario(){
    return { ...this.usuario };
  }
}
