<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Loading from './loading.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	export let loading;
	navigating.subscribe((e) => {
		console.log("e:", e)
		loading = e;
	});
</script>
<Loading loading={true} />
<Header>
	<slot />
</Header>
<slot />
<Footer>
	<slot />
</Footer>