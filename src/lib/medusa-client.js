import MedusaModule from "@medusajs/medusa-js";
const Medusa = MedusaModule.default;

const BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

const createClient = () => new Medusa({ baseUrl: BACKEND_URL });

export const client = createClient();

export const getProducts = async () => {
  const { products } = await client.products.list();
  console.log("products", products);
  console.log("client", client);
  return products;
};

export const getProduct = async (productId) => {
  const { product } = await client.products.retrieve(productId);
  console.log("product", product);
  return product;
};

export const getCart = async () => {
  const { cart } = localStorage.cart_id ? await client.carts.retrieve(localStorage.cart_id) : await client.carts.create();
  localStorage.setItem("cart_id", cart.id);
  return cart;
}

export const addToCart = async (variant, quantity) => {
  client.carts.lineItems.create(localStorage.cart_id, {
    variant_id: variant,
    quantity
  }).then(cart => console.log("added!", cart));
}
