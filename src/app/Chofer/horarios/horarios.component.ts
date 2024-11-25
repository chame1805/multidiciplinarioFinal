import { Component } from '@angular/core';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Horarios } from '../../interface/horarios';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css'] 
})
export class HorariosComponent {
  mostrarModal = false;
  unidadesFiltrada: string[] = [];
  ubicacionSeleccionada: string = '';

  horario: Horarios = {
    asientos: 15,
    ubicacion: '',
    num_serie: 0,
    fecha: '',
    horario: '',
    id: 0,
  };

  constructor(private register: RegistroRutaService) {}

  filtrarUnidades() {
    const todasLasUnidades = this.register.getEnvio();
    this.unidadesFiltrada = todasLasUnidades
      .filter(
        (u) => u.fecha === this.horario.fecha && u.ubicacion === this.ubicacionSeleccionada
      )
      .map((u) => u.unidad);
    console.log('unidades', this.unidadesFiltrada);

    this.register.setTerminalSeleccionada(this.ubicacionSeleccionada);
    console.log('unidades filtradas', this.unidadesFiltrada);
  }

  abrirModal() {
    this.mostrarModal = true;
    this.ubicacionSeleccionada = this.horario.ubicacion;
    this.filtrarUnidades();
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  envioDatos() {
    // Si 'asientos' está vacío o tiene el valor 0, asignar un valor predeterminado
    if (this.horario.asientos === 0) {
      this.horario.asientos = 15;  // Asignar 15 como valor predeterminado
    }
  
    // Comprobar si los campos obligatorios están completos
    if (
      this.horario.fecha &&
      this.horario.ubicacion &&
      this.horario.horario &&
      this.horario.num_serie
    ) {
      const datosParaAPI = {
        asientos: this.horario.asientos,
        ubicacion: this.horario.ubicacion,
        num_serie: this.horario.num_serie.toString(), // Convertir a string
        fecha: this.horario.fecha,
        horario: this.horario.horario,
    };
    
  
      this.register.enviarDatosAPI(datosParaAPI).subscribe({
        next: (response) => {
          console.log('Datos enviados correctamente:', response);
          this.register.newInfo({ ...this.horario }); // Guardar localmente
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al enviar datos:', err);
        },
      });
    } else {
      console.error('Faltan campos por completar');
    }
  }
  

  limpiarFormulario() {
    this.horario = {
    asientos: 15,
    ubicacion: '',
    num_serie: 0,
    fecha: '',
    horario: '',
      id: 0,
    };
    this.cerrarModal();
  }
}