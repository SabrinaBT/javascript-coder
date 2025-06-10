

const menu = ["cafe", "te", "criollo", "medialuna"];
const precios = [350, 300, 200, 250];
let total = 0;

function darBienvenida() {
    console.log("Bienvenido a mi cafetería");
}
darBienvenida();

function mostrarMenu(lista, precios) {
    let mensaje = "Menú disponible:\n";
    for (let i = 0; i < lista.length; i++) {
        mensaje += `- ${lista[i]}: $${precios[i]}\n`;
    }
    alert(mensaje);
    console.log(mensaje);
}

function productoValido(nombre, lista) {
    for (let i = 0; i < lista.length; i++) {
        if (nombre == lista[i]) {
            return i;
        }
    }
    return -1;
}

function agregarAlTotal(indice, precios) {
    total = total + precios[indice];
}

let seguir = true;

while (seguir) {
    let opcion = prompt("Elija la opción ingresando el número correspondiente\n 1. Ver el menú\n 2. Hacer un pedido\n 3. Ver total a pagar y/o salir");

    switch (opcion) {
        case "1":
            mostrarMenu(menu, precios);
            break;

        case "2":
            let pedido = prompt("Ingrese el nombre del producto elegido, uno a la vez").toLowerCase();
            let indice = productoValido(pedido, menu);

            if (indice !== -1) {
                agregarAlTotal(indice, precios);
                alert("Producto agregado: " + menu[indice]);
            } else {
                alert("Ese producto no está en el menú.");
            }
            break;

        case "3":
            seguir = false;
            break;

        default:
            alert("Opción no válida. Escribí 1, 2 o 3.");
    }
}

alert("Gracias por tu visita. Total a pagar: $" + total);
console.log("Total final: $" + total);



