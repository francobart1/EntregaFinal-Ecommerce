const user = JSON.parse(localStorage.getItem('currentUser'));

if(!user || user.role !== 'ADMIN_ROLE') {
    // sacar o redireccionar a mi usuario al inicio
    window.location.href = '/'
}