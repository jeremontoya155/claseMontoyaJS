//Cambiar el modo de la pantalla a modo oscuro o no
let btnDark = document.getElementById("boton_dark");
let btnWhite = document.getElementById("boton_white");

//Dejamos agregado en la configuracion si tiene o no
//el modo oscuro
let modo;
function cambioColor() {
  if (localStorage.getItem("modoOscuro")) {
    modo = localStorage.getItem("modoOscuro");
  } else {
    localStorage.setItem("modoOscuro", false);
  }
  if (modo === "true") {
    document.body.classList.remove("whiteMode");
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
    document.body.classList.add("whiteMode");
  }
}

btnDark.addEventListener("click", () => {
  localStorage.setItem("modoOscuro", true);

  console.log("Funcion Oscura");
  cambioColor();
});

btnWhite.addEventListener("click", () => {
  localStorage.setItem("modoOscuro", false);
  console.log("Funcion Clara");
  cambioColor();
});

//Indico los cambios para que quede instanciado directamente en el principio de cada pagina
document.addEventListener("DOMContentLoaded", () => {
  cambioColor();
});
