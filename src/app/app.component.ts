import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './shared/auth.service';
import { Usuario } from './models/usuario';
import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
import { Observable } from 'rxjs';
import { promise } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'SistemaLogin';
  usuario: Usuario = {
    login: "",
    senha: "",
    nome: ""
  };
  userName: any;
  usuarioLogado: any;

  constructor(private afs: AngularFirestore,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.inforUser();
  }


  loginGoogle() {
    this.authService.loginGoogle().then(value => {
    })
  }

  loginFacebook() {
    this.authService.loginFacebook().then(value => {
    })
  }

  ngOnInit(): void {
   
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.usuarioLogado = true
      } else {
        this.usuarioLogado = false
      }
    })
  }

  deslogar() {
    this.authService.logout();
  }

  inforUser() {
      this.authService.getUser().subscribe(info => {
        this.userName = info.displayName;
        this.usuario.nome = info.displayName;
        console.log(this.userName)
      });
  }

}






















  //  this.afs.collection("Usuarios").add({
  //     login:"user@gmail.com",
  //     senha:"12345678"
  //   })

  //   this.afs.collection("Usuarios").get().subscribe(
  //     snapshot =>{
  //         snapshot.forEach(usuario => {
  //           this.dados.push(usuario.data() as Usuario)
  //       }) 
  //     }
  //   )
  // }
  // verificar(){
  //   console.log("o valor de dados é: " + this.dados)