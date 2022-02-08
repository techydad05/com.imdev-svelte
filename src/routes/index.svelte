<script>
	import SignUp from './signup.svelte';
	let loggedInUser;
	import { userStore } from '../stores/userStore';
  </script>
	  
  <div class="hero min-h-[60vh] flex-1 bg-base-200">
	  <div class="text-center hero-content">
		<div class="max-w-md">
		  <h1 class="mb-5 text-5xl font-bold">Hello there!</h1>
		  <!-- <div class="flex container">
			  {JSON.stringify($userStore, null, 2)}
		  </div> -->
		  <!-- <button class="btn btn-primary">Get Started</button> -->
		</div>
	  </div>
  </div>
  <SignUp />
  
  