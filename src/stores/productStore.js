import { writable } from "svelte/store";
export const productStore = writable();

// localhost:9000/store/products

// export const fetchStoreData = (async () => {
//     await fetch('http://localhost:9000/store/products', 
//     { 
//         // method: "GET", 
//         mode: 'no-cors', 
//         headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       }
//     })
//     .then((res) => {
//         return res.text();
//         productStore.set('fuck you')
//     })
// })();