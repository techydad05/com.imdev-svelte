<script>
    export let customer;
    import { getCart, getCustomer, cartStore } from "../stores/customerStore"
</script>

<div class="card w-96 bg-base-100 shadow-xl">
    <div class="avatar placeholder p-4">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
            <span class="text-3xl">YOU</span>
        </div>
    </div>

    <div class="card-body items-center text-center">
        <h2 class="card-title capitalize">{`${customer?.first_name} ${customer?.last_name}`}</h2>
        <div class="form space-y-4">
            <div class="form-control">
                <label class="input-group input-group-vertical">
                  <span>Email:</span>
                  <input value={customer?.email} type="text" class="input input-bordered">
                </label>
            </div>
            <div class="form-control">
                <label class="input-group input-group-vertical">
                  <span>Created:</span>
                  <input type="text" value={customer?.created_at} class="input input-bordered">
                </label>
            </div>
        </div>
        <div class="card-actions mt-2">
            <button on:click={() => getCart($cartStore)} class="btn btn-primary">View Cart</button>
            <button on:click={() => getCustomer()} class="btn btn-primary">View Customer</button>
        </div>
    </div>
</div>