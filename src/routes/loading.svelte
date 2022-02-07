<script>
    export let loading;
    import { Stretch } from "svelte-loading-spinners"
</script>

{#if loading}
    <div class="fixed z-50 w-full h-full flex justify-center items-center">
        <div class="absolute w-screen h-screen bg-indigo-900 opacity-70"></div>
        <Stretch size="60" color="white"></Stretch>
    </div>
{/if}