let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
const usuariosJSON = JSON.parse(usuariosRecuperados)

const BotonRecuperar = document.getElementById("botonRecuperar")
const nombreUsuario = document.getElementById("nombreRecuperacion")
const palabraSecreta = document.getElementById("palabraSecreta")
const NuevaContrasena = document.getElementById("nuevaContrasena")
const RepetirNuevaContrasena = document.getElementById("repetirNuevaContrasena")
const recuperacionCancelar = document.getElementById("recuperacionCancelar")

function mostrarMensaje(mensaje, tipo = "error") {
    const contenedor = document.getElementById("mensajeError");
    contenedor.textContent = mensaje;

    if (tipo === "ok") {
        contenedor.classList.add("mensaje-ok");
    } else {
        contenedor.classList.add("mensaje-error");
    }
}

BotonRecuperar.addEventListener("click", (event) =>{
    event.preventDefault();

    let usuarioPassRecuperar = usuariosJSON.find(e => e.nombreUsuario === nombreUsuario.value);

    const index = usuariosJSON.findIndex(usuarioPassRecuperar => usuarioPassRecuperar.nombreUsuario === nombreUsuario.value);


    if(palabraSecreta.value === usuarioPassRecuperar.palabraSecreta && NuevaContrasena.value === RepetirNuevaContrasena.value){

        usuarioPassRecuperar.contrasena = RepetirNuevaContrasena.value

        usuariosJSON[index].contrasena = usuarioPassRecuperar.contrasena
        
        const Usuarios = JSON.stringify(usuariosJSON)
        localStorage.setItem("arrayDeUsuarios", Usuarios)

        
          Swal.fire({
            title: "Contraseña Actualizada!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "../index.html";
        });

    }else{

        mostrarMensaje("Error, verifique los datos ingresados!!")
    }

})

recuperacionCancelar.addEventListener("click", ()=>{
    window.location.replace("../index.html")
})
