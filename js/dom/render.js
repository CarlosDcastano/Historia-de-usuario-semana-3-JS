import { state } from "../data/state.js";
import { productsList } from "./elements.js";


export function renderProductList(){
    state.products.forEach(p =>{
        const li =document.createElement("li");
        li.className = "eachProduct";
        li.innerHTML = `
            <div class="product">
                <p>Product: ${p.name} - Description: ${p.description} - Amount: ${p.amount}
                <button type="button" class="editProduct" data-id="${p.id}">Edit</button>
                <button type="button" class="deleteProduct" data-id="${p.id}">Delete</button>
            </div>

            <div id="editModal" class="modal hidden">
                    <div class="modal-content">
                        <h3>Editar producto</h3>
        
                        <form id="editProductForm">
                            <input type="text" id="editName" placeholder="Name"><br><br>
                            <input type="text" id="editDesc" placeholder="Description"><br><br>
                            <input type="number" id="editAmount" placeholder="Amount"><br><br>
        
                            <button type="submit">Guardar cambios</button>
                            <button type="button" id="closeModal">Cancelar</button>
                        </form>
                    </div>
                </div>
        `

        productsList.appendChild(li);

    })

    
}