const cerveza = document.getElementById('contenido-cervezas');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');

// le asigno el get item a mi array para poder recuperar los productos
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// creo mis tarjetas de las bebidas
const getProductos = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    

    data.forEach((producto) => {
        let contenido = document.createElement('div');
        contenido.className = 'contenedor';
        contenido.innerHTML = ` 
        <img src="${producto.img}" alt="imagenes de cervezas" class="card-cervezas">
        <h3 class="precio">${producto.nombre}</h3>
        <p class="precio">$ ${producto.precio} </p>
        `;
        cerveza.append(contenido);

        // creo mi boton de comprar
        const btnComprar = document.createElement('button');
        btnComprar.className = 'btn-comprar';
        btnComprar.innerText = 'Añadir';
        contenido.append(btnComprar);

        // funcion que me permite realizar la compra de una bebida y lo suma al carrito
        btnComprar.addEventListener('click', () => {
            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
            });
             // agrego msj para saber que agrego productos al carrito
            toastr.success("Se cargo correctamente!","Carrito!", {
                positionClass: "toast-top-right",
            });
            console.log(carrito);
            // cada vez que compro un producto lo almaceno en el local storage
            stlocal();
        });
    });
};

getProductos();

//  almaceno mis productos en el localstorage
const stlocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
