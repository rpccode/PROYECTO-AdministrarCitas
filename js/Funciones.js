import  Citas from './Class/Citas.js';
import  UI  from './Class/UI.js'


    import {
         mascotaInput,
         propitarioInput,
         telefonoInput,
         fechaInput,
         horaInput,
         sintomasInput,
         formulario } 
         from './Selectores.js';

//instancias

const administrarCita =  new Citas();
const ui = new UI();

let editando;
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
 export  function datosCita(e){

    citasOBJ[e.target.name] = e.target.value;

    
}
 export  function nuevaCita(e){
        e.preventDefault();

        const {mascota,propietario,telefono,fecha,hora,sintomas} = citasOBJ;

        if (mascota === '' || propietario === ''|| telefono === ''|| fecha === ''|| hora === '' ||sintomas === '') {
            ui.imprimirAlerta('todos los campos son obligatorios','error');

            return;
        }

        if (editando) {
                 ui.imprimirAlerta('Editado Correctamente');

                 administrarCita.editarCita({...citasOBJ});

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

 export  function reiniciarObjeto() {
       citasOBJ.mascota='';
        citasOBJ.propietario='';
        citasOBJ.telefono='';
        citasOBJ.fecha='';
        citasOBJ.hora='';
        citasOBJ.sintomas='';
}
 export  function eliminarCita(id) {
    //eliiminar citas

        administrarCita.eliminarCita(id);


    //mostrar mensaje

         ui.imprimirAlerta('Cita Eliminada Correctamente','success');

    //refrescar campos 
             ui.imprimirCitas(administrarCita);
}

//carga los datos y el modo edicion
 export  function cargarEdicion(cita){
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