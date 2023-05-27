
let Products = JSON.parse(localStorage.getItem("Products")) || []; 


const productForm = document.getElementById('add-product')

productForm.addEventListener('click', () => {
    console.dir(productForm.dataset) 
});



const submitBtn = document.getElementById('submit-btn') //?   #4




const tableBody = document.getElementById('table-body')


let editIndex; //?      #3


function renderizarTabla(){
    
    tableBody.innerHTML = ""; 

    if(Products.length === 0){
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`; 

        return
    }
    Products.forEach((producto, index) =>{    
        let imageSrc = '/assets/images/no-product.png'; 

        if(producto.image){ 
            imageSrc = producto.image;       
        }

        const tableRow = `
                            <tr class="product">
                                <td class="product__img-cell">
                                    <img class= "product__img" src="${imageSrc}" width="120px" alt="${producto.name}">                    
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
                                    <button class="product__action-btn" onclick="deleteProduct(${index})"> 
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


renderizarTabla()


function addProduct(evt){
    evt.preventDefault(); 

    console.dir(evt.target); 

    console.log(evt.target);

    const elements = evt.target.elements


    const newProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.valueAsNumber, 
        image: elements.image.value,
        category: elements.categorias.value
    };
    

    const newFormData = new FormData(evt.target);
    
    const newProductFormData = Object.fromEntries(newFormData); 


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
    }).then(value => {
        if(value === `delete`){
            Products.splice(id, 1)
            
            localStorage.setItem("Products", JSON.stringify(Products));
        
            swal({
                title: `Elemento Borrado Correctamente`,
                icon: 'error'
            })
        
            renderizarTabla();    
        }else{
            return; 
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
}





