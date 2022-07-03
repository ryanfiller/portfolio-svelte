<br />
<br />

<button>
  button
</button>

<br />

some text, <a href='#'>this is a link</a>, then more text

<br />
<br />

<style>
  :root {
    --monoColor: var(--colorText);
    --monoBackground: var(--colorBackground);
    --monoBorder: 5px solid var(--colorHighlight);
  }

  a, button {
    color: var(--color, var(--colorWhite));
    background: var(--background, var(--colorHighlight));
    outline: var(--border);
  }

  a {
    outline-width: 1px;
    text-decoration: none;
    padding: .125em .25em;
  }

  a:hover, button:hover {
    color: var(--background, var(--colorWhite));
    background: var(--color, var(--colorHighlight));
  }

  @media (prefers-contrast: more) {
    button {
      --color: var(--monoColor);
      --background: var(--monoBackground);
      --border: var(--monoBorder);
    }
    
    a {
      --color: var(--monoColor);
      --background: var(--monoBackground);
      --border: var(--monoBorder);
    }
  }

  :global([data-user-contrast="more"]) {
    & button {
      --color: var(--monoColor);
      --background: var(--monoBackground);
      --border: var(--monoBorder);
    }
    
    & a {
      --color: var(--monoColor);
      --background: var(--monoBackground);
      --border: var(--monoBorder);
    }
  }
</style>