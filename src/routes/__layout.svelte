<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Loading from './loading.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	export let loading = false;
	navigating.subscribe((route) => {
		console.log("e:", route);
		loading = route;
	});
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