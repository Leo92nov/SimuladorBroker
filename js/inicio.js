let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)
let totalinversion

const usuarioOn = localStorage.getItem("usuarioOn");
const usuarioLoggeado = JSON.parse(usuarioOn);

let carterasJSON = localStorage.getItem("arrayDeCarteras");
let Carteras = JSON.parse(carterasJSON);

let OrdenesJSON = localStorage.getItem("arrayDeOrdenes");
let Ordenes = JSON.parse(OrdenesJSON);

console.log(Ordenes);

const indexUsuario = Usuarios.findIndex(usuario => usuario.nombreUsuario === usuarioLoggeado.nombreUsuario);

const CarteraOn = Carteras[indexUsuario]
console.log(CarteraOn);

let ordenesdelusuario = Ordenes.flat().filter(o => o.usuario === usuarioLoggeado.nombreUsuario)
console.log(ordenesdelusuario);

if(usuarioLoggeado.deuda){

}

function mostrarOrdenes() {
    const contenedorOrdenes = document.getElementById("divMisOrdenes");
    contenedorOrdenes.innerHTML = "";

    if (ordenesdelusuario.length > 0) {
        ordenesdelusuario.forEach(e => {
            const ordenes = document.createElement("section");
            ordenes.classList.add("sectionMisOrdenes");
            ordenes.style.borderBottom = "1px solid grey";

            ordenes.innerHTML = `
                <section>${e.Nombre}</section>
                <section>${e.ticker}</section>
                <section>$${e.precio}</section>
                <section>${e.cantidad}</section>
                <section class="ordenesUsuario">${e.orden}<button type="button" id ="botonCancelarOrden" class="botonCancelarOrden">Cancelar</button></section>
            `;

            contenedorOrdenes.appendChild(ordenes);

            const tipoOrden = ordenes.querySelector(".ordenesUsuario");
            if (e.orden === "compra") {
                tipoOrden.style.color = "green";
            } else if (e.orden === "venta") {
                tipoOrden.style.color = "red";
            }

            const botonCancelarOrden = ordenes.querySelector(".botonCancelarOrden");

            botonCancelarOrden.addEventListener("click", () => {
                if (e.orden == "compra") {
                    let totalPorCompra = e.precio * e.cantidad
                    usuarioLoggeado.liquidez += totalPorCompra

                    const indexordenidentificada = ordenesdelusuario.findIndex(orden => orden.id === e.id);
                    Ordenes.splice(indexordenidentificada, 1)

                    let usuarioJSON = JSON.stringify(usuarioLoggeado)
                    localStorage.setItem("usuarioOn", usuarioJSON)
                    let OrdenesJSON = JSON.stringify(Ordenes)
                    localStorage.setItem("arrayDeOrdenes", OrdenesJSON)

                    Swal.fire({
                        title: "Orden Cancelada!!",
                        icon: "success",
                        draggable: true
                    }).then(() => {
                        location.reload()
                    });

                } else if (e.orden == "venta") {

                    const indexordenidentificada = ordenesdelusuario.findIndex(orden => orden.id === e.id);

                    const ordenAEliminar = ordenesdelusuario.find(orden => orden.id === e.id);
                    let ordenEnCartera = CarteraOn.find(e => ordenAEliminar.ticker === e.ticker)
                    ordenEnCartera.cantidad += e.cantidad
                    console.log(CarteraOn);
                    Ordenes.splice(indexordenidentificada, 1)

                    Carteras[indexUsuario] = CarteraOn

                    carterasJSON = JSON.stringify(Carteras)
                    localStorage.setItem("arrayDeCarteras", carterasJSON)

                    OrdenesJSON = JSON.stringify(Ordenes)
                    localStorage.setItem("arrayDeOrdenes", OrdenesJSON)

                    Swal.fire({
                        title: "Orden Cancelada!!",
                        icon: "success",
                        draggable: true
                    }).then(() => {
                        location.reload()
                    });

                }
            })

        });
    } else {
        const ordenesVacia = document.createElement("section");
        ordenesVacia.classList.add("noHayOrdenes");
        ordenesVacia.innerHTML = `<span>No existen órdenes que mostrar</span>`;
        contenedorOrdenes.appendChild(ordenesVacia);
    }
}



mostrarOrdenes()
const colorOrdenes = document.getElementsByClassName("ordenesUsuario")

function mostrarInversiones(CarteraOn) {

    const contenedorInversiones = document.getElementById("divInversiones");

    CarteraOn.forEach((e) => {
        const lineas = document.createElement("section");
        lineas.classList.add("sectionInversion")
        lineas.style.borderBottom = "1px solid grey";
        if (e.Nombre === undefined) [
            lineas.style.display = "none"
        ];

        lineas.innerHTML = `
            <section>${e.Nombre}</section>
            <section>${e.ticker}</section>
            <section>$${e.precio}</section>
            <section>${e.cantidad}</section>
            <section>$${e.cantidad * e.precio}</section>
            <section class="inversionesVenderComprar"><a href="./ordenes.html" class="inversionesComprar">Comprar</a><a href="./ordenes.html" class="inversionesVender">Vender</a></section>
        `;

        contenedorInversiones.appendChild(lineas);
    });
}

const MiCartera = mostrarInversiones(CarteraOn);
const totalInversion = CarteraOn.reduce((acumulador, e) => {
    return acumulador + (e.cantidad * e.precio);
}, 0);

const totalInversiones = document.getElementById("spanTotalInvertido")
totalInversiones.innerText = "$" + totalInversion

const spanNombreCuenta = document.getElementById("spanNombreCuenta")
const spanLiquidezCuenta = document.getElementById("spanLiquidezCuenta")
const spanInversionCuenta = document.getElementById("spanInversionCuenta")
const spanDatosDeuda = document.getElementById("spanDatosDeuda")
const spanMesDeuda = document.getElementById("spanMesDeuda")
const spanTotalDeuda = document.getElementById("spanTotalDeuda")
const divDatosDueda = document.getElementById("divDatosDueda")
const descripcionDeuda = document.getElementById("descripcionDeuda")
const botonCancelarDeuda = document.getElementById("botonCancelarDeuda")

spanNombreCuenta.innerHTML = usuarioLoggeado.nombreUsuario
spanLiquidezCuenta.innerHTML = usuarioLoggeado.liquidez.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
spanInversionCuenta.innerHTML = totalInversion.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
console.log(usuarioLoggeado.deudaBruta);


if (usuarioLoggeado.deuda) {
    spanDatosDeuda.innerHTML = parseInt(usuarioLoggeado.deudaBruta).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    descripcionDeuda.innerHTML = usuarioLoggeado.tasaPorcentual + "% de interes mesual"
    spanMesDeuda.innerHTML = parseInt(usuarioLoggeado.deudaPorMes).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    spanTotalDeuda.innerHTML = usuarioLoggeado.deuda.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    botonCancelarDeuda.addEventListener("click", ()=>{
        window.location.href = "./cancelarDeuda.html";
    })
} else {
    divDatosDueda.style.display = "none";
}
