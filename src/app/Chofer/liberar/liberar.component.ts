import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-liberar',
  templateUrl: './liberar.component.html',
  styleUrls: ['./liberar.component.css'],
})
export class LiberarComponent implements OnInit {
  asientosDisponibles: number = 0;
  horarioSeleccionado: any = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private reservaService: ReservaService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    const horarioSeleccionado = history.state?.horarioSeleccionado;

    if (horarioSeleccionado) {
      this.horarioSeleccionado = horarioSeleccionado;
      this.asientosDisponibles = this.horarioSeleccionado.asientos;
      console.log('Horario seleccionado:', this.horarioSeleccionado);
    } else {
      console.error('No se recibió un horario seleccionado.');
    }
  }

  liberar(): void {
    if (this.asientosDisponibles < 15) {
      this.asientosDisponibles += 1;
  
      const datosActualizados = {
        id: 0,
        asientos: this.asientosDisponibles,
        ubicacion: "string",
        num_serie: "string",
        fecha: "string",
        horario: "string"
   };
  
      this.reservaService
        .actualizarReserva1(this.horarioSeleccionado.id, datosActualizados)
        .subscribe({
          next: (response) => {
            console.log('Asientos actualizados:', response);
          },
          error: (err) => {
            console.error('Error al actualizar los asientos:', err);
          },
        });
    } else {
      alert('No puedes liberar más asientos. Ya se alcanzo el maximo.');
    }
  }
  

  cancelar(): void {
    this.router.navigate(['/rutas']);
  }
}
