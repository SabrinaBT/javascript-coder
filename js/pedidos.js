
const productos = [

    { 
        nombre: "cafe", 
        precio: 2000,
        tipo: "cafeteria"
    },

    { 
        nombre: "capuccino", 
        precio: 2500,
        tipo: "cafeteria"
    },

    { 
        nombre: "frapuccino", 
        precio: 3500,
        tipo: "cafeteria"
    },

    { 
        nombre: "gancia", 
        precio: 7000,
        tipo: "bar"
    },

    { 
        nombre: "gin tonic", 
        precio: 7500,
        tipo: "bar"
    },

    { 
        nombre: "fernet", 
        precio: 7000,
        tipo: "bar"
    }

]

let pedido = []; //array, se puede modificar el contenido
let total = 0;
const pedidoLista = document.getElementById("pedido-lista");
const totalSpan = document.getElementById("total");

function mostrarPedido() {
    while (pedidoLista.firstChild) {
        pedidoLista.removeChild(pedidoLista.firstChild);
    }

    pedido.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        pedidoLista.appendChild(li);
    });

    const calcularTotal = (suma, producto) => {
        return suma + producto.precio;
    };

    total = pedido.reduce(calcularTotal, 0);
    totalSpan.textContent = total;

}

function agregarAlPedido(producto) {
    pedido.push(producto);
    mostrarPedido();
}

const menuDiv = document.getElementById("menu");

productos.forEach(producto => {
    const boton = document.createElement("button");
    boton.textContent = `${producto.nombre} - $${producto.precio}`;
    boton.addEventListener("click", () => agregarAlPedido(producto));
    menuDiv.appendChild(boton);
});

const btnGuardar = document.getElementById("guardar");
const btnRecuperar = document.getElementById("recuperar");
const btnEliminar = document.getElementById("vaciar");

// guardar pedido
btnGuardar.addEventListener("click", () => {
    localStorage.setItem("pedidoGuardado", JSON.stringify(pedido)); 
    localStorage.setItem("totalGuardado", total);//('clave', 'valor') al pedir con setItem y lo que se guarda en "total" es un numero entonces no hace falta convertirlo a string como en "pedido"
});

// recuperar pedido
btnRecuperar.addEventListener("click", () => {
    const pedidoGuardado = JSON.parse(localStorage.getItem("pedidoGuardado"));
    const totalGuardado = parseInt(localStorage.getItem("totalGuardado"));
    if (pedidoGuardado && totalGuardado >= 0) {
        pedido = pedidoGuardado;
        total = totalGuardado;
        mostrarPedido();
    }
});

// eliminar pedido
btnEliminar.addEventListener("click", () => {
    pedido = [];
    total = 0;
    mostrarPedido();
    localStorage.removeItem("pedidoGuardado");
    localStorage.removeItem("totalGuardado");
});
