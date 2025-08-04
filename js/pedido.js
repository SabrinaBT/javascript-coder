let orderContainer = document.getElementById("order-section");
let btnConfirmar = document.getElementById("btn-confirmarPedido");

let orderStorage = JSON.parse(sessionStorage.getItem("orderProducts")) || [];
let productosSeleccionados = orderStorage.filter(producto => producto.cantidad > 0);

renderPedido(productosSeleccionados);

function renderPedido(productos) {
    orderContainer.innerHTML = "";
    let total = 0;

    productos.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        const card = document.createElement("div");
        card.innerHTML = `
                            <h3>${producto.nombre.toUpperCase()}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span></p>
                            <p>Subtotal: $<span id="subtotal-${producto.id}">${subtotal}</span></p>
                            <button class="minus-button" value="${producto.id}">−</button>
                            <button class="plus-button" value="${producto.id}">+</button>
                            <button class="btn-eliminar" value="${producto.id}">Eliminar</button>
                        `;
        orderContainer.appendChild(card);
    });

    const totalFinal = document.createElement("h2");
    totalFinal.id = "totalFinal";
    totalFinal.textContent = `Total a pagar: $${total}`;
    orderContainer.appendChild(totalFinal);
    BotonConfirmar(productos); 
    agregarBotones();
    
}

function agregarBotones() {
    let pedido = JSON.parse(sessionStorage.getItem("orderProducts")) || [];

    document.querySelectorAll(".plus-button").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.value);
            const producto = pedido.find(producto => producto.id === id); 
            if (producto && producto.cantidad < 5) {
                producto.cantidad++;
                actualizarPedido(pedido);
            }
        });
    });

    document.querySelectorAll(".minus-button").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.value);
            pedido.forEach(producto => {
                if (producto.id === id && producto.cantidad > 0) {
                    producto.cantidad--;
                }
            });
            pedido = pedido.filter(producto => producto.cantidad > 0);
            actualizarPedido(pedido);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.value);
            pedido = pedido.filter(producto => producto.id !== id);
            actualizarPedido(pedido);
        });
    });
}

function actualizarPedido(nuevoPedido) {
    const productosFiltrados = nuevoPedido.filter(producto => producto.cantidad > 0);
    sessionStorage.setItem("orderProducts", JSON.stringify(productosFiltrados));
    renderPedido(productosFiltrados); 
}

function BotonConfirmar(pedido) {
    let hayProductos = false;

    for (const producto of pedido) {
        hayProductos = true;
        break;
    }
    if (hayProductos) {
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = "Confirmar Pedido";
    } else {
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "Sin productos en el pedido";
    }
}

btnConfirmar.addEventListener("click", async () => {
    const { value: numeroMesa } = await Swal.fire({
        title: "N° de mesa",
        input: "text",
        inputLabel: "Ingresá tu número de mesa",
        inputPlaceholder: "Ej: 5",
        inputValidator: (value) => {
            if (!value || isNaN(value) || parseInt(value) <= 0) {
                return "Tenés que ingresar un número positivo";
            }
        }
    });

    if (!numeroMesa) return;

    const metodoPago = await Swal.fire({
        title: "Selecciona un método de pago",
        input: "radio",
        inputOptions: {
            "Transferencia MP": "Transferencia MP",
            "Efectivo": "Efectivo",
            "Tarjeta": "Tarjeta"
        },
        inputValidator: (value) => {
            if (!value) return "Tenés que elegir alguna opción";
        }
    });

    if (metodoPago.value) {
        const pedido = JSON.parse(sessionStorage.getItem("orderProducts")) || [];
        generarComprobantePedido(pedido, numeroMesa, metodoPago.value); 
        sessionStorage.removeItem("orderProducts");
    }
});

document.getElementById("btn-vaciarPedido").addEventListener("click", () => {
    sessionStorage.removeItem("orderProducts");
    orderContainer.innerHTML = "";
    BotonConfirmar([]); 
});


function generarComprobantePedido(pedido, numeroMesa, metodoPago) {
    let resumenHtml = "<ul>";
    let resumenTextoQR = `MESA: ${numeroMesa}\nPAGO: ${metodoPago}\nPEDIDO:\n`;
    let total = 0;

    for (const prod of pedido) {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;
        resumenHtml += `<li>${prod.nombre.toUpperCase()} x${prod.cantidad} = $${subtotal}</li>`;
        resumenTextoQR += `${prod.nombre} x${prod.cantidad} = $${subtotal}\n`;
    }

    resumenHtml += `</ul><h3>Total: $${total}</h3>`;
    resumenTextoQR += `TOTAL: $${total}`;
    
   

    Swal.fire({
        icon: "success",
        title: "Pedido confirmado",
        html: `
            <p><b>Mesa:</b> ${numeroMesa}</p>
            <p><b>Método de pago:</b> ${metodoPago}</p>
            ${resumenHtml}
            <div id="qrcode" style="margin-left: 4.5rem; margin-bottom: 1rem;"></div>
            <p>No cerrar hasta mostrar al mozo</p>
        `,
        didOpen: () => {
            new QRCode(document.getElementById("qrcode"), {
                text: resumenTextoQR,
                width: 200,
                height: 200
            });
        },
        confirmButtonText: "Cerrar",
        preConfirm: () => {
            return new Promise((resolve) => {
                Swal.fire({
                    icon: "question",
                    title: "¿Mostraste el ticket al mozo?",
                    text: "Si confirmás, el pedido se finalizará.",
                    showCancelButton: true,
                    confirmButtonText: "Finalizar y confirmar",
                    cancelButtonText: "Seguir mostrando el ticket"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: "success",
                            title: "¡Gracias por elegirnos tenga buen día!",
                            confirmButtonText: "✅"
                        });
                        resolve(); 
                    } else {
                        generarComprobantePedido(pedido, numeroMesa, metodoPago);
                    }
                });
            });
        }
    });

}