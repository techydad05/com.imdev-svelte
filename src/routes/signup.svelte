<script>
    import { userStore, signupUser, loginUser } from '../stores/userStore';
	const formData = {};
	let isSignup, toggled, loadingBtn = false;
    let changeSignUp = () => {
        isSignup = !isSignup;
    }
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
                console.log("user signup:", $userStore)
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
        <div class="flex justify-center space-x-1">
            <button class:btn-active={!isSignup} on:click={() => changeSignUp()} class="btn btn-ghost text-2xl">Login</button>
            <div class="text-2xl flex items-center justify-center pb-2">|</div>    
            <button class:btn-active={isSignup} on:click={() => changeSignUp()} class="btn btn-ghost text-2xl">Signup</button>    
        </div>
        <input bind:value={formData.email} placeholder="Email" class="form-control input input-primary" type="email" name="email">
        <input bind:value={formData.password} placeholder="Password" class="form-control input input-primary" type="password" name="password">
        <button class:loading={loadingBtn} on:click={() => signUpSignIn()} class="btn btn-primary">{isSignup ? "Sign Up" : "Log In"}</button>
    </div>
</div>
{/if}
<div class:modal-open={toggled} class="modal items-center px-10">
    <div class="modal-box rounded-2xl">
        {#if $userStore}
            {#if isSignup}
                <h1 class="text-3xl text-primary-focus">Thanks {$userStore.email} for signing up!</h1>
                {:else}
                <h1 class="text-3xl text-primary-focus">You have logged in as {$userStore.email}!</h1>
            {/if}
        {/if}
        <span class="text-8xl">😽</span>
    </div>
</div>

<style lang="postcss">
	#signup-in-form .btn-active {
		pointer-events: none !important;
	}
</style>