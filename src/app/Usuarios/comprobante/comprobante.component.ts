import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
})
export class ComprobanteComponent {
  @Input() nombre: string = '';
  @Input() origen: string = '';
  @Input() destino: string = '';
  @Input() cantidadAsientos: number = 1;
}
