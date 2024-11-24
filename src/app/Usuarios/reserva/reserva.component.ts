import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  cantidad: number = 0; // Cantidad seleccionada por el usuario
  resultadoFin: number = 15; // Número máximo de asientos disponibles

  mostrarModal: boolean = false; // Controla la visibilidad del modal
  mostrarConfirmacion: boolean = false; // Controla la visibilidad de la confirmación
  mensajeModal: string = ''; // Mensaje mostrado en el modal

  // Datos para la reserva
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';
  horarioSeleccionado: any = null; // Este debe ser un objeto con la información del horario

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    // Lógica inicial si es necesario
  }

  // Incrementa la cantidad de asientos seleccionados
  incrementar(): void {
    if (this.cantidad < this.resultadoFin) {
      this.cantidad++;
    }
  }

  // Decrementa la cantidad de asientos seleccionados
  decrementar(): void {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }

  // Verifica la cantidad antes de iniciar la reserva
  reservar(): void {
    if (this.cantidad > 0 && this.cantidad <= this.resultadoFin) {
      this.mostrarConfirmacion = true;
      this.mensajeModal = `¿Confirmas la reserva de ${this.cantidad} asientos?`;
    } else {
      this.mostrarModal = true;
      this.mensajeModal = 'Cantidad no válida. Ingresa un número válido de asientos.';
    }
  }

  confirmarReserva(): void {
    // Verificación de que la cantidad es válida
    if (this.cantidad <= 0 || this.cantidad > this.resultadoFin) {
      this.mostrarModal = true;
      this.mensajeModal = 'Cantidad no válida. Ingresa un número válido de asientos.';
      return;
    }
  
    // Obtener la última reserva desde el servicio
    this.reservaService.obtenerUltimaReserva().subscribe({
      next: (ultimaReserva) => {
        // Verificar que la respuesta contenga los datos necesarios
        if (!ultimaReserva) {
          console.error('No se encontró una reserva previa');
          alert('Error al obtener la última reserva.');
          return;
        }
  
        // Crear el objeto con los datos de la última reserva, pero actualizando solo la cantidad
        const reservaActualizada = {
          fecha_reserva: ultimaReserva.fecha_reserva,  // Fecha de la última reserva
          forma_pago: ultimaReserva.forma_pago,        // Forma de pago de la última reserva
          monto: ultimaReserva.monto,                  // Monto de la última reserva
          pasajero_id: ultimaReserva.pasajero_id,      // ID del pasajero de la última reserva
          cantidad: this.cantidad,                     // Nueva cantidad seleccionada
        };
  
        // Console log para verificar los datos que se están enviando al backend
        console.log('Datos enviados al backend para actualizar la reserva:', reservaActualizada);
  
        // Llamar al servicio para actualizar la reserva con la nueva cantidad
        this.reservaService.actualizarReserva(ultimaReserva.id, reservaActualizada).subscribe({
          next: (response) => {
            console.log('Reserva actualizada con éxito:', response);
            this.cerrarModal();
            alert('Reserva actualizada con éxito.');
          },
          error: (error) => {
            console.error('Error al actualizar la reserva:', error);
            alert('Error al actualizar la reserva.');
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener la última reserva:', error);
        alert('Error al obtener la última reserva.');
      },
    });
  }
  
  
  // Cierra el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.mostrarConfirmacion = false;
    this.mensajeModal = '';
    this.cantidad = 0; // Reinicia la cantidad seleccionada
  }

  // Cancela la reserva
  cancelarReserva(): void {
    this.cerrarModal(); // Usa la función centralizada
  }
}
