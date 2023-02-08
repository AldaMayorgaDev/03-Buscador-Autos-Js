/* Variables */
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para resultados
const resultado = document.querySelector('#resultado');

const yearMax = new Date().getFullYear();
const yearMin =  yearMax -10;

//Generar objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas :'',
    transmision : '',
    color : '',
}

/* Eventos */
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // muestra los automoviles al cargar

    //Llena las opciones de años
    llenarSelect();
});

//Event Listener para los select de busqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', (e)=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', (e)=>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    console.log('datosBusqueda :>> ', datosBusqueda);
});


/* Funciones */

//Itera el arreglo autos[] y cada elemenot es insertado en el DOM
function mostrarAutos(autos) {

    limpiarHTML(); //Elimina el html previo.

    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent= `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        //Insertar en el html
        resultado.appendChild(autoHTML);
    });
};

//Limpiar html

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
//Genera los años del select
function llenarSelect(){
    
    for(let i = yearMax; i>=yearMin; i--){
        const opcion = document.createElement('option'); // Se crea opcion en cada iteraccion
        opcion.value = i; // se añade el valor de i al atributo value
        opcion.textContent = i; // se añade el texto 

        year.appendChild(opcion); //Se inserta cada opcion al elemento year en el DOM
    }
}

//Funcion que filtra con base a la busqueda

function filtrarAuto(){
   const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
   console.log('resultado :>> ', resultado);

   if(resultado.length ){
    mostrarAutos(resultado);
   }else{
    noResultado();
   }

   
}

function noResultado(){
    limpiarHTML();
    const noData = document.createElement('DIV');
    noData.classList.add('alerta', 'error');
    noData.textContent = 'No hay resultados a la búsqueda, intenta con otros términos de búsqueda';
    resultado.appendChild(noData);
}
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if (marca) { //Valida que en el objeto datosBusqueda.marca no este vacio
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if (year) { //Valida que en el objeto datosBusqueda.year no este vacio
        return auto.year === year; //Devuelve el auto.year que coincida con el year de busqueda.
    }
    return auto; //Devuelve todos los autos;
}
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;

    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;

    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;

    if(color){
        return auto.color === color;
    }
    return auto;
}