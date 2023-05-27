let users = JSON.parse(localStorage.getItem("users")) || []; 



const productForm = document.getElementById('add-product')
productForm.addEventListener('click', () => {
    console.dir(productForm.dataset) 
}) 


const submitBtn = document.getElementById('submit-btn') //?   #4




const tableBody = document.getElementById('table-body')


let editIndex; //?      #3


function renderizarTabla(){
    
    tableBody.innerHTML = ""; 

    if(users.length === 0){
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON USUARIOS</td></tr>`; 

        return
    }
    users.forEach((user, index) =>{    
        let imageSrc = '/assets/images/no-product.png'; 

        if(user.image){ 
            imageSrc = user.image;       
        }

        const tableRow = `
                            <tr class="product">
                            
                                <td class= "product__name">
                                    ${user.name}
                                </td>
                                <td class= "product__desc">
                                    ${user.email}    
                                </td>
                                <td class= "product__price">
                                    ${user.role}
                                </td>
                                <td class= "product__price">
                                    ${user.date}
                                </td>
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteProduct(${index})"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editProduct(${index})">
                                        <i class="fa-solid fa-pencil"></i>
                                    
                                </td>
                            </tr>`


        
                            tableBody.innerHTML += tableRow
        
    })
}


renderizarTabla()


function formatearFecha() {

    const fecha = new Date()

let dia = String(fecha.getDate())
let mes = fecha.getMonth() + 1

const year = fecha.getFullYear()

if(dia < 10) {
    dia = '0' + dia;
}


    return `${dia}/${mes}/${year}`;
}

function addProduct(evt){
    evt.preventDefault(); 

    console.dir(evt.target); 

    console.log(evt.target);

    const elements = evt.target.elements


    const newProduct = {
        name: elements.name.value,
        email: elements.email.value,
        role: elements.role.value,
        date: formatearFecha()
    };

    


    console.log(newProduct)

    if(editIndex >= 0){
        users[editIndex] = newProduct;
        swal({
            title: `El producto se edito correctamente`,
            icon: 'info'
        })
    } else{
        users.push(newProduct)

        swal({
            title: `El producto se agrego correctamente`,
            icon: 'success'
        })
    }

    
    localStorage.setItem("users",  JSON.stringify(users)) 

    editIndex = undefined 

    submitBtn.classList.remove('edit-btn') 
    submitBtn.innerText = 'Cargar Producto'

    console.log(users)

    renderizarTabla()

    evt.target.reset() 

    elements.name.focus(); 
}

function deleteProduct(id){
    swal({
        title: `Borrar usuario`,
        text: `Esta seguro que desea borrar el usuario ${users[id].name}`,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(value => {
        if(value === `delete`){
            users.splice(id, 1)
            
            localStorage.setItem("users", JSON.stringify(users));
        
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

    let user = users[id];
    console.table(product)
    const el = productForm.elements;
    el.name.value = user.name
    el.email.value = user.email
    el.role.value = user.role
    

    editIndex = id; 
}





