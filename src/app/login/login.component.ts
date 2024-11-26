import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Datos ingresados por el usuario
  registro = {
    correo: '',
    password: ''
  };

  // Lista de choferes "locales"
  choferes = [
    { nombre: 'Chofer 1', correo: 'chema', password: '1234' },
    { nombre: 'Chofer 2', correo: 'negro', password: '4321' }
  ];

  constructor(private router: Router) {}

  validar() {
    // Buscar si el correo y contraseña coinciden con algún chofer
    const choferValido = this.choferes.find(
      (chofer) =>
        chofer.correo === this.registro.correo &&
        chofer.password === this.registro.password
    );

    if (choferValido) {
      console.log('Inicio de sesión exitoso:', choferValido);

      // Redirigir al dashboard de choferes
      this.router.navigate(['/rutas']);
    } else {
      console.error('Credenciales incorrectas.');
      alert('Credenciales incorrectas.');
    }
  }
}
