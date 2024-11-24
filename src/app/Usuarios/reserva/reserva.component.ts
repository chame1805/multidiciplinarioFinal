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

  // Confirma la reserva y la envía al backend
  confirmarReserva(): void {
    // Verificación de que todos los campos estén llenos
    let camposFaltantes = [];
    if (!this.origenSeleccionado) {
      camposFaltantes.push('origen');
    }
    if (!this.destinoSeleccionado) {
      camposFaltantes.push('destino');
    }
    if (!this.horarioSeleccionado) {
      camposFaltantes.push('horario');
    }

    if (camposFaltantes.length > 0) {
      this.mostrarModal = true;
      this.mensajeModal = `Por favor completa los siguientes campos: ${camposFaltantes.join(', ')}`;
      return;
    }

    // Datos del pasajero
    const pasajero = {
      name: 'Nombre del usuario', // Puedes ajustar esto para usar un valor dinámico
      origen: this.origenSeleccionado,
      destino: this.destinoSeleccionado,
      colectivo_id: this.horarioSeleccionado.num_serie, // Relacionado con el colectivo
      chofer_id: this.horarioSeleccionado.chofer_id, // Ajusta según tu API
    };

    // Mostrar los datos del pasajero antes de enviarlos
    console.log('Datos del pasajero que se enviarán:', pasajero);

    // Registrar pasajero
    this.reservaService.registrarPasajero(pasajero).subscribe({
      next: (responsePasajero) => {
        console.log('Pasajero registrado:', responsePasajero);

        // Datos de la reserva
        const reserva = {
          pasajero_id: responsePasajero.id,
          cantidad: this.cantidad,
          horario_id: this.horarioSeleccionado.id, // Relacionado con el horario
        };

        // Mostrar los datos de la reserva antes de enviarlos
        console.log('Datos de la reserva que se enviarán:', reserva);

        // Registrar la reserva
        this.reservaService.registrarReserva(reserva).subscribe({
          next: (responseReserva) => {
            console.log('Reserva registrada:', responseReserva);
            this.cerrarModal();
            alert('Reserva realizada con éxito.');
          },
          error: (errorReserva) => {
            console.error('Error al registrar la reserva:', errorReserva);
            alert('Error al realizar la reserva.');
          },
        });
      },
      error: (errorPasajero) => {
        console.error('Error al registrar el pasajero:', errorPasajero);
        alert('Error al registrar el pasajero.');
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
