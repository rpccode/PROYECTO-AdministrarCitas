import {datosCita,nuevaCita} from '../Funciones.js';


import {
         mascotaInput,
         propitarioInput,
         telefonoInput,
         fechaInput,
         horaInput,
         sintomasInput,
         formulario } 
         from '../Selectores.js';


class App {

    constructor(){
        this.initApp();
    }

    initApp(){
            mascotaInput.addEventListener('input', datosCita);
            propitarioInput.addEventListener('input', datosCita);
            telefonoInput.addEventListener('input', datosCita);
            fechaInput.addEventListener('input', datosCita);
            horaInput.addEventListener('input', datosCita);
            sintomasInput.addEventListener('change', datosCita);

            formulario.addEventListener('submit',nuevaCita);

    }

}

export default App ;