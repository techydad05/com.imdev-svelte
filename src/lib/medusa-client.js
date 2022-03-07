export const getProducts = async () => {
    const response = await fetch("https://medusa-store-420.herokuapp.com/store/products");
    return response.json();
}

export const getProduct = async (productId) => {
    const response = await fetch(`https://medusa-store-420.herokuapp.com/store/products/${productId}`);
    return response.json();
}











// import Medusa from "@medusajs/medusa-js";

// const BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

// console.log(Medusa);

// export const createClient = () => new Medusa({ baseUrl: BACKEND_URL });

// export const client = createClient();

// console.log("client:", client);

// export const getProducts = async () => {
//   const { products } = await client.products.list();
//   console.log("products", products);
//   console.log("client", client);
//   return products;
// };

// export const getProduct = async (productId) => {
//   const { product } = await client.products.retrieve(productId);
//   console.log("product", product);
//   return product;
// };

// export const getCart = async () => {
//   const { cart } = localStorage.cart_id ? await client.carts.retrieve(localStorage.cart_id) : await client.carts.create();
//   localStorage.setItem("cart_id", cart.id);
//   return cart;
// }

// export const addToCart = async (variant, quantity) => {
//   client.carts.lineItems.create(localStorage.cart_id, {
//     variant_id: variant,
//     quantity
//   }).then(cart => console.log("added!", cart));
// }
