//Constructors para las clases utilizadas
//const Swal = require("sweetalert2");
//Probe con la instruccion tanto el import y el require ambas me daban el mismo error
//En proxima entrega dejo desglose con module de cualquier forma con el live server puede verse
//el uso del Swal asi como tambien una vez que hace el deplor el github
class Turno {
  constructor(dia, nombre, horario) {
    this.dia = dia;
    this.nombre = nombre;
    this.horario = horario;
  }

  comp() {
    return `${this.dia}${this.horario}`;
  }
}

//Variables iniciales que van a ser usadas para carga o como banderas
let turnos = [];
let aux;

document.addEventListener("DOMContentLoaded", () => {
  inicial();
});

function inicial() {
  //Comprobamos que si ya tenemos algun turno cargado
  if (localStorage.getItem("Turnos")) {
    aux = JSON.parse(localStorage.getItem("Turnos"));

    //realizamos la carga de manera que pueda verse reflejado en la tabla para el usuario si es que ya cargase algun turno
    for (let i = 0; i < aux.length; i++) {
      auxCarga(aux[i], false);
    }
  }
}

//Carga de los turnos de manera dinamica
function cargarTurnos() {
  let nombre = document.getElementById("nombre");
  let dia = document.getElementById("dia");
  let hora = document.getElementById("hora");

  let turn;
  if (nombre.value != "" && dia.value != "" && hora.value != "") {
    turn = new Turno(dia.value, nombre.value, hora.value);
  } else {
    //Caso expecional para verificar que la persona no cargue un turno vacio
    turn = new Turno("nan", "nan", "nan");
  }
  return turn;
}

function agregar_tabla(turno) {
  //funcion para modificar el html
  let espacio = document.getElementById("agregar_contenido");
  let agregado = `<tr id="${turno.dia}-${turno.horario}">
      <td >${turno.nombre}</td>
      <td>${turno.dia}</td>
      <td>${turno.horario}</td>
      </tr>`;
  espacio.innerHTML += agregado;
}

let auxInicial = 0;

//funcion principal que  hace llamada del agregado a la tabla y termina de evaluar si el turno recibido es o no nulo
function auxCarga(turno, banAux) {
  let ban = true;

  let comparador = `${turno.dia}${turno.horario}`;
  for (let t of turnos) {
    let comparadorAux = `${t.dia}${t.horario}`;
    if (comparadorAux == comparador) {
      ban = false;
    }
  }

  if (ban) {
    if (turno.nombre == "nan") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puede cargar un turno vacio",
      });
    } else {
      turnos.push(turno);

      localStorage.setItem("Turnos", JSON.stringify(turnos));
      agregar_tabla(turno);
      auxInicial++;
    }

    if (auxInicial >= turnos.length) {
      if (banAux) {
        confirmo();
      } else {
        Swal.fire({
          title: "Puede iniciar a cargar sus turnos",
          icon: "success",
        });
      }
    }
  } else {
    ocupado();
  }
}

//botones con muestras para el usuario en caso de confirmacion o de ocupacion
let btnCarga = document.getElementById("btn_cargar");
function confirmo() {
  Swal.fire({
    title: "Confirmo turno",
    text: "Agendado correctamente",
    icon: "success",
  });
}

function ocupado() {
  Swal.fire({
    title: "Aviso",
    text: "Turno ocupado o realizo cancelacion",
    icon: "warning",
  });
}

//agregamos la accion para cuando estemos presionando sobre el agregar turnos
btnCarga.addEventListener("click", () => {
  let turno = cargarTurnos();
  auxCarga(turno, true);
});

function buscar(nom) {
  let resultado = turnos.find((tur) => tur.nombre === nom);
  return resultado;
}

//Buscamos el boton que da pie a la accion de una busqueda por nombre
let busqueda_nombre = document.getElementById("btn_nombre");

//auxiliar que permite dar una salida por swetalert2 a los campos del turno
function avisoNombre(valor, valorDos, valorTres) {
  Swal.fire({
    title: "Turno",
    text: `La persona:
    ${valor}
    tiene el siguiente turno 
    Dia:${valorDos}
    Hora:${valorTres}`,
    icon: "success",
  });
}

//agregamos al boton las acciones creadas
busqueda_nombre.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let devolucion = buscar(n.value);

  if (devolucion != null) {
    avisoNombre(devolucion.nombre, devolucion.dia, devolucion.horario);
  } else {
    Swal.fire({
      title: "No tiene un turno asignado",
      text: "Ingrese nuevamente un nombre para confirmar",
    });
  }
});

function eliminar(salida) {
  if (salida.nombre != null) {
    let indice = turnos.indexOf(salida);
    turnos.splice(indice, 1);
    localStorage.removeItem("Turnos");
    localStorage.setItem("Turnos", JSON.stringify(turnos));
    Swal.fire({
      title: "Eliminado correctamente",
      text: "Se encontro el turno buscado(recuerde que solo se cancela el ultimo cargado)",
      icon: "success",
    });
    let id_eliminar = salida.dia + "-" + salida.horario;
    let espacio_eliminado = document.getElementById(id_eliminar);
    espacio_eliminado.outerHTML = "";
    inicial();
  } else {
    Swal.fire({
      text: "No se encontro el turno ingresado",
      icon: "error",
    });
  }
}

//agregamos la accion que nos permite eliminar
let btn_eliminar = document.getElementById("btn_eliminar");
btn_eliminar.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let salida = buscar(n.value);

  if (salida != null) {
    eliminar(salida);
  } else {
    Swal.fire({
      title: "Error",
      text: "Caso fallido no se encontro a la persona",
      icon: "error",
    });
  }
});
