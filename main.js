

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

        /*      if(promedio>=6){
            this.aprobar=true;        

        }
        if(promedio>=7){
            this.promocionar=true; 
        } */

    };
}

const Alumno01 = new Alumno("Juan","Martinez", 22, 2, "Ingeniería en Sistemas", [6, 8, 7])
const Alumno02 = new Alumno("Mariano","Pelizari", 24, 3, "Tecnicatura en programación", [9])
const Alumno03 = new Alumno("Carlos","Nuñez", 31, 4, "Ingeniería Mecánica", [])
const Alumno04 = new Alumno("Marcelo","Orozco", 19, 1, "Ingeniería en Sistemas", [8, 6])
const Alumno05 = new Alumno("Hernan","Laria", 23, 2, "Tecnicatura en programación", [7])
const Alumno06 = new Alumno("Matias","Taranto", 22, 3, "Licenciatura en Biología", [])

const arregloDeAlumnos = [Alumno01, Alumno02, Alumno03, Alumno04, Alumno05, Alumno06];

/* 
let opcion;

do {
    opcion = parseInt(prompt("Ingrese opción:\n1-Listar alumnos\n2-Cargar notas\n3-Actualizar estado de aprobación\n4-Filtrar alumnos\n5-Salir"));

    switch (opcion) {
        case 1:
            console.log(arregloDeAlumnos);
            break;
        case 2:
            arregloDeAlumnos.forEach(alumno => alumno.cargarNotas());
            break;
        case 3:
            arregloDeAlumnos.forEach(alumno => alumno.aprobado());
            break;
        case 4:
            let opcion4 = parseInt(prompt("Seleccione filtro:\n1-Ingeniería\n2-Tecnicatura\n3-Licenciatura"));
            if (opcion4 === 1) {
                const alumnosDeIngeneria = arregloDeAlumnos.filter((el) => el.carrera.includes("Ingeniería"));
                console.log(alumnosDeIngeneria);
            } else if (opcion4 === 2) {
                const alumnosDeTecnicatura = arregloDeAlumnos.filter((el) => el.carrera.includes("Tecnicatura"));
                console.log(alumnosDeTecnicatura);
            } else if (opcion4 === 3) {
                const alumnosDeLicenciatura = arregloDeAlumnos.filter((el) => el.carrera.includes("Licenciatura"));
                console.log(alumnosDeLicenciatura);
            } else {
                console.log("Ingrese una opción válida");
            }
            break;
        case 5:
            console.log("Saliendo del programa...");
            break;
        default:
            console.log("Ingrese una opción válida");
            break;
    }
} while (opcion !== 5); */




/* //convertimos el alumno a json
const alumno01json = JSON.stringify(Alumno01);
console.log(alumno01json);
//guardamos el json a local storage
localStorage.setItem("keyAlumno01", alumno01json);
//parseamos de vuelta a objeto
const alumno01parse = JSON.parse(alumno01json)
console.log(alumno01parse)
console.log(alumno01parse.edad)


const alumnos = JSON.stringify(arregloDeAlumnos);
localStorage.setItem("Alumnos-key", alumnos) */




/*

<table>
    <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>edad</th>
        <th>Año de cursado</th>
        <th>carrera</th>
        <th>Nota (parcial 1, 2 y 3)</th>
        <th>Aprobado</th>
        <th>Promocionado</th>
    </tr>

    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>    
*/
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
        <td>${alumno.carrera}</td>
        <td id="notas123">${alumno.notaParcial12y3}</td>
        <td id="apr">${alumno.aprobar}</td>
        <td id="prom">${alumno.promocionar}</td>
        `})
}

renderizarAlumnos();


function obtenerNotasGuardadas(){
    arregloDeAlumnos.forEach(alumno =>{
        const notasGuardadas = localStorage.getItem(`${alumno.nombre}_${alumno.apellido}_notas`);
  /*   if (notasGuardadas) {
        alumno.notaParcial12y3 = JSON.parse(notasGuardadas);
    } */
    alumno.notaParcial12y3 = notasGuardadas ? JSON.parse(notasGuardadas) : alumno.notaParcial12y3;
    });
}

/* let botondom = document.getElementById("botones");
document.createElement(<button>olo</button>); */
let botondom = document.createElement("button");
botondom.innerHTML="Cargar Notas";
document.body.append(botondom);

botondom.addEventListener("click", eventoBotondom);
function eventoBotondom() {
    arregloDeAlumnos.forEach(alumno => alumno.cargarNotas());
    renderizarAlumnos();
    // alert("Notas cargadas a local storage");
}

let botondom2 = document.createElement("button");
botondom2.innerHTML="Actualizar Aprobados";
document.body.append(botondom2);

botondom2.addEventListener("click", eventoBotondom2);
function eventoBotondom2() {
    arregloDeAlumnos.forEach(alumno => alumno.aprobado());
    renderizarAlumnos();
}

/* let botondom3 = document.createElement("button");
botondom3.innerHTML="log";
document.body.append(botondom3);

botondom3.addEventListener("click", eventoBotondom3);
function eventoBotondom3() {
    console.log(arregloDeAlumnos)
} */

let botondom4 = document.createElement("button");
botondom4.innerHTML="cargar notas guardadas desde local storage";
document.body.append(botondom4);

botondom4.addEventListener("click", eventoBotondom4);
function eventoBotondom4() {
    obtenerNotasGuardadas();
    renderizarAlumnos();
}

let botondom5 = document.createElement("button");
botondom5.innerHTML="clear";
document.body.append(botondom5);

botondom5.addEventListener("click", eventoBotondom5);
function eventoBotondom5() {
    localStorage.clear();
    
    renderizarAlumnos();

}