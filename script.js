const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    if (elementos1) {
        elementos1.addEventListener('click', comprarElemento);
    }
    
    if (carrito) {
        carrito.addEventListener('click', eliminarElemento);
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    document.addEventListener('DOMContentLoaded', cargarCarritoLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
    guardarLocalStorage(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>   
    `;   

    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar')) {
        const fila = e.target.parentElement.parentElement;
        const elementoId = e.target.getAttribute('data-id');
        fila.remove();
        eliminarProductoLocalStorage(elementoId);
    }
}

function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    localStorage.clear();
    return false;
}

function guardarLocalStorage(elemento) {
    let productos = obtenerLocalStorage();
    productos.push(elemento);
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerLocalStorage() {
    return localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
}

function cargarCarritoLocalStorage() {
    let productos = obtenerLocalStorage();
    productos.forEach(elemento => insertarCarrito(elemento));
}

function eliminarProductoLocalStorage(id) {
    let productos = obtenerLocalStorage();
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
}

let loadMoreBtn = document.querySelector('#load-more');
if (loadMoreBtn) {
    let currentItem = 4;
    loadMoreBtn.onclick = () => {
        let boxes = [...document.querySelectorAll('.box-container .box')];
        for(var i = currentItem; i < currentItem + 4; i++) {
            if (boxes[i]) {
                boxes[i].style.display = 'inline-block';
            }
        }
        currentItem += 4;
        if(currentItem >= boxes.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; 
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
}

setInterval(() => {
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length > 0) {
        moveSlide(1);
    }
}, 4000);