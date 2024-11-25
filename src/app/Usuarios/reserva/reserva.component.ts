import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../service/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Router } from '@angular/router';

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
  horarioSeleccionado: any = null; 

  constructor( 
    private  route: ActivatedRoute,
    private reservaService: ReservaService ) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const horarioSeleccionadoString = params['horarioSeleccionado'];
        if (horarioSeleccionadoString) {
          this.horarioSeleccionado = JSON.parse(horarioSeleccionadoString);
          console.log('Horario seleccionado desde queryParams:', this.horarioSeleccionado);
          if (this.horarioSeleccionado.asientos) {
            this.resultadoFin = this.horarioSeleccionado.asientos;
            this.cantidad = this.resultadoFin;
            console.log('Asientos disponibles:', this.resultadoFin);
          }
        } else {
          console.error('No se recibió el horario seleccionado.');
        }
      });
    }
    
    
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
    if (this.cantidad <= 0 || this.cantidad > this.resultadoFin) {
      this.mostrarModal = true;
      this.mensajeModal = 'Cantidad no válida. Ingresa un número válido de asientos.';
      return;
    }
  
    this.reservaService.obtenerUltimaReserva().subscribe({
      next: (ultimaReserva) => {
        if (!ultimaReserva) {
          console.error('No se encontró una reserva previa');
          alert('Error al obtener la última reserva.');
          return;
        }
  
        this.reservaService.obtenerColectivoPorPasajero(ultimaReserva.pasajero_id).subscribe({
          next: (colectivo) => {
            if (!colectivo) {
              console.error('No se encontró un colectivo vinculado a este pasajero.');
              alert('Error al obtener el colectivo vinculado.');
              return;
            }
  
            // Aquí estamos obteniendo los asientos disponibles del colectivo correctamente
            this.resultadoFin = colectivo.asientos;
            console.log("Asientos disponibles en el colectivo:", this.resultadoFin);
  
            if (this.cantidad > this.resultadoFin) {
              this.mostrarModal = true;
              this.mensajeModal = 'No hay suficientes asientos disponibles para esta reserva.';
              return;
            }
  
            // Creación de la reserva actualizada
            const reservaActualizada = {
              fecha_reserva: ultimaReserva.fecha_reserva,
              forma_pago: ultimaReserva.forma_pago,
              monto: ultimaReserva.monto,
              pasajero_id: ultimaReserva.pasajero_id,
              cantidad: this.cantidad,
              colectivo_id: colectivo.id,
            };
  
            console.log('Datos enviados al backend para actualizar la reserva:', reservaActualizada);
  
            // Llamamos al servicio para actualizar la reserva
            this.reservaService.actualizarReserva(ultimaReserva.id, reservaActualizada).subscribe({
              next: (response) => {
                console.log('Reserva actualizada con éxito:', response);
  
                // Actualizamos los asientos del colectivo
                const dataParaActualizar = {
                  id: 0, // Asegúrate de pasar el id correcto del colectivo
                  asientos: colectivo.asientos - this.cantidad, // Restamos los asientos que se van a reservar
                  ubicacion: "string",
                  num_serie: "string",
                  fecha: "string",
                  horario: "string"
                };
  
                console.log('Datos para actualizar asientos:', dataParaActualizar);
  
                // Llamamos al método de actualización de asientos del colectivo
                this.reservaService.actualizarReserva1(colectivo.id, dataParaActualizar).subscribe({
                  next: () => {
                    this.resultadoFin = dataParaActualizar.asientos; // Actualizamos los asientos restantes en el frontend
                    this.cerrarModal();
                    alert('Reserva confirmada y asientos actualizados con éxito.');
                  },
                  error: (error) => {
                    console.error('Error al actualizar los asientos disponibles:', error);
                    alert('Error al actualizar los asientos disponibles.');
                  },
                });
              },
              error: (error) => {
                console.error('Error al actualizar la reserva:', error);
                alert('Error al actualizar la reserva.');
              },
            });
          },
          error: (error) => {
            console.error('Error al obtener el colectivo vinculado:', error);
            alert('Error al obtener el colectivo vinculado.');
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener la última reserva:', error);
        alert('Error al obtener la última reserva.');
      },
    });
  }
  

  cerrarModal(): void {
    this.mostrarModal = false;
    this.mostrarConfirmacion = false;
    this.mensajeModal = '';
    this.cantidad = 0; // Reinicia la cantidad seleccionada
  }

  cancelarReserva(): void {
    this.cerrarModal();
  }
}
