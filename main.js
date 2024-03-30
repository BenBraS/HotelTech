// ENTREGA N 4 v4

const nombreHotel = "HotelTech";
const costoPorNocheStandard = 1000;
const costoPorNocheSuperior = 1500;

let reservas = [];
let idReserva = 1;
cargarReservasDesdeLocalStorage();

function cargarReservasDesdeLocalStorage() {
    const reservasGuardadas = localStorage.getItem("reservas");
    if (!reservasGuardadas || reservasGuardadas.length === 0) {
        return;
    }
    try {
        reservas = JSON.parse(reservasGuardadas);
        if (!Array.isArray(reservas)) {
            throw new Error('Reservas guardadas no son un array.');
        }
        // Encontrar el último ID de reserva utilizado y establecer el nuevo ID de reserva
        const ultimoIdReserva = parseInt(localStorage.getItem("ultimoIdReserva")) || 0;
        idReserva = ultimoIdReserva + 1;
    } catch (error) {
        console.error('Error al cargar las reservas desde el almacenamiento local:', error);
        reservas = [];
    }
}

function Reserva(id, nombreCliente, tipoHabitacion, cantidadNoches, cantidadPersonas, cantidadHabitaciones, costoTotal) {
    this.id = id;
    this.nombreCliente = nombreCliente;
    this.tipoHabitacion = tipoHabitacion;
    this.cantidadNoches = cantidadNoches;
    this.cantidadPersonas = cantidadPersonas;
    this.cantidadHabitaciones = cantidadHabitaciones;
    this.costoTotal = costoTotal;
}

function mostrarResumen(reservas) {
    const footer = document.getElementById("footer");
    // Buscar el elemento que contiene el texto "Reservas Confirmadas"
    const reservasConfirmadasElemento = footer.querySelector(".reservas_confirmadas");
 // Crear un contenedor para las nuevas reservas
 const resumenContainer = document.getElementById("resumenContainer");
    // Limpiar contenido anterior
    footer.innerHTML = '';

    // Recorremos las reservas en orden inverso
    for (let i = reservas.length - 1; i >= 0; i--) {
        const reserva = reservas[i];

        const reservaFooter = document.createElement("div");
        reservaFooter.classList.add("reserva_footer");

        const clienteElemento = document.createElement("p");
        clienteElemento.textContent = "Cliente: " + reserva.nombreCliente;

        const tipoHabitacionElemento = document.createElement("p");
        tipoHabitacionElemento.textContent = "Tipo de habitación: " + (reserva.tipoHabitacion === 1 ? "Habitación estándar" : "Habitación superior");

        const nochesElemento = document.createElement("p");
        nochesElemento.textContent = "Noches: " + reserva.cantidadNoches;

        const habitacionesElemento = document.createElement("p");
        habitacionesElemento.textContent = "Habitaciones: " + reserva.cantidadHabitaciones;

        const costoTotalElemento = document.createElement("p");
        costoTotalElemento.textContent = "Costo total: $" + reserva.costoTotal;

        reservaFooter.appendChild(clienteElemento);
        reservaFooter.appendChild(tipoHabitacionElemento);
        reservaFooter.appendChild(nochesElemento);
        reservaFooter.appendChild(habitacionesElemento);
        reservaFooter.appendChild(costoTotalElemento);

        footer.appendChild(reservaFooter);
    }
}


function agregarReserva(tipoHabitacion, cantidadNoches, cantidadPersonas, cantidadHabitaciones, costoTotal) {
    // Obtener el último ID utilizado del almacenamiento local
    const ultimoIdReserva = parseInt(localStorage.getItem("ultimoIdReserva")) || 0;

    let nuevaReserva = new Reserva(ultimoIdReserva + 1, document.getElementById("nombreCliente").value, tipoHabitacion, cantidadNoches, cantidadPersonas, cantidadHabitaciones, costoTotal);

    // Agregar la nueva reserva al array de reservas
    reservas.push(nuevaReserva);

    // Incrementar el ID de reserva y guardar en el almacenamiento local
    const nuevoIdReserva = ultimoIdReserva + 1;
    localStorage.setItem("ultimoIdReserva", nuevoIdReserva);
    guardarReservasEnLocalStorage();

    return nuevaReserva;
}
    
function calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadPersonas) {
    let costoPorNoche = tipoHabitacion === 1 ? costoPorNocheStandard : costoPorNocheSuperior;
    return costoPorNoche * parseInt(cantidadNoches) * Math.ceil(parseInt(cantidadPersonas) / 2);
}

function realizarReserva() {
    let tipoHabitacion = document.getElementById("tipoHabitacion").value;
    let cantidadNoches = document.getElementById("cantidadNoches").value;
    let cantidadPersonas = document.getElementById("cantidadPersonas").value;

    let nombreClienteInput = document.getElementById("nombreCliente");
    if (!nombreClienteInput || nombreClienteInput.value.trim() === "") {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    let nombreCliente = nombreClienteInput.value;

    if (!tipoHabitacion) {
        alert("Por favor, seleccione un tipo de habitación.");
        return;
    }

    if (isNaN(cantidadNoches) || cantidadNoches <= 0) {
        alert("Por favor, ingrese un número válido para la cantidad de noches.");
        return;
    }

    if (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        alert("Por favor, ingrese un número válido para la cantidad de personas.");
        return;
    }

    // Calcular la cantidad de habitaciones necesarias
    let cantidadHabitaciones = Math.ceil(parseInt(cantidadPersonas) / 2);

    // Calcular el costo total utilizando la función calcularCostoTotal
    let costoTotal = calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadPersonas);
    
    // Mostrar el valor de la reserva antes de confirmar
    alert("El costo total de la reserva es: $" + costoTotal);

    let confirmarReserva = window.confirm("¿Desea confirmar la reserva por $" + costoTotal + "?");

    if (confirmarReserva) {
        let reserva = agregarReserva(tipoHabitacion, cantidadNoches, cantidadPersonas, cantidadHabitaciones, costoTotal);
        mostrarResumen(reservas);

        // Eliminar el mensaje de confirmación
        const mensajeConfirmacion = document.querySelector(".mensaje_confirmacion");
        if (mensajeConfirmacion) {
            mensajeConfirmacion.remove();
        }

        // Mostrar el nuevo mensaje de confirmación
        const nuevoMensajeConfirmacion = document.createElement("p");
        nuevoMensajeConfirmacion.textContent = "¡Reserva confirmada! Gracias " + nombreCliente + " por hospedarse en " + nombreHotel + ". ¡Disfrute de su estancia!";
        nuevoMensajeConfirmacion.classList.add("mensaje_confirmacion");
        document.body.appendChild(nuevoMensajeConfirmacion);
        mostrarResumen(reservas);
    
    } else {
        const mensajeCancelacion = document.createElement("p");
        mensajeCancelacion.textContent = "Reserva cancelada.";
        document.body.appendChild(mensajeCancelacion);
    }
    
}

function guardarReservasEnLocalStorage() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

const confirmarReservaBtn = document.getElementById("confirmarReservaBtn");

if (confirmarReservaBtn) {
    confirmarReservaBtn.addEventListener("click", function () {
        realizarReserva();
    });
}

