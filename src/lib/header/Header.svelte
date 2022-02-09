<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
</svelte:head>

<script>
import { page } from '$app/stores';
import logo from './svelte-logo.svg';
import { onMount } from 'svelte';
import { userStore, logout } from "../../stores/userStore";
let isOpen, toggled = false;
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
const themes = ['light','dark','cupcake','bumblebee','emerald','corporate','synthwave','retro','cyberpunk','valentine','halloween','garden','forest','aqua','lofi','pastel','fantasy','wireframe','black','luxury','dracula','cmyk'];
// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
onMount(() => {
  themeChange(false)
  // false parameter is required for svelte
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
            {#each themes as theme}
                <option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
            {/each}
        </select>
    </div> 
    <div class="hidden px-2 mx-2 navbar-center md:flex">
		<nav class="flex items-stretch">
			<a class:btn-active={$page.url.pathname === '/'} href='/' class="btn btn-ghost btn-sm rounded-btn">Home</a>
			<a class:btn-active={$page.url.pathname === '/todos'} href='/todos' class="btn btn-ghost btn-sm rounded-btn">Todos</a>
			<a sveltekit:prefetch class:btn-active={$page.url.pathname === '/admin'} href='/admin' class="btn btn-ghost btn-sm rounded-btn">Admin</a>
		</nav>
    </div> 
    <div class="navbar-end">
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
    <div class:open={isOpen} class="mobile-menu absolute md:hidden z-50 left-[100%] min-h-[300px] w-[50%] bg-secondary flex flex-col top-[100%]">
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/'} href='/' class="m-2 btn btn-md self-stretch btn-outline btn-ghost">Home</a>
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/todos'} class="m-2 btn btn-md self-stretch btn-outline btn-ghost" href="/todos">Todos</a>
        <a on:click={() => openMenu()} class:btn-active={$page.url.pathname === '/admin'} class="m-2 btn btn-md self-stretch btn-outline btn-ghost" href="/admin">Admin</a>
        {#if $userStore}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => logout() && toggleModal()} class="m-2 btn btn-md self-stretch btn-outline btn-ghost">Logout</a>       
        {/if}
    </div>
</div>
<div class:modal-open={toggled} class="modal items-center px-10">
    <div class="modal-box rounded-2xl">
        <h1 class="text-3xl text-primary-focus">Goodbye for now...</h1>
        <span class="text-8xl">😿</span>
    </div>
</div>

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
        transition: all 0.45s cubic-bezier(.68,-0.55,.27,1.55)
    }
    .open.mobile-menu {
        left: 50%;
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
