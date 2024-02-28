// ENTREGA N 2 v2
// Definir variables para el hotel
const nombreHotel = "HotelTech";
const costoPorNocheStandard = 1000;
const costoPorNocheSuperior = 1500;

// Array para almacenar las reservas con IDs
let reservas = [];

// Variable para generar IDs únicos
let idReserva = 1;

// Solicitar nombre al usuario
let nombreCliente = prompt("¡Bienvenido a " + nombreHotel + "! Por favor, ingrese su nombre:");
nombreCliente = nombreCliente.toLowerCase();

// Función constructora para las reservas
function Reserva(id, nombreCliente, tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal) {
    this.id = id;
    this.nombreCliente = nombreCliente;
    this.tipoHabitacion = tipoHabitacion;
    this.cantidadNoches = cantidadNoches;
    this.cantidadHabitaciones = cantidadHabitaciones;
    this.costoTotal = costoTotal;
}

// Función para mostrar el resumen de la reserva
function mostrarResumen(reserva) {
    alert("Resumen de la reserva:\n\nID de Reserva: " + reserva.id + "\nCliente: " + reserva.nombreCliente + "\nTipo de Habitación: " + (reserva.tipoHabitacion === 1 ? "Habitación Estándar" : "Habitación Superior") + "\nNoches: " + reserva.cantidadNoches + "\nHabitaciones: " + reserva.cantidadHabitaciones + "\nCosto total: $" + reserva.costoTotal);
}

// Función para agregar una reserva al array
function agregarReserva(tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal) {
    let nuevaReserva = new Reserva(idReserva, nombreCliente, tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal);
    reservas.push(nuevaReserva);
    idReserva++;
    return nuevaReserva;
}

// Función para calcular el costo total
function calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadHabitaciones) {
    let costoPorNoche = tipoHabitacion === 1 ? costoPorNocheStandard : costoPorNocheSuperior;
    return costoPorNoche * parseInt(cantidadNoches) * parseInt(cantidadHabitaciones);
}

// Función Principal
function realizarReserva() {
    let tipoHabitacion, cantidadNoches, cantidadHabitaciones;
    let opcionMenu;

    do {
        opcionMenu = prompt("Menú de opciones:\n1. Modificar nombre del cliente\n2. Modificar tipo de habitación\n3. Modificar cantidad de noches\n4. Modificar cantidad de habitaciones\n5. Confirmar reserva\n6. Salir del programa\nIngrese el número de la opción:");

        switch (opcionMenu) {
            case '1':
                nombreCliente = prompt("Modificar Nombre | Nueva Reserva");
                break;
            case '2':
                tipoHabitacion = prompt("¿Qué tipo de habitación prefiere?\n1. Habitación Estándar\n2. Habitación Superior");
                break;
            case '3':
                cantidadNoches = prompt("¿Cuántas noches planea quedarse?");
                break;
            case '4':
                cantidadHabitaciones = prompt("¿Cuántas habitaciones desea reservar?");
                break;
            case '5':
                // Calcular el costo total
                let costoTotal = calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadHabitaciones);

                // Mostrar la información al usuario y obtener la reserva
                let reserva = agregarReserva(tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal);
                mostrarResumen(reserva);

                // Confirmar la reserva
                let confirmarReserva = prompt("¿Desea confirmar la reserva? (Ingrese 'si' para confirmar, 'no' para volver al menú)");
                if (confirmarReserva.toLowerCase() === 'si') {
                    alert("¡Reserva confirmada! Gracias por elegir " + nombreHotel + ". Disfrute de su estancia.");
                } else if (confirmarReserva.toLowerCase() === 'no') {
                    alert("Reserva cancelada. Volviendo al menú");
                }
                break;
            case '6':
                alert("Saliendo del programa.");
                break;
            default:
                alert("Opción no válida. Por favor, seleccione una opción válida.");
        }
    } while (opcionMenu !== '6');
}

// Iniciar el proceso de reserva || Función Principal
realizarReserva();
// Mostrar las reservas almacenadas al finalizar el programa
console.log("Reservas realizadas:");
console.log(reservas);
