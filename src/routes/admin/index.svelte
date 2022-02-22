<svelte:head>
  <script defer src="https://cdn-tailwindcss.vercel.app/"></script>
</svelte:head>
<script>
  import { userStore } from "../../stores/userStore";
  import { onMount } from "svelte";
  import { Stretch } from "svelte-loading-spinners";
  import { productStore } from "../../stores/productStore";
  let previewContent = '';
  let aceEditor = null;
  let firstFocused = false;
  console.log("product store:", productStore);
  onMount(() => {
      (async () => {
          const ace = await import('$lib/ace-builds/ace.min.js');
          await import('../../lib/ace-builds/theme-dracula.min.js');
          await import('../../lib/ace-builds/mode-html.min.js');
          return ace;
      })().then(() => {
        // console.log('ace:', ace);
        // console.log('editor:', editor);
          ace.config.set('basePath', '/')
          aceEditor = ace.edit("editor");
          console.log("editor loaded");
          aceEditor.setOptions({
            useWorker: false,
            fontSize: '16px',
            cursorStyle: 'slim',
            wrap: true,
          });
          aceEditor.setTheme("ace/theme/dracula");
          aceEditor.session.setMode("ace/mode/html");
          aceEditor.on('change', () => {
              previewContent = aceEditor.getValue();
          });
          aceEditor.on('focus', () => {
            if (!firstFocused) {
              aceEditor.session.setValue('');
            }
            firstFocused = true;
          });
      });
  });
  const getKitchenSinkItem = (e) => {
    e.target.classList.forEach(c => {
      if (c.includes('s-')) {
        e.target.classList.remove(c);
      }
    });
    aceEditor.session.setValue(aceEditor.getValue() + e.target.outerHTML);
    return e.target.outerHTML;
  }
  const addItemClass = (e) => {
    const input = prompt();
    e.target.classList.add(input);
    console.log("ct", e.target);  
  }
</script>
        <!-- <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th> 
                  <th>Name</th> 
                  <th>Job</th> 
                  <th>Favorite Color</th>
                </tr>
              </thead> 
              <tbody>
                <tr>
                  <th>1</th> 
                  <td>Add user info here...</td> 
                  <td>Quality Control</td> 
                  <td>Blue</td>
                </tr>
              </tbody>
            </table>
          </div> -->
<div class="flex flex-wrap flex-1 bg-slate-650 p-4">
  <div id="editor-container" class="min-h-[100px] w-screen relative shadow-md">
    {#if !aceEditor }
      <div class="flex h-full items-center justify-center bg-slate-650">
        <Stretch size="60" color="white"></Stretch>
      </div>  
    {/if}
    <div id="editor"></div>
  </div>
</div>

<div id="preview" on:click={(e) => addItemClass(e)} class="flex-wrap p-1">
  {@html previewContent}
</div> 

<div class="flex flex-col items-center justify-center my-4">
  <h1 class="text-2xl">DaisyUI - Kitchen Sink</h1>
  <div id="kitchen-sink" class="p-2" on:dblclick={(e) => console.log(getKitchenSinkItem(e))}>
    <div class="grid w-full h-20 rounded-md items-center justify-center bg-slate-300">
      <h1 class="text-2xl inline text-black cursor-pointer"><span class="text-4xl font-bold">+</span>Grid</h1>  
    </div>
    <div class="flex w-full h-20 rounded-md items-center justify-center bg-slate-300">
      <h1 class="text-2xl inline text-black cursor-pointer"><span class="text-4xl font-bold">+</span>Flex</h1>  
    </div>
    <button class="btn">neutral</button> 
    <button class="btn btn-primary">primary</button> 
    <button class="btn btn-secondary">secondary</button> 
    <button class="btn btn-accent">accent</button> 
    <button class="btn btn-ghost">ghost</button> 
    <button class="btn btn-link">link</button>
  </div>
</div>

    
<style lang="postcss">
    @import "https://cdn.jsdelivr.net/npm/daisyui@1.25.4/dist/full.css";
    #editor { 
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    button {
      @apply shadow-md;
    }
    button:hover {
      @apply shadow-2xl;
    }
    #kitchen-sink {
      @apply flex-wrap space-y-4 justify-center items-center;
    }
</style>