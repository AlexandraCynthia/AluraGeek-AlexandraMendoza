import { serviceProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard(name,price, image,id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `    
    <div class="img-container">
        <img class="card-image" src="${image}" alt="${name}">
    </div>

    <div class="card-container--info">
        <p class="name-card ibm-plex-mono-thin">${name}</p>
        <div class="card-container--value">
            <p class="ibm-plex-mono-thin precio-card">S/${price}</p>
            <button class="delete-button" data-id="${id}">
                <img class="img-delete" src="https://res.cloudinary.com/dgxnatqij/image/upload/v1715908998/ONE/trash-Photoroom.png-Photoroom_v9ljxu.png" alt="Eliminar">
            </button>
        </div>
    </div>
    `;

    //Agregando event listener para boton eliminar
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click",()=>{
        handleDelete(id, card);
    });

    productContainer.appendChild(card);
    return card;
}


const handleDelete = async(id, cardElement)=>{
    try{
        await serviceProducts.deleteProducts(id);
        productContainer.removeChild(cardElement);
    }catch(error){
        console.log(error);
    }
}




const render = async()=>{
    try {
        const listProducts = await serviceProducts.productList();

        listProducts.forEach(product =>{
            productContainer.appendChild(createCard(product.name,product.price,product.image,product.id))});

        
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    serviceProducts.createProducts(name, price, image)
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error));

})


render();