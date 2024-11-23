import { Component, OnInit} from '@angular/core';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Router } from '@angular/router';
import { Horarios } from '../../interface/horarios';

@Component({
  selector: 'app-usuario-horario-component',
  templateUrl: './usuario-horario-component.component.html',
  styleUrl: './usuario-horario-component.component.css'
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
    'Centro'
  ];
  horarioSeleccionado: Horarios | null = null;

  constructor(
    private registroRutaService: RegistroRutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener horarios desde la API
    this.registroRutaService.obtenerHorarios().subscribe(
      (data: Horarios[]) => {
        this.horarios = data;  // Guardamos los horarios obtenidos
        this.filtrarHorarios();  // Filtrar los horarios según los criterios actuales
      },
      (error) => {
        console.error('Error al obtener los horarios:', error);
      }
    );
  }

  filtrarHorarios(): void {
    // Filtrar horarios según terminal y fecha seleccionada
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
    this.horarioSeleccionado = null;
  }

  confirmarReserva(): void {
    if (!this.origenSeleccionado || !this.destinoSeleccionado) {
      alert('Por favor selecciona tanto el origen como el destino.');
      return;
    }

    console.log('Reservando horario:', this.horarioSeleccionado);
    console.log('Origen:', this.origenSeleccionado);
    console.log('Destino:', this.destinoSeleccionado);

    // Redirige a la ruta de reserva
    this.mostrarModal = false;
    this.router.navigate(['/reserva']);
  }
}