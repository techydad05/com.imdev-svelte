<svelte:head>
  <script defer src="https://cdn-tailwindcss.vercel.app/"></script>
  <!-- load emmet code and snippets compiled for browser -->
<script defer type="javascript" src="https://cloud9ide.github.io/emmet-core/emmet.js"></script>
</svelte:head>
<script>
  import { userStore } from "../../stores/userStore";
  import { onMount } from "svelte";
  // import Preview from './preview.svelte';
  // use the compile method here for mdsvex once
  // its working again
  // import { mdsvex } from 'mdsvex';
  
  let previewContent = '';
  onMount(() => {
      (async () => {
          const ace = await import('$lib/ace-builds/ace.min.js');
          await import('../../lib/ace-builds/theme-dracula.min.js');
          await import('../../lib/ace-builds/mode-html.min.js');
          await import('../../lib/ace-builds/ext-emmet.min.js');
          return ace;
      })().then(() => {
          ace.config.set('basePath', '/')
          var editor = ace.edit("editor");
          // console.log('ace:', ace);
          // console.log('editor:', editor);
          editor.setOptions({
              useWorker: false,
              fontSize: '16px',
              cursorStyle: 'slim',
              value: 'Enter some shit...',
              wrap: true,
              enableEmmet: true,
              editorOptions: {
                enableEmmet: true
              }
          })
          editor.setTheme("ace/theme/dracula");
          editor.session.setMode("ace/mode/html");
          editor.on('change', (e) => {
              previewContent = editor.getValue();
          });
      });
  });
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
<div class="flex flex-wrap flex-1 bg-teal-200 p-4">
  <div id="editor-container" class="min-h-[100px] w-screen relative">
    <div id="editor"></div>
  </div>
</div>        
{@html previewContent}

<div class="collapse border rounded-box border-base-300 collapse-arrow">
  <input type="checkbox"> 
  <div class="collapse-title text-xl font-medium">
    DaisyUI - Kitchen Sink
  </div> 
  <div class="collapse-content"> 
    <div class="flex flex-wrap items-center justify-center space-x-4">
        <button class="btn">neutral</button> 
        <button class="btn btn-primary">primary</button> 
        <button class="btn btn-secondary">secondary</button> 
        <button class="btn btn-accent">accent</button> 
        <button class="btn btn-ghost">ghost</button> 
        <button class="btn btn-link">link</button>
    </div>
  </div>
</div>
    
<style lang="postcss">
    #editor { 
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>