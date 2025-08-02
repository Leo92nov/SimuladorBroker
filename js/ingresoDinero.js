let usuario = localStorage.getItem('usuarioOn')
let usuarioLoggeado = JSON.parse(usuario)

const cantidadAIngresar = document.getElementById("cantidadAIngresar")
const SimularIngresoDinero = document.getElementById("SimularIngresoDinero")


SimularIngresoDinero.addEventListener("click", (event) => {

    event.preventDefault();

    if(isNaN(cantidadAIngresar) || cantidadAIngresar <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Revise que quiere Ingrerar!!",
        });
        return
    }
    let ingreso = parseInt(cantidadAIngresar.value)
    function sumaALiquidez(ingreso) {
        return ingreso + usuarioLoggeado.liquidez
    }
    let ingresoySuma = sumaALiquidez(ingreso)
    usuarioLoggeado.liquidez = ingresoySuma
    const usuarioJSON = JSON.stringify(usuarioLoggeado)
    localStorage.setItem("usuarioOn", usuarioJSON)
    Swal.fire({
        title: "Fondos enviado correctamente!!",
        icon: "success",
        draggable: true
    }).then(() => {
        const usuarioJSON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioJSON)

        window.location.href = "../pages/inicio.html";


    })
})