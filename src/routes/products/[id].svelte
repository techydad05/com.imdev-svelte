<script>
import { page } from '$app/stores';
import { getProduct } from '$lib/medusa-client';
import { Stretch } from "svelte-loading-spinners";
let productId, variant;
let quantity = 1;
let modalImg = null;
page.subscribe((route) => {
    productId = route.params["id"];
});
const openModal = (e) => {
    modalImg = e.currentTarget.src;
    console.log(!!modalImg);
}
</script>
getProduct(productId).then(e => console.log(e))
// <div class="flex items-start mt-4 justify-center">
//     {#await getProduct(productId)}
//         <div class="flex h-full items-start justify-center bg-slate-650">
//             <Stretch size="60" color="white"></Stretch>
//         </div>
//     {:then product}
//         <div class="container">
//             <div class="hero bg-base-200">
//                 <div class="flex-col hero-content md:flex-row">
//                     <!-- svelte-ignore a11y-missing-attribute -->
//                     <img on:click={(e) => openModal(e)} src={`${product.thumbnail}`} class="max-w-sm rounded-box shadow-2xl">
//                     <div>
//                     <h1 class="text-5xl font-bold">{product.title}</h1>
//                     <p class="py-6">{product.description}</p>
//                     <!-- <button disabled={!variant} on:click={() => addToCart(variant, quantity)} class="btn btn-primary">Add to Cart</button> -->
//                     <select on:change={(e) => variant = e.currentTarget.value} class="select ml-2 mb-4" name="variant" id="variant">
//                         <option disabled selected>Select A Size</option>
//                         {#each product.variants as variant}
//                             <option value={variant.id}>{variant.title}</option>    
//                         {/each}   
//                     </select>
//                     <br />
//                     <button on:click={() => quantity != 1 ? quantity = quantity - 1 : null} class="btn btn-outline border-black mr-2">-</button>
//                     <span class="btn btn-active">{quantity}</span>
//                     <button on:click={() => quantity = quantity + 1} class="btn btn-outline border-black mx-2">+</button>
//                     </div>
//                 </div>
//             </div>
//             <div class="carousel carousel-center space-x-4 bg-base-200 mb-4 p-4">
//                 {#each product.images as image, i}
//                     <div class="carousel-item">
//                     <!-- svelte-ignore a11y-missing-attribute -->
//                     <img on:click={(e) => openModal(e)} src={image.url} class="w-40 rounded-box">
//                     </div> 
//                 {/each}
//             </div>
//         </div>
//         <div class:modal-open={!!modalImg} class="modal">
//             <div class="modal-box fixed">
//                 <div class="modal-action m-0 fixed top-1 right-1">
//                     <label for="my-modal" class="btn rounded-box font-mono text-2xl">X</label>
//                 </div>
//                 <img src={modalImg} alt="" class="object-cover">
//             </div>
//         </div>
//         <input on:click={() => modalImg = !modalImg} type="checkbox" id="my-modal" class="modal-toggle">
//     {:catch error}
//         {console.error(error)}
//     {/await}
// </div>