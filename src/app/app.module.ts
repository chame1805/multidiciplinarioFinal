import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutentificacionModule } from './autentificacion/autentificacion.module';
import { UsuarioModule } from './Usuarios/usuario/usuario.module';
import { ChoferesModule } from './Chofer/choferes/choferes.module';









@NgModule({
  declarations: [
    AppComponent,
 
   
  
  
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutentificacionModule,
    UsuarioModule,
    ChoferesModule
  ],
  exports:[
   
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
