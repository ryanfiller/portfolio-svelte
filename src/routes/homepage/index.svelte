<script>
  import { onMount } from 'svelte'
  
  import Markdown from '$components/markdown.svelte'
  const markdown = {}
  Object.entries(import.meta.glob('./_markdown/*.md', { as: 'raw', eager: true })).forEach(([key, value]) => {
    markdown[key.match(/\.\/_markdown\/(.*)\.md/)[1]] = value
  })

  import Note from '$web-components/note.svelte'
  import Tabs from '$web-components/tabs.svelte'
  import Alert from '$web-components/alert.svelte'

  let showSvelteAlert, showWebComponentAlert = false
  const toggleSvelteAlert = () => showSvelteAlert = !showSvelteAlert
  const toggleWebComponentAlert = () => {
    const alert = document.querySelectorAll('#alert-examples rf-alert')[0]
    showWebComponentAlert = alert.getAttribute('show') !== 'true'
    alert.setAttribute('show', showWebComponentAlert)
  }
  onMount(() => {
    document.getElementById('web-component-show-alert').addEventListener('click', toggleWebComponentAlert)
    document.getElementById('web-component-close-alert').addEventListener('click', toggleWebComponentAlert)
  })
</script>

<style>
  .padding {
    padding: var(--padding);
  }
</style>

<Alert
  noJs={true}
  id='no-js-alert'
  show={true}
  title='You have JavaScript turned off!'
>
  I have done my best to make sure everything on this page still works for you.
  If you see this alert, do you mind emailing me and telling my <em>why</em> you have JS turned off? I am SUPER curious.
</Alert>

<div class='padding'>
  <h2 id='web-svelte-components'>
    <a href="#web-svelte-components" title="#web-svelte-components">Web / Svelte Components</a>
  </h2>

  <h3 id='tabs'>
    <a href="#tabs" title="#tabs">Tabs</a>
  </h3>

  <Tabs name='tabs examples'>
    <tablist slot='tablist'>
      <tab id='tabs-svelte-component'>
        Svelte Component
      </tab>
      <tab id='tabs-web-component'>
        Web Component
      </tab>
    </tablist>
    <panel>
      <div class='columns'>
        <Tabs name='svelte component tabs'>
          <tablist slot='tablist'>
            <tab id='svelte-tab-one'>
              Svelte Tab One
            </tab>
            <tab id='svelte-tab-two'>
              Svelte Tab Two
            </tab>
            <tab id='svelte-tab-three'>
              Svelte Tab Three
            </tab>
          </tablist>
          <panel>
            Panel Content 1
            <blockquote>block quote</blockquote>
          </panel>
          <panel>
            Panel Content 2
            <br />
            <br />
            <a style='display: block;' href={'#'}>a link</a>
            <br />
          </panel>
          <panel>
            Panel Content 3
            <pre><code>code block</code></pre>
          </panel>
        </Tabs>
      </div>
    </panel>
    <panel>
      <div class='columns'>
        <Markdown content={markdown.tabs} />
      </div>
    </panel>
  </Tabs>

  <h3 id='note'>
    <a href="#note" title="#note">Note</a>
  </h3>
  
  <Tabs name='note examples'>
    <tablist slot='tablist'>
      <tab id='note-svelte-component'>
        Svelte Component
      </tab>
      <tab id='note-web-component'>
        Web Component
      </tab>
    </tablist>
    <panel>
      <div class='columns'>
        <Note title='A Svelte Note'>
          <p>
            Aspernatur sequi aliquam ea ut fugiat iste doloremque error. Qui totam assumenda fugiat commodi asperiores omnis et. Hic deserunt ut qui qui qui vitae minima. Ab quia id ratione voluptatem aliquid et aliquid autem quod. Minus est doloremque velit nemo at. Est molestiae culpa sed dignissimos praesentium deleniti voluptas aliquam facilis sapiente.
          </p>
          <blockquote>
            Architecto et aut officia non consequuntur voluptatem iure quia quia amet voluptas vitae. Cumque aut ipsum ad veritatis qui fugiat quam libero facilis ea voluptatum in non eos.
          </blockquote>
          <pre><code>{`function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return sit ? consectetur(ipsum, 0, dolor < 0 ? 0 : dolor) : [];
}`}</code></pre>
        </Note>
      </div>
    </panel>
    <panel>
      <div class='columns'>
        <Markdown content={markdown.note} />
      </div>
    </panel>
  </Tabs>

  <section class='needs-js'>
    <h3 id='Alert'>
      <a href="#Alert" title="#Alert">Alert</a>
    </h3>

    <Tabs name='alert examples'>
      <tablist slot='tablist'>
        <tab id='alert-svelte-component'>
          Svelte Component
        </tab>
        <tab id='alert-web-component'>
          Web Component
        </tab>
      </tablist>
      <panel>
        <div class='columns'>
          <button
            on:click={() => showSvelteAlert = true}
            style='width: 100%;'
          >
            Show an alert?
          </button>
        
          <Alert
            show={showSvelteAlert}
            close={toggleSvelteAlert}
            title='A Svelte Alert'
          >
            <ul>
              <li><a href={'#'}>Voluptas officia pariatur sint ut sunt asperiores quisquam sunt non.</a></li>
              <li><a href={'#'}>Voluptatem doloremque maxime in et consequatur ut nostrum consequatur consequatur dignissimos nesciunt ut quis est nam.</a></li>
              <li><a href={'#'}>Enim sed quam ab itaque qui quia eveniet aut aut minus voluptatem.</a></li>
            </ul>
            <table>
              <thead>
                <tr>
                  <th>Quaerat</th>
                  <th>Molestiae</th>
                  <th align="right">Facilis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Perspiciatis</td>
                  <td>Facilis</td>
                  <td align="right">411</td>
                </tr>
                <tr>
                  <td>Qui</td>
                  <td>Facilis</td>
                  <td align="right">92</td>
                </tr>
                <tr>
                  <td>Voluptatem</td>
                  <td>In Est</td>
                  <td align="right">394</td>
                </tr>
              </tbody>
            </table>
            <div slot='actions'>
              <button on:click={() => toggleSvelteAlert()}>
                Close this alert
              </button>
            </div>
          </Alert>
        </div>
      </panel>
      <panel>
        <div class='columns'>
          <Markdown content={markdown.alert} />
        </div>
      </panel>
    </Tabs>
  </section>
</div>
