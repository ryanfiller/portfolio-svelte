<style global type='text/scss'>
  .form {
    --borderWidth: calc(.25rem);
    --labelHeight: 1.25em;
    --rowHeight: 4em;

    &__wrapper {
      height: 30rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;

      button {
        display: block;
        cursor: pointer;
        border: none;
        background: var(--colorHighlight);
        color: var(--colorWhite);
        transition: var(--transitionSpeed);
        font-size: 1em;
        padding: 1rem;
        margin: 0 auto;
    
        &:hover,
        &:focus {
          background: var(--colorActive);
        }
      }
    }
    
    &__error,
    &__success {
      width: 100%;
      text-align: center;

      button {
        margin-top: var(--padding);
      }
    }

    width: 100%;
    align-self: stretch;
    display: flex;
    flex-direction: column;

    & > * {
      margin-bottom: calc(.5 * var(--padding));
      width: 100%;
      
      &:last-child {
        margin-bottom: 0;
      }
    } 

    &__row {
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
      
      &--textarea {
        flex: 1;

        textarea {
          padding-top: 1rem;
        }
      }

      label {
        text-transform: uppercase;
        color: var(--colorWhite);
        background: var(--rowColor);
        order: 2;
        display: flex;
        align-items: center;
        line-height: 1;
        font-size: 1em;
        padding-left: 1rem;
        transition: margin var(--transitionSpeed);
        height: var(--labelHeight);
        margin-bottom: calc(-1 * var(--labelHeight) - var(--borderWidth));
        border-top: var(--borderWidth) solid var(--rowColor);
      }

      input, 
      textarea {
        background: transparent;
        color: var(--colorText);
        font-size: 1em;
        padding: calc(.25 * var(--padding));
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

          + label {
            margin-bottom: 0;
          }
        }
      }
    }

    @supports (writing-mode: sideways-lr) {
      --rowHeight: 3em;

      &__row {
        flex-direction: row;
        flex-wrap: nowrap;

        label {
          font-size: .75em;
          order: -1;
          writing-mode: sideways-lr;
          height: 100%;
          padding: .25em;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: unset !important;
          margin-left: calc(-1 * var(--labelHeight) - var(--borderWidth));
        }

        input, 
        textarea {
          &:focus,
          &:not(:placeholder-shown) {
            outline: none;
            margin: 0;
    
            + label {
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
    fetch('/', {
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

<div class={`form__wrapper ${name} ${name}--${state}`} >
  {#if state === 'sent'}
    <div class='form__success'>
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
    </div>
  {:else if state === 'error'}
    <div class='form__error'>
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
    </div>
  {:else} 
    <form
      id={name}
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
          <div class={`form__row form__row--${field.type}`}>
            <textarea 
              id={field.name}
              name={field.name}
              placeholder={field.placeholder ? field.placeholder : field.name}
              required={!!field.required}
              value={formValues[field.name]}
              on:input={event => handleInputChange(event, field.name)}
            />
            <label for={field.name}>
              {field.name}
            </label>
          </div>
        {:else}
          <div class={`form__row form__row--${field.type}`}>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder ? field.placeholder : field.name}
              required={!!field.required}
              value={formValues[field.name]}
              on:input={event => handleInputChange(event, field.name)}
            />
            <label for={field.name}>
              {field.name}
            </label>
          </div>
        {/if}
      {/each}
      <button type='submit'>
        Submit
      </button>
    </form>
  {/if}
</div>