import { Usuario } from './../models/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Observable, from } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioLogado = new EventEmitter<any>();
  user: any;

  constructor(private rota: Router,
    public afAuth: AngularFireAuth,
    private ngxService: NgxUiLoaderService,
    private afs: AngularFirestore, ) {
  }

  getUser(): Observable<firebase.User>{
    return this.afAuth.user
  }

  getAuth(): Promise<boolean>{
    return new Promise(resolve => {
      this.afAuth.auth.onAuthStateChanged(user => {
        resolve(user ? true : false)
      })
    })
  }
  registrar(usuario: Usuario): Promise<boolean> {
    return new Promise(resolve => {
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.login, usuario.senha).then(() => {
        resolve(true)
      }).catch((error) => {
        resolve(false)
      })
    })
  }

  login(usuario: Usuario): Promise<boolean> {
    let value
    return new Promise(async resolve => {
      await this.afAuth.auth.signInWithEmailAndPassword(usuario.login, usuario.senha).then(() => {
        resolve(true)
        this.rota.navigate(["home"])
      }).catch((error) => {
        resolve(false)
      })
    })
  }

  loginGoogle(): Promise<boolean> {
    return new Promise(resolve => {
      var provider = new auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(function (result) {
        if (result.user) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(function (error) {
        resolve(false);
      });
    })
  }

  loginFacebook(): Promise<boolean> {
    return new Promise(resolve => {
      var provider = new auth.FacebookAuthProvider()
      this.afAuth.auth.signInWithPopup(provider).then(result => {
        if (result.user) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(function (error) {
        resolve(false);
      });
    })
  }

  logout() {
    this.afAuth.auth.signOut()
    this.ngxService.stop();
  }

}
