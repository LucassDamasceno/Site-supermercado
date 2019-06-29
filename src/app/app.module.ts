import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { HomeComponent }                    from './home/home.component';
import { LoginComponent }                   from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { AngularFireModule }                from '@angular/fire'
import { environment }                      from '../environments/environment';
//firebese
import { AngularFirestoreModule }           from '@angular/fire/firestore'
import { AngularFireDatabaseModule }        from '@angular/fire/database';
import { AngularFireAuthModule }            from '@angular/fire/auth';
//pacotes de efeitos
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { ToastrModule }                     from 'ngx-toastr';
import { SignUpComponent } from './sign-up/sign-up.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
