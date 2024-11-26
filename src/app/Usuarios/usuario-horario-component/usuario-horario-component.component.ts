import { Component, OnInit } from '@angular/core';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Router } from '@angular/router';
import { Horarios } from '../../interface/horarios';
import { ReservaService } from '../../service/reserva.service';
import { Pasajero } from '../../interface/pasajero';
import { Reserva } from '../../interface/reserva';

@Component({
  selector: 'app-usuario-horario-component',
  templateUrl: './usuario-horario-component.component.html',
  styleUrls: ['./usuario-horario-component.component.css']
})
export class UsuarioHorarioComponent implements OnInit {
  horarios: Horarios[] = [];
  horariosFiltrados: Horarios[] = [];
  terminalSeleccionada: string = '';
  fechaSeleccionada: string = '';
  mostrarModal: boolean = false;
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';
  lugares: string[] = [
    'Real del Bosque',
    'Residencia Bonanza',
    'Loma Bonita',
    'Terán',
    'Libramiento',
    'Centro',
  ];
  horarioSeleccionado: Horarios | null = null;

  usuarioNombre: string = 'Nombre del usuario'; // Esto debería ser dinámico
  nombreIngresado: string = ''; // Para el nombre ingresado en el modal

  constructor(
    private registroRutaService: RegistroRutaService,
    private router: Router,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.obtenerHorarios();
  }

  obtenerHorarios(): void {
    this.registroRutaService.obtenerHorarios().subscribe(
      (data: Horarios[]) => {
        this.horarios = data;
        this.filtrarHorarios();
      },
      (error) => {
        console.error('Error al obtener los horarios:', error);
        alert('Error al cargar los horarios. Intenta nuevamente más tarde.');
      }
    );
  }

  filtrarHorarios(): void {
    // Filtrar por fecha y terminal seleccionada
    this.horariosFiltrados = this.horarios.filter((horario) => {
      const fechaValida = !this.fechaSeleccionada || horario.fecha === this.fechaSeleccionada;
      const terminalValida = !this.terminalSeleccionada || horario.ubicacion === this.terminalSeleccionada;
  
      return fechaValida && terminalValida;
    });
  }
  

  abrirModal(horario: Horarios): void {
    this.horarioSeleccionado = horario;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.origenSeleccionado = '';
    this.destinoSeleccionado = '';
    this.nombreIngresado = '';
    this.horarioSeleccionado = null;
  }

  confirmarReserva(): void {
    if (!this.origenSeleccionado || !this.destinoSeleccionado || !this.nombreIngresado) {
      alert('Por favor selecciona origen, destino y proporciona un nombre.');
      return;
    }

    if (!this.horarioSeleccionado) {
      alert('No se ha seleccionado un horario válido.');
      return;
    }

    if (this.nombreIngresado.trim() === '') {
      alert('Por favor ingresa un nombre válido.');
      return;
    }

    const pasajero: Pasajero = {
      name: this.nombreIngresado,
      origen: this.origenSeleccionado,
      destino: this.destinoSeleccionado,
      colectivo_id: this.horarioSeleccionado.id,
      chofer_id: 6,
    };

    console.log('Datos del pasajero a enviar:', pasajero);

    this.registrarPasajero(pasajero);
  }

  registrarPasajero(pasajero: Pasajero): void {
    this.reservaService.registrarPasajero(pasajero).subscribe({
      next: (responsePasajero) => {
        console.log('Pasajero registrado:', responsePasajero);
        this.crearReserva();
      },
      error: (error) => {
        console.error('Error al registrar el pasajero:', error);
        alert('Error al registrar el pasajero.');
      },
    });
  }

  crearReserva(): void {
    if (!this.horarioSeleccionado) {
      alert('No se pudo realizar la reserva: horario no válido.');
      return;
    }

    this.reservaService.obtenerUltimoPasajero().subscribe({
      next: (responsePasajero) => {
        const pasajeroId = responsePasajero.id;

        if (!pasajeroId) {
          alert('Error: No se pudo obtener el ID del pasajero.');
          return;
        }

        const reserva: Reserva = {
          id: null,
          fecha_reserva: new Date().toISOString().split('T')[0],
          forma_pago: '', // Forma de pago predeterminada
          monto: 20, // Monto fijo
          pasajero_id: pasajeroId,
          cantidad: 1, // Cantidad reservada
        };

        console.log('Datos de la reserva a enviar:', reserva);

        this.reservaService.registrarReserva(reserva).subscribe({
          next: (responseReserva) => {
            console.log('Reserva registrada:', responseReserva);
            alert('Reserva realizada con éxito.');
            this.redirigirReserva();
          },
          error: (errorReserva) => {
            console.error('Error al registrar la reserva:', errorReserva);
            alert('Error al realizar la reserva.');
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener el último pasajero:', error);
        alert('Error al intentar obtener el pasajero creado.');
      },
    });
  }

  redirigirReserva(): void {
    console.log('Horario seleccionado antes de la navegación:', this.horarioSeleccionado);  // Verifica que el valor esté aquí
    if (!this.horarioSeleccionado) {
      alert('No se seleccionó un horario.');
      return;
    }
    
    // Convertir el objeto en una cadena JSON para enviarlo a través de queryParams
    const horarioSeleccionadoString = JSON.stringify(this.horarioSeleccionado);
  
    this.router.navigate(['/reserva'], {
      queryParams: { horarioSeleccionado: horarioSeleccionadoString },
    });
  }
  
  
}
