import { Component } from '@angular/core';

@Component({
  selector: 'app-liberar',
  templateUrl: './liberar.component.html',
  styleUrls: ['./liberar.component.css']
})
export class LiberarComponent {
  asientosDisponibles: number = 15;

  liberar(): void {
    if (this.asientosDisponibles > 0) {
      this.asientosDisponibles -= 1;
    }
  }
}
