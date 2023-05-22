const APIKEY = 'b81385fefdba9b444da4eab9735021d4';
const tempValor = document.querySelector('.temp');
const tempDescripcion = document.querySelector('.desc');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(ubicacion => {
    let lat = ubicacion.coords.latitude;
    let lon = ubicacion.coords.longitude;
    console.log(lat, lon);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${APIKEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = (data.main.temp).toFixed(1);
        tempValor.textContent = `${temp} °C`;
        let descripcion = data.weather[0].description;
        console.log(descripcion);
        tempDescripcion.textContent = descripcion;
      });
  });
}






// FORMULARIO
// Verificar si el usuario ya ha iniciado sesión
window.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = `${user.username}!`;

        // Ocultar el formulario de inicio de sesión
        const loginForm = document.getElementById('login-form');
        loginForm.style.display = 'none';
    }
});

// Capturar información del formulario DOM
const loginForm = document.getElementById('login-form');

// Agregar el evento 'submit' al formulario
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir que se borren los datos 

    // Obtener los valores de los campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si los campos están llenos
    if (username && password) {
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = `${username}!`;

        // Crear objeto JSON con los valores de los campos de entrada
        const user = {
            username: username,
            password: password
        };

        // Almacenar el objeto JSON en el localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Ocultar el formulario de inicio de sesión
        loginForm.style.display = 'none';
    } else {
        // Mostrar mensaje de error
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = 'Ingrese su nombre de usuario y contraseña';
    }
});

// Agregar el botón para cerrar sesión
const logoutButton = document.getElementById('logout-button');

// Agregar el evento 'click' al botón
logoutButton.addEventListener('click', () => {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('user');

    // Mostrar el formulario de inicio de sesión
    loginForm.style.display = 'block';

    // Limpiar el campo de nombre de usuario
    const nombreUsuario = document.querySelector('#nombreUsuario');
    nombreUsuario.textContent = '';
});



//nivel de experiencia

// Capturamos el elemento select
const nivelSelect = document.getElementById('nivel');

// Agregamos un evento 'change' al elemento select
nivelSelect.addEventListener('change', () => {
    // Obtenemos el valor seleccionado del elemento select
    const nivelValue = nivelSelect.value;

    // Almacenamos el valor seleccionado en el localStorage
    localStorage.setItem('nivel', nivelValue);
});




// Carrito de Compras
const shoppingCart = [];

// Obtener botones de agregar al carrito
const addToCartButtons = document.querySelectorAll('.addToCart');
addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', () => {
        // Obtener los datos del artículo
        const button = event.target;
        const item = button.closest('.item');
        const itemTitle = item.querySelector('.item-title').textContent;
        const itemPrice = item.querySelector('.item-price').textContent;
        const itemImage = item.querySelector('.item-image').src;

        // Crear una promesa para agregar el artículo al carrito
        const addToCartPromise = new Promise((resolve, reject) => {
            // Simular una operación asíncrona, como una llamada a una API o una verificación de disponibilidad
            setTimeout(() => {
                // Verificar si el artículo ya está en el carrito
                const existingItem = shoppingCart.find((cartItem) => cartItem.title === itemTitle);
                if (existingItem) {
                    // Si el artículo ya está en el carrito, actualizar la cantidad
                    existingItem.quantity++;
                } else {
                    // Si el artículo no está en el carrito, agregarlo
                    const newItem = {
                        title: itemTitle,
                        price: itemPrice,
                        image: itemImage,
                        quantity: 1
                    };
                    shoppingCart.push(newItem);
                }

                resolve(); // Resolución exitosa de la promesa
                // reject(); // Rechazo de la promesa (opcional)
            }, 1000); // Simular una operación asíncrona de 1 segundo
        });

        // Ejecutar la promesa
        // Ejemplo de reemplazo
// Antes: console.log('El artículo se ha agregado al carrito con éxito');
// Después: Swal.fire('Éxito', 'El artículo se ha agregado al carrito con éxito', 'success');

