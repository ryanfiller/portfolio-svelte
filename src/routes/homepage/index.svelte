<script>
  import Markdown from '$components/markdown.svelte'
  const markdown = {}
  Object.entries(import.meta.glob('./_markdown/*.md', { as: 'raw', eager: true })).forEach(([key, value]) => {
    markdown[key.match(/\.\/_markdown\/(.*)\.md/)[1]] = value
  })

  import Tabs from '$web-components/tabs.svelte'
</script>

<style>
  .readable {
    /* include readable */
    max-width: var(--readableMax);
    margin: 0 auto;
    padding: 0 var(--padding);
  }

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
      <div class='readable'>
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
      <div class='readable'>
        <Markdown content={markdown.tabs} />
      </div>
    </panel>
  </Tabs>

</div>