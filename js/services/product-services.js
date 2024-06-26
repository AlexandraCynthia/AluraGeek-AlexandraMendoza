const productList= () =>{
    return fetch("https://jsonserver2-0ht2.onrender.com/products")
            .then((res)=>res.json())
            .catch((err)=>console.log(err))
}

const createProducts = (name, price, image)=>{
    return fetch("https://jsonserver2-0ht2.onrender.com/products", {
        method: "POST",
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    }).then((res)=>{
        if(!res.ok){
            throw new Error("Error al crear producto");
        }
        return res.json();
    }).catch((err)=>console.log(error));
    };
    
    


const deleteProducts = (id)=>{
    return fetch(`https://jsonserver2-0ht2.onrender.com/products/${id}`, {
        method: "DELETE",
        headers:{
            "Content-type": "application/json",
        }
        
    }).then((res)=>{
        if(!res.ok){
            throw new Error("Error al eliminar producto");
        }
        return res.json();
    }).catch((err)=>console.log(err))
    
}

export const serviceProducts = {
    productList,
    createProducts,
    deleteProducts,
}