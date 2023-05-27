let Products = JSON.parse(localStorage.getItem('order')) || [];
let Order = JSON.parse(localStorage.getItem('order')) || [];

const badgeHTML = document.getElementById('cart-count')


function contarProductos(){
    Order = JSON.parse(localStorage.getItem('order')) || [];
    let cantidad = 0;
    Order.forEach((prod) => {
        cantidad += prod.cant; 
    })
    badgeHTML.innerText = cantidad;
}

contarProductos();

const tableBody = document.getElementById('table-body');

let editIndex;

function renderizarTabla(){
    let totalOrden = 0;
    tableBody.innerHTML = ''
    if(Products.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td coldspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    
    Products.forEach((product,index)=>{
        let imageSrc = '/assest/image/no-product.png';
    if(product.image) 
            imageSrc  = product.image;
    const tableRow = `
    <tr>
                <td>
                    <img class= "order__img" src="${imageSrc}" alt="${product.name}" width="80px">
                </td>
                <td>
                    ${product.name}
                </td>
                <td class="order__price">
                    $ ${product.price}
                </td>
                <td class="order__cant">
                    <div class="order-cant-btn">
                        <button class="order-cant-btn__decrement" onclick="decrement('${index}')"
                        id="order-cant-btn__decrement">
                        -
                        </button>
                    <input class="order-cant-btn__input" id="order-cant-input${index}" type="text" 
                    value="${product.cant}" onchange="cantidadTotal('${index}')">
                        <button class="order-cant-btn__increment" onclick="increment('${index}')"
                        id="order-cant-btn__increment">
                        +
                        </button>
                    </div>
                </td>
                <td class="order__total">
                $ ${product.total}
                
                </td>
                <td><button class= "order__delete-btn" onclick= "deleteProduct(${index})" >
                <i class="fa-solid fa-x"></i>
                </button>
                </td>
                
                </td>
            </tr>
    ` 
    tableBody.innerHTML += tableRow; 
    totalOrden += product.total;
    })
    const tableRow = `
        <tr>
                <td class="order-import-total" colspan = '4'>
                TOTAL
                </td>
                <td class="order-import-total">
                $ ${totalOrden}
                </td>
        </tr>
    ` 
    tableBody.innerHTML += tableRow; 
}

renderizarTabla();


function deleteProduct(id){
    Products.splice(id,1)
    
    localStorage.setItem('order',JSON.stringify(Products));
    
    renderizarTabla();
    showAlert('Producto Eliminado')
    contarProductos();

}



function increment(id) {
    var input = document.getElementById(`order-cant-input${id}`)
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value + 1;
    CantidadTotal(id);
}

function decrement(id) {
    var input = document.getElementById(`order-cant-input${id}`)
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
    input.value = 1;
    }
    CantidadTotal(id)
}

function CantidadTotal(id){

    const cantProd = document.getElementById(`order-cant-input${id}`); 
            
    Products[id].cant =  parseInt(cantProd.value);
    Products[id].total = Products[id].cant * parseInt(Products[id].price);


localStorage.setItem('order',JSON.stringify( Products));
renderizarTabla();

contarProductos();

}


function finalizarCompra(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser){
    showAlert('Debe estar logueado para poder Finalizar la compra','advertencia')
    } 
    else{
    if(Products.length === 0){
        showAlert('Debe seleccionar un producto para poder Finalizar la compra','advertencia')
    }else{
        localStorage.removeItem('order')
        Products = [];
        renderizarTabla();
        showAlert('Compra Finalizada','exito')
        contarProductos();
    }
    
    } 
    
}

//tener la posibilidad de que cuando apriete el boton comprar se anada el elemento al array oder.products
    // antes de hacer un push
    // deberia checkear con un find con un findindex si el producto ya se encuentra
    //si se encuentra incremento donde de ese producto su cantidad
    //sino hago un push de ese elemento
    //incrementar el total
    //volver a guardar en el sessionStorage

// ?eliminar elemento
    // pintamos en el boton de mi orden el index de el array orde.products y lo eliminamos(splice)
    // guardar el precio del producto por la cantidad y restarselo al total
    // actualizar el sessionstorage con el nuevo valor

// ?listar orden 
    //pintar los elementos en una nueva pagina.