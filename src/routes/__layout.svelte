<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Loading from './loading.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	export let loading = false;
	navigating.subscribe((route) => {
		console.log("route:", route);
		loading = route;
	});
</script>
<script context="module">
	// working on getting menu items dynamically
	const modules = import.meta.glob("./**/*.svelte");
	let allMenu = [];
	for (let path in modules) {
		allMenu.push({title: path.replace("./", "").replace(".svelte", ""), link: path});
	}
	// console.log(allMenu);
</script>
<Loading loading={loading} />
<div class="flex flex-col min-h-screen justify-between">
	<Header>
		<slot />
	</Header>
	<slot />
	<Footer>
		<slot />
	</Footer>
</div>