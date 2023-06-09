const URL = 'https://ecommercer-franco-bartilotta.onrender.com/api';
const URL_public = 'https://ecommercer-franco-bartilotta.onrender.com';
const user = JSON.parse(localStorage.getItem('currentUser'));
const params = window.location.search;
const products = [];
let product;

console.log(params)

const paramsUrl= new URLSearchParams(params);

const paramsEntries = Object.fromEntries(paramsUrl);

const index = params.split('id=')[1];


console.log(paramsEntries)




async function renderizarProductos(id) {

    try{
        const respuesta = await axios.get(`${URL}/products/${id}`)
        product = respuesta.data.product
    const detail = document.getElementById('detail')


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
                    <a class="container-detail__btn" onclick="addToOrder()" } >
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
    `} catch (error) {
        console.log(error)
    }


    }

    



renderizarProductos(index);

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
        id: product._id,
        image: product.image ? `${URL_public}/upload/product/${product.image}` : '/assets/no-product.png',
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
localStorage.setItem('order',JSON.stringify(Order));

contarProductos();

//Alerta de Producto agregado
showAlert('Producto agregado a la Orden','exito');

}

function addT(){
    const cantProd = document.getElementById("product-detail-container-order-params__num")        
    const newOrder = {
        id: product._id,
        image: product.image ? `${URL}/upload/product/${product.image}` : '/assets/images/no-product.png',
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

//Guardarlo en el local storage
sessionStorage.setItem('order',JSON.stringify( Order));

contarProductos();

//Alerta de Producto agregado
showAlert('Producto agregado a la Orden','exito');

}