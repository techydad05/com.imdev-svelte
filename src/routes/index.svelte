<script>
	import SignUp from './signup.svelte';
	let loggedInUser;
	import { userStore } from '../stores/userStore';
  </script>
	  
  <div class="hero min-h-[60vh] flex-1 bg-base-200">
	  <div class="text-center hero-content">
		<div class="max-w-md">
		  <h1 class="mb-5 text-5xl font-bold">Hello there!</h1>
		  <pre class="text-left">
			  <code>
				  {JSON.stringify($userStore, null, 2)}
			  </code>
		  </pre>
		  <!-- {#if unverifiedUser}
		  	<h3 class='text-3xl -mt-3 mb-5 font-bold italic'>
				{unverifiedUser}
			</h3>
			<p class="text-2xl mb-4">You have not verified your email yet. Please consider doing that or click<button class="btn btn-link">here</button>to sign up with a new one.</p>
			{:else}
				{$user?.email || ''}
		  {/if} -->
		  <!-- <button class="btn btn-primary">Get Started</button> -->
		</div>
	  </div>
  </div>
  <SignUp />
  
  