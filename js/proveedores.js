class Producto {
  constructor(id, nombreP, marca, precio) {
    this.id = id;
    this.nombreP = nombreP;
    this.marca = marca;
    this.precio = precio;
  }
  compa() {
    return `${this.nombreP}${this.marca}`;
  }
}

//Genero la variable que almacenaran los turnos

let productos = [];
const fragment = document.createDocumentFragment();
const tabla_productos = document.getElementById("tabla-productos");

let producto_uno = new Producto(1, "Cera", "Gran Bastardo", 700);
let producto_dos = new Producto(2, "Cera", "Mr Blonde", 850);
let producto_tres = new Producto(3, "Texturizador", "Mr Blonde", 1200);
let producto_cuatro = new Producto(4, "Texturizador", "Yilho", 1000);
let producto_cinco = new Producto(5, "Shampoo(bidon)", "Opcion", 1500);
let producto_seis = new Producto(6, "Shampoo(bidon)", "Sulkey", 1900);
let producto_siete = new Producto(7, "Filos", "Gillete", 2700);
let producto_ocho = new Producto(8, "Filos", "ELIOS", 3000);
let producto_nueve = new Producto(9, "Filos", "Super Max", 2450);

document.addEventListener("DOMContentLoaded", () => {
  inicial();
});

//Genero la funcion inicial para que pueda  hacer el envio hacia documento de manera directa desde
//El localStorage o desde el mismo provedores en caso de ser la primera ocasion que se use

function inicial() {
  if (localStorage.getItem("productos")) {
    let aux = JSON.parse(localStorage.getItem("productos"));

    for (let i = 0; i < aux.length; i++) {
      sumarALista(aux[i], productos, false);
    }
  } else {
    productos.push(
      producto_uno,
      producto_dos,
      producto_tres,
      producto_cuatro,
      producto_cinco,
      producto_seis,
      producto_siete,
      producto_ocho,
      producto_nueve
    );

    cargar_productos();
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}

//Cargar productos es  la encargada de completa el html con el codigo de cada producto
function cargar_productos() {
  tabla_productos.innerHTML = "";
  productos.forEach((element) => {
    let contenido = `
            <tr>
                      <th scope="row">${element.id}</th>
                      <td>${element.nombreP}</td>
                      <td>${element.marca}</td>
                      <td>${element.precio}</td>
                      
                      
             </tr>       


         
      `;
    tabla_productos.innerHTML += contenido;
  });
}

//Definimos la variable del boton que va a permitir cargar los productos
let btn_agregarP = document.getElementById("btn_agregarP");

function sumarALista(prod, productos, ban) {
  //Si el acum es distinto de 1 es que el  producto no estaba cargado
  //No puede ocurrir el error de que el producto sea mayor a 1 debido a que los
  //9 primero productos estan precargados
  let acum = 0;
  productos.forEach((element) => {
    if (prod.id === element.id) {
      acum++;
    }
  });
  if (acum !== 1) {
    productos.push(prod);
    cargar_productos();

    //La bandera nos sirve para saber si estamos cargando la pagina por primera vez o si
    //estamos agregando un producto
    if (ban) {
      Swal.fire({
        title: "Carga completa",
        text: "Ya se pudo cargar el producto",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Inicio correcto",
        text: "Ya puede cargar  productos",
        icon: "success",
      });
    }
  } else {
    Swal.fire({
      title: "Falla",
      text: "No se puede cargar el producto",
      icon: "warning",
    });
  }
  //Enviamos al localStorage el array nuevo cargado
  localStorage.setItem("productos", JSON.stringify(productos));
}

btn_agregarP.addEventListener("click", () => {
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let marca = document.getElementById("marca").value;
  let precio = document.getElementById("precio").value;
  let prod = new Producto(id, nombre, marca, precio);

  verificar(prod);
});

//Verificar nos permite ver que no estemos cargando un objeto con valores vacios
function verificar(prod) {
  if (
    prod.id != "" &&
    prod.nombreP != "" &&
    prod.marca != "" &&
    prod.precio != ""
  ) {
    sumarALista(prod, productos, true);
  } else {
    Swal.fire({
      icon: "error",
      title: "Debe completar todos los campos",
    });
  }
}

//La funcion buscar producto nos da el pie para la busqueda de un producto por el nombre
//Siempre se hace referencia a que la persona debe usar el form para poder hacer correctamente la carga
function buscar_producto(nombre_p, marca_p) {
  let aux = `${nombre_p}${marca_p}`;
  let producto = productos.find(
    (p) => `${p.nombreP}${p.marca}`.toLowerCase() === aux.toLowerCase()
  );
  if (producto != null) {
    Swal.fire({
      title: "Producto",
      text: `${producto.id}
      ${producto.nombreP}
      ${producto.marca}
      ${producto.precio}`,
      icon: "success",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "No se encontro el producto",
      text: "Pruebe cargando nuevamente",
    });
  }
}

//Añadimos la accion para la busqueda por el nombre
let btn_producto = document.getElementById("btn_producto");

btn_producto.addEventListener("click", () => {
  let n = document.getElementById("nombre").value;
  let m = document.getElementById("marca").value;

  buscar_producto(n, m);
});
