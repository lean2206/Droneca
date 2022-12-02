

function addProd(nombre, precio, img){
    
    img = `<img class=new-prod src="${img}">`;
    nombre = `<h2>${nombre}</h2>`;
    precio = `<p>${precio}</p>`;  

    return [img,nombre,precio];
}

class usuario {
    
    constructor (nombre,apellido,email,total=0) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.carrito = []
        this.itemCost = []
        this.total = total
    }
}

const checkUser = () => { //Chequear si hay algun usuario logueado o compra sin finalizar
    let currentUser = localStorage.getItem("currentUser")  

    if (currentUser === "Null") {
        return false
    }
    return currentUser
}

const constructorHTML = () => {
    const cart = JSON.parse(localStorage.getItem('currentUser')).carrito
    const precios = JSON.parse(localStorage.getItem('currentUser')).itemCost
    let htmlText = []

    for(i in cart){
        htmlText+= `- ${cart[i]}: ${precios[i]} <br>`
    }
    
    return htmlText
}


const cartOperation = (obj,currentUser) =>{
    total += parseInt(obj.value)
    id = obj.id
    currentUser.carrito.push(nombre[id])
    currentUser.itemCost.push(`$${obj.value}`)
    currentUser.total = total
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    Swal.fire({
        title: `${nombre[id]} añadido al carrito!`,
        text: `El total es: USD$${total}`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Seguir Comprando!',
        cancelButtonText: 'Finalizar Compra'
    }).then((result) => {
        if (!result.isConfirmed) {
            
            Swal.fire({
                title: `El total de la compra es USD$${total}`,
                icon: 'success',
                html: constructorHTML(),
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            })
            total = 0
            currentUser.carrito = []
            currentUser.total = 0
            localStorage.setItem("currentUser", JSON.stringify(currentUser))

            Swal.fire({
                title: '¿Seguir comprando con el mismo usuario?',
                text: "Se borrarán los datos de usuario",
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: "Seguir Comprando",
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar Usuario'
              }).then((result) => {
                if (!result.isConfirmed) {
                    localStorage.clear()
                    Swal.fire({
                        title:'Usuario Eliminado',
                        icon: 'success'
                    })
                }
              })
        }
    })

}

const addToCart = function(){

    let currentUser = checkUser()
    obj = this
    if (currentUser) {
        currentUser = JSON.parse(currentUser)
        cartOperation(obj,currentUser)
    
    }else {
            (async () => {

                const { value: formValues } = await Swal.fire({
                    title: 'Registro de Usuario',
                    html:
                    '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                    '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
                    '<input id="swal-input3" class="swal2-input" placeholder="Email">',
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value,
                            document.getElementById('swal-input3').value
                        ]
                    }
                })

                currentUser = new usuario(formValues[0],formValues[1],formValues[2])
                localStorage.setItem("currentUser", JSON.stringify(currentUser))
                cartOperation(obj,currentUser)
            })()
        }

}

function moverseA(idElemento) {
    location.hash = "#" + idElemento;
  }

function captura(){  //captura del elemento buscado
    let prodSearch = document.getElementById("busqueda").value
    prodSearch = prodSearch.toLowerCase()
    if (nombreModif.some( (nomb) => nomb == prodSearch)){
        let prodId = nombreModif.indexOf(prodSearch)
        /* let seleccionado = document.getElementById(prodId) */
        moverseA(prodId)
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ese producto no existe',
            timer: 5000
          })
          moverseA("nav")
    }
}


const contenedor = document.querySelector(".prod-grid") //contenedor donde se arma el grid de productos
let documentFragment = document.createDocumentFragment();
let nombre = []
let nombreModif = []
let total = 0
let busqueda = document.getElementById("btn-busqueda")


fetch("../../Droneca/json/productos.json")
.then((response) => response.json())
.then((response) =>  {
    
    response.forEach((item,i) => {
    
        nombre.push(item.nombre)
        nombreModif.push(item.nombre.toLowerCase())
        let precioAleatorio = Math.round(Math.random()*100 + 200);
        let prod = null

        if(precioAleatorio<240){ //Si el precio es menor a 240 se coloca un cartel de oferta
            prod = addProd(item.nombre, `<b>USD $${precioAleatorio} SALE!!</b>`,`./img/productos/drone${i}.png`);
        }else {
            prod = addProd(item.nombre, `USD $${precioAleatorio}`,`./img/productos/drone${i}.png`);
        }

        let buyBotton = `<button id=${i} type="submit" class="btn-mine3 addprod" value=${precioAleatorio}> + Add to Cart</button>`
        let div = document.createElement("DIV");
        div.classList.add(`item-${i}`,`item`);
        div.innerHTML = prod[0] + prod[1] + prod[2] + buyBotton;
        documentFragment.appendChild(div);
        
    })

    contenedor.append(documentFragment)
    const botones = document.querySelectorAll(".addprod");
    botones.forEach(boton => {
        boton.addEventListener("click", addToCart)
    });

    busqueda.onclick = captura

 } )













/* const contenedor = document.querySelector(".prod-grid") //contenedor donde se arma el grid de productos
let documentFragment = document.createDocumentFragment();
let nombre = ["Mavic 3","Avata", "Mini 3 Pro", "Osmo Action", "Ronin 4", "Air 2s", "Mini 2s", "Inspire X5", "Droneca X34s"];  
let nombreModif = nombre.map( (nomb) => nomb.toLowerCase())


for(let i = 0; i<nombre.length; i++){
    let precioAleatorio = Math.round(Math.random()*100 + 200);
    let prod = null

    if(precioAleatorio<240){ //Si el precio es menor a 240 se coloca un cartel de oferta
        prod = addProd(nombre[i], `<b>USD $${precioAleatorio} SALE!!</b>`,`./img/productos/drone${i}.png`);
    }else {
        prod = addProd(nombre[i], `USD $${precioAleatorio}`,`./img/productos/drone${i}.png`);
    }

    let buyBotton = `<button id=${i} type="submit" class="btn-mine3 addprod" value=${precioAleatorio}> + Add to Cart</button>`
    let div = document.createElement("DIV");
    div.classList.add(`item-${i}`,`item`);
    div.innerHTML = prod[0] + prod[1] + prod[2] + buyBotton;
    documentFragment.appendChild(div);
}

contenedor.append(documentFragment);


const botones = document.querySelectorAll(".addprod");

botones.forEach(boton => {
    boton.addEventListener("click", addToCart);
});

busqueda.onclick = captura

 */






