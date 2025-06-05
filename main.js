//variable: es un espacio de memoria reservado para almacenar info importante del programa.

// //declaracion:
// let cliente;
// //asignacion de valores:
// cliente: "Carlos";
// console.log(cliente); //verifico por consola
// //inicializar variables:
// let edad = 37;
// console.log(edad);
// //const: es una variable cuyo valor no puede ser modificado una vez que ha sido asignado.
// const nacimiento = 1987;
// console.log(nacimiento);


// //FUNCIONES
// //Paso 1: Definir la función
// function mostrarLibros() {
//     console.log("Bienvenido a la biblioteca. ¡Estos son los libros disponibles!");
// }

// //Paso 2: Llamar a la función
// mostrarLibros(); // Muestra: Bienvenido a la biblioteca. ¡Estos son los libros disponibles!

// //Paso 3: Añadir parámetros y argumentos a la función (lo q esta dentro del parentesis)
// function buscarLibro(titulo) {
//     console.log(`Buscando el libro: ${titulo}...`);
// }

// buscarLibro("El Principito"); // Argumento al invocar la funcion

// //Paso 4: Utilizar el retorno de la función
// function calcularMulta(diasRetraso) {
//     const multaPorDia = 0.50; // 50 centavos por día de retraso
//     return diasRetraso * multaPorDia;
// }

// let multa = calcularMulta(5);
// console.log(`La multa total es: $${multa}`); // Muestra: La multa total es: $2.5



// //Uso Avanzado: Parámetros Predeterminados
// function devolverLibro(titulo, diasRetraso = 0) {
//     const multa = diasRetraso * 0.50;
//     const mensaje = diasRetraso > 0 
//         ? `Devuelto con ${diasRetraso} días de retraso. Multa: $${multa}` 
//         : "Devuelto a tiempo. No hay multa.";
//     console.log(`Libro "${titulo}": ${mensaje}`);
// }

// devolverLibro("El Principito");
// // Muestra: Libro "El Principito": Devuelto a tiempo. No hay multa.

// devolverLibro("El Principito", 3);
// // Muestra: Libro "El Principito": Devuelto con 3 días de retraso. Multa: $1.5.