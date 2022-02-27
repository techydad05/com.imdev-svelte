<script context="module">
    /**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ params, url, fetch, session, context }) {
  const resourceUrl = `https://medusa-store-420.herokuapp.com/store/products`;
  const res = await fetch(resourceUrl);

if (res.ok) {
  return {
    props: {
       testies: await res.json()
    }
  };
}
return {
  status: res.status,
    error: new Error(`Could not load url`)
  };
}
</script>
<script>
// import { getProducts } from "$lib/medusa-client";
import { Stretch } from "svelte-loading-spinners";
// import "../../medusa-client";
export let testies;
</script>
<div class="">
    <h1 class="text-4xl text-center my-4">Medusa Products:</h1>
    {#await testies}
        loading products...
    {:then data}
        {#each data.products as p}
            {p.id}<br/>
        {/each}
    {/await}
    <!-- {#await getProducts()}
        <div class="flex h-full items-center justify-center bg-slate-650">
            <Stretch size="60" color="white"></Stretch>
        </div>    
    {:then products}
        {#each products as product}
            <div class="card sm:w-[47%] md:w-[30.33%] m-[1.5%] bg-base-100 shadow-xl float-left">
                <figure><img src={product.thumbnail} alt={product.handle}></figure>
                <div class="card-body">
                <h2 class="card-title">{product.title}</h2>
                <p class="text-sm h-24 overflow-hidden text-ellipsis">{product.description}</p>
                <div class="justify-end card-actions">
                    <button class="btn btn-sm btn-primary"><a href={`/products/${product.id}`}>View</a></button>
                </div>
                </div>
            </div>
        {/each}
    {:catch error}
        {console.error(error)}
    {/await} -->
</div>