//inputs

const mascotaInput = document.querySelector('#mascota');
const propitarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//variables
const formulario = document.querySelector('#nueva-cita');
const listarCitas = document.querySelector('#citas');
const administrarUl = document.querySelector('#administra');



//eventos
eventListener();
function eventListener(){
    mascotaInput.addEventListener('input', datosCita);
    propitarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('change', datosCita);
}

//objeto

const citasOBJ = {
        mascota:'',
        propietario:'',
        telefono:'',
        fecha:'',
        hora:'',
        sintomas:''
}

function datosCita(e){

    citasOBJ[e.target.name] = e.target.value;

    console.log(citasOBJ);
}