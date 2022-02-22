<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
</svelte:head>

<script>
import { page } from '$app/stores';
import logo from './svelte-logo.svg';
import { onMount } from 'svelte';
import { userStore, logout } from "../../stores/userStore";
import { themes } from "../../stores/themes";
import { getCart } from "$lib/medusa-client";
let isOpen, toggled, cartOpen, pageLoaded = false;
export let toggleThemes = true;
let toggleModal = () => {
    toggled = true;
    isOpen = false;
    setTimeout(() => {
        toggled = false;
    }, 3000);
}
function openMenu() {
    isOpen = !isOpen;
}
function openCart() {
    cartOpen = !cartOpen;
}
onMount(() => {
    // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
    // false parameter is required for svelte
    themeChange(false)
    // added this because the side menu started showing up briefly
    // on pageload and It was bugging me.
    setTimeout(() => {
        pageLoaded = true;
    }, 500);
});
</script>
<div class="navbar shadow-lg bg-primary text-neutral-content relative overflow-x-clip w-[100%]">
    <div class="navbar-start">
        <div on:dblclick={() => toggleThemes = !toggleThemes} class="btn btn-secondary">iM.Dev</div><span class="ml-1 text-3xl"> +</span>
		<a class="w-8" href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
        <select class:hidden={toggleThemes} data-choose-theme class="z-[999] absolute top-[105%] left-0 capitalize select select-bordered select-primary text-primary ml-2">
            <option disabled="disabled" selected="selected">Choose a theme</option>
            {#each $themes as theme}
                <option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
            {/each}
        </select>
    </div> 
    <div class="hidden px-2 mx-2 navbar-center md:flex">
		<nav class="flex items-stretch">
			<a class:btn-active={$page.url.pathname === '/'} href='/' class="btn btn-ghost btn-sm rounded-btn">Home</a>
			<a class:btn-active={$page.url.pathname === '/todos'} href='/todos' class="btn btn-ghost btn-sm rounded-btn">Todos</a>
			<a class:btn-active={$page.url.pathname === '/products'} href='/products' class="btn btn-ghost btn-sm rounded-btn">Products</a>
			<a class:btn-active={$page.url.pathname === '/admin'} href='/admin' class="btn btn-ghost btn-sm rounded-btn">Admin</a>
		</nav>
    </div> 
    <div class="navbar-end">
        <button on:click={() => openCart()} class="btn btn-secondary p-0 mx-2 text-4xl">🛒</button>
      <div on:click={() => openMenu()} class:open={isOpen} class="md:hidden burger-icon flex-col justify-self-end cursor-pointer z-50">
        <img class="w-9" src="/hamburger-1.png" alt="hb1 icon">
        <img class="w-9" src="/hamburger-2.png" alt="hb1 icon">
        <img class="relative w-9 mb-[-8px] z-50" src="/hamburger-3.png" alt="hb1 icon">
        <img class="w-9" src="/hamburger-4.png" alt="hb1 icon">
        <img class="relative w-9 mb-[-3px] z-40" src="/hamburger-5.png" alt="hb1 icon">
        <img class="w-9" src="/hamburger-6.png" alt="hb1 icon">
      </div>
    </div>
	<div on:click={() => openMenu()} class:hidden={!isOpen} class="overlay bg-slate-500 opacity-25"></div>
    <div class:hidden={!pageLoaded} class:open={isOpen} class="mobile-menu absolute right-[-50%] md:hidden z-50 min-h-[300px] w-[50%] bg-secondary flex flex-col top-[100%]">
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/'} href='/' class="m-2 btn btn-md self-stretch btn-outline btn-ghost">Home</a>
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/todos'} class="m-2 btn btn-md self-stretch btn-outline btn-ghost" href="/todos">Todos</a>
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/products'} class="m-2 btn btn-md self-stretch btn-outline btn-ghost" href="/products">Products</a>
        {#if $userStore}
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/admin'} class="m-2 btn btn-md self-stretch btn-outline btn-ghost" href="/admin">Admin</a> 
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => logout() && toggleModal()} class="m-2 btn btn-md self-stretch btn-outline btn-ghost">Logout</a>    
        {/if}
    </div>
</div>
<div class:open={cartOpen} class="cart flex h-0 overflow-hidden">
    {#await getCart()}
        loading...
    {:then cart}
        {#each cart.items as item}
            <div>
                <img width="50px" src={item.thumbnail} alt="">
            </div>
        {/each}
        <!-- {console.log(cart.items)} -->
    {:catch error}
        {console.error(error)}
    {/await}
</div>
{#if $userStore}
    <div class:modal-open={toggled} class="modal items-center px-10">
        <div class="modal-box rounded-2xl">
            <h1 class="text-3xl text-primary-focus">Goodbye for now...</h1>
            <span class="text-8xl">😿</span>
        </div>
    </div>
{/if}

<style lang="postcss">
    .burger-icon img {
        transition: transform .15s cubic-bezier(0,1.47,.55,1.6);
    }
    .open.burger-icon img:nth-child(1) {
        transform: translateY(-8px);
    }
    .open.burger-icon img:nth-child(2) {
        transform: translateY(-5px);
    }
    .open.burger-icon img:nth-child(3) {
        transform: translateY(-2px);
    }
    .open.burger-icon img:nth-child(4) {
        transform: translateY(2px);
    }
    .open.burger-icon img:nth-child(5) {
        transform: translateY(5px);
    }
    .open.burger-icon img:nth-child(6) {
        transform: translateY(8px);
    }
    .mobile-menu {
        /* right: -50%; */
        transition: all 0.45s cubic-bezier(.68,-0.55,.27,1.55)
    }
    .open.mobile-menu {
        right: 0;
    }
    .cart {
        transition: all 0.15s linear;
    }
    .open.cart {
        @apply h-40;
    }
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 10;
	}
</style>
