import { Component, OnInit } from '@angular/core';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Router } from '@angular/router';
import { Horarios } from '../../interface/horarios';
import { ReservaService } from '../../service/reserva.service';
import { Pasajero } from '../../interface/pasajero';

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
    this.registroRutaService.obtenerHorarios().subscribe(
      (data: Horarios[]) => {
        this.horarios = data;
        this.filtrarHorarios();
      },
      (error) => {
        console.error('Error al obtener los horarios:', error);
      }
    );
  }

  filtrarHorarios(): void {
    this.horariosFiltrados = this.horarios.filter(
      (horario) =>
        (!this.terminalSeleccionada || horario.ubicacion === this.terminalSeleccionada) &&
        (!this.fechaSeleccionada || horario.fecha === this.fechaSeleccionada)
    );
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

  obtenerIdHorario(): number | null {
    if (this.horarioSeleccionado) {
      return this.horarioSeleccionado.id;
    } else {
      return null;
    }
  }

  confirmarReserva(): void {
    if (!this.origenSeleccionado || !this.destinoSeleccionado || !this.nombreIngresado) {
      alert('Por favor selecciona tanto el origen como el destino y proporciona un nombre.');
      return;
    }
  
    const idHorario = this.obtenerIdHorario();
    if (!idHorario) {
      alert('No se ha seleccionado un horario válido.');
      return;
    }
  
    // Asegúrate de que el nombre sea válido
    if (this.nombreIngresado.trim() === '') {
      alert('Por favor ingresa un nombre válido.');
      return;
    }
  
    const pasajero: Pasajero = {
      name: this.nombreIngresado,
      origen: this.origenSeleccionado,
      destino: this.destinoSeleccionado,
      colectivo_id: idHorario,
      chofer_id: 5, // Ajusta según corresponda
    };
  
    console.log('Datos del pasajero a enviar:', pasajero);
  
    // Registrar al pasajero y luego crear la reserva
    this.reservaService.registrarPasajero(pasajero).subscribe({
      next: (responsePasajero) => {
        console.log('Pasajero registrado:', responsePasajero);
        this.crearReserva(idHorario); // Llama a crearReserva pasando solo el horarioId
      },
      error: (errorPasajero) => {
        console.error('Error al registrar el pasajero:', errorPasajero);
        alert('Error al registrar el pasajero.');
      },
    });
  }
  
  
  crearReserva(horarioId: number): void {
    // Obtener el ID del pasajero más reciente (asumiendo que el backend permite esto)
    this.reservaService.obtenerUltimoPasajero().subscribe({
      next: (responsePasajero) => {
        const pasajeroId = responsePasajero.id; // Obtenemos el ID del pasajero
  
        if (!pasajeroId) {
          alert('Error: No se pudo obtener el ID del pasajero.');
          return;
        }
  
        const reserva = {
          horario_id: horarioId,
          pasajero_id: pasajeroId, // Asociamos el ID del pasajero a la reserva
        };
  
        console.log('Datos de la reserva a enviar:', reserva);
  
        // Registrar la reserva
        this.reservaService.registrarReserva(reserva).subscribe({
          next: (responseReserva) => {
            console.log('Reserva registrada:', responseReserva);
            this.cerrarModal();
            alert('Reserva realizada con éxito.');
            this.router.navigate(['/reserva']); // Redirige a la página de reserva
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
  
}
