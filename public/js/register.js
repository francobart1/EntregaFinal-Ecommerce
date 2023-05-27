const registerForm = document.querySelector('#registerForm');

const registerBtn = document.getElementById('registerSubmit');

registerForm.addEventListener('submit', (event)=> {


    console.log('submit event')

    event.preventDefault();

    const el = event.target.elements;

    if(el.password.value !== el.password2.value) {
        console.warn('El password no coinciden')
        return;

    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users)

    let userEmailExist = false;


    // !Solucion 1
    //users.forEach(usr => {
    

    //if(usr.email === el.email.value) {
    //    userEmailExist = true;
    //}


//})

//if(userEmailExist) {
//    console.warn('El usuario ya existe')
//}
// *======== Solucion 2
const userExist = users.find(user => {

    if(user.email === el.email.value) {
        return true;

    }
    return false; // no es necesario ya que sino lo defino se hace un return undefined (false)
})

if(userExist) {
    console.warn('El usuario ya existe find')
    return;

}

    // *========== Solucion 3
    //const indexOfUser = users.findIndex(usuario => {
        //if(usuario.email === el.email.value) {
        //    return true
        //}
    //})

    //if(indexOfUser >= 0) {
        //console.warn('El usuario ya existe findIndex');
        //return;
    //}
    
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



console.log('sigue')


    const user = {
        fullName: el.fullName.value,
        email: el.email.value,
        password: el.password.value,
        gender: el.gender.value,
        age: el.age.value,
        role: 'cliente',
        date: formatearFecha()
    }

    users.push(user)

    localStorage.setItem('users', JSON.stringify(users) ) //users ahora tiene un usuario mas


    localStorage.setItem('currentUser', JSON.stringify(user));
    //insertar alerta custom
    showAlert('registro correcto te redireccionaremos en unos instantes...')

    setTimeout(() => {
        window.location.href = '/index.html';
    }, 1500)




})