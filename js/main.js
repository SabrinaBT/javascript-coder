const menu = ["cafe", "te", "criollo", "medialuna"]
const precios = [350, 300, 200, 250]
let total = 0;

function darBienvenida() {
    console.log("Bienvenido a mi cafetería")
    alert("Bienvenido a mi cafetería")
}
darBienvenida();

function mostrarMenu(lista, precios) {
    let mensaje = "Menú disponible:\n";
    let i = 0;
    for (const producto of lista) {
        mensaje += `- ${producto}: $${precios[i]}\n`;
        i++; 
    }
    alert(mensaje);
    console.log(mensaje);
}

function productoValido(nombre, lista) {
    let index = 0;
    for (const producto of lista) {
        if (nombre === producto) {
            return index; 
        }
        index++;
    }
    return -1; 
}

function agregarAlTotal(indice, precios) {
    total = total + precios[indice];
}


function pedidos(){
    let pedido = prompt("Ingrese el nombre del producto elegido, uno a la vez").toLowerCase();
    let indice = productoValido(pedido, menu);

    if (indice !== -1) {
        agregarAlTotal(indice, precios);
        alert("Producto agregado: " + menu[indice]);
    } else {
        alert("Ese producto no está en el menú.");
    }
}

let opcion = parseInt(prompt("Elija la opción ingresando el número correspondiente\n 1. Ver el menú\n 2. Hacer un pedido\n 3. Ver total a pagar\n 4. Salir"));

while (opcion !== 4) {
    switch (opcion) {
        case 1:
            mostrarMenu(menu, precios)
            break;

        case 2:
            pedidos()
            break;

        case 3:
           alert("Total final: $" + total);
            console.log("Total final: $" + total);
            break;

        default:
            alert("Opción no válida. Ingrese un número del 1 al 4");
    }
    opcion = parseInt(prompt("Elija la opción ingresando el número correspondiente\n 1. Ver el menú\n 2. Hacer un pedido\n 3. Ver total a pagar\n 4. Salir"));
}

alert("Gracias por tu visita.");




