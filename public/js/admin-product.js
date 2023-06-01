const axios = require('axios').default
let Products =  []; 
const token = localStorage.getItem('token')

const URL = 'http://localhost:8000/api';
const URL_public = 'http://localhost:8000';

const productForm = document.getElementById('add-product')

productForm.addEventListener('click', () => {
    console.dir(productForm.dataset) 
});

async function CargarProductos() {

    try {

        const { data } = await axios.get(`${URL}/products`);
        
        Products = data.productos;
        renderizarTabla();

    } catch (error) {
        console.log(error);

    }
}

CargarProductos();

const submitBtn = document.getElementById('submit-btn') //?   #4




const tableBody = document.getElementById('table-body')


let editIndex; //?      #3


function renderizarTabla(arrayProductos){
    
    tableBody.innerHTML = ""; 

    if(arrayProductos.length === 0){
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`; 

        return
    }
    arrayProductos.forEach((producto, index) =>{    
        //let imageSrc = '/assets/no-product.png'; 

        //if(producto.image){ 
        //    imageSrc = producto.image;       
        //}
        let imageSrc = producto.image ? `${URL_public}/upload/product/ ${producto.image}` : '/assets/no-product.png';

        const tableRow = `
                            <tr class="product">
                                <td class="product__img-cell">
                                    <img class= "product__img" src="${producto.image ? URL+'/'+Products.image : '/assets/no-product.png'}" width="120px" alt="${producto.name}">                    
                                </td>
                                <td class= "product__name">
                                    ${producto.name}
                                </td>
                                <td class= "product__desc">
                                    ${producto.description}    
                                </td>
                                <td class= "product__price">
                                    $ ${producto.price}
                                </td>
                                
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteProduct('${producto._id}')"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editProduct(${index})">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                    
                                </td>
                            </tr>`


        
                            tableBody.innerHTML += tableRow
        
    })
}




async function addProduct(evt){
    evt.preventDefault(); 

    console.dir(evt.target); 

    console.log(evt.target);

    const elements = evt.target.elements


    

    const newFormData = new FormData(evt.target);
    //observar q tengo
    const newProductFormData = Object.fromEntries(newFormData); 

    const { data } = await axios.post(`${URL}/product`, newFormData, {
        headers: {
            Authorization: token
        }
    })

    console.log(data)


    newProductFormData.price = +newProductFormData.price; 

    console.log(newProduct)

    if(editIndex >= 0){
        Products[editIndex] = newProduct;
        swal({
            title: `El producto se edito correctamente`,
            icon: 'info'
        })
    } else{
        Products.push(newProduct)

        swal({
            title: `El producto se agrego correctamente`,
            icon: 'success'
        })
    }

    
    localStorage.setItem("Products",  JSON.stringify(Products)) 

    editIndex = undefined 

    submitBtn.classList.remove('edit-btn') 
    submitBtn.innerText = 'Cargar Producto'

    console.log(Products)

    renderizarTabla()

    evt.target.reset() 

    elements.name.focus(); 
}

function deleteProduct(id){
    
    swal({
        title: `Borrar Producto`,
        text: `Esta seguro que desea borrar el producto ${Products[id].name}`,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if(value === `delete`){
            
            // llamda al backend axios.delete
            try {
            const productDeleted = await  axios.delete(`${URL}/product/${id}`)
            CargarProductos()
                swal({
                    text: `Se borre el producto  ${productDeleted.name} correctamente`
                })
            }catch (error) {
                console.log(error)
            }
            
        
            swal({
                title: `Elemento Borrado Correctamente`,
                icon: 'error'
            })
        
            renderizarTabla();    
        
        }
    })

    

}



function editProduct(id){           //?     #3

    submitBtn.classList.add('edit-btn') 
    submitBtn.innerText = 'Modificar Producto' 

    let product = Products[id];
    console.table(product)
    const el = productForm.elements;
    el.name.value = product.name
    el.description.value = product.description
    el.price.value = product.price
    el.image.value = product.image

    

    editIndex = id; 

    //mandar el objeto al bakend al endpoint de hacer put, una vez resuelto,vuelven a pedir los productos
}





