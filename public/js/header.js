const signIn = document.getElementById('sign-in');
const navbarList = document.getElementById('navbar-list')
const badgeHTML = document.getElementById('cart-count')
let Order = JSON.parse(localStorage.getItem('order')) || [];


function renderHeaderLinks () {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


if(currentUser) {
    signIn.innerHTML = `<div onclick='logout()' " href="/login" style="cursor: pointer;" class="navbar__nav-link">Logout</div>`

    const adminProductLink = createListItemElement('admin-product','Admin Product');
    

    const adminUserLink = createListItemElement('amind-user', 'User Product');
    
    navbarList.appendChild(adminProductLink)
    navbarList.appendChild(adminUserLink)


} else {
    const link = createLinkElement('login', 'Login');
    signIn.replaceChildren(link);



    signIn.innerHTML = `<a href="/login" id="sign-in" class="navbar__nav-link">Login</a>`
}

}
function  createListItemElement(path, text) {
    const listItem = document.createElement('li');
    listItem.classList.add('navbar__nav-item');
    link = createLinkElement(path, text);
    listItem.setAttribute('id', path);

    listItem.appendChild(link);
    return listItem;
}

function  createLinkElement(path, text) {
    
    
    const link = document.createElement('a');
    link.classList.add('navbar__nav-link');
    link.href = `${path}`;
    link.innerHTML = text;
    
    return link;
}

function logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser.role ==="ADMIN_ROLE"){
        document.getElementById("admin-product").remove();
        document.getElementById("admin-user").remove();
        
        setTimeout(()=>{
            window.location.href="/"
        }, 800)
    
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    
        renderHeaderLinks();
}

function contarProductos(){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let cantidad = 0;
    Order.forEach((prod) => {
        cantidad += prod.cant; 
    })
    badgeHTML.innerText = cantidad;
}

contarProductos();

renderHeaderLinks();

