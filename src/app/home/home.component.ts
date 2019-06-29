import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private ngxLoader:NgxUiLoaderService
  ) { }
  ngOnInit() {
    this.ngxLoader.start();
    this.authService.getAuth().then((result)=>{
      console.log("usuário logado: " +result);
    })
  }
  
  ngAfterViewInit(): void {
    this.ngxLoader.stop();
  }

  async deslogar(){
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
