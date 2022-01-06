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

    imprimirCitas({citas}){
        limpiarHtml();
            citas.forEach(cita => {
                    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

                    const dvCitas = document.createElement('div');
                    dvCitas.classList.add('cita','p-3');
                    dvCitas.dataset.id = id;

                    //scripting de los elementos de la cita 
                    const mascotaParrafo = document.createElement('h2');
                    mascotaParrafo.classList.add('card-title','font-weight-bolder');
                    mascotaParrafo.textContent = mascota;

                    const propietarioParrafo = document.createElement('p');
                    propietarioParrafo.innerHTML= `
                    
                        <span class="font-weight-bolder"> Propitario: </span> ${propietario}
                    `;

                     const telefonoParrafo = document.createElement('p');
                    telefonoParrafo.innerHTML= `
                    
                        <span class="font-weight-bolder"> Telefono: </span> ${telefono}
                    `;
                    
                     const fechaParrafo = document.createElement('p');
                    fechaParrafo.innerHTML= `
                    
                        <span class="font-weight-bolder">Fecha: </span> ${fecha}
                    `;

                     const horaParrafo = document.createElement('p');
                    horaParrafo.innerHTML= `
                    
                        <span class="font-weight-bolder">Hora: </span> ${hora}
                    `;

                     const sintomasParrafo = document.createElement('p');
                    sintomasParrafo.innerHTML= `
                    
                        <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
                        `;

                    //agregar los parrafos  al div citas
                    dvCitas.appendChild(mascotaParrafo);
                    dvCitas.appendChild(propietarioParrafo);
                     dvCitas.appendChild(telefonoParrafo);
                    dvCitas.appendChild(fechaParrafo);
                     dvCitas.appendChild(horaParrafo);
                    dvCitas.appendChild(sintomasParrafo);

                    //agregar citas al html

                    listarCitas.appendChild(dvCitas);
            });
    }

    limpiarHtml(){
        while (listarCitas.firstChild) {
                listarCitas.removeChild(listarCitas.firstChild);
        }
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

        ui.imprimirCitas(administrarCita);
}

function reiniciarObjeto() {
       citasOBJ.mascota='';
        citasOBJ.propietario='';
        citasOBJ.telefono='';
        citasOBJ.fecha='';
        citasOBJ.hora='';
        citasOBJ.sintomas='';
}