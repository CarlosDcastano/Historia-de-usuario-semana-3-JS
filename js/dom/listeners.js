import { state } from "../data/state.js";
import { formProducts, productsList } from "./elements.js";
import { saveProduct, updateProduct, deleteProduct } from "../services/services.js";
import { Product } from "../models/product.js";
import { renderProductList } from "./render.js";

export function listeners(){
    formProducts.addEventListener("submit", e =>{
        e.preventDefault();

        const name = formProducts.name.value.trim();
        const description = formProducts.description.value.trim();
        const amount = formProducts.amount.value.trim();

        if(!name){
            alert("Debe agregar un nombre")
            return
        }

        const producExists = state.products.find(prod => prod.name === name);

        if(producExists){
            alert("Ya existe un producto con ese nombre")
            return
        }else{
            const product = new Product(name, description, amount)
            saveProduct(product)
        }
    })

    let productEditing = null;

    document.addEventListener("click", e =>{
        if(e.target.classList.contains("editProduct")){
            const id = e.target.dataset.id;
            productEditing = id;

            const product = state.products.find(p => p.id == id);

            document.getElementById("editName").value = product.name;
            document.getElementById("editDesc").value = product.description;
            document.getElementById("editAmount").value = product.amount;

            document.getElementById("editModal").classList.remove("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target.id === "closeModal") {
            document.getElementById("editModal").classList.add("hidden");
            productEditing = null;
        }
    });

    document.addEventListener("submit", async (e) => {

        if (e.target.id === "editProductForm") {

            e.preventDefault(); 

            const name = document.getElementById("editName").value.trim();
            const desc = document.getElementById("editDesc").value.trim();
            const amount = document.getElementById("editAmount").value.trim();

            if (!name || !desc || !amount) {
                alert("Todos los campos son obligatorios");
                return;
            }

            const updatedData = {
                name: name,
                description: desc,
                amount: amount
            };

            try {
                await updateProduct(productEditing, updatedData);

                document.getElementById("editModal").classList.add("hidden");
                productEditing = null;

            } catch (error) {
                console.error("Error actualizando producto:", error);
                alert("No se pudo actualizar el producto");
            }
        }
    });

    document.addEventListener("click", async (e) => {

        if (e.target.classList.contains("deleteProduct")) {
            const id = e.target.dataset.id;
            console.log("hola")

            const confirmDelete = confirm("¿Seguro que quieres eliminar este producto?");
            if (!confirmDelete) return;

            await deleteProduct(id);

        }

    });


}