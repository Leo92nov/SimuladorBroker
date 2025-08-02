const usuarioOn = localStorage.getItem("usuarioOn");
const usuarioLoggeado = JSON.parse(usuarioOn);

const cancelarDeudaMesTotal = document.getElementById("cancelarDeudaMesTotal")
const cancelarDeudaMesRestante = document.getElementById("cancelarDeudaMesRestante")
const cancelarDeudaMesMes = document.getElementById("cancelarDeudaMesMes")
const cancelarDeudaTotalTotal = document.getElementById("cancelarDeudaTotalTotal")
const cancelarDeudaTotalRestante = document.getElementById("cancelarDeudaTotalRestante")
const cancelarDeudaTotalunPago = document.getElementById("cancelarDeudaTotalunPago")
const botonPagarDeudaTotal = document.getElementById("botonPagarDeudaTotal")
const botonPagarDeudaMensual = document.getElementById("botonPagarDeudaMensual")

cancelarDeudaMesTotal.value = parseInt(usuarioLoggeado.deuda)
cancelarDeudaMesRestante.value = parseInt(usuarioLoggeado.deudaRestante)
cancelarDeudaMesMes.value = parseInt(usuarioLoggeado.deudaPorMes)
cancelarDeudaTotalTotal.value = parseInt(usuarioLoggeado.deuda)
cancelarDeudaTotalRestante.value = parseInt(usuarioLoggeado.deudaRestante)
cancelarDeudaTotalunPago.value = (usuarioLoggeado.deudaBrutaRestante * (usuarioLoggeado.tasaPorcentual / 100) + parseInt(usuarioLoggeado.deudaBrutaRestante))

botonPagarDeudaMensual.addEventListener("click", () => {
    if (usuarioLoggeado.liquidez > cancelarDeudaMesMes.value) {
        usuarioLoggeado.liquidez = usuarioLoggeado.liquidez - cancelarDeudaMesMes.value
        usuarioLoggeado.deuda -= cancelarDeudaMesMes.value
        usuarioLoggeado.deudaBrutaRestante -= (usuarioLoggeado.deudaBruta / usuarioLoggeado.mesesDeuda)

        usuarioJSON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioJSON)

        Swal.fire({
            title: "Cuota pagada!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "./inicio.html";
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fondos insuficientes!!",
        });
        return
    }
})

botonPagarDeudaTotal.addEventListener("click", () => {
    if (usuarioLoggeado.liquidez > cancelarDeudaTotalunPago.value) {
        const deudaTotalACancelar = parseInt(usuarioLoggeado.deudaBrutaRestante) + parseInt(usuarioLoggeado.deudaBruta / usuarioLoggeado.mesesDeuda)
        usuarioLoggeado.liquidez -= deudaTotalACancelar
        usuarioLoggeado.deuda = 0
        usuarioLoggeado.deudaBruta = 0
        usuarioLoggeado.deudaPorMes = 0
        usuarioLoggeado.tasaPorcentual = 0
        usuarioLoggeado.deudaRestante = 0
        usuarioLoggeado.deudaBrutaRestante = 0
        usuarioLoggeado.mesesDeuda = 0

        usuarioJSON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioJSON)

        Swal.fire({
            title: "Felicidades, se ha cancelado la totalidad de la deuda!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "./inicio.html";
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fondos insuficientes!!",
        });
        return

    }
})