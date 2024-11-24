import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutentificacionModule } from './autentificacion/autentificacion.module';
import { UsuarioModule } from './Usuarios/usuario/usuario.module';
import { ChoferesModule } from './Chofer/choferes/choferes.module';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './principal/principal.component';











@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutentificacionModule,
    UsuarioModule,
    ChoferesModule,
    HttpClientModule
  ],
  exports:[
   
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
