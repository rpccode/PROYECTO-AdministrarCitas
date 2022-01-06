//inputs

const mascotaInput = document.querySelector('#mascota');
const propitarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//variables UI
const formulario = document.querySelector('#nueva-cita');
const listarCitas = document.querySelector('#citas');
const administrarUl = document.querySelector('#administra');

class Citas{

    constructor(){
        this.citas = [];
    }

    agregarCitas(cita){
            this.citas = [...this.citas,cita];

            console.log(this.citas);
    }

}

class UI {

    imprimirAlerta(mensaje, tipo){

        const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center','alert','d-block','col-12');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
                divMensaje.remove();
        }, 3000);

    }

}

//instancias

const administrarCita =  new Citas();
const ui = new UI();



//eventos
eventListener();
function eventListener(){
    mascotaInput.addEventListener('input', datosCita);
    propitarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('change', datosCita);


    formulario.addEventListener('submit',nuevaCita);
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

//funciones
function datosCita(e){

    citasOBJ[e.target.name] = e.target.value;

    
}


function nuevaCita(e){
        e.preventDefault();

        const {mascota,propietario,telefono,fecha,hora,sintomas} = citasOBJ;

        if (mascota === '' || propietario === ''|| telefono === ''|| fecha === ''|| hora === '' ||sintomas === '') {
            ui.imprimirAlerta('todos los campos son obligatorios','error');

            return;
        }

        //generar un id unico 
        citasOBJ.id = Date.now();

        administrarCita.agregarCitas({...citasOBJ});

        //reiniciar el objeto
        reiniciarObjeto();


        //reiniciar el formulario
        formulario.reset();

        //mostrar el html
}

function reiniciarObjeto() {
       citasOBJ.mascota='';
        citasOBJ.propietario='';
        citasOBJ.telefono='';
        citasOBJ.fecha='';
        citasOBJ.hora='';
        citasOBJ.sintomas='';
}