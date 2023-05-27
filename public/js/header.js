const signIn = document.getElementById('sign-in');
const navbarList = document.getElementById('navbar-list')




function renderHeaderLinks () {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


if(currentUser) {
    signIn.innerHTML = `<div onclick='logout()' style="cursor: pointer;" class="navbar__nav-link">Logout</div>`

    const adminProductLink = createListItemElement('admin-product','Admin Product');
    

    const adminUserLink = createListItemElement('user-product', 'User Product');
    
    navbarList.appendChild(adminProductLink)
    navbarList.appendChild(adminUserLink)


} else {
    const link = createLinkElement('login', 'Login');
    signIn.replaceChildren(link);



    signIn.innerHTML = `<a href="/pages/login/login.html" id="sign-in" class="navbar__nav-link">Login</a>`
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
    link.href = `/pages/${path}/${path}.html`;
    link.innerHTML = text;
    
    return link;
}

function logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser.role === 'ADMIN_ROLE') {
        document.getElementById('admin-product').remove();
        document.getElementById('user-product').remove();
    }

    localStorage.removeItem('currentUser')

    renderHeaderLinks();
}


renderHeaderLinks();

