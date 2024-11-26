import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroRutaService } from '../../service/registro-ruta.service';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
})
export class ComprobanteComponent implements OnInit {
  nombre: string = '';
  origen: string = '';
  destino: string = '';
  cantidadAsientos: number = 1;
  pasajeros: any[] = []; // Lista de pasajeros

  constructor(
    private route: ActivatedRoute,
    private registroRutaService: RegistroRutaService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del colectivo desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id); // Agregar un log para confirmar
    if (id) {
      this.cargarPasajeros(id);
    }
  }  
  cargarPasajeros(id: number): void {
    this.registroRutaService.obtenerPasajerosPorColectivo(id).subscribe(
      (data) => {
        this.pasajeros = data;
        console.log('Pasajeros cargados:', this.pasajeros);
      },
      (error) => {
        console.error('Error al cargar los pasajeros:', error);
      }
    );
  }
  
}
