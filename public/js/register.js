const registerForm = document.querySelector('#registerForm');
//obtener boton submit
const resgisterBtn = document.getElementById('registerSubmit');
const URL = 'https://ecommercer-franco-bartilotta.onrender.com/api';

registerForm.addEventListener('submit', async (evt)=>{

    try {
        evt.preventDefault();


        const el = evt.target.elements;
        if (el.password.value !== el.password2.value) {
                console.warn('El password no coincide')
        }

        const use = {
            fullName: el.fullName.value,
            email: el.email.value,
            password: el.password.value,
            date: el.bornDate.value,
            country: el.country.value,
            gender: el.gender.value,
            role: 'USER_ROLE'
        }

        const response = await axios.post(`${URL}/user`,use);  
        Users = response.data.user; 
        

    showAlert('El usuario se registro correctamente','success');
    setTimeout(() => {
        window.location.href = "/login";
    }, 1500)
    } catch (error) {
        console.log(error)
    }
    
})




