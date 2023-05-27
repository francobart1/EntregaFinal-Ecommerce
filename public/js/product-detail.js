
const user = JSON.parse(localStorage.getItem('currentUser'));
const params = window.location.search;


console.log(params)

const paramsUrl= new URLSearchParams(params);

const paramsEntries = Object.fromEntries(paramsUrl);

const indice = paramsEntries.id;


console.log(paramsEntries)

const products = JSON.parse(localStorage.getItem('Products'));
const product = products[indice];



function renderizarProductos() {
    const detail = document.getElementById('detail')

    const product = products[indice];

detail.innerHTML = 

`

    <div class= "container-detail">
        <div class= "container-detail__img-container">
            <img class= "container-detail__img" src="${product.image}"></img>
        </div>
        <div class= "container-detail__important-container">
            <div class= "container-detail__header">
                <h1 class= "container-detail__title">
                    ${product.name}
                </h1>
            </div>
            <div class= "container-detail__body">
                <div class= "container-detail__description-container">
                    <p class="container-detail__description">${product.description}</p>
                </div>
                <div class= "container-detail__price-container">
                    <h1 class= "container-detail__price"> $${product.price} </h1>
                </div>
            </div>

            <div class= "container-detail__footer">
                <div class= "container-detail__cant-container">
                    <h3 class= "container-detail__cant"> Cantidad</h3>
                    <div class= "container-detail__btn-cant">
                        <button onclick="disminuir(this)" id="boton-menos">-</button>
                        <input type="text" value="1" id="input-cant"
                        class="container-detail__input-cant"
                        onchange="cantidadTotal()" maxlength="2">
                        <button id="boton-mas" onclick="aumentar(this)">+</button>
                    </div>
                </div>
                <div class= "container-detail__comprar-container">
                    <a class="container-detail__btn" onclick="addToOrder()" ${user ? "" : "disabled"} >
                        Comprar ahora
                    </a>
                </div>

                <div class= "container-detail__agregar-container">
                    <a onclick="addToCart()" class="container-detail__btn" >
                        Agregar al carrito
                    </a>
                </div>
            </div>
        </div>
    </div>

`


    }

    



renderizarProductos(products);

function aumentar(button) {
    var input = button.parentNode.querySelector('input[type="text"]');
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value + 1;
   // updateTotal();
}

function disminuir(button) {
    var input = button.parentNode.querySelector('input[type="text"]');
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
    input.value = 1;
    }
    
}


function addToCart(){
    const cantProd = document.getElementById("input-cant")        
    const newOrder = {
        image: product.image,
        name: product.name,
        price: product.price,
        cant: parseInt(cantProd.value),
        total: parseInt(cantProd.value) * parseInt(product.price)
        
    }
    
    const prod = Order.find((prod)=>{
    if(prod.name === product.name){
        prod.cant = parseInt(prod.cant) + parseInt(cantProd.value);
        prod.total = prod.cant * parseInt(prod.price);
        return prod;
    }
    })

    if(!prod) {
    Order.push(newOrder);
    }

// //Guardarlo en el local storage
localStorage.setItem('order',JSON.stringify( Order));

contarProductos();

//Alerta de Producto agregado
showAlert('Producto agregado a la Orden','exito');

}

function addToOrder(){

const existe = Order.find((prod)=>{
    if(product.name === product.name){
        return prod;
    }
})
if(!existe)
    addToOrder();
window.location.href = "/pages/order/order.html";

}