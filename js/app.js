const carrito = document.getElementById('carrito');
const cafes = document.getElementById('lista-cafe');
const listaCafes = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargareventlisteners();

function cargareventlisteners() {
    cafes.addEventListener('click', comprarcafe);
    carrito.addEventListener('click', eliminarcafe);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentloaded', leerlocalstorage)
}

function comprarcafe(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cafe = e.target.parentElement.parentElement;
        leerDatoscafe(cafe);
    }
}

function leerdatoscafe(cafe) {
    const infoCafe = {
        Image: cafe.querySelector('img').src,
        titulo: cafe.querySelector('h4').textContent,
        preco: cafe.querySelector('.preço span').textContent,
        id: cafe.querySelector('a').getAttribute('date-id')

    }
    insertarcarrito(infoCafe);
}

function insertarcarrito(cafe) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
        <img src="${cafe.imagen}" width=100>
        </td>
        <td>${cafe.titulo}</td>
        <td>${cafe.preco}</td>
        <td>
        <a href="#" class="borrar-cafe" data-id="${cafe.id}">x</a>
        </td>
    `;
    listaCafes.appendChild(row);
    guardarcafelocalStorange(cafe);

}

function eliminarcafe(e) {
    e.preventDefault();

    let cafe,
        cafeid;
    if (e.target.classList.contains('borrar-cafe')) {
        e.target.parentElement.parentElement.remove();
        cafe = e.target.parentElement.parentElement;
        cafeid = cafe.querySelector('a').getAttribute('data-id');
    }
    eliminarcafelocalstorage(cafe);

}

function vaciarCarrito() {
    while (listaCafes.firstChild) {
        listaCafes.removeChild(listaCafes.firstChild);
    }
    vaciarlocalstronge();
    return false;
}

function guardarcafelocalStorange(cafe) {
    let cafes;
    cafes = obtenercafeslocalstringe();
    cafes.push(cafe);
    localStorage.setItem('cafes', JSON.stringify(cafes));
}

function obtenercafeslocalstringe() {
    let cafesLS;
    if (localStorage.getItem('cafes') === null) {
        cafesLS = [];
    } else {
        cafesLS = JSON.parse(localStorage.getItem('cafes'));
    }
    return cafesLS;
}

function leerlocalstorage() {
    let cafesLS;
    cafesLS = obtenercafeslocalstringe();

    cafesLS.array.forEach(function(cafe) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${cafe.imagen}" width=100>
        </td>
        <td>${cafe.titulo}</td>
        <td>${cafe.preco}</td>
        <td>
        <a href="#" class="borrar-cafe" data-id="${cafe.id}">x</a>
        </td>
    `;
        listaCafes.appendChild(row);

    })
}

function eliminarcafelocalstorage(cafe) {
    let cafesLS;
    cafesLS = obtenercafeslocalstringe();
    cafesLS.forEach(function(cafesLS, index) {
        if (cafesLS.id === cafe);
        cafesLS.splice(index, 1);
    });
    localStorage.setItem('cafes', JSON.stringify(cafesLS));

}

function vaciarlocalstronge() {
    localStorage.clear();
}