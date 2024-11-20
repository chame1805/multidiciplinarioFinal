import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})


export class ReservaComponent {
  cantidad: number = 1; 
  asientosDisponibles: number = 15; 
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  mostrarConfirmacion: boolean = false;
  resultadoFin : number = 15

  constructor(private router:Router){}

  incrementar(): void {
    this.cantidad += 1;
  }

  decrementar(): void {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
    }
  }

  reservar(): void {
    if (this.cantidad > this.asientosDisponibles) {
      this.mensajeModal = 'La cantidad es superior a lo disponibles.';
      this.mostrarModal = true;
    } else {
      this.mensajeModal = '¿Estás seguro de que quieres reservar?';
      this.mostrarConfirmacion = true;
      this.resultadoFin = this.asientosDisponibles - this.cantidad
      console.log('respuesta final', this.resultadoFin);
    }
  }

  confirmarReserva(): void {
    alert('Reserva confirmada.');
    this.mostrarModal = false;
    this.mostrarConfirmacion = false;
    this.router.navigate(['/metodo']); 
  }

  cancelarReserva(): void {
    this.mostrarModal = false;
    this.mostrarConfirmacion = false;
  }
}
