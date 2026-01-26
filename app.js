

notas = obtenerNotasLocalStorage();


const formNotas = document.getElementById('formNotas');
const listaNotas = document.getElementById("listaNotas");

renderNotas(notas, listaNotas);

formNotas.addEventListener("submit", e =>{
    e.preventDefault();
    const notaInput = formNotas.querySelector("#notaInput").value;
    notas.push(notaInput);
    guardarNotasLocalStorage(notas)
    renderNotas(notas, listaNotas);
    formNotas.reset();
});


function renderNotas(notas, contenedor) {
    contenedor.innerHTML = "";

    notas.forEach((nota, index) => {
        const li = document.createElement("li");
        li.classList.add("nota");

        const span = document.createElement("span");
        span.textContent = nota;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btnEliminar");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.dataset.index = index;

        btnEliminar.addEventListener("click", (e) => {
            const indice = e.target.dataset.index;
            notas.splice(indice, 1);
            renderNotas(notas, contenedor);
        });

        li.appendChild(span);
        li.appendChild(btnEliminar);
        contenedor.appendChild(li);
    });
}

//Local Storage, set y get

function guardarNotasLocalStorage(notas) {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function obtenerNotasLocalStorage() {
    const notasGuardadas = localStorage.getItem("notas");
    return notasGuardadas ? JSON.parse(notasGuardadas) : [];
}
