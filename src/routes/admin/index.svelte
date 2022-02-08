<svelte:head>
  <script defer src="https://cdn-tailwindcss.vercel.app/"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/daisyui/1.25.4/full.css" integrity="sha512-P0MPYYeQnvVcmM4h7BIypuNi1r/HOtt3ZQO88XFhULismyiXR3Zo63CWIWntrIlYnR9oigbcb1HU9kzqcM/rbw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>
<script>
    import { userStore } from "../../stores/userStore";
    import { onMount } from "svelte";
    import Preview from './preview.svelte';
    // use the compile method here for mdsvex once
    // its working again
    // import { mdsvex } from 'mdsvex';
    
    let previewContent = '';
    onMount(() => {
        (async () => {
            const ace = await import('$lib/ace-builds/ace.min.js');
            await import('../../lib/ace-builds/theme-dracula.min.js');
            await import('../../lib/ace-builds/mode-html.min.js');
            return ace;
        })().then(() => {
            ace.config.set('basePath', '/')
            var editor = ace.edit("editor");
            // console.log('ace:', ace);
            // console.log('editor:', editor);
            editor.setOptions({
                useWorker: false,
                fontSize: '16px',
                cursorStyle: 'slim'
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
          <h1 class="text-3xl pl-6 font-bold">Add some stuff... like html.</h1>
          <div id="editor-container" class="mx-auto w-[95vw] h-[400px] relative p-4">
            <div id="editor"></div>
          </div>
          <Preview content={previewContent} />
    
    <style lang="postcss">
        #editor { 
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    </style>