
// while (acceso === 18) {
//     switch (opcion) {
//         case 1:
//             mostrarMenu(menu, precios)
//             break;

//         case 2:
//             pedidos()
//             break;

//         case 3:
//        //    alert("Total final: $" + total);
//            // console.log("Total final: $" + total);
//             break;

//         default:
//       //      alert("Opción no válida. Ingrese un número del 1 al 4");
//     }
//    // opcion = parseInt(prompt("Elija la opción ingresando el número correspondiente\n 1. Ver el menú\n 2. Hacer un pedido\n 3. Ver total a pagar\n 4. Salir"));
// }


const inputEdad = document.getElementById("edad");
const btnAceptar = document.getElementById("btn-aceptar");
const mensaje = document.getElementById("mensaje");
const modal = document.getElementById("miModal");

btnAceptar.addEventListener("click", () => {
  const edad = parseInt(inputEdad.value);

  if (edad >= 18) {
    modal.classList.add("oculto");
  } else {
    mensaje.textContent = "No podés ingresar, sos menor de edad.";
  }
});

