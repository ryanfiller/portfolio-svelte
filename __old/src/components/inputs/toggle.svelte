<script>
  export let name = ''
  export let title = ''
  export let value
  export let toggle = () => null
  export let checked = false
</script>

<style>
  .toggle {
    & input,
    & label span {
      display: none;
    }

    & label {
      display: inline-block;
      position: relative;
      background: var(--colorHighlight);
      font-size: 2rem;
      height: 1em;
      width: 2em;
      border-radius: 50em;
      cursor: pointer;

      &::after {
        content: '';
        height: 0.75em;
        width: 0.75em;
        background-color: var(--colorBackground);
        border-radius: 100%;
        position: absolute;
        top: 0.125em;
        left: 0.125em;
        transition: 0.3s;
      }
    }

    & input:checked ~ label::after {
      transform: translateX(1em);
      background-color: var(--colorActive);
    }
  }
</style>

<div class='toggle'>
  <input
    type='checkbox' 
    id={`toggle-${name}`}
    name={name}
    title={title}
    value={value}
    checked={checked}
    on:click={event => toggle(event)}
  />
  <label for={`toggle-${name}`}>
    <span>{name}</span>
  </label>
</div>