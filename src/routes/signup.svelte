<script>
    import { userStore, signupUser, loginUser } from '../stores/userStore';
	const formData = {};
	let results = {};
	let isSignup = true;
    let toggled = false;
    let loadingBtn = false;
    let toggleModal = () => {
        toggled = true;
        setTimeout(() => {
            toggled = false;
        }, 3000);
    }
    let signUpSignIn = () => {
        loadingBtn = true;
        if (isSignup) {
            signupUser(formData).then(() => {
                toggleModal();
                loadingBtn = false;
                formData.email, formData.password = '';
                console.log("user login:", $userStore)
            })
        } else {
            loginUser(formData).then(() => {
                toggleModal();
                loadingBtn = false;
                formData.email, formData.password = '';
                console.log("user login:", $userStore)
            });
            }
        }
</script>

{#if !$userStore}
<div id="signup-in-form" class="flex justify-center w-12/12 py-20">
    <div class="form-group p-5 space-y-4 inline-flex flex-col justify-center">
        <h2 class="text-3xl font-bold"><div on:click={() => isSignup = !isSignup} class:btn-active={isSignup} class="btn btn-ghost text-2xl">Sign Up</div> | <div on:click={() => isSignup = !isSignup} class:btn-active={!isSignup} class="btn btn-ghost text-2xl">Login!</div></h2>
        <input bind:value={formData.email} placeholder="Email" class="form-control input input-primary" type="email" name="email">
        <input bind:value={formData.password} placeholder="Password" class="form-control input input-primary" type="password" name="password">
        <button class:loading={loadingBtn} on:click={() => signUpSignIn()} class="btn btn-primary">{isSignup ? "Sign Up" : "Log In"}</button>
    </div>
</div>
{/if}
<div class:modal-open={toggled} class="modal items-center px-10">
    <div class="modal-box">
        {#if isSignup}
            {#if $userStore}
                <h1 class="text-3xl text-primary-focus">Thanks {$userStore.email} for signing up!</h1>
                <p class="text-lg">Please check your email for verification.</p>
                {:else if results.error}
                <h1 class="text-4xl text-primary-focus">An error has occured: {results.error.message}</h1>
            {/if}
        {:else}
            <h1 class="text-6xl text-primary-focus">You have logged in!</h1>
        {/if}
        <span class="text-8xl">😽</span>
    </div>
</div>

<style lang="postcss">
	#signup-in-form .btn-active {
		pointer-events: none !important;
	}
</style>