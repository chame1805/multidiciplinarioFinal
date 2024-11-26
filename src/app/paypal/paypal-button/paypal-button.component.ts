import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  producto = {
    descripcion: 'Producto en venta',
    precio: 20.00,
  };

  ngOnInit(): void {
    // Verificamos si paypal está disponible
    if (paypal && this.paypalElement) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.producto.descripcion,
                amount: {
                  value: this.producto.precio.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert(`Pago realizado por ${details.payer.name.given_name}`);
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago:', err);
        },
      }).render(this.paypalElement.nativeElement); // Renderizamos el botón en el contenedor
    }
  }
}
