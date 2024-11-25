import { Component } from '@angular/core';
import { AutentificacionService } from '../service/autentificacion.service';
import { Registro } from '../interface/registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  datosRegistro: Registro = {
    nombre: '',
    correo: '',
    password: '',
    confirmarPassword: '',
    rol: '',
    
  };

  constructor(private authService: AutentificacionService) { }

  registrar() {
    this.authService.actualizarInfo(this.datosRegistro); 
    console.log('Información enviada al servicio:', this.datosRegistro);

    this.datosRegistro = {
      nombre: '',
      correo: '',
      password: '',
      confirmarPassword: '',
      rol: '',
      
    };
  }
}
