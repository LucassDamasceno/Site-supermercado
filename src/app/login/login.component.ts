import { AuthService } from './../shared/auth.service';
import { Usuario } from './../models/usuario';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario()
  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.ngxLoader.start()
  }
  ngAfterViewInit(): void {
    this.ngxLoader.stop();
  }


  loginGoogle() {
    console.log("login com google")
    this.authService.loginGoogle().then(value =>{
      if(value) this.router.navigate(['home'])
    })
  }

  loginFacebook() {
    this.authService.loginFacebook().then(value =>{
      console.log(value)
      if(value) this.router.navigate(['home'])
    })
  }

  autenticar(form: NgForm) {
    this.ngxLoader.start();
    this.authService.login(this.usuario).then(value => {
      if (value == false) {
        this.ngxLoader.stop();
        this.toastr.error("Usuario ou senha estão incorretas", "Ops");
      } else {
        this.ngxLoader.stop();
      }
    })
  }

  register() {
    this.router.navigate(['sign-up'])
  }




}
