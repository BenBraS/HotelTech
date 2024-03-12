// ENTREGA N 3 v3

const nombreHotel = "HotelTech";
const costoPorNocheStandard = 1000;
const costoPorNocheSuperior = 1500;

let reservas = [];
let idReserva = 1;
// Función Constructora de reservas
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
    const resumenContainer = document.getElementById("resumenContainer");

    // Crear tarjetas en un div y clase para estilos
    const tarjetaReserva = document.createElement("div");
    tarjetaReserva.classList.add("tarjeta_reserva");

    // Crear los elementos dentro de la tarjeta
    const idReservaElemento = document.createElement("p");
    idReservaElemento.textContent = "ID de reserva: " + reserva.id;

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

    // Agregar elementos a la tarjeta
    tarjetaReserva.appendChild(idReservaElemento);
    tarjetaReserva.appendChild(clienteElemento);
    tarjetaReserva.appendChild(tipoHabitacionElemento);
    tarjetaReserva.appendChild(nochesElemento);
    tarjetaReserva.appendChild(habitacionesElemento);
    tarjetaReserva.appendChild(costoTotalElemento);

    // Agregar la tarjeta al contenedor
    resumenContainer.appendChild(tarjetaReserva);
}
function agregarReserva(tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal) {
    let nuevaReserva = new Reserva(idReserva, document.getElementById("nombreCliente").value, tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal);
    reservas.push(nuevaReserva);
    idReserva++;
    return nuevaReserva;
}

function calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadHabitaciones) {
    let costoPorNoche = tipoHabitacion === 1 ? costoPorNocheStandard : costoPorNocheSuperior;
    return costoPorNoche * parseInt(cantidadNoches) * parseInt(cantidadHabitaciones);
}

function realizarReserva() {
    let tipoHabitacion = document.getElementById("tipoHabitacion").value;
    let cantidadNoches = document.getElementById("cantidadNoches").value;
    let cantidadHabitaciones = document.getElementById("cantidadHabitaciones").value;

  // VALIDACIONES || CAMPO CLIENTE NO VACÍO
  let nombreClienteInput = document.getElementById("nombreCliente");
  if (!nombreClienteInput || nombreClienteInput.value.trim() === "") {
      alert("Por favor, ingrese su nombre.");
      return;
  }
  let nombreCliente = nombreClienteInput.value;
// Validar que se haya seleccionado un tipo de habitación
if (!tipoHabitacion) {
    alert("Por favor, seleccione un tipo de habitación.");
    return;
}

// Validar que la cantidad de noches sea un número válido
if (isNaN(cantidadNoches) || cantidadNoches <= 0) {
    alert("Por favor, ingrese un número válido para la cantidad de noches.");
    return;
}

// Validar que la cantidad de habitaciones sea un número válido
if (isNaN(cantidadHabitaciones) || cantidadHabitaciones <= 0) {
    alert("Por favor, ingrese un número válido para la cantidad de habitaciones.");
    return;
}
/// Si todos los campos están validados, continuar función
    let costoTotal = calcularCostoTotal(tipoHabitacion, cantidadNoches, cantidadHabitaciones);
    let reserva = agregarReserva(tipoHabitacion, cantidadNoches, cantidadHabitaciones, costoTotal);

    let confirmarReserva = window.confirm("¿Desea confirmar la reserva?");
    
    

    if (confirmarReserva) {
        mostrarResumen(reserva);
        const mensajeConfirmacion = document.createElement("p");
        mensajeConfirmacion.textContent = "¡Reserva confirmada! Gracias por hospedarse en  " + nombreHotel + ". ¡Disfrute de su estancia!";
        document.body.appendChild(mensajeConfirmacion);
        guardarReservasEnLocalStorage();
    } else {
        const mensajeCancelacion = document.createElement("p");
        mensajeCancelacion.textContent = "Reserva cancelada.";
        document.body.appendChild(mensajeCancelacion);
    }
}

function cargarReservasDesdeLocalStorage() {
    const reservasGuardadas = localStorage.getItem("reservas");
    if (reservasGuardadas) {
        reservas = JSON.parse(reservasGuardadas);
        idReserva = reservas.length > 0 ? reservas[reservas.length - 1].id + 1 : 1;
    }
}

function guardarReservasEnLocalStorage() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}
// Obtén el botón por su ID
const confirmarReservaBtn = document.getElementById("confirmarReservaBtn");

// Agrega el evento click al botón e inicializa función principal. 
if (confirmarReservaBtn) {
    confirmarReservaBtn.addEventListener("click", function () {
        realizarReserva();
    });
}

cargarReservasDesdeLocalStorage();

