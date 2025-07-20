let orderContainer = document.getElementById("order-section");

let orderStorage = JSON.parse(sessionStorage.getItem("orderProducts")) || [];

let productosSeleccionados = orderStorage.filter(producto => producto.cantidad > 0);

const btnEnviar = document.getElementById("btn-enviarPedido");

const productosFiltrados = productosSeleccionados.filter(producto => producto.cantidad > 0);

if (!productosFiltrados[0]) {
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Sin productos en el pedido";
}


function renderPedido(orderItems) {
    let total = 0;
    orderItems.forEach(producto => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        const card = document.createElement("div");
        card.innerHTML = `
                            <h3>${producto.nombre.toUpperCase()}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <p>Subtotal: $${subtotal}</p>
                        `;
        orderContainer.appendChild(card);
    });
    const totalFinal = document.createElement("h2");
    totalFinal.textContent = `Total a pagar: $${total}`;
    orderContainer.appendChild(totalFinal);
}

renderPedido(productosSeleccionados);


document.getElementById("btn-enviarPedido").addEventListener("click", async () => {
    const { value: formValues } = await Swal.fire({
        title: "Completar datos",
        html:   `
                    <input id="swal-input1" class="swal2-input" placeholder="N° de mesa">
                `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
            ];
        }
    });

    if (formValues) {
        Swal.fire({
            title: "Datos ingresados",
            text: `N° de mesa: ${formValues[0]}}`
        });
    }

    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "Transferencia MP": "Transferencia MP",
                "Efectivo": "Efectivo",
                "Tarjeta": "Tarjeta"
            });
        }, 500);
    });

    const { value: metodoPago } = await Swal.fire({
        title: "Selecciona método de pago",
        input: "radio",
        inputOptions,
        customClass: {
            input: 'mi-radio-personalizado'
        },
        inputValidator: (value) => {
            if (!value) {
                return "Tenes que elegir alguna opción!";
            }
        }
    });

    if (metodoPago) {
        Swal.fire({
            icon: "success",
            title: "Su pedido ha sido enviado. Dudas? consulte al mozo.",
            html: `<b>Su método de pago: ${metodoPago}</b>`,
            confirmButtonText: "Enviar"
        });
    }
});


let vaciarPedido = document.getElementById("btn-vaciarPedido").addEventListener("click", () => {
    if (orderContainer.firstChild !== null) {
        sessionStorage.removeItem("orderProducts")
        while (orderContainer.firstChild) {
            orderContainer.removeChild(orderContainer.firstChild);
        }
    }
})

