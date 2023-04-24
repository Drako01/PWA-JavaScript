/* --------------------------------------------------- */
/*                 VARIABLE GLOBALES                   */
/* --------------------------------------------------- */

let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.34 },
    { nombre: 'Pan', cantidad: 3, precio: 34.56 },
    { nombre: 'Fideos', cantidad: 4, precio: 45.78 },
    { nombre: 'Leche', cantidad: 5, precio: 78.23 },
]

let crearLista = true
let ul

/* --------------------------------------------------- */
/*                FUNCIONES GLOBALES                   */
/* --------------------------------------------------- */

function borrarProd(index) {
    console.log('borrarProd', index)

    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    listaProductos.splice(index, 1)
    renderLista()
}


function cambiarCantidad(index, el) {
    //console.log(el)
    //console.dir(el)
    let cantidad = parseInt(el.value)
    console.log('cambiarCantidad', index, cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, el) {
    //console.log(el)
    //console.dir(el)
    let precio = Number(el.value)
    console.log('cambiarPrecio', index, precio)
    listaProductos[index].precio = precio
}

function renderLista() {
    console.log('Render lista')

    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }

    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        console.log(index, prod)
        ul.innerHTML += `
        <li class="mdl-list__item">

            <!-- Icono del producto -->
            <span class="mdl-list__item-primary-content w-10">
                <i class="material-icons mdl-list__item-icon">person</i>
            </span>
        
            <!-- Nombre del producto -->
            <span class="mdl-list_item-primary-content w-30">
                ${prod.nombre}
            </span>
        
            <!-- Cantidad del producto -->
            <span class="mdl-list_item-primary-content w-20">
                <div class="mdl-textfield mdl-js-textfield">
                    <input onchange="cambiarCantidad(${index}, this)" class="mdl-textfield__input" type="text" id="cantidad-${index}" value="${prod.cantidad}">
                    <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                </div>
            </span>
        
            <!-- Precio del producto -->
            <span class="mdl-list_item-primary-content w-20 ml-item">
                <div class="mdl-textfield mdl-js-textfield">
                    <input onchange="cambiarPrecio(${index}, this)" class="mdl-textfield__input" type="text" id="precio-${index}" value="${prod.precio}">
                    <label class="mdl-textfield__label" for="precio-${index}">Precio($)</label>
                </div>
            </span>
        
            <!-- Acción (borrar producto) -->
            <span class="mdl-list_item-primary-content w-20 ml-item">
                <button onclick="borrarProd(${index})" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">remove_shopping_cart</i>
                </button>
            </span>
        
        </li>
        `
    })

    if(crearLista) {
        document.getElementById('lista').appendChild(ul)
    } else {
        componentHandler.upgradeElements(ul)
    }

    crearLista = false
}

/* ------------------------------------------------------- */
/* Listeners                                               */
/* ------------------------------------------------------- */

function configurarListeners() {
    /* Ingreso del producto nuevo */
    const entradaProducto = document.getElementById("btn-entrada-producto")
    // console.log(entradaProducto)

    entradaProducto.addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        // console.dir(input)
        let producto = input.value /* value => lo que escribió el usuario */

        if ( producto ) {
            const objProd = { 
                nombre: producto, 
                cantidad: 1, 
                precio: 0
            }
            listaProductos.push(objProd)
            renderLista()
            input.value = null
        }
    })

    /* Borrado total de productos */

    const btnBorrarProductos = document.getElementById('btn-borrar-productos')
    /* console.log(btnBorrarProductos) */

    btnBorrarProductos.addEventListener('click', () => {
        console.log('btn-borrar-productos')

        if ( confirm('¿Desea borrar todos los productos?') ) { // confirm => true o false
            listaProductos = []
            renderLista()
        }

    })

}

/* --------------------------------------------------------- */
/* Registro Service Worker                                   */
/* --------------------------------------------------------- */

function registrarServiceWorker() {
    if ( 'serviceWorker' in navigator ) { // si no está el sw me daría false
        this.navigator.serviceWorker.register('sw.js') /* /sw.js */
            .then( reg => {
                console.log('El service worker se registró correctamente', reg)
            })
            .catch( err => {
                console.error('Erro al registrar el service worker', err)
            })
    } else {
        console.error('serviceWorker no está disponible en el navegador')
    }
}



function start() {
    console.log('Arrancando la aplicación')

    registrarServiceWorker()
    configurarListeners()
    renderLista()
}


start()
