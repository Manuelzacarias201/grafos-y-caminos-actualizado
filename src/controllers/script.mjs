import Graph from "../models/Graph.mjs";
import Ciudad from "../models/Ciudad.mjs";

const graph = new Graph();

let btnAgregarDestino = document.getElementById("AgregarCiudad");
let btnAgregarConexion = document.getElementById("AgregarRuta");
let btnRecorridoProfundidad = document.getElementById("buttonProfundidad");
let btnRecorridoAnchura = document.getElementById("buttonAnchura");
let imprimir = document.getElementById("MostrarRecorridos");
let imprimir2 = document.getElementById("MostrarRecorridosAn");
let btnDijstra = document.getElementById("rutaMasCorta");
let imprimir3 = document.getElementById("mostrarRutaCorta");

btnAgregarDestino.addEventListener("click", () => {
    let ciudad = document.getElementById("ciudad").value;
    
    if (graph.addVertex(ciudad)) {
        Swal.fire("Ciudad registrada", ciudad, "success");

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo registrar la ciudad",
        });
    }
});

btnAgregarConexion.addEventListener("click", () => {
    let ciudadInicio = document.getElementById("ciudadInicio").value;
    let ciudadDestino = document.getElementById("ciudadDestino").value;
    let distancia = parseInt(document.getElementById("distancia").value);
    
    if (graph.addC(ciudadInicio, ciudadDestino, distancia)) {
        Swal.fire("Ruta agregada");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la ruta",
        });
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    imprimir.innerHTML = '';
    const vertices = [...graph.getVertices()][0];
    graph.dfs(vertices, (ciudad) => {
        imprimir.innerHTML += `${ciudad} `;
        console.log(ciudad);
    });
    Swal.fire("Recorrido en profundidad completado");
});

document.addEventListener('DOMContentLoaded', () => {
    btnRecorridoAnchura.addEventListener("click", () => {
        imprimir2.innerHTML = '';
        const vertices = [...graph.getVertices()][0];
        graph.bfs(vertices, (ciudad) => {
            imprimir2.innerHTML += `${ciudad} `;
            console.log(ciudad);
        });
        Swal.fire("Recorrido en anchura completado");
    });
});

btnDijstra.addEventListener("click", () => {
    let ciudadInicio = document.getElementById("ciudadInicioCorta").value.trim();
    let ciudadDestino = document.getElementById("ciudadDestinoCorta").value.trim();
    
    if (ciudadInicio === '' || ciudadDestino === '') {
        mostrarError("Debes ingresar ciudades válidas para calcular la ruta más corta.");
        return;
    }
    const distancia = graph.dijkstra(ciudadInicio, ciudadDestino);
    if (distancia === Number.MAX_SAFE_INTEGER) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró ninguna ruta",
        });
    } else {
        imprimir3.innerHTML = `La ruta más corta es ${distancia}`;
        Swal.fire({
            icon: "info",
            text: "Ruta más corta calculada",
        });
    }
});

function mostrarError(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}
