export interface Reserva {
    id: number | null; // Puede ser nulo si es opcional o aún no asignado
    fecha_reserva: string; // Fecha en formato 'YYYY-MM-DD'
    forma_pago: string; // Forma de pago (string vacío por defecto)
    monto: number; // Monto de la reserva
    pasajero_id: number; // ID del pasajero asociado
    cantidad: number; // Ca
}

