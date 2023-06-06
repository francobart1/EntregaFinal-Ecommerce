let Users = [];
let editIndex = undefined;
let pass1Input = document.getElementById('password1'); 
let pass2Input = document.getElementById('password2'); 
const passForm = document.querySelectorAll('.password-form');


const URL = 'http://localhost:9000/api';


async function cargarUsuarios() {
    try {
        const token = localStorage.getItem("token") 
        const response = await axios.get(`${URL}/users`, { 
            headers: {
                Authorization: token
            }
        });
        
        Users=response.data.user;
        
        renderizarTablaUsuario(Users);

    } catch (error) {
        console.log(error);
       
    }

}
cargarUsuarios();


const userForm = document.getElementById('user-form')
const submitBtn = document.getElementById('submit-btn')
const tableBody = document.getElementById('table-body')





function renderizarTablaUsuario(users){
    
    tableBody.innerHTML = ""; 

    if(users.length === 0){
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON USUARIOS</td></tr>`; 

        return
    }
    users.forEach((user) =>{    
        

        const tableRow = `
                            <tr class="product">
                            
                                <td class= "product__name">
                                    ${user.fullName}
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
                                    <button class="product__action-btn" onclick="deleteUser('${user._id}')"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editUser('${user._id}')">
                                        <i class="fa-solid fa-pencil"></i>
                                    
                                </td>
                            </tr>`


        
                            tableBody.innerHTML += tableRow
        
    })
}





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


//Funcion para agregar un nuevo usuario a la tabla
async function addUser(evt){
    evt.preventDefault();
    const elements = evt.target.elements;

    
    
    const newUser = {
        fullName: elements.fullName.value,
        email: elements.email.value,
        password: elements.password1.value,
        role: elements.role.value
    }
    const token = localStorage.getItem('token');

    if (editIndex) {
    const response = await axios.put(`${URL}/users/${editIndex}`,newUser,{
        headers: { Authorization: token } }); 
        if(!response)
        showAlert('No se pudo modificar el Usuario','error')
        else{    
        showAlert('El usuario fue modificado','exito')
        passForm.forEach((form)=>{
            form.style.display = 'block';
        })
        pass1Input.required = true;
        pass2Input.required = true;
        }
    }else {
        const response = await axios.post(`${URL}/user`,newUser,{
            'Content-Type': 'application/json'

        });  
        if(!response)
        showAlert('No se pudo agregar el Usuario','error')
        else      
        showAlert('El usuario se Agrego Correctamente','exito')
    }



editIndex = undefined;
submitBtn.classList.remove('edit-btn');
submitBtn.innerText = 'Cargar'

cargarUsuarios();
limpiar();

}

function limpiar(){
    const el = userForm.elements;
    
    el.fullName.value = '';
    el.email.value = '';
    el.password1.value = '';
    el.password2.value = ''; 
    el.date.value = '';
    el.role.value = 'CLIENT_ROLE';
   
  }

  async function deleteUser(id) {
    swal({
        title: `Borrar Usuario`,
        text: `Esta seguro que desea borrar el usuario`,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function (value) {
        if (value === `delete`) {
            
            try {
                const respuesta = await axios.delete(`${URL}/users/${id}`,{
                    headers: { Authorization: token } });
                cargarUsuarios()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Usuario borrado correctamente`,
                icon: 'error'
            })
            renderizarTablaUsuario();
        }
    })


}



async function editUser(id){
    try {
    submitBtn.classList.add('admin-user__edit-btn');
    submitBtn.innerText = 'Modificar'
  
    const token = localStorage.getItem('token');
    response = await axios.get(`${URL}/user/${id}`,{
        headers: {
            Authorization: token
        }
    });  
    const user = response.data.user;
  
    const el = userForm.elements;
     
    editIndex = id;
    
  
    el.fullName.value = user.fullName;
    el.email.value = user.email;
    el.role.value = user.role;
  
    } catch (error) {
      console.log(error)
    }
      
  }





