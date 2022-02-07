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
    <div class="p-4 grid gap-4 grid-rows-3">
        <code class="max-h-[300px] overflow-auto">
            <pre>
                {JSON.stringify($userStore, null, 2)}
            </pre>
        </code>
        <div class="overflow-x-auto">
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
                  <td>Cy Ganderton</td> 
                  <td>Quality Control Specialist</td> 
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th> 
                  <td>Hart Hagerty</td> 
                  <td>Desktop Support Technician</td> 
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th> 
                  <td>Brice Swyre</td> 
                  <td>Tax Accountant</td> 
                  <td>Red</td>
                </tr>
                <tr>
                  <th>4</th> 
                  <td>Marjy Ferencz</td> 
                  <td>Office Assistant I</td> 
                  <td>Crimson</td>
                </tr>
              </tbody>
            </table>
          </div>
        <div id="editor-container" class="h-[400px] relative">
            <div id="editor"></div>
        </div>
        <Preview content={previewContent} />
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