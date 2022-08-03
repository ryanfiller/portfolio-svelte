<script>
  import Markdown from '$components/markdown.svelte'
  const markdown = {}
  Object.entries(import.meta.glob('./_markdown/*.md', { as: 'raw', eager: true })).forEach(([key, value]) => {
    markdown[key.match(/\.\/_markdown\/(.*)\.md/)[1]] = value
  })

  import Note from '$web-components/note.svelte'
  import Tabs from '$web-components/tabs.svelte'
</script>

<style>
  .padding {
    padding: var(--padding);
  }
</style>

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
            <a href={'#'}>a link</a>
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

</div>