import { state } from "./data/state.js";
import { listeners } from "./dom/listeners.js";
import { getProducts } from "./services/services.js";
import { renderProductList } from "./dom/render.js";

async function main(){
    await getProducts();
    renderProductList()
    listeners();
}

main()