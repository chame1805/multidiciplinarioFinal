import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Horarios } from '../../interface/horarios';

@Component({
  selector: 'app-card-horarios',
  templateUrl: './card-horarios.component.html',
  styleUrls: ['./card-horarios.component.css'],
})
export class CardHorarioComponent implements OnInit {
  @Input() unidades: string[] = [];
  horarios: Horarios[] = [];
  horariosOriginales: Horarios[] = [];
  terminalSeleccionada: string = '';
  activeMenu: number | null = null;

  // Variables para el modal
  mostrarModalEditar: boolean = false;
  horarioSeleccionado: Horarios | null = null;

  constructor(private horarioService: RegistroRutaService, private router: Router) {}

  ngOnInit() {
    this.horarioService.informacion$.subscribe((data) => {
      this.horariosOriginales = data;
      this.horarios = [...this.horariosOriginales];
      this.filtrarHorarios();
    });

    this.horarioService.terminalSeleccionada$.subscribe((terminal) => {
      this.terminalSeleccionada = terminal;
      this.filtrarHorarios();
    });

    this.cargarHorariosDesdeAPI();
  }

  filtrarHorarios() {
    if (this.terminalSeleccionada) {
      this.horarios = this.horariosOriginales.filter(
        (horario) => horario.ubicacion === this.terminalSeleccionada
      );
    } else {
      this.horarios = [...this.horariosOriginales];
    }
  }

  cargarHorariosDesdeAPI() {
    this.horarioService.obtenerHorarios().subscribe({
      next: (data) => {
        this.horariosOriginales = data;
        this.horarios = [...this.horariosOriginales];
        console.log('Horarios cargados desde la API:', data);
        this.filtrarHorarios();
      },
      error: (err) => {
        console.error('Error al cargar horarios desde la API:', err);
      },
    });
  }

  toggleMenu(id: number): void {
    this.activeMenu = this.activeMenu === id ? null : id;
  }

  // Abrir modal con datos del horario seleccionado
  editHorario(horario: Horarios): void {
    this.horarioSeleccionado = { ...horario };
    this.mostrarModalEditar = true;
  }

  // Guardar la edición del horario
  guardarEdicion(): void {
    if (this.horarioSeleccionado) {
      // Verificar y ajustar tipos de datos según lo esperado por la API
      const horarioEditado = { 
        ...this.horarioSeleccionado, 
        num_serie: this.horarioSeleccionado.num_serie.toString(), // Asegurarse de que sea una cadena
      };
  
      // Validación de campos vacíos o nulos (por si no lo habías hecho)
      const { asientos, ubicacion, num_serie, fecha, horario } = horarioEditado;
      if (!asientos || !ubicacion || !num_serie || !fecha || !horario) {
        console.error('Todos los campos son obligatorios y deben tener valores válidos.');
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }
  
      // Enviar los datos de manera correcta a la API
      this.horarioService.editarHorario(this.horarioSeleccionado.id, horarioEditado).subscribe({
        next: () => {
          console.log('Horario editado exitosamente:', horarioEditado);
          this.cargarHorariosDesdeAPI(); // Actualizar la lista
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al editar el horario:', err);
        },
      });
    }
  }
  

  cerrarModal(): void {
    this.mostrarModalEditar = false;
    this.horarioSeleccionado = null;
  }

  deleteHorario(id: number): void {
    this.horarioService.eliminarHorario(id).subscribe({
      next: () => {
        console.log('Horario eliminado con éxito.');
        this.cargarHorariosDesdeAPI(); // Actualizar la lista
      },
      error: (err) => {
        console.error('Error al eliminar horario:', err);
      },
    });
  }
 
  liberarAsientos(id: number): void {
    const horario = this.horarios.find(h => h.id === id);
    if (horario) {
      console.log('Horario seleccionado:', horario);
      setTimeout(() => {
        this.router.navigate(['/liberar'], { state: { horarioSeleccionado: horario } });
      }, 0); // Asegura que la navegación ocurra después de que el ciclo de eventos de Angular se haya completado
    } else {
      console.error('No se encontró el horario con el id:', id);
    }
  }
  
  
  
} 