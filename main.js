

//Sistema de gestión académica
let promedio;

class Alumno{
    constructor(nombre, apellido, edad, anioDeCursado, carrera, notaParcial12y3, aprobar, promocionar){
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.anioDeCursado=anioDeCursado;
        this.carrera=carrera;
        //igualo la variable a nota (si el valor está hardcodeado) o a un arreglo vacío (para notas ingresadas por el usuario)
        this.notaParcial12y3=notaParcial12y3||[];
        this.aprobar=false;
        this.promocionar=false;
    }
    
    cargarNotas() {
        let NotasACargar = 3-this.notaParcial12y3.length;
        if (NotasACargar > 0) {
            for (let i = 0; i < NotasACargar; i++) {
                const nota = parseFloat(prompt("Ingrese nota a cargar del alumno "+this.nombre+" "+this.apellido));
                if(nota>0&&nota<=10&&nota!=null&&nota!=""){
                    this.notaParcial12y3.push(nota);
                localStorage.setItem(`${this.nombre}_${this.apellido}_notas`, JSON.stringify(this.notaParcial12y3));
                }
            }
            
        
        } 
        
        else {
            console.log("Ya se han cargado todas las notas permitidas.");
        }
    }
    aprobado(){
        promedio = (this.notaParcial12y3[0] + this.notaParcial12y3[1] + this.notaParcial12y3[2]) / this.notaParcial12y3.length;
        
        promedio >= 6 && (this.aprobar = true);
        promedio >= 7 && (this.promocionar = true);    

    

    };
}

const Alumno01 = new Alumno("Juan","Martinez", 22, 2, "Ingeniería en Sistemas", [6, 8, 7])
const Alumno02 = new Alumno("Mariano","Pelizari", 24, 3, "Tecnicatura en programación", [9])
const Alumno03 = new Alumno("Carlos","Nuñez", 31, 4, "Ingeniería Mecánica", [])
const Alumno04 = new Alumno("Marcelo","Orozco", 19, 1, "Ingeniería en Sistemas", [8, 6])
const Alumno05 = new Alumno("Hernan","Laria", 23, 2, "Tecnicatura en programación", [7])
const Alumno06 = new Alumno("Matias","Taranto", 22, 3, "Licenciatura en Biología", [])

const arregloDeAlumnos = [Alumno01, Alumno02, Alumno03, Alumno04, Alumno05, Alumno06];

function renderizarAlumnos(){
    tabla.innerHTML="";
    let tabladom = document.getElementById("tabla")
    tabla.innerHTML=` 
    <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Edad</th>
        <th>Año de cursado</th>
        <th>Carrera</th>
        <th>Nota (parcial 1, 2 y 3)</th>
        <th>Aprobado</th>
        <th>Promocionado</th>
    </tr>`;

    arregloDeAlumnos.forEach(alumno => {
        tabla.innerHTML+=`
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.anioDeCursado}</td>
        <td class="clickcarrera">${alumno.carrera}</td>
        <td id="notas123">${alumno.notaParcial12y3}</td>
        <td id="apr">${alumno.aprobar}</td>
        <td id="prom">${alumno.promocionar}</td>
        `})
}

renderizarAlumnos();


function obtenerNotasGuardadas(){
    arregloDeAlumnos.forEach(alumno =>{
        const notasGuardadas = localStorage.getItem(`${alumno.nombre}_${alumno.apellido}_notas`);

    alumno.notaParcial12y3 = notasGuardadas ? JSON.parse(notasGuardadas) : alumno.notaParcial12y3;
    });
}

let botondom = document.createElement("button");
botondom.innerHTML="Cargar Notas";
botones.append(botondom);

botondom.addEventListener("click", eventoBotondom);
function eventoBotondom() {
    arregloDeAlumnos.forEach(alumno => alumno.cargarNotas());
    renderizarAlumnos();
   
}

let botondom2 = document.createElement("button");
botondom2.innerHTML="Actualizar Aprobados";
botones.append(botondom2);

botondom2.addEventListener("click", eventoBotondom2);
function eventoBotondom2() {
    arregloDeAlumnos.forEach(alumno => alumno.aprobado());
    renderizarAlumnos();

    Toastify({
        text: "Estado de aprobación actualizado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #004225  , #37383f)",
        },
        onClick: function(){}
    }).showToast();
}


let botondom4 = document.createElement("button");
botondom4.innerHTML="cargar notas desde local storage";
botones.append(botondom4);

botondom4.addEventListener("click", eventoBotondom4);
function eventoBotondom4() {
    obtenerNotasGuardadas();
    renderizarAlumnos();

    Toastify({
        text: "Notas cargadas desde local storage",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "left", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #ffeb7f , #a3cd3f)",
        },
        onClick: function(){} 
    }).showToast();
}

let botondom5 = document.createElement("button");
botondom5.innerHTML="clear";
botones.append(botondom5);

botondom5.addEventListener("click", eventoBotondom5);
function eventoBotondom5() {
    localStorage.clear();
    
    renderizarAlumnos();


    Toastify({
        text: "Información de local storage borrada",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #c27ba0 , #660000)",
        },
        onClick: function(){} 
    }).showToast();
}

//al recargar la página y hacer click en cualquier carrera, se solicita información de la misma proveniente del archivo JSON

function renderizarCarreras(){
    Toastify({
        text: "Información de carreras solicitada",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to left, #00008b , #3aa4f3)",
        },
        onClick: function(){} 
    }).showToast();


    tablacarreras.innerHTML="";
    let tabladom2 = document.getElementById("tablacarreras")
    tablacarreras.innerHTML=`
    <table>
        <thead>
            <tr>
                <th>Carrera</th>
                <th>Cantidad de Materias</th>
                <th>Duración</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody id="data">
        
        </tbody>
    </table>`;
    
    
    fetch("./carreras.json")
    .then(function(Response){
        return Response.json();
    })
    .then(function(carreras){
        let placeholder = document.querySelector("#data")
        let salida = "";
        for(let carrera1 of carreras){
            salida +=`
            <tr>
                <td>${carrera1.carrera}</td>
                <td>${carrera1.cantidad_de_materias}</td>
                <td>${carrera1.duracion}</td>
                <td>${carrera1.descripcion}</td>
            </tr>
            `;
        }
        placeholder.innerHTML=salida;
    })

    let botonfinal
if(!document.getElementById("botoncerrar")){
botonfinal=document.createElement("button");
botonfinal.id="botoncerrar";
botonfinal.innerHTML="Cerrar";
document.getElementById("tablacarreras").appendChild(botonfinal)
}
botonfinal.addEventListener("click", cerrar);
function cerrar() {
    const variablecarreras = document.getElementById("tablacarreras")
    const padre = variablecarreras.parentNode;
    padre.removeChild(variablecarreras);
    

    Toastify({
        text: "Se cerró la información de las carreras",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "left", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #00008b , #3aa4f3)",
        },
        onClick: function(){} 
    }).showToast();

    }

} 


document.querySelectorAll('.clickcarrera').forEach(elemento => {
    elemento.addEventListener('click', renderizarCarreras);
});



