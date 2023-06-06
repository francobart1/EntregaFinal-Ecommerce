
const loginForm = document.getElementById('loginForm');
const URL = 'http://localhost:9000/api';

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault();

    const {email,password} = loginForm.elements;
    
    try {
        const dataBody = {
            email:email.value,
            password: password.value
        }
        const respuesta = await axios.post(`${URL}/login`,dataBody)

        const {token, user, msg} = respuesta.data;

        localStorage.setItem('token', token);
        localStorage.setItem('currentUser',JSON.stringify(user))

        showAlert(msg)
        setTimeout(() => {
                    window.location.href = '/';
                }, 1500)
    } catch (error) {
        console.log(error)
        showAlert('Error al hacel el Login','error')
    }
})


