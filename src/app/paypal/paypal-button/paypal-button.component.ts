import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { SharedDataService } from '../../service/total.service';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css'],
})
export class PaypalButtonComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;
  @Input() totalAmount: number = 0;  // Recibimos el totalAmount desde el componente padre

  producto = {
    descripcion: 'Producto en venta',
  };

  constructor(private sharedDataService: SharedDataService, private route: Router) {}

  ngOnInit(): void {
    if (paypal && this.paypalElement) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.producto.descripcion,
                amount: {
                  value: this.totalAmount.toFixed(2), // Usamos el valor de totalAmount
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Pago exitoso",
              showConfirmButton: false,
              timer: 1500
            });
            // Reinicia la cantidad después del pago
            this.sharedDataService.setCantidad(0);
            this.route.navigate(['/horario']);
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago:', err);
        },
      }).render(this.paypalElement.nativeElement);
    }
  }
}
