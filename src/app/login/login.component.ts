import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { AutentificacionService } from '../service/autentificacion.service';
import { Registro } from '../interface/registro';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registro: Registro= {

    correo: '',
    password:'',
    nombre:'',
    confirmarPassword: '',
    rol: '',
    
  }

  constructor(private authService: AutentificacionService, private router: Router) {}

  validar() {
    const datosGuardados: Registro | null = this.authService.obtenerInfo();

    console.log('Datos guardados:', datosGuardados);
    console.log('Correo ingresado:', this.registro.correo);
    console.log('Password ingresado:', this.registro.password);

    if (
      datosGuardados &&
      datosGuardados.correo?.trim() === this.registro.correo.trim() &&
      datosGuardados.password?.trim() === this.registro.password.trim()
    ) {
     console.log('inicio de secion exitoso')

     if(datosGuardados.rol== 'pasajero'){
       this.router.navigate(['/horario'])
    }
    else {
       this.router.navigate(['/rutas']);
     }
    } else {
      console.log('incorrecto el logeo');
      
    }
  }
}
