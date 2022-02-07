<script>
    import { todos, addTodo } from '../../stores/todoStore';
    import { Wave } from 'svelte-loading-spinners';
</script>

<div class='flex content-center justify-center flex-col p-10 space-y-4'>
    <div class="space-y-4">
        <h1 class='text-center uppercase font-bold text-xl'>Todos:</h1>
        {#if $todos.length > 0}
            {#each $todos as todo}
                <div class="card lg:card-side card-bordered">
                    <div class="card-body">
                        <h2 class="card-title">Todo: {todo.id}</h2>
                        <p>{todo.title}</p>
                        <div class="card-actions">
                            <input type="checkbox" class="before:content-['Completed?'] before:relative before:left-8 checkbox checkbox-primary">
                        </div>
                    </div>
                </div>
            {/each}
            {:else}
            <div class="flex justify-center">
                <Wave size={60} color='teal'></Wave>
            </div>
        {/if}
        <br>
    </div>
    <div class="form-group space-y-4">
        <div class="card lg:card-side card-bordered">
            <div class="card-body space-y-4">
                <h1 class='text-center uppercase font-bold text-xl'>Add Todo:</h1>
                <div class="form-control">
                    <input class="input input-primary" type="text" name="title" placeholder="Enter Todo Title">
                </div>
                <div class="form-control">
                    <input type="checkbox" class="before:content-['Completed?'] before:relative before:left-8 checkbox checkbox-primary">
                </div>
                <div class="form-control">
                    <input type="submit" class="btn btn-primary">
                </div>
            </div>
        </div>
    </div>
</div>