const URL = 'http://localhost:9000/api';
const cardContainer = document.querySelector('#card-container');
let Products = [];

async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        Products = respuesta.data.productos
        renderizarProductos(Products)
        
    } catch (error) {
        console.log(error)
    }
}


function renderizarProductos(products) {
    cardContainer.innerHTML = '';


    products.forEach((product, index) => {
        
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `<div class="card__header">
        <img src="${product.image}" alt="${product.name}"  class="card__img">
        </div>
        <div class="card__body">
            <div class="card__title">
                ${product.name}
        </div>
            <p class="card__description">
                ${product.description}
            </p>
            <div class="card__price">
                $${product.price}
            </div>
        </div>
        <div class="card__footer">
        <a class="card__btn" onclick="addToOrder(${product._id})" >
        Comprar
        </a>
        
        <div class="card__btn-container">
            <a class="card__btn" href="/product-detail?id=${product._id}">
                Detalle
            </a>
        </div>
        </div>`
        

    cardContainer.appendChild(card);

    })
    
    
}
cargarProductos();

function addToOrder(id){
    const product = productsLS[id];
        
    const newOrder = {
        image: product.image,
        name: product.name,
        price: product.price,
        cant: 1,
        total: product.price
        
    }
        
    const prod = Order.find((prod)=>{
        if(prod.name === product.name){
        prod.cant = parseInt(prod.cant) + 1 ;
        prod.total = prod.cant * parseInt(prod.price);
        return prod;
        }
    })

    if(!prod) {
        Order.push(newOrder);
    }

//Guardarlo en el local storage
localStorage.setItem('order',JSON.stringify(Order));

//Alerta de Producto agregado
showAlert('Producto agregado al carrito','exito')

contarProductos();

}
function metodoFilter(evt) {

    const text = evt.target.value.toLowerCase();

    const filterProducts = productsLS.filter((product) => {
        console.log(product.name)
        const filtra = product.name.toLowerCase().includes(text.toLowerCase());

        return filtra;


    });
    
    renderizarProductos(filterProducts)
    console.log(filterProducts.length)
    const encontrar = document.getElementById('found');
    encontrar.innerHTML = `Se encontraron ${filterProducts.length} productos.`
}

renderizarProductos(productsLS);








