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
            text: "No se pudieron cargar los productos. Por favor, refresca la página o intentá más tarde.",
        });
    });


function iniciarEventos() {
    btnSumar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (productos[index].cantidad < 5) {
                productos[index].cantidad++;
                contadores[index].innerText = productos[index].cantidad;
                btnRestar[index].disabled = false;
            }
        });

        btnRestar[index].addEventListener("click", () => {
            if (productos[index].cantidad > 0) {
                productos[index].cantidad--;
                contadores[index].innerText = productos[index].cantidad;

                if (productos[index].cantidad === 0) {
                    btnRestar[index].disabled = true;
                }
            }
        });

        if (productos[index].cantidad === 0) {
            btnRestar[index].disabled = true;
        }
    });

    let btnAgregar = document.querySelectorAll(".agregar-button");
    btnAgregar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const cantidadActual = productos[index].cantidad;

            if (cantidadActual > 0) {
                let pedidoActual = JSON.parse(sessionStorage.getItem("orderProducts")) || [];
                let existente = pedidoActual.find(producto => producto.id === productos[index].id);

                if (existente) {
                    existente.cantidad += cantidadActual;
                } else {
                    pedidoActual.push({
                        id: productos[index].id,
                        nombre: productos[index].nombre,
                        precio: productos[index].precio,
                        cantidad: cantidadActual
                    });
                }

                sessionStorage.setItem("orderProducts", JSON.stringify(pedidoActual));

                Swal.fire({
                    icon: "success",
                    title: "Producto agregado",
                    text: `${productos[index].nombre.toUpperCase()} x${cantidadActual} agregado al pedido.`,
                    timer: 1500,
                    showConfirmButton: false
                });

                productos[index].cantidad = 0;
                contadores[index].innerText = 0;
                btnRestar[index].disabled = true;
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Cantidad inválida",
                    text: "Seleccioná al menos 1 unidad antes de agregar.",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    });

    let btnIrAlPedido = document.getElementById("btn-pedido");
    btnIrAlPedido.addEventListener("click", () => {
        let pedido = JSON.parse(sessionStorage.getItem("orderProducts")) || [];

        for (const producto of pedido) {
            if (producto.cantidad > 0) {
                window.location.href = "./pedido.html";
                return;
            }
        }

        Swal.fire({
            icon: "warning",
            title: "Pedido vacío",
            text: "Debés presionar el botón 'Agregar al pedido' antes de continuar",
            confirmButtonText: "Aceptar"
        });
    });
}
