let productosContainer = document.getElementById("products-container")
let btnSumar = document.querySelectorAll(".plus-button");
let btnRestar = document.querySelectorAll(".minus-button");
let contadores = document.querySelectorAll(".counter");

const url = "../data/productos.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        productos = data;
        iniciarEventos();
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los productos. Por favor, recargá la página o intentá más tarde.",
        });
    });


function iniciarEventos() {
    btnSumar.forEach((btn, index) => {
        let contador = productos[index].cantidad;

        btn.addEventListener("click", () => {
            if (contador < 5) {
                contador++;
                productos[index].cantidad = contador;
                contadores[index].innerText = contador;
                btnRestar[index].disabled = false;

                const productosFiltrados = productos.filter(producto => producto.cantidad > 0);
                sessionStorage.setItem("orderProducts", JSON.stringify(productosFiltrados));;
            }
        });

        btnRestar[index].addEventListener("click", () => {
            if (contador > 0) {
                contador--;
                productos[index].cantidad = contador;
                contadores[index].innerText = contador;
                
                const productosFiltrados = productos.filter(producto => producto.cantidad > 0);
                sessionStorage.setItem("orderProducts", JSON.stringify(productosFiltrados));
            }

            if (contador === 0) {
                btnRestar[index].disabled = true;
            }
        });

        btnRestar[index].disabled = true;
    });
}
