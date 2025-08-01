const cantidadAegresar = document.getElementById("cantidadAegresar")
const SimularEgresoDinero = document.getElementById("SimularEgresoDinero")


let carterasJSON = localStorage.getItem("arrayDeCarteras");
let Carteras = JSON.parse(carterasJSON);

let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)

let usuario = localStorage.getItem('usuarioOn')
let usuarioLoggeado = JSON.parse(usuario)

const indexUsuario = Usuarios.findIndex(usuario => usuario.nombreUsuario === usuarioLoggeado.nombreUsuario);

const carteraOn = Carteras[indexUsuario]



const totalInversion = carteraOn.reduce((acumulador, e) => {
    return acumulador + (e.cantidad * e.precio);
}, 0);


SimularEgresoDinero.addEventListener("click", (event) => {

    event.preventDefault();

    let egreso = parseInt(cantidadAegresar.value)
    if (usuarioLoggeado.deuda) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cancele su deuda antes de retirar sus fondos!!",

        });
    } else if (usuarioLoggeado.deuda < (usuarioLoggeado.liquidez + totalInversion) || egreso > usuarioLoggeado.liquidez) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fondos insuficientes, venda alguno de sus titulos!",

        });

    } else {
        let resto = parseInt(usuarioLoggeado.liquidez) - parseInt(egreso)
        usuarioLoggeado.liquidez = resto
        Swal.fire({
            title: "Fondos Retirados Correctamente!",
            icon: "success",
            draggable: true

        }).then(() => {
            const usuarioJSON = JSON.stringify(usuarioLoggeado);
            localStorage.setItem("usuarioOn", usuarioJSON);

            window.location.href = "../pages/inicio.html";
        });
    }
})


