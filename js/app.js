/* Esta función se encarga de crear HTML para agregar un producto a la interfaz. Se debe proporcionar el nombre, precio y la ruta de la imágen del producto
 */

function addProd(nombre, precio, img){
    
    img = `<img class=new-prod src="${img}">`;
    nombre = `<h2>${nombre}</h2>`;
    precio = `<p>${precio}</p>`;  

    return [img,nombre,precio];
}


const addToCart = function(){
    total += parseInt(this.value);
    id = this.id
    alert(`${nombre[id]} añadido al carrito! El total es: USD$${total}`);

}

const contenedor = document.querySelector(".prod-grid") //contenedor donde se arma el grid de productos
let documentFragment = document.createDocumentFragment();
let nombre = ["Mavic 3","Avata", "Mini 3 Pro", "Osmo Action", "Ronin 4", "Air 2s", "Mini 2s", "Inspire X5", "Droneca X34s"];
let total = 0

for(let i = 0; i<9; i++){
    let precioAleatorio = Math.round(Math.random()*100 + 200);
    let prod = null

    if(precioAleatorio<240){ //Si el precio es menor a 240 se coloca un cartel de oferta
        prod = addProd(nombre[i], `<b>USD $${precioAleatorio} OFERTA!!</b>`,`./img/productos/drone${i}.png`);
    }else {
        prod = addProd(nombre[i], `USD $${precioAleatorio}`,`./img/productos/drone${i}.png`);
    }

    let buyBotton = `<button id=${i} type="submit" class="btn-mine3 addprod" value=${precioAleatorio}> + Add to Cart</button>`
    let div = document.createElement("DIV");
    div.classList.add(`item-${i}`,`item`);
    div.innerHTML = prod[0] + prod[1] + prod[2] + buyBotton;
    documentFragment.appendChild(div);
}

contenedor.appendChild(documentFragment);


const botones = document.querySelectorAll(".addprod");

botones.forEach(boton => {
    boton.addEventListener("click", addToCart);
});


