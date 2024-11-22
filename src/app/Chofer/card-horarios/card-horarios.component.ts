import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { RegistroRutaService } from '../../service/registro-ruta.service';
import { Horarios } from '../../interface/horarios';
@Component({
  selector: 'app-card-horarios',
  templateUrl: './card-horarios.component.html',
  styleUrl: './card-horarios.component.css'
})
export class CardHorarioComponent implements OnInit {
  @Input() unidades: string[] = [];
  horarios: Horarios[] = [];
  horariosOriginales: Horarios[] = [];
  terminalSeleccionada: string = '';

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

  
}
