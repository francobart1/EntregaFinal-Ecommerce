
let Products =  []; 
const token = localStorage.getItem('token')

const URL = 'http://localhost:9000/api';
const URL_public = 'http://localhost:9000';

const productForm = document.getElementById('add-product')
let editIndex; 


async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        Products = respuesta.data.productos
        renderizarTabla(Products)
        
    } catch (error) {
        console.log(error)
    }
}

cargarProductos();

const submitBtn = document.getElementById('submit-btn') //?   #4




const tableBody = document.getElementById('table-body')





function renderizarTabla(products){
    
    tableBody.innerHTML = ""; 

    if(products.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td colspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    } 
    products.forEach((producto) =>{   
        
    
       

        const tableRow = `
                            <tr class="product">
                                <td class="product__img-cell">
                                    <img class= "product__img" src="${producto.image}" id="inputFile" alt="${producto.name}">                    
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
                                    <button class="product__action-btn btn-edit" onclick= "editProduct('${producto._id}')">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                    
                                </td>
                            </tr>`


        
                            tableBody.innerHTML += tableRow
        
    })
}




async function addProduct(evt){
    try {
        evt.preventDefault();
        const elements = evt.target.elements;
        
        const formFile = new FormData(evt.target);
        
        console.log(editIndex) 
        const updateProduct = {
            name: elements.name.value,
            description: elements.description.value,
            price: elements.price.value
        }
        
        console.log(updateProduct)
        if (editIndex) { 
            
            console.log( updateProduct)
            const respuesta = await axios.put(`${URL}/products/${editIndex}`,updateProduct,{
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: updateProduct
                
            });
            
            if(!respuesta)
            swal ({
                title:"Producto no se puedo editar",
                icon: 'error',
            })  
            else      
            swal ({
                title:"Producto editado correntamente",
                icon: 'success',
            })
            }else {
            const respuesta = await axios.post(`${URL}/products`,formFile,{
            headers: { Authorization: token,
                        'Content-Type': 'application/json' },
            body: updateProduct
            });
            if(!respuesta)
            swal ({
                title:"El producto no se añadio",
                icon: 'error',
            })  
            else      
            swal ({
                title:"Producto añadido correctamente",
                icon: 'success',
            })  
        }

        editIndex = undefined;
        submitBtn.classList.remove('edit-btn');
        submitBtn.innerText = 'Cargar Producto'

        cargarProductos();
        limpiar();
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(id) {
    console.log(id)
    swal({
        title: `Borrar producto`,
        text: `Esta seguro que desea borrar el producto   `,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if (value === `delete`) {
            
            try {
                const respuesta = await axios.delete(`${URL}/products/${id}`,{
                    headers: { Authorization: token } });
                cargarProductos()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Elemento fue borrado correctamente`,
                icon: 'error'
            })
            renderizarTabla();
        }
    })


}

function limpiar(){
    const el = productForm.elements;
    el.name.value = '';
    el.description.value = '';
    el.price.value = '';


}

async  function editProduct(id){    
    
    submitBtn.classList.add('edit-btn');
    submitBtn.innerText = 'Modificar Producto'

    const token = localStorage.getItem('token');
    const response = await axios.put(`${URL}/products/${id}`,{
        headers: {
        Authorization: token,
        'Content-Type': 'application/json'
        
        }
});

    const product = response.data.product;
    const el = productForm.elements;
    editIndex = id;

    el.name.value = product.name;
    el.description.value = product.description;
    el.price.value = product.price;
    

    

     

    //mandar el objeto al bakend al endpoint de hacer put, una vez resuelto,vuelven a pedir los productos
}


function actualizarImg(id) {
    var inputFile = document.getElementById('inputFile');
 // Asignar una función al evento onchange del campo de entrada de archivos
    inputFile.onchange = function() {
    obtenerNombreImagen(id);
    };
    // Simular un clic en el campo de entrada de archivos
    inputFile.click();
  }

  async function obtenerNombreImagen(id) {
    try {
        const inputFile = document.getElementById('inputFile');
        // Obtener el nombre del archivo seleccionado
         
        const formData = new FormData();
            formData.append("image", inputFile.files[0] );

        const response = await axios.put(`${URL}/products/${id}/image`,formData,{
            headers: {Authorization: token}});
            
        cargarProductos();
        
        } catch (error) {
            console.log(error)
        }
}




