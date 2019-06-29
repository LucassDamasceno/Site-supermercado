import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Usuario } from './../models/usuario';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  usuario: Usuario = new Usuario();
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private router:Router
  ) {
  }

  onSubmit() {
    this.ngxLoader.start();
    this.usuario = this.formulario.value;

    this.authService.registrar(this.usuario).then((valor) => {
      if (valor) {
        this.ngxLoader.stop()
        this.toastr.success('Cadastro efetuado com sucesso', 'Show', {timeOut: 3000});
        this.router.navigate(['home'])
      } else {
        this.ngxLoader.stop()
        this.toastr.error('algo deu errado', 'ops')
      }
    })
  }


  ngOnInit() {
    this.ngxLoader.start();
    this.formulario = this.formBuilder.group({
      login: ['lucasdds15@gmail.com', [Validators.required, Validators.email,]],
      senha: ['88680543', [Validators.required, Validators.minLength(6), this.senhaValid]],
      confirmSenha: ['88680543', [Validators.required, this.validConfirmSenha]]
    })

  }
  ngAfterViewInit(): void {
    this.ngxLoader.stop();
  }

  senhaValid(control: FormControl) {
    const field = control.root.get('confirmSenha')
    if (field !== null) {
      let value = field.value
      field.setValue(value)
    }
  }

  validConfirmSenha(control: FormControl) {
    const field = control.root.get('senha')
    if (field !== null) {
      if (field.value == control.value) {
        return null
      } else {
        return { 'custon': true }
      }
    }
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }
  verificaConfirmSenha(form?: FormControl) {
    return { 'custom': true }
  }

  aplicaCssErro(campo) {
    switch (campo) {
      case 'confirmSenha':
        return {
          'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched
        }
      case 'login':
        return {
          'is-invalid': this.verificaValidTouched(campo),
        }
      case 'senha':
        return {
          'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched
        }
      default:
        break;
    }
  }
}
