import { Component } from '@angular/core';
import { Pagos } from '../interface/pagos';
import { PagosService } from '../service/pagos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  constructor(private service: PagosService, private router:Router) {}

  datos: Pagos = {
    nombre: '',
    cuenta: '',
    fecha: '',
    seguridad: '',
  };

  // Formatea el campo 'cuenta' para agregar guiones automáticamente
  formatearCuenta(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    valor = valor.replace(/(.{4})/g, '$1-'); // Agrega un '-' cada 4 dígitos
    valor = valor.slice(0, 19); // Limita la longitud máxima a 19 caracteres (16 dígitos y 3 guiones)
    this.datos.cuenta = valor;
  }

  formateFecha(event:any){
    let fech = event.target.value.replace(/\D/g, '');
    fech = fech.replace(/(.{2})/g, '$1/');
    fech = fech.slice(0,5);
    this.datos.fecha = fech
  }

  envioDatos() {
    // Validar que 'cuenta' tenga exactamente 16 números (sin contar los guiones)
    const cuentaValida = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(this.datos.cuenta);
    const fechaValida= /^\d{2}\/\d{2}$/.test(this.datos.fecha);

    if (cuentaValida && fechaValida) {
      this.service.setDatos(this.datos);
      console.log('Datos enviados:', this.datos);
      this.router.navigate(['metodo'])
    } else {
      console.error('La cuenta debe tener el formato correcto (16 números con guiones).');
     
    }
  }
}
