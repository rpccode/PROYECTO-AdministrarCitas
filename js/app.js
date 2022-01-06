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

let editando;

class Citas{

    constructor(){
        this.citas = [];
    }

    agregarCitas(cita){
            this.citas = [...this.citas,cita];

            
    }
    eliminarCita(id){
            this.citas = this.citas.filter(cita => cita.id !== id);
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
        this.limpiarHtml();
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

                        //boton para eliminar las citas
                        const btnEliminar = document.createElement('button');
                        btnEliminar.classList.add('btn','btn-danger','mr-2');
                        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

                        //agregar boton para editar
                        const btnEditar = document.createElement('button');
                        btnEditar.classList.add('btn','btn-info','mr-2');
                        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>';

                        btnEliminar.onclick = () => eliminarCita(id);
                        btnEditar.onclick = () => cargarEdicion(cita);

                    //agregar los parrafos  al div citas
                    dvCitas.appendChild(mascotaParrafo);
                    dvCitas.appendChild(propietarioParrafo);
                     dvCitas.appendChild(telefonoParrafo);
                    dvCitas.appendChild(fechaParrafo);
                     dvCitas.appendChild(horaParrafo);
                    dvCitas.appendChild(sintomasParrafo);
                    dvCitas.appendChild(btnEliminar);
                    dvCitas.appendChild(btnEditar);

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

        if (editando) {
                 ui.imprimirAlerta('Editado Correctamente');


                 formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

                 editando = false;
        }else{
            //generar un id unico 
        citasOBJ.id = Date.now();

        administrarCita.agregarCitas({...citasOBJ});

        ui.imprimirAlerta('Se Agrego Correctamente');
        }

        

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
function eliminarCita(id) {
    //eliiminar citas

        administrarCita.eliminarCita(id);


    //mostrar mensaje

         ui.imprimirAlerta('Cita Eliminada Correctamente','success');

    //refrescar campos 
             ui.imprimirCitas(administrarCita);
}

//carga los datos y el modo edicion
function cargarEdicion(cita){
       const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

       //llenar los inputs

       mascotaInput.value = mascota;
       propitarioInput.value = propietario;
       telefonoInput.value = telefono;
       fechaInput.value = fecha;
       horaInput.value = hora;
       sintomasInput.value = sintomas;

       //llenar el objeto
       citasOBJ.mascota = mascota;
       citasOBJ.propietario = propietario;
       citasOBJ.telefono = telefono;
       citasOBJ.fecha = fecha;
       citasOBJ.hora = hora;
       citasOBJ.sintomas = sintomas;
       citasOBJ.id = id;

       //cambiar el texto del boton 

       formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

       editando = true;
}