// Ejemplo de reemplazo en el código proporcionado
addToCartPromise.then(() => {
    Swal.fire('Éxito', 'El artículo se ha agregado al carrito con éxito', 'success');
    updateShoppingCart(); // Actualizar el carrito en la interfaz
}).catch(() => {
    Swal.fire('Error', 'Hubo un error al agregar el artículo al carrito', 'error');
});

        // addToCartPromise.then(() => {
        //     console.log('El artículo se ha agregado al carrito con éxito');
        //     updateShoppingCart(); // Actualizar el carrito en la interfaz
        // }).catch(() => {
        //     console.log('Hubo un error al agregar el artículo al carrito');
        // });
    });
});

// Función para actualizar el carrito en la interfaz
function updateShoppingCart() {
    const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
    shoppingCartItemsContainer.innerHTML = ''; // Limpiar el contenedor del carrito

    shoppingCart.forEach((item) => {
        const filaCarrito = document.createElement('div');
        const shoppingCartContent = `
      <div class="row shoppingCartItem">
        <div class="col-6">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${item.image} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${item.title}</h6>
          </div>
        </div>
        <div class="col-2">
          <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${item.price}</p>
          </div>
        </div>
        <div class="col-4">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="${item.quantity}">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
          </div>
        </div>
      </div>`;

        filaCarrito.innerHTML = shoppingCartContent;
        shoppingCartItemsContainer.appendChild(filaCarrito);
    });

    updateShoppingCartTotal();

    // Obtener botones de eliminar del carrito
    const deleteButtons = document.querySelectorAll('.buttonDelete');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', removeItemFromCart);
    });

    // Obtener inputs de cantidad del carrito
    const quantityInputs = document.querySelectorAll('.shoppingCartItemQuantity');
    quantityInputs.forEach((input) => {
        input.addEventListener('change', quantityChanged);
    });
}

// Función para actualizar el total del carrito
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    shoppingCart.forEach((item) => {
        const itemPrice = parseFloat(item.price.replace('$', ''));
        total += itemPrice * item.quantity;
    });

    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

// // Función para eliminar un artículo del carrito
// function removeItemFromCart(event) {
//     const buttonClicked = event.target;
//     const itemTitle = buttonClicked.closest('.shoppingCartItem').querySelector('.shoppingCartItemTitle').textContent;

// Función para eliminar un artículo del carrito
function removeItemFromCart(event) {
    const buttonClicked = event.target;
    const itemTitle = buttonClicked.closest('.shoppingCartItem').querySelector('.shoppingCartItemTitle').textContent;

    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar "${itemTitle}" del carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Buscar el índice del artículo en el carrito
            const itemIndex = shoppingCart.findIndex((item) => item.title === itemTitle);

            // Si se encuentra el artículo, eliminarlo del carrito
            if (itemIndex !== -1) {
                shoppingCart.splice(itemIndex, 1);
                updateShoppingCart();

                Swal.fire('Eliminado', 'El artículo ha sido eliminado del carrito', 'success');
            }
        }
    });
}


    // Buscar el índice del artículo en el carrito
    const itemIndex = shoppingCart.findIndex((item) => item.title === itemTitle);

    // Si se encuentra el artículo, eliminarlo del carrito
    if (itemIndex !== -1) {
        shoppingCart.splice(itemIndex, 1);
        updateShoppingCart();
    }


// Función para cambiar la cantidad de un artículo en el carrito
function quantityChanged(event) {
    const input = event.target;
    const itemTitle = input.closest('.shoppingCartItem').querySelector('.shoppingCartItemTitle').textContent;
    const newQuantity = parseInt(input.value);

    // Buscar el artículo en el carrito y actualizar la cantidad
    const item = shoppingCart.find((item) => item.title === itemTitle);
    if (item) {
        item.quantity = newQuantity;
        updateShoppingCart();
    }
}

// Asignar evento al botón de comprar
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

// Función para vaciar el carrito al hacer clic en el botón de comprar
function comprarButtonClicked() {
    shoppingCart.length = 0; // Vaciar el arreglo del carrito
    updateShoppingCart();
}

// Actualizar el carrito inicialmente
updateShoppingCart();
