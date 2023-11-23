var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "img/sun.png";
    localStorage.setItem("tema", "dark");
  } else {
    icon.src = "img/moon.png";
    localStorage.removeItem("tema");
  }
};
const enviar = document.getElementById("enviar");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");
console.log(enviar, nombre, email, telefono, mensaje);

enviar.addEventListener("click", function checar_email(e) {
  console.log("Checando email...");
  if (nombre.value === "") {
    toastr.info("El campo nombre es obligatorio");
    e.preventDefault();

    return;
  }
  if (email.value === "") {
    toastr.info("El campo email es obligatorio");
    e.preventDefault();

    return;
  }
  if (telefono.value === "") {
    toastr.info("El campo teléfono es obligatorio");
    e.preventDefault();

    return;
  }
  if (mensaje.value === "") {
    console.log(mensaje);

    toastr.info("El campo mensaje es obligatorio");
    e.preventDefault();

    return;
  }
  e.preventDefault();

  console.log("Enviamos el email por ajax");
  enviar.setAttribute("disabled", true);
  sendEmail("dany", email.value, nombre.value, telefono.value, mensaje.value);
});
function sendEmail(name, email, nombre, asunto, mensaje) {
  let host = "https://danielahernandez.com.mx";
  var port = window.location.port;
  if (port == "3000") {
    host = window.location.protocol + "//" + window.location.hostname + ":3333";
    // } else {
    //   host = window.location.protocol + "//" + `${location.hostname}`;
  }
  console.log(host);
  toastr.info("Enviando mensaje", email);
  let status = 0;
  fetch(`${host}/api/sendmail`, {
    referrerPolicy: "no-referrer",
    method: "POST",
    body: JSON.stringify({
      from: email,
      nombre,
      asunto,
      message: mensaje,
      name,
    }),
    headers: {
      "Access-Control-Allow-Origin": "danielahernandez.com.mx localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json",
      Vary: "Origin",
    },
  })
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      console.log(status, resp.message);
      if (status !== 200) {
        toastr.error(resp.message);
      } else {
        toastr.info(resp.message);
      }
      enviar.removeAttribute("disabled");
    });
}

// function sendEmail(name, email, nombre, telefono, mensaje) {
//   Email.send({
//     Host: "smtp.gmail.com",
//     Username: "psicologia.dany.ha@gmail.com",
//     Password: "teiimgztrvxywsce",
//     To: "psicologia.dany.ha@gmail.com",
//     From: email,
//     Subject: "Información",
//     Body: "Nombre: " + nombre + "<br> Email: " + email + "<br> ",
//   }).then((message) => alert(message));
//   // .error((error) => alert(error));
//
//   let host = "smtp.gmail.com";
// }
// window.addEventListener("load", toastr.info("Cargada"));
var tema = localStorage.getItem("tema") || "";
console.log("tema", tema);
if (tema === "dark") {
  document.body.classList.toggle("dark-theme");
  icon.src = "img/sun.png";
}
// MENU Movil:
const btnToggle = document.querySelector(".btn-menu");
const menu = document.querySelectorAll(".container-menu a");
menu.forEach((m) => {
  m.addEventListener("click", () => {
    btnToggle.click();
  });
});

btnToggle.addEventListener("click", () => {
  event.stopPropagation();
  console.log(btnToggle, menu);
  if (!btnToggle.classList.contains("active")) {
    btnToggle.classList.add("active");
    menu[0].style.transform = "translate(-2em,2em)";
    menu[1].style.transform = "translate(0,3em)";
    menu[2].style.transform = "translate(2em,2em)";
    // menu[3].style.transform = "translate(-2em,2em)";
    // menu[4].style.transform = "translate(-2.8em,0)";
    // menu[5].style.transform = "translate(-2em,-2em)";
    // menu[6].style.transform = "translate(0,-3em)";
    // menu[7].style.transform = "translate(2em,-2em)";
  } else {
    menu.forEach((element) => {
      element.style.transform = "translate(0,0)";
    });
    btnToggle.classList.remove("active");
  }
});
