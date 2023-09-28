const btnGuardarCliente = document.querySelector('#guardar-cliente');

//estructura para guardar
let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1:'Pizzas',
    2:'Postres',
    3:'Jugos',
    4:'Comida',
    5:'Cafes',
    6:'Bebidas'
}

btnGuardarCliente.addEventListener('click',guardarCliente);

function guardarCliente(){
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

//seria igual a esto  
//if(mesa==='' || hora===''){}

const camposVacios = [mesa,hora].some(campo=>campo === '');

    if(camposVacios){
        //si los campos estan vacios
        //console.log('campos vacios');
        const existeAlerta = document.querySelector('.invalid-feedback');

        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('text-center', 'text-danger');
            alerta.textContent= 'Los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(()=>{
                alerta.remove();
            },2000)
        }
    }else{
        //caso tener los campos llenos
        //console.log('campos llenos')
        cliente = {...cliente,mesa,hora};
        console.log(cliente)

        const modalForm = document.querySelector('#formulario');
        const modal = bootstrap.Modal.getInstance(modalForm);
        modal.hide();

        mostrarSecciones();
        obtenerMenu();
  
    }
}

function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none');
    //console.log(secciones)

    secciones.forEach(seccion=>seccion.classList.remove('d-none'));
}

function obtenerMenu(){
    //generamos el recurso a traves de la terminal instalendo o apuntando al json con npm install json-server
    //y en el package.json en la parte de scrip crear la ruta

    const url = 'http://localhost:3000/menu'

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(resultado=>mostarMenu(resultado))
    .catch(error=>console.log(error))
}

function mostarMenu(menu){
    const contenido = document.querySelector('#menu .contenido');
    menu.forEach(pos=>{

        const fila = document.createElement('div');
        fila.classList.add('row','border-top','text-center');

        const nombre = document.createElement('div');
        nombre.textContent = pos.nombre;
        nombre.classList.add('col-md-4','py-3');

        const precio = document.createElement('div');
        precio.textContent = pos.precio;
        precio.classList.add('col-md-3','py-3');

        const categoria = document.createElement('div');
        categoria.textContent = categorias[pos.categoria];
        categoria.classList.add('col-md-3','py-3');

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto - ${pos.id}`;
        //inputCantidad.classList.add('col-md-1');
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);
            //console.log({...pos,cantidad})
            agregarOrden({...pos,cantidad})
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-1','py-3');
        agregar.appendChild(inputCantidad);

        fila.appendChild(nombre);
        fila.appendChild(precio);
        fila.appendChild(categoria);
        fila.appendChild(agregar);

        contenido.appendChild(fila);
    })
}