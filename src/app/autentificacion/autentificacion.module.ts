import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { HeadInicioComponent } from '../head-inicio/head-inicio.component';
import { HeaderCComponent } from '../Chofer/header-c/header-c.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    HeadInicioComponent,
    HeaderCComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports:[
    LoginComponent,
    RegistroComponent,
    HeaderComponent
  ]
})
export class AutentificacionModule { }
