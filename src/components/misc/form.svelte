<style>
  .form {
    --labelHeight: 1.25em;
    --rowHeight: 4em;

    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;

    /* include readable */
    max-width: var(--readableMax);
    margin: 0 auto;
    padding: var(--padding);
    margin-bottom: var(--padding);

    & > *:not(:last-child) {
      margin-bottom: var(--padding);
    }

    &[data-state='sent'],
    &[data-state='error'] {
      width: 100%;
      text-align: center;

      & header {
        font-size: 1.5em;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: calc(0.5 * var(--padding));
    }

    & label {
      --rowColor: var(--colorHighlight);

      min-height: var(--rowHeight);
      width: 100%;
      display: flex;
      flex-direction: column;
      color: currentColor;
      border: var(--borderWidth) solid var(--rowColor);
      flex: 0;
      overflow: hidden;

      &:focus-within {
        --rowColor: var(--colorActive);
      }

      &.textarea {
        flex: 1;

        & textarea {
          padding-top: 1rem;
        }
      }

      & span {
        text-transform: uppercase;
        color: var(--colorWhite);
        background: var(--rowColor);
        order: 2;
        display: flex;
        align-items: center;
        line-height: 1;
        padding-left: 1rem;
        transition: margin var(--transitionSpeed);
        height: var(--labelHeight);
        margin-bottom: calc(-1 * var(--labelHeight) - var(--borderWidth));
        border-top: var(--borderWidth) solid var(--rowColor);
      }

      & input,
      & textarea {
        font-family: inherit;
        background: transparent;
        color: var(--colorText);
        font-size: 1em;
        padding: calc(0.25 * var(--padding));
        border: var(--borderWidth) solid transparent;
        flex: 1;
        order: 1;
        box-shadow: none;
        resize: none;

        &:not([value=""]):invalid {
          color: var(--colorHighlight);
        }

        &::placeholder {
          text-transform: capitalize;
          color: var(--colorDisabled);
          opacity: 1;
        }

        &:focus,
        &:not(:placeholder-shown) {
          outline: none;
          margin: 0;

          & + span {
            margin-bottom: 0;
          }
        }
      }
    }

    @supports (writing-mode: sideways-lr) {
      --rowHeight: 3em;

      & label {
        flex-direction: row;
        flex-wrap: nowrap;

        & span {
          font-size: 0.75em;
          order: -1;
          writing-mode: sideways-lr;
          height: auto;
          padding: 0.25em;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: unset !important;
          margin-left: calc(-1 * var(--labelHeight) - var(--borderWidth));
        }

        & input,
        & textarea {
          &:focus,
          &:not(:placeholder-shown) {
            outline: none;
            margin: 0;

            & + span {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
</style>

<script>
  export let name = ''
  export let location = ''
  export let fields = []

  const setDefaultValues = () => fields.map(field => formValues[field.name] = '')

  let state = 'form'
  let formValues = {}
  setDefaultValues()
  
  const encode = data => Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  }).join('&')

  const handleInputChange = event => {
    const { name, value } = event.target
    formValues[name] = value
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    fetch(`/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': name,
        ...formValues,
        'location': location
      })
    })
    .then(() => state = 'sent')
    .catch(error => {
      console.error(error)
      state = 'error'
    })
  }
</script>

<div class='form' id='contact' data-state={state}>
  {#if state === 'sent'}
    <header>
      Sent!
    </header>
    <button 
      type='reset'
      on:click={() => {
        setDefaultValues()
        state = 'form'
      }} 
    >
      Send Another?
    </button>
  {:else if state === 'error'}
    <header>
      Error!
    </header>
    <button 
      type='reset'
      on:click={() => {
        state = 'form'
      }} 
    >
      Try again?
    </button>
  {:else} 
    <form
      class='form'
      name={name}
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      method='post'
      on:submit={handleFormSubmit}
    >
      <input type='hidden' name='bot-field' />
      <input type='hidden' name='form-name' value={name} />
      {#if location}<input type='hidden' name='page' value={location} />{/if}

      {#each fields as field}
        <!-- better way to do this maybe? -->
        {#if field.type === 'textarea'}
          <label for={field.name} class={field.type}>
            <textarea 
              id={field.name}
              name={field.name}
              placeholder={field.placeholder ? field.placeholder : field.name}
              required={!!field.required}
              value={formValues[field.name]}
              on:input={event => handleInputChange(event, field.name)}
            />
            <span>
              {field.name}
            </span>
          </label>
        {:else}
          <label for={field.name} class={field.type}>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder ? field.placeholder : field.name}
              required={!!field.required}
              value={formValues[field.name]}
              on:input={event => handleInputChange(event, field.name)}
            />
            <span>
              {field.name}
            </span>
          </label>
        {/if}
      {/each}
      <button type='submit'>
        Submit
      </button>
    </form>
  {/if}
</div>