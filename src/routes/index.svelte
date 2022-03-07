<script>
	let loggedInUser;
	import { userStore } from '../stores/userStore';
	import { customerStore, getCart } from '../stores/customerStore';
	import Customer from "$lib/customer.svelte";
	import Sveltable from "sveltable";
	let tableData = ["testies1", "testies2"];
  </script>
	  
  <div class="hero min-h-[60vh] flex-1 bg-base-200">
	  <div class="text-center hero-content">
		<div class="max-w-md">
		  <h1 class="mb-5 text-5xl font-bold">Hello there!</h1>
		  <div class="flex flex-col space-y-4 container">
			  <Customer customer={$customerStore} />
			  <!-- {JSON.stringify($customerStore, null, 2)} -->
			  <!-- {#await getCart()}
			  loading...
			  {:then cart}
			  	<h1 class="text-2xl">{cart.id}</h1>
			  {:catch error }
				  {console.log(error)}
			  {/await} -->
		  </div>
		</div>
	  </div>
  </div>
  
  