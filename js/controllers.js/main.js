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


    const nameInput = document.querySelector("[data-name]");
    const priceInput = document.querySelector("[data-price]");
    const imageInput = document.querySelector("[data-image]");

    nameInput.addEventListener("input", () => clearErrorMessage(nameInput));
    priceInput.addEventListener("input", () => clearErrorMessage(priceInput));
    imageInput.addEventListener("input", () => clearErrorMessage(imageInput));



form.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const image = imageInput.value.trim();

    //Limpiar mensajes de error anteriores
    clearErrorMessage(nameInput);
    clearErrorMessage(priceInput);
    clearErrorMessage(imageInput);

    //Verifica si algún campo está vacio

    let isValid = true;
    if (!name){
        displayErrorMessage(nameInput, "Por favor, completa este campo.");
        isValid=false;
    }
    if(!price){
        displayErrorMessage(priceInput, "Por favor, completa este campo.");
        isValid=false;
    }
    if(!image){
        displayErrorMessage(imageInput, "Por favor, completa este campo.");
        isValid=false;
    }

    if (!isValid){
        return; 
    }

    try {
        const newProduct = await serviceProducts.createProducts(name, price, image);

        //Si se crea el producto exitosamente, crear la tarjeta y limpiar formulario
        if(newProduct){
            createCard(newProduct.name, newProduct.price, newProduct.image, newProduct.id);
            form.reset();
        }
    }catch(error){
        console.log(error);
    }
})

function displayErrorMessage(input, message){
    let errorMessage = input.nextElementSibling;
    if(!errorMessage || !errorMessage.classList.contains("error-message")){
        errorMessage = document.createElement("span");
        errorMessage.classList.add("error-message");
        input.parentNode.insertBefore(errorMessage, input.nextElementSibling)
    }
    errorMessage.textContent = message;
   
}

function clearErrorMessage(input){
    const errorMessage = input.nextElementSibling;
    if(errorMessage && errorMessage.classList.contains("error-message")){
        errorMessage.remove();
    }
}

render();