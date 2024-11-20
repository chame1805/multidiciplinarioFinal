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
  viajeSeleccionado: string = ''; 

  horario: Horarios = {
    hora: '',
    unidad: '',
    viaje: '',
    fecha: '',
    id: 0,
  };

  constructor(private register: RegistroRutaService) {}

  filtrarUnidades() {
    const todasLasUnidades = this.register.getEnvio();
    this.unidadesFiltrada = todasLasUnidades.filter(u =>
      u.fecha === this.horario.fecha && u.viaje === this.viajeSeleccionado
    ).map(u => u.unidad);
    console.log('unidades',this.unidadesFiltrada);
    
    this.register.setTerminalSeleccionada(this.viajeSeleccionado)
    console.log('unidades filtradad',this.unidadesFiltrada);
    
    
  }

  abrirModal() {
    this.mostrarModal = true;
    this.viajeSeleccionado = this.horario.viaje; 
    this.filtrarUnidades(); 
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  envioDatos() {
    if (this.horario.fecha && this.horario.viaje && this.horario.hora && this.horario.unidad) {
      this.register.newInfo({...this.horario}); 
      console.log('Datos enviados', this.horario);

      this.horario = {
        hora: '',
        unidad: '',
        viaje: '',
        fecha: '',
        id: 0,
      }
      this.cerrarModal();
    } else {
      console.error('Faltan campos por completar'); 
    }
  }
}
