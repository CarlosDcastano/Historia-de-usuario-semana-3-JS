import { state } from "../data/state.js";

const url = "http://localhost:3000/products";

export async function getProducts() {
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("No fue posible consultar los productos");
        }

        const data = await response.json();
        state.products = data;
        
    } catch (error) {
        console.error(error)
    }
}

export async function saveProduct(product) {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw new Error("No fue posible guardar el producto");
        }

        const newProduct = await response.json();
        state.products.push(newProduct);
        
    } catch (error) {
        console.error(error)
    }
}

export async function updateProduct(id, updatedfields) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(updatedfields)
        });

        if(!response.ok){
            throw new Error("No fue posible actualizar el producto");
        }

        const updatedProduct = await res.json();
        const index = state.products.findIndex(p => p.id === id);
        if (index !== -1) {
            state.products[index] = updatedProduct;
        }
        
    } catch (error) {
        console.error(error)
    }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error("No se pudo eliminar el producto")
        
        state.products = state.products.filter(p => p.id !== id);

        console.log("Producto eliminado con éxito")
        
    } catch (error) {
        console.error("Error en deleteProduct:", error);
        
    }
    
}